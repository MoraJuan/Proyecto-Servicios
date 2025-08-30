import express from 'express';
import { prisma } from '../index';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Crear nueva reseña
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { serviceId, rating, comment, images } = req.body;

    // Validar campos requeridos
    if (!serviceId || !rating) {
      return res.status(400).json({ error: 'Servicio y calificación son requeridos' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5' });
    }

    // Verificar que el servicio existe
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { provider: true }
    });

    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    // Verificar que el usuario no está reseñando su propio servicio
    if (service.providerId === req.user!.id) {
      return res.status(400).json({ error: 'No puedes reseñar tu propio servicio' });
    }

    // Verificar que el usuario no ha reseñado este servicio antes
    const existingReview = await prisma.review.findUnique({
      where: {
        reviewerId_serviceId: {
          reviewerId: req.user!.id,
          serviceId
        }
      }
    });

    if (existingReview) {
      return res.status(400).json({ error: 'Ya has reseñado este servicio' });
    }

    // Crear la reseña
    const review = await prisma.review.create({
      data: {
        reviewerId: req.user!.id,
        serviceId,
        rating,
        comment: comment || null,
        images: images || []
      },
      include: {
        reviewer: {
          select: {
            firstName: true,
            lastName: true,
            profileImage: true
          }
        }
      }
    });

    // Actualizar rating promedio del proveedor
    const allReviews = await prisma.review.findMany({
      where: {
        service: {
          providerId: service.providerId
        }
      }
    });

    const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await prisma.user.update({
      where: { id: service.providerId },
      data: {
        rating: parseFloat(averageRating.toFixed(1)),
        totalReviews: allReviews.length
      }
    });

    res.status(201).json({
      message: 'Reseña creada exitosamente',
      review
    });
  } catch (error) {
    console.error('Error al crear reseña:', error);
    res.status(500).json({ error: 'Error al crear reseña' });
  }
});

// Obtener reseñas de un servicio
router.get('/service/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { page = '1', limit = '10' } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { serviceId },
        include: {
          reviewer: {
            select: {
              firstName: true,
              lastName: true,
              profileImage: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      }),
      prisma.review.count({ where: { serviceId } })
    ]);

    res.json({
      reviews,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
});

// Obtener reseñas de un proveedor
router.get('/provider/:providerId', async (req, res) => {
  try {
    const { providerId } = req.params;
    const { page = '1', limit = '10' } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: {
          service: {
            providerId
          }
        },
        include: {
          reviewer: {
            select: {
              firstName: true,
              lastName: true,
              profileImage: true
            }
          },
          service: {
            select: {
              title: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      }),
      prisma.review.count({
        where: {
          service: {
            providerId
          }
        }
      })
    ]);

    res.json({
      reviews,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error al obtener reseñas del proveedor:', error);
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
});

// Actualizar reseña (solo el autor)
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, images } = req.body;

    // Verificar que la reseña existe y pertenece al usuario
    const existingReview = await prisma.review.findUnique({
      where: { id },
      include: { service: { include: { provider: true } } }
    });

    if (!existingReview) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }

    if (existingReview.reviewerId !== req.user!.id) {
      return res.status(403).json({ error: 'No tienes permiso para editar esta reseña' });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5' });
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        ...(rating && { rating }),
        ...(comment !== undefined && { comment }),
        ...(images && { images })
      },
      include: {
        reviewer: {
          select: {
            firstName: true,
            lastName: true,
            profileImage: true
          }
        }
      }
    });

    // Si se cambió el rating, actualizar promedio del proveedor
    if (rating && rating !== existingReview.rating) {
      const allReviews = await prisma.review.findMany({
        where: {
          service: {
            providerId: existingReview.service.providerId
          }
        }
      });

      const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

      await prisma.user.update({
        where: { id: existingReview.service.providerId },
        data: {
          rating: parseFloat(averageRating.toFixed(1))
        }
      });
    }

    res.json({
      message: 'Reseña actualizada exitosamente',
      review: updatedReview
    });
  } catch (error) {
    console.error('Error al actualizar reseña:', error);
    res.status(500).json({ error: 'Error al actualizar reseña' });
  }
});

// Eliminar reseña (solo el autor)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Verificar que la reseña existe y pertenece al usuario
    const existingReview = await prisma.review.findUnique({
      where: { id },
      include: { service: true }
    });

    if (!existingReview) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }

    if (existingReview.reviewerId !== req.user!.id) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar esta reseña' });
    }

    await prisma.review.delete({
      where: { id }
    });

    // Actualizar rating promedio del proveedor
    const allReviews = await prisma.review.findMany({
      where: {
        service: {
          providerId: existingReview.service.providerId
        }
      }
    });

    const averageRating = allReviews.length > 0 
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length 
      : 0;

    await prisma.user.update({
      where: { id: existingReview.service.providerId },
      data: {
        rating: allReviews.length > 0 ? parseFloat(averageRating.toFixed(1)) : null,
        totalReviews: allReviews.length
      }
    });

    res.json({ message: 'Reseña eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    res.status(500).json({ error: 'Error al eliminar reseña' });
  }
});

// Obtener estadísticas de reseñas para un servicio
router.get('/stats/service/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { serviceId },
      select: { rating: true }
    });

    if (reviews.length === 0) {
      return res.json({
        totalReviews: 0,
        averageRating: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      });
    }

    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
    
    const distribution = reviews.reduce((acc, r) => {
      acc[r.rating] = (acc[r.rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    // Asegurar que todas las estrellas estén representadas
    for (let i = 1; i <= 5; i++) {
      if (!distribution[i]) distribution[i] = 0;
    }

    res.json({
      totalReviews,
      averageRating: parseFloat(averageRating.toFixed(1)),
      distribution
    });
  } catch (error) {
    console.error('Error al obtener estadísticas de reseñas:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

export default router;
