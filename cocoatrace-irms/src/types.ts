import { LucideIcon } from 'lucide-react';

export interface IRMSData {
  delta13C: number; // Carbon-13
  delta15N: number; // Nitrogen-15
  delta18O: number; // Oxygen-18
  delta2H: number;  // Deuterium
  delta34S: number; // Sulfur-34
}

export interface CocoaOrigin {
  id: string;
  registeredId: string;
  region: string;
  country: string;
  estateName: string;
  altitude: number;
  soilType: string;
  cocoaType: string; // e.g., "Trinitario", "Forastero", "PBC 123"
  coordinates: {
    lat: number;
    lng: number;
  };
  irmsFingerprint: IRMSData;
  brandName: string;
  brandLogo: string;
  beanImage?: string;
}

export interface CocoaBatch {
  id: string;
  registeredId: string;
  batchNumber: string;
  productName: string;
  productType: string; // e.g., "Dark Chocolate", "Milk Chocolate", "Cocoa Butter"
  harvestDate: string; // Used as production date for products
  weight: number; // in g
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Verified' | 'Mismatch';
  originId: string;
  origin?: CocoaOrigin;
  irmsData: IRMSData;
  manufacturer?: string;
  packagingType?: string;
  ingredients?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  blockchainAddress?: string;
  productImage?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Inspector' | 'Producer';
}
