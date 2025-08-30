import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Crear categorías
  const categories = [
    { name: 'Plomería', icon: 'Wrench', color: 'bg-yellow-100', description: 'Reparaciones de cañerías, instalaciones y mantenimiento' },
    { name: 'Electricidad', icon: 'Zap', color: 'bg-amber-100', description: 'Instalaciones eléctricas, reparaciones y mantenimiento' },
    { name: 'Construcción', icon: 'Hammer', color: 'bg-orange-100', description: 'Construcción, remodelaciones y obras' },
    { name: 'Limpieza', icon: 'Home', color: 'bg-yellow-50', description: 'Servicios de limpieza para hogar y oficina' },
    { name: 'Mecánica', icon: 'Car', color: 'bg-amber-50', description: 'Reparación y mantenimiento de vehículos' },
    { name: 'Belleza', icon: 'Scissors', color: 'bg-yellow-200', description: 'Servicios de peluquería, estética y belleza' },
    { name: 'Pintura', icon: 'Paintbrush', color: 'bg-amber-200', description: 'Pintura interior y exterior' },
    { name: 'Jardinería', icon: 'Home', color: 'bg-orange-50', description: 'Mantenimiento y diseño de jardines' }
  ];

  console.log('📂 Creando categorías...');
  const createdCategories = await Promise.all(
    categories.map(category =>
      prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: category
      })
    )
  );

  // Crear usuarios de ejemplo
  console.log('👥 Creando usuarios...');
  const users = [
    {
      email: 'ana.martinez@email.com',
      password: await bcrypt.hash('123456', 12),
      firstName: 'Ana',
      lastName: 'Martínez',
      phone: '264-123-4567',
      location: 'Capital - Barrio Rivadavia',
      description: 'Plomera con 15 años de experiencia en reparaciones domésticas',
      userType: 'PROVIDER',
      isVerified: true
    },
    {
      email: 'roberto.gonzalez@email.com',
      password: await bcrypt.hash('123456', 12),
      firstName: 'Roberto',
      lastName: 'González',
      phone: '264-234-5678',
      location: 'Rawson - Centro',
      description: 'Servicio profesional de limpieza para hogar y oficina',
      userType: 'PROVIDER',
      isVerified: true
    },
    {
      email: 'laura.silva@email.com',
      password: await bcrypt.hash('123456', 12),
      firstName: 'Laura',
      lastName: 'Silva',
      phone: '264-345-6789',
      location: 'Chimbas - Villa Krause',
      description: 'Electricista matriculada con experiencia en instalaciones residenciales',
      userType: 'PROVIDER',
      isVerified: true
    },
    {
      email: 'sofia.herrera@email.com',
      password: await bcrypt.hash('123456', 12),
      firstName: 'Sofía',
      lastName: 'Herrera',
      phone: '264-456-7890',
      location: 'Capital - Centro',
      description: 'Estilista profesional especializada en eventos y ceremonias',
      userType: 'PROVIDER',
      isVerified: true
    },
    {
      email: 'miguel.torres@email.com',
      password: await bcrypt.hash('123456', 12),
      firstName: 'Miguel',
      lastName: 'Torres',
      phone: '264-567-8901',
      location: 'Rivadavia - Villa Krause',
      description: 'Pintor profesional con experiencia en pintura interior y exterior',
      userType: 'PROVIDER',
      isVerified: false
    },
    {
      email: 'carmen.lopez@email.com',
      password: await bcrypt.hash('123456', 12),
      firstName: 'Carmen',
      lastName: 'López',
      phone: '264-678-9012',
      location: 'Pocito - Villa Aberastain',
      description: 'Jardinera experta en diseño y mantenimiento de espacios verdes',
      userType: 'PROVIDER',
      isVerified: true
    },
    {
      email: 'cliente@email.com',
      password: await bcrypt.hash('123456', 12),
      firstName: 'Juan',
      lastName: 'Cliente',
      phone: '264-111-1111',
      location: 'Capital',
      userType: 'CLIENT',
      isVerified: false
    }
  ];

  const createdUsers = await Promise.all(
    users.map(user =>
      prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user as any
      })
    )
  );

  // Crear servicios
  console.log('🔧 Creando servicios...');
  const services = [
    {
      providerId: createdUsers[0].id, // Ana Martínez
      categoryId: createdCategories.find(c => c.name === 'Plomería')!.id,
      title: 'Plomería Integral - Ana Martínez',
      description: 'Reparaciones de cañerías, instalaciones, destapaciones y mantenimiento de sistemas de agua. 15 años de experiencia.',
      location: 'Capital - Barrio Rivadavia',
      minPrice: 5000,
      maxPrice: 25000,
      serviceAreas: ['Capital', 'Rawson', 'Chimbas'],
      views: 247,
      availableHours: {
        monday: { start: '08:00', end: '18:00' },
        tuesday: { start: '08:00', end: '18:00' },
        wednesday: { start: '08:00', end: '18:00' },
        thursday: { start: '08:00', end: '18:00' },
        friday: { start: '08:00', end: '18:00' },
        saturday: { start: '09:00', end: '13:00' }
      }
    },
    {
      providerId: createdUsers[1].id, // Roberto González
      categoryId: createdCategories.find(c => c.name === 'Limpieza')!.id,
      title: 'Limpieza Profesional - Roberto González',
      description: 'Servicio de limpieza profunda para casas y oficinas. Incluye ventanas, alfombras y electrodomésticos.',
      location: 'Rawson - Centro',
      minPrice: 8000,
      maxPrice: 30000,
      serviceAreas: ['Rawson', 'Capital', 'Santa Lucía'],
      views: 189,
      availableHours: {
        monday: { start: '07:00', end: '19:00' },
        tuesday: { start: '07:00', end: '19:00' },
        wednesday: { start: '07:00', end: '19:00' },
        thursday: { start: '07:00', end: '19:00' },
        friday: { start: '07:00', end: '19:00' },
        saturday: { start: '08:00', end: '16:00' },
        sunday: { start: '10:00', end: '14:00' }
      }
    },
    {
      providerId: createdUsers[2].id, // Laura Silva
      categoryId: createdCategories.find(c => c.name === 'Electricidad')!.id,
      title: 'Electricista Matriculado - Laura Silva',
      description: 'Instalaciones eléctricas, reparaciones, ventiladores de techo, iluminación LED. Electricista matriculada.',
      location: 'Chimbas - Villa Krause',
      minPrice: 3000,
      maxPrice: 15000,
      serviceAreas: ['Chimbas', 'Capital', 'Rivadavia'],
      views: 156,
      availableHours: {
        monday: { start: '08:00', end: '17:00' },
        tuesday: { start: '08:00', end: '17:00' },
        wednesday: { start: '08:00', end: '17:00' },
        thursday: { start: '08:00', end: '17:00' },
        friday: { start: '08:00', end: '17:00' }
      }
    },
    {
      providerId: createdUsers[3].id, // Sofía Herrera
      categoryId: createdCategories.find(c => c.name === 'Belleza')!.id,
      title: 'Estilista Profesional - Sofía Herrera',
      description: 'Cortes, peinados, maquillaje y manicura. Especialista en eventos. Servicio a domicilio disponible.',
      location: 'Capital - Centro',
      minPrice: 2500,
      maxPrice: 18000,
      serviceAreas: ['Capital', 'Rawson', 'Santa Lucía', 'Rivadavia'],
      views: 312,
      availableHours: {
        monday: { start: '09:00', end: '19:00' },
        tuesday: { start: '09:00', end: '19:00' },
        wednesday: { start: '09:00', end: '19:00' },
        thursday: { start: '09:00', end: '19:00' },
        friday: { start: '09:00', end: '20:00' },
        saturday: { start: '08:00', end: '20:00' },
        sunday: { start: '10:00', end: '16:00' }
      }
    },
    {
      providerId: createdUsers[4].id, // Miguel Torres
      categoryId: createdCategories.find(c => c.name === 'Pintura')!.id,
      title: 'Pintor Profesional - Miguel Torres',
      description: 'Pintura interior y exterior, preparación de paredes, enduido, aplicación de látex y esmaltes.',
      location: 'Rivadavia - Villa Krause',
      minPrice: 8000,
      maxPrice: 50000,
      serviceAreas: ['Rivadavia', 'Capital', 'Santa Lucía'],
      views: 198,
      availableHours: {
        monday: { start: '07:00', end: '17:00' },
        tuesday: { start: '07:00', end: '17:00' },
        wednesday: { start: '07:00', end: '17:00' },
        thursday: { start: '07:00', end: '17:00' },
        friday: { start: '07:00', end: '17:00' },
        saturday: { start: '08:00', end: '12:00' }
      }
    },
    {
      providerId: createdUsers[5].id, // Carmen López
      categoryId: createdCategories.find(c => c.name === 'Jardinería')!.id,
      title: 'Jardinero Experto - Carmen López',
      description: 'Mantenimiento de jardines, poda de árboles frutales, corte de césped, plantación y diseño de espacios verdes.',
      location: 'Pocito - Villa Aberastain',
      minPrice: 4000,
      maxPrice: 15000,
      serviceAreas: ['Pocito', 'Capital', 'Rawson'],
      views: 134,
      availableHours: {
        monday: { start: '06:00', end: '14:00' },
        tuesday: { start: '06:00', end: '14:00' },
        wednesday: { start: '06:00', end: '14:00' },
        thursday: { start: '06:00', end: '14:00' },
        friday: { start: '06:00', end: '14:00' },
        saturday: { start: '07:00', end: '12:00' }
      }
    }
  ];

  const createdServices = await Promise.all(
    services.map(service =>
      prisma.service.create({
        data: service as any
      })
    )
  );

  // Crear algunas reseñas de ejemplo
  console.log('⭐ Creando reseñas...');
  const reviews = [
    {
      reviewerId: createdUsers[6].id, // Cliente
      serviceId: createdServices[0].id, // Ana Martínez
      rating: 5,
      comment: 'Excelente servicio, muy profesional y rápida. Solucionó el problema de mi cañería en una hora.'
    },
    {
      reviewerId: createdUsers[6].id, // Cliente
      serviceId: createdServices[1].id, // Roberto González
      rating: 4,
      comment: 'Muy buen trabajo, dejó todo impecable. Recomendado.'
    },
    {
      reviewerId: createdUsers[6].id, // Cliente
      serviceId: createdServices[2].id, // Laura Silva
      rating: 5,
      comment: 'Instaló los ventiladores perfectamente, muy profesional y responsable.'
    }
  ];

  await Promise.all(
    reviews.map(review =>
      prisma.review.create({
        data: review
      })
    )
  );

  // Actualizar ratings de los proveedores
  console.log('📊 Actualizando ratings...');
  for (const service of createdServices) {
    const serviceReviews = await prisma.review.findMany({
      where: {
        service: {
          providerId: service.providerId
        }
      }
    });

    if (serviceReviews.length > 0) {
      const averageRating = serviceReviews.reduce((sum, r) => sum + r.rating, 0) / serviceReviews.length;
      
      await prisma.user.update({
        where: { id: service.providerId },
        data: {
          rating: parseFloat(averageRating.toFixed(1)),
          totalReviews: serviceReviews.length
        }
      });
    }
  }

  console.log('✅ Seed completado exitosamente!');
  console.log('📋 Datos creados:');
  console.log(`  - ${createdCategories.length} categorías`);
  console.log(`  - ${createdUsers.length} usuarios`);
  console.log(`  - ${createdServices.length} servicios`);
  console.log(`  - ${reviews.length} reseñas`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
