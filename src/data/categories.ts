import { Wrench, Home, Car, Scissors, Paintbrush, Hammer, Zap } from 'lucide-react';
import { Category } from '../types';

export const categories: Category[] = [
  { id: 'plomeria', name: 'Plomería', icon: Wrench, color: 'bg-yellow-100' },
  { id: 'electricidad', name: 'Electricidad', icon: Zap, color: 'bg-amber-100' },
  { id: 'construccion', name: 'Construcción', icon: Hammer, color: 'bg-orange-100' },
  { id: 'limpieza', name: 'Limpieza', icon: Home, color: 'bg-yellow-50' },
  { id: 'mecanica', name: 'Mecánica', icon: Car, color: 'bg-amber-50' },
  { id: 'belleza', name: 'Belleza', icon: Scissors, color: 'bg-yellow-200' },
  { id: 'pintura', name: 'Pintura', icon: Paintbrush, color: 'bg-amber-200' },
  { id: 'jardineria', name: 'Jardinería', icon: Home, color: 'bg-orange-50' }
];
