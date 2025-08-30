import express from 'express';
import { prisma } from '../index';
import { authenticateToken, optionalAuth, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Obtener todos los servicios con filtros
router.get('/', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const { 
      category, 
      location, 
      search, 
      minPrice, 
      maxPrice, 
      verified,
      page = '1',
      limit = '12',
      sortBy = 'rating' // rating, views, recent, price
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Construir filtros
    const where: any = {
      isActive: true,
      ...(category && { categoryId: category as string }),
      ...(location && { 
        OR: [
          { location: { contains: location as string, mode: 'insensitive' } },
          { serviceAreas: { array_contains: [location as string] } }
        ]
      }),
      ...(search && {
        OR: [
          { title: { contains: search as string, mode: 'insensitive' } },
          { description: { contains: search as string, mode: 'insensitive' } },
          { provider: { 
            OR: [
              { firstName: { contains: search as string, mode: 'insensitive' } },
              { lastName: { contains: search as string, mode: 'insensitive' } }
            ]
          }}
        ]
      }),
      ...(minPrice && { minPrice: { gte: parseFloat(minPrice as string) } }),
      ...(maxPrice && { maxPrice: { lte: parseFloat(maxPrice as string) } }),
      ...(verified === 'true' && { provider: { isVerified: true } })
    };

    // Construir ordenamiento
    let orderBy: any = [];
    switch (sortBy) {
      case 'rating':
        orderBy = [
          { provider: { isVerified: 'desc' } },
          { provider: { rating: 'desc' } },
          { views: 'desc' }
        ];
        break;
      case 'views':
        orderBy = [{ views: 'desc' }];
        break;
      case 'recent':
        orderBy = [{ createdAt: 'desc' }];
        break;
      case 'price':
        orderBy = [{ minPrice: 'asc' }];
        break;
      default:
        orderBy = [{ provider: { rating: 'desc' } }];
    }

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        include: {
          provider: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              phone: true,
              email: true,
              profileImage: true,
              rating: true,
              totalReviews: true,
              isVerified: true
            }
          },
          category: {
            select: {
              name: true,
              icon: true,
              color: true
            }
          },
          reviews: {
            take: 3,
            orderBy: { createdAt: 'desc' },
            include: {
              reviewer: {
                select: {
                  firstName: true,
                  lastName: true
                }
              }
            }
          },
          portfolios: {
            take: 5,
            orderBy: { createdAt: 'desc' }
          }
        },
        orderBy,
        skip,
        take: limitNum
      }),
      prisma.service.count({ where })
    ]);

    res.json({
      services,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ error: 'Error al obtener servicios' });
  }
});

// Obtener un servicio específico
router.get('/:id', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
            profileImage: true,
            location: true,
            description: true,
            rating: true,
            totalReviews: true,
            isVerified: true,
            createdAt: true
          }
        },
        category: true,
        reviews: {
          orderBy: { createdAt: 'desc' },
          include: {
            reviewer: {
              select: {
                firstName: true,
                lastName: true,
                profileImage: true
              }
            }
          }
        },
        portfolios: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    if (!service.isActive) {
      return res.status(404).json({ error: 'Servicio no disponible' });
    }

    // Incrementar vistas solo si no es el dueño del servicio
    if (!req.user || req.user.id !== service.providerId) {
      await prisma.service.update({
        where: { id },
        data: { views: { increment: 1 } }
      });
    }

    res.json(service);
  } catch (error) {
    console.error('Error al obtener servicio:', error);
    res.status(500).json({ error: 'Error al obtener servicio' });
  }
});

// Crear nuevo servicio (solo proveedores autenticados)
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const {
      categoryId,
      title,
      description,
      location,
      minPrice,
      maxPrice,
      images,
      availableHours,
      serviceAreas
    } = req.body;

    // Validar campos requeridos
    if (!categoryId || !title || !description || !location) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser completados' });
    }

    // Verificar que la categoría existe
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return res.status(400).json({ error: 'Categoría no válida' });
    }

    const service = await prisma.service.create({
      data: {
        providerId: req.user!.id,
        categoryId,
        title,
        description,
        location,
        minPrice: minPrice ? parseFloat(minPrice) : null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
        images: images || [],
        availableHours: availableHours || {},
        serviceAreas: serviceAreas || [location]
      },
      include: {
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
            profileImage: true,
            rating: true,
            totalReviews: true,
            isVerified: true
          }
        },
        category: true
      }
    });

    res.status(201).json({
      message: 'Servicio creado exitosamente',
      service
    });
  } catch (error) {
    console.error('Error al crear servicio:', error);
    res.status(500).json({ error: 'Error al crear servicio' });
  }
});

// Actualizar servicio (solo el dueño)
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      minPrice,
      maxPrice,
      images,
      availableHours,
      serviceAreas,
      isActive
    } = req.body;

    // Verificar que el servicio existe y pertenece al usuario
    const existingService = await prisma.service.findUnique({
      where: { id }
    });

    if (!existingService) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    if (existingService.providerId !== req.user!.id) {
      return res.status(403).json({ error: 'No tienes permiso para editar este servicio' });
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(location && { location }),
        ...(minPrice !== undefined && { minPrice: minPrice ? parseFloat(minPrice) : null }),
        ...(maxPrice !== undefined && { maxPrice: maxPrice ? parseFloat(maxPrice) : null }),
        ...(images && { images }),
        ...(availableHours && { availableHours }),
        ...(serviceAreas && { serviceAreas }),
        ...(isActive !== undefined && { isActive })
      },
      include: {
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
            profileImage: true,
            rating: true,
            totalReviews: true,
            isVerified: true
          }
        },
        category: true
      }
    });

    res.json({
      message: 'Servicio actualizado exitosamente',
      service: updatedService
    });
  } catch (error) {
    console.error('Error al actualizar servicio:', error);
    res.status(500).json({ error: 'Error al actualizar servicio' });
  }
});

// Eliminar servicio (solo el dueño)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Verificar que el servicio existe y pertenece al usuario
    const existingService = await prisma.service.findUnique({
      where: { id }
    });

    if (!existingService) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    if (existingService.providerId !== req.user!.id) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este servicio' });
    }

    await prisma.service.delete({
      where: { id }
    });

    res.json({ message: 'Servicio eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    res.status(500).json({ error: 'Error al eliminar servicio' });
  }
});

// Obtener servicios del usuario actual
router.get('/my/services', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const services = await prisma.service.findMany({
      where: { providerId: req.user!.id },
      include: {
        category: true,
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            reviewer: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        },
        portfolios: {
          orderBy: { createdAt: 'desc' }
        },
        contactLogs: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            client: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(services);
  } catch (error) {
    console.error('Error al obtener servicios del usuario:', error);
    res.status(500).json({ error: 'Error al obtener tus servicios' });
  }
});

export default router;
