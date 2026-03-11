import { CocoaBatch, CocoaOrigin } from './types';

export const MOCK_ORIGINS: CocoaOrigin[] = [
  {
    id: 'origin-1',
    registeredId: 'CB-2024-001',
    region: 'Tawau',
    country: 'Malaysia',
    estateName: 'Quoin Hill Estate',
    altitude: 150,
    soilType: 'Volcanic Soil',
    cocoaType: 'PBC 123 (Trinitario)',
    coordinates: { lat: 4.2441, lng: 117.8912 },
    brandName: 'Borneo Harvest',
    brandLogo: 'https://picsum.photos/seed/borneo/100/100',
    beanImage: 'https://picsum.photos/seed/beans1/400/300',
    irmsFingerprint: {
      delta13C: -26.8,
      delta15N: 4.5,
      delta18O: 21.5,
      delta2H: -52.0,
      delta34S: 7.8
    }
  },
  {
    id: 'origin-2',
    registeredId: 'CB-2024-002',
    region: 'Raub',
    country: 'Malaysia',
    estateName: 'Sungei Klau Farm',
    altitude: 450,
    soilType: 'Granitic Soil',
    cocoaType: 'MCB C1 (Forastero)',
    coordinates: { lat: 3.7934, lng: 101.8564 },
    brandName: 'Pahang Gold',
    brandLogo: 'https://picsum.photos/seed/pahang/100/100',
    beanImage: 'https://picsum.photos/seed/beans2/400/300',
    irmsFingerprint: {
      delta13C: -27.2,
      delta15N: 5.2,
      delta18O: 23.1,
      delta2H: -45.0,
      delta34S: 9.2
    }
  },
  {
    id: 'origin-3',
    registeredId: 'CB-2024-003',
    region: 'Kota Samarahan',
    country: 'Malaysia',
    estateName: 'Samarahan Integrated Farm',
    altitude: 50,
    soilType: 'Alluvial Soil',
    cocoaType: 'UIT 1 (Trinitario)',
    coordinates: { lat: 1.4516, lng: 110.4965 },
    brandName: 'Sarawak Silk',
    brandLogo: 'https://picsum.photos/seed/sarawak/100/100',
    beanImage: 'https://picsum.photos/seed/beans3/400/300',
    irmsFingerprint: {
      delta13C: -27.5,
      delta15N: 4.9,
      delta18O: 22.8,
      delta2H: -49.0,
      delta34S: 8.4
    }
  }
];

export const MOCK_BATCHES: CocoaBatch[] = [
  {
    id: 'batch-101',
    registeredId: 'CP-2024-101',
    batchNumber: 'B-2024-MY-TW-001',
    productName: 'Single Origin Tawau 72% Dark',
    productType: 'Dark Chocolate',
    harvestDate: '2024-02-15',
    weight: 1200,
    status: 'Verified',
    originId: 'origin-1',
    origin: MOCK_ORIGINS[0],
    irmsData: MOCK_ORIGINS[0].irmsFingerprint,
    manufacturer: 'Borneo Harvest Ltd',
    packagingType: 'Foil Wrapped Paper Box',
    ingredients: 'Cocoa Mass, Cocoa Butter, Cane Sugar, Vanilla Bean',
    coordinates: { lat: 4.2441, lng: 117.8912 },
    blockchainAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    productImage: 'https://picsum.photos/seed/product1/400/300'
  },
  {
    id: 'batch-102',
    registeredId: 'CP-2024-102',
    batchNumber: 'B-2024-MY-RB-042',
    productName: 'Raub Highlands Milk Chocolate',
    productType: 'Milk Chocolate',
    harvestDate: '2024-01-20',
    weight: 5000,
    status: 'Shipped',
    originId: 'origin-2',
    origin: MOCK_ORIGINS[1],
    irmsData: MOCK_ORIGINS[1].irmsFingerprint,
    manufacturer: 'Pahang Gold Confectionery',
    packagingType: 'Biodegradable Pouch',
    ingredients: 'Cocoa Mass, Cocoa Butter, Milk Powder, Sugar',
    coordinates: { lat: 3.7934, lng: 101.8564 },
    blockchainAddress: '0x32Be343B94f860124dC4fEe278FDCBD38C102D88',
    productImage: 'https://picsum.photos/seed/product2/400/300'
  },
  {
    id: 'batch-103',
    registeredId: 'CP-2024-103',
    batchNumber: 'B-2024-MY-KS-015',
    productName: 'Sarawak Forest 80% Dark',
    productType: 'Dark Chocolate',
    harvestDate: '2024-02-28',
    weight: 2500,
    status: 'Processing',
    originId: 'origin-3',
    origin: MOCK_ORIGINS[2],
    irmsData: MOCK_ORIGINS[2].irmsFingerprint,
    manufacturer: 'Sarawak Silk Chocolates',
    packagingType: 'Tin Can',
    ingredients: 'Cocoa Mass, Cocoa Butter, Stevia',
    coordinates: { lat: 1.4516, lng: 110.4965 },
    blockchainAddress: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
    productImage: 'https://picsum.photos/seed/product3/400/300'
  },
  {
    id: 'batch-104',
    registeredId: 'CP-2024-104',
    batchNumber: 'B-2024-MY-TW-002',
    productName: 'Borneo Reserve Dark Milk',
    productType: 'Dark Milk Chocolate',
    harvestDate: '2024-03-01',
    weight: 800,
    status: 'Verified',
    originId: 'origin-1',
    origin: MOCK_ORIGINS[0],
    irmsData: MOCK_ORIGINS[0].irmsFingerprint
  },
  {
    id: 'batch-105',
    registeredId: 'CP-2024-105',
    batchNumber: 'B-2024-MY-X-001',
    productName: 'Unknown Origin Blend',
    productType: 'Couverture',
    harvestDate: '2024-03-02',
    weight: 1500,
    status: 'Mismatch',
    originId: 'origin-1',
    origin: MOCK_ORIGINS[0],
    irmsData: {
      delta13C: -24.5, // Significant mismatch
      delta15N: 6.8,
      delta18O: 18.2,
      delta2H: -38.0,
      delta34S: 12.5
    }
  }
];
