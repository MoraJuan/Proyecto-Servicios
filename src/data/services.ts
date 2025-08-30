import { Service } from '../types';

export const featuredServices: Service[] = [
  {
    id: "1",
    providerId: "provider1",
    categoryId: "plomeria",
    title: "Plomería Integral - Ana Martínez",
    description: "Reparaciones de cañerías, instalaciones, destapaciones y mantenimiento de sistemas de agua. 15 años de experiencia.",
    location: "Capital - Barrio Rivadavia",
    minPrice: 5000,
    maxPrice: 25000,
    images: ["https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=400"],
    serviceAreas: ["Capital", "Rawson", "Chimbas"],
    availableHours: {
      monday: { start: "08:00", end: "18:00" },
      tuesday: { start: "08:00", end: "18:00" },
      wednesday: { start: "08:00", end: "18:00" },
      thursday: { start: "08:00", end: "18:00" },
      friday: { start: "08:00", end: "18:00" },
      saturday: { start: "09:00", end: "13:00" },
      sunday: { start: "", end: "" }
    },
    isActive: true,
    views: 247,
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z",
    provider: {
      id: "provider1",
      firstName: "Ana",
      lastName: "Martínez",
      phone: "264-123-4567",
      email: "ana.martinez@email.com",
      profileImage: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 4.8,
      totalReviews: 32,
      isVerified: true
    },
    category: {
      name: "Plomería",
      icon: "Wrench",
      color: "bg-yellow-100"
    }
  },
  {
    id: "2",
    providerId: "provider2",
    categoryId: "limpieza",
    title: "Limpieza Profesional - Roberto González",
    description: "Servicio de limpieza profunda para casas y oficinas. Incluye ventanas, alfombras y electrodomésticos.",
    location: "Rawson - Centro",
    minPrice: 8000,
    maxPrice: 30000,
    images: ["https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400"],
    serviceAreas: ["Rawson", "Capital", "Santa Lucía"],
    availableHours: {
      monday: { start: "07:00", end: "19:00" },
      tuesday: { start: "07:00", end: "19:00" },
      wednesday: { start: "07:00", end: "19:00" },
      thursday: { start: "07:00", end: "19:00" },
      friday: { start: "07:00", end: "19:00" },
      saturday: { start: "08:00", end: "16:00" },
      sunday: { start: "10:00", end: "14:00" }
    },
    isActive: true,
    views: 189,
    createdAt: "2025-01-09T14:30:00Z",
    updatedAt: "2025-01-09T14:30:00Z",
    provider: {
      id: "provider2",
      firstName: "Roberto",
      lastName: "González",
      phone: "264-234-5678",
      email: "roberto.gonzalez@email.com",
      profileImage: "https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 4.6,
      totalReviews: 28,
      isVerified: true
    },
    category: {
      name: "Limpieza",
      icon: "Home",
      color: "bg-yellow-50"
    }
  },
  {
    id: "3",
    providerId: "provider3",
    categoryId: "electricidad",
    title: "Electricista Matriculado - Laura Silva",
    description: "Instalaciones eléctricas, reparaciones, ventiladores de techo, iluminación LED. Electricista matriculada.",
    location: "Chimbas - Villa Krause",
    minPrice: 3000,
    maxPrice: 15000,
    images: ["https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400"],
    serviceAreas: ["Chimbas", "Capital", "Rivadavia"],
    availableHours: {
      monday: { start: "08:00", end: "17:00" },
      tuesday: { start: "08:00", end: "17:00" },
      wednesday: { start: "08:00", end: "17:00" },
      thursday: { start: "08:00", end: "17:00" },
      friday: { start: "08:00", end: "17:00" },
      saturday: { start: "", end: "" },
      sunday: { start: "", end: "" }
    },
    isActive: true,
    views: 156,
    createdAt: "2025-01-08T09:15:00Z",
    updatedAt: "2025-01-08T09:15:00Z",
    provider: {
      id: "provider3",
      firstName: "Laura",
      lastName: "Silva",
      phone: "264-345-6789",
      email: "laura.silva@email.com",
      profileImage: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 4.9,
      totalReviews: 41,
      isVerified: true
    },
    category: {
      name: "Electricidad",
      icon: "Zap",
      color: "bg-amber-100"
    }
  },
  {
    id: "4",
    providerId: "provider4",
    categoryId: "belleza",
    title: "Estilista Profesional - Sofía Herrera",
    description: "Cortes, peinados, maquillaje y manicura. Especialista en eventos. Servicio a domicilio disponible.",
    location: "Capital - Centro",
    minPrice: 2500,
    maxPrice: 18000,
    images: ["https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400"],
    serviceAreas: ["Capital", "Rawson", "Santa Lucía", "Rivadavia"],
    availableHours: {
      monday: { start: "09:00", end: "19:00" },
      tuesday: { start: "09:00", end: "19:00" },
      wednesday: { start: "09:00", end: "19:00" },
      thursday: { start: "09:00", end: "19:00" },
      friday: { start: "09:00", end: "20:00" },
      saturday: { start: "08:00", end: "20:00" },
      sunday: { start: "10:00", end: "16:00" }
    },
    isActive: true,
    views: 312,
    createdAt: "2025-01-07T16:45:00Z",
    updatedAt: "2025-01-07T16:45:00Z",
    provider: {
      id: "provider4",
      firstName: "Sofía",
      lastName: "Herrera",
      phone: "264-456-7890",
      email: "sofia.herrera@email.com",
      profileImage: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 4.7,
      totalReviews: 67,
      isVerified: true
    },
    category: {
      name: "Belleza",
      icon: "Scissors",
      color: "bg-yellow-200"
    }
  },
  {
    id: "5",
    providerId: "provider5",
    categoryId: "pintura",
    title: "Pintor Profesional - Miguel Torres",
    description: "Pintura interior y exterior, preparación de paredes, enduido, aplicación de látex y esmaltes.",
    location: "Rivadavia - Villa Krause",
    minPrice: 8000,
    maxPrice: 50000,
    images: ["https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=400"],
    serviceAreas: ["Rivadavia", "Capital", "Santa Lucía"],
    availableHours: {
      monday: { start: "07:00", end: "17:00" },
      tuesday: { start: "07:00", end: "17:00" },
      wednesday: { start: "07:00", end: "17:00" },
      thursday: { start: "07:00", end: "17:00" },
      friday: { start: "07:00", end: "17:00" },
      saturday: { start: "08:00", end: "12:00" },
      sunday: { start: "", end: "" }
    },
    isActive: true,
    views: 198,
    createdAt: "2025-01-06T11:20:00Z",
    updatedAt: "2025-01-06T11:20:00Z",
    provider: {
      id: "provider5",
      firstName: "Miguel",
      lastName: "Torres",
      phone: "264-567-8901",
      email: "miguel.torres@email.com",
      profileImage: "https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 4.5,
      totalReviews: 23,
      isVerified: false
    },
    category: {
      name: "Pintura",
      icon: "Paintbrush",
      color: "bg-amber-200"
    }
  },
  {
    id: "6",
    providerId: "provider6",
    categoryId: "jardineria",
    title: "Jardinero Experto - Carmen López",
    description: "Mantenimiento de jardines, poda de árboles frutales, corte de césped, plantación y diseño de espacios verdes.",
    location: "Pocito - Villa Aberastain",
    minPrice: 4000,
    maxPrice: 15000,
    images: ["https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400"],
    serviceAreas: ["Pocito", "Capital", "Rawson"],
    availableHours: {
      monday: { start: "06:00", end: "14:00" },
      tuesday: { start: "06:00", end: "14:00" },
      wednesday: { start: "06:00", end: "14:00" },
      thursday: { start: "06:00", end: "14:00" },
      friday: { start: "06:00", end: "14:00" },
      saturday: { start: "07:00", end: "12:00" },
      sunday: { start: "", end: "" }
    },
    isActive: true,
    views: 134,
    createdAt: "2025-01-05T08:30:00Z",
    updatedAt: "2025-01-05T08:30:00Z",
    provider: {
      id: "provider6",
      firstName: "Carmen",
      lastName: "López",
      phone: "264-678-9012",
      email: "carmen.lopez@email.com",
      profileImage: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 4.8,
      totalReviews: 19,
      isVerified: true
    },
    category: {
      name: "Jardinería",
      icon: "Home",
      color: "bg-orange-50"
    }
  }
];
