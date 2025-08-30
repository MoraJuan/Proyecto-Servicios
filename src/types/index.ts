export interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
}

export interface Service {
  id: string;
  providerId: string;
  categoryId: string;
  title: string;
  description: string;
  location: string;
  minPrice?: number;
  maxPrice?: number;
  images?: string[];
  availableHours?: any;
  serviceAreas?: string[];
  isActive: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  provider: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    profileImage?: string;
    rating?: number;
    totalReviews: number;
    isVerified: boolean;
  };
  category: {
    name: string;
    icon: string;
    color: string;
  };
  reviews?: Review[];
  portfolios?: Portfolio[];
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  images?: string[];
  createdAt: string;
  reviewer: {
    firstName: string;
    lastName: string;
  };
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  images?: string[];
  projectUrl?: string;
  completedAt?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profileImage?: string;
  location?: string;
  description?: string;
  userType: 'CLIENT' | 'PROVIDER' | 'BOTH';
  isVerified: boolean;
  rating?: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}
