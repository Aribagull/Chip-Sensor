import { LucideIcon } from 'lucide-react';

export type UserRole = 'customer' | 'admin';
export type AlertLevel = 1 | 2 | 3;
export type SensorStatus = 'online' | 'offline';
export type RequestStatus = 'pending' | 'approved' | 'scheduled' | 'installed' | 'rejected';
export type UrgencyLevel = 'normal' | 'soon' | 'urgent';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FormData {
  [key: string]: string | boolean | string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  locationCount: number;
  subStoreCount: number;
  sensorCount: number;
  activeAlerts: number;
}

export interface Alert {
  id: string;
  level: AlertLevel;
  customerId?: string;
  customerName?: string;
  locationName: string;
  subStoreName: string;
  message: string;
  timestamp: string;
  status: 'active' | 'resolved';
}

export interface Sensor {
  id: string;
  type: 'temp' | 'door';
  name: string;
  value: string;
  status: SensorStatus;
  lastUpdated: string;
  // For Admin View flattening
  customerId?: string;
  customerName?: string;
  locationName?: string;
  subStoreName?: string;
}

export interface Recipient {
  id: string;
  name: string;
  phone: string;
  email: string;
  notifyWhatsapp: boolean;
  notifyEmail: boolean;
}

export interface SubStore {
  id: string;
  name: string;
  temp: string;
  status: 'good' | 'warning' | 'critical';
  minTarget: number;
  maxTarget: number;
  sensors: Sensor[];
  recipients: Recipient[];
}

export interface Location {
  id: string;
  customerId: string; // Link to customer
  name: string;
  address: string;
  subStores: SubStore[];
  status: 'good' | 'warning' | 'critical';
}

export interface ServiceRequest {
  id: string;
  date: string;
  customerId: string;
  customerName: string;
  locationName: string;
  subStoreName: string;
  items: string[];
  urgency: UrgencyLevel;
  status: RequestStatus;
  reason?: string;
  notes?: string;
  adminNote?: string;
  installationDate?: string;
  targetTemp?: string;
}

export interface NotificationStat {
  customerId: string;
  customerName: string;
  whatsappCount: number;
  emailCount: number;
}