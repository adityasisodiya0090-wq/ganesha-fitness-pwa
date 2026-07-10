import { ReactNode } from 'react';

export interface BaseProps {
  children?: ReactNode;
  className?: string;
  id?: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface MembershipPlan {
  name: string;
  price: string;
  period: string;
  subtitle: string;
  icon: ReactNode;
  popular: boolean;
  features: string[];
}

export interface FacilityItem {
  title: string;
  sub: string;
  image: string;
  desc: string;
  icon: ReactNode;
}

export interface Trainer {
  name: string;
  role: string;
  exp: string;
  image: string;
  credentials: string[];
  specialties: string;
}

export interface GalleryItem {
  id: number;
  category: string;
  title: string;
  desc: string;
  image: string;
}

export interface ReviewItem {
  name: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
  initials: string;
}

