import { Location, Alert, ServiceRequest, Customer, NotificationStat } from '../types';

export const mockCustomers: Customer[] = [
  { id: 'c1', name: 'City General Hospital', email: 'admin@cityhospital.org', phone: '555-0101', locationCount: 3, subStoreCount: 12, sensorCount: 45, activeAlerts: 2 },
  { id: 'c2', name: 'Fresh Foods Market', email: 'manager@freshfoods.com', phone: '555-0102', locationCount: 2, subStoreCount: 8, sensorCount: 24, activeAlerts: 1 },
  { id: 'c3', name: 'Corner Deli Chain', email: 'owner@cornerdeli.com', phone: '555-0103', locationCount: 5, subStoreCount: 10, sensorCount: 20, activeAlerts: 0 },
  { id: 'c4', name: 'BioTech Labs', email: 'lab@biotech.io', phone: '555-0104', locationCount: 1, subStoreCount: 4, sensorCount: 12, activeAlerts: 0 },
];

export const mockLocations: Location[] = [
  // C1: City General Hospital
  {
    id: 'l1',
    customerId: 'c1',
    name: 'Main Building',
    address: '123 Medical Center Dr',
    status: 'warning',
    subStores: [
      {
        id: 's1',
        name: 'Blood Bank Freezer',
        temp: '-2°F',
        status: 'good',
        minTarget: -5,
        maxTarget: 5,
        sensors: [
          { id: 'sn-001', type: 'temp', name: 'Probe 1', value: '-2°F', status: 'online', lastUpdated: '2 min ago' },
          { id: 'sn-002', type: 'temp', name: 'Probe 2', value: '0°F', status: 'online', lastUpdated: '2 min ago' },
          { id: 'sn-003', type: 'door', name: 'Main Door', value: 'Closed', status: 'online', lastUpdated: '1 min ago' },
        ],
        recipients: []
      },
      {
        id: 's2',
        name: 'Vaccine Refrigerator',
        temp: '38°F',
        status: 'warning',
        minTarget: 35,
        maxTarget: 46,
        sensors: [
          { id: 'sn-004', type: 'temp', name: 'Internal Probe', value: '38°F', status: 'online', lastUpdated: '5 min ago' },
        ],
        recipients: []
      }
    ]
  },
  // C2: Fresh Foods Market
  {
    id: 'l2',
    customerId: 'c2',
    name: 'Downtown Store',
    address: '456 Market St',
    status: 'good',
    subStores: [
      {
        id: 's3',
        name: 'Dairy Walk-in',
        temp: '36°F',
        status: 'good',
        minTarget: 35,
        maxTarget: 40,
        sensors: [
          { id: 'sn-005', type: 'temp', name: 'Main Probe', value: '36°F', status: 'online', lastUpdated: '1 min ago' }
        ],
        recipients: []
      },
      {
        id: 's4',
        name: 'Meat Freezer',
        temp: '-5°F',
        status: 'good',
        minTarget: -10,
        maxTarget: 0,
        sensors: [
          { id: 'sn-006', type: 'temp', name: 'Probe A', value: '-5°F', status: 'online', lastUpdated: '3 min ago' }
        ],
        recipients: []
      }
    ]
  },
  // C2: Fresh Foods Market (Second Location)
  {
    id: 'l3',
    customerId: 'c2',
    name: 'Westside Warehouse',
    address: '789 Industrial Pkwy',
    status: 'critical',
    subStores: [
      {
        id: 's5',
        name: 'Deep Freeze Unit B',
        temp: '15°F',
        status: 'critical',
        minTarget: -10,
        maxTarget: 0,
        sensors: [
          { id: 'sn-007', type: 'temp', name: 'Rear Probe', value: '15°F', status: 'online', lastUpdated: 'Just now' }
        ],
        recipients: []
      }
    ]
  }
];

export const mockAlerts: Alert[] = [
  { 
    id: 'a1', 
    level: 1, 
    customerId: 'c2', 
    customerName: 'Fresh Foods Market',
    locationName: 'Westside Warehouse', 
    subStoreName: 'Deep Freeze Unit B', 
    message: '15°F - Target: -10°F to 0°F', 
    timestamp: '10 min ago',
    status: 'active'
  },
  { 
    id: 'a2', 
    level: 2, 
    customerId: 'c1',
    customerName: 'City General Hospital',
    locationName: 'Main Building', 
    subStoreName: 'Vaccine Refrigerator', 
    message: 'Door Open > 5 min', 
    timestamp: '25 min ago',
    status: 'active'
  },
  { 
    id: 'a3', 
    level: 3, 
    customerId: 'c1',
    customerName: 'City General Hospital',
    locationName: 'Main Building', 
    subStoreName: 'Blood Bank Freezer', 
    message: 'Power Fluctuation Detected', 
    timestamp: '2 hours ago',
    status: 'resolved'
  },
];

export const mockRequests: ServiceRequest[] = [
  {
    id: 'REQ-001',
    date: 'March 10, 2024',
    customerId: 'c1',
    customerName: 'City General Hospital',
    locationName: 'Main Building',
    subStoreName: 'Blood Bank Freezer',
    items: ['2 Temperature Probes', '1 Door Sensor'],
    urgency: 'urgent',
    status: 'pending',
    reason: 'New Installation',
    notes: 'New blood bank opening next week. Need setup ASAP.',
    targetTemp: '-5°F to 5°F'
  },
  {
    id: 'REQ-002',
    date: 'March 8, 2024',
    customerId: 'c2',
    customerName: 'Fresh Foods Market',
    locationName: 'Downtown Store',
    subStoreName: 'Dairy Walk-in',
    items: ['1 Temp Probe'],
    urgency: 'normal',
    status: 'approved',
    reason: 'Replacement',
    notes: 'Old sensor erratic.',
    adminNote: 'Scheduled for next route',
    targetTemp: '35°F to 40°F'
  },
  {
    id: 'REQ-003',
    date: 'March 5, 2024',
    customerId: 'c3',
    customerName: 'Corner Deli Chain',
    locationName: 'North Deli',
    subStoreName: 'Display Case',
    items: ['1 Temp Probe'],
    urgency: 'normal',
    status: 'installed',
    reason: 'New Installation',
    installationDate: 'March 9, 2024',
    targetTemp: '32°F to 38°F'
  },
  {
    id: 'REQ-004',
    date: 'March 1, 2024',
    customerId: 'c4',
    customerName: 'BioTech Labs',
    locationName: 'Lab A',
    subStoreName: 'Sample Storage',
    items: ['2 Temp Probes'],
    urgency: 'soon',
    status: 'scheduled',
    installationDate: 'March 12, 2024',
    adminNote: 'Tech dispatched',
    targetTemp: '-80°F to -70°F'
  }
];

export const mockStats: NotificationStat[] = [
  { customerId: 'c1', customerName: 'City General Hospital', whatsappCount: 45, emailCount: 120 },
  { customerId: 'c2', customerName: 'Fresh Foods Market', whatsappCount: 12, emailCount: 34 },
  { customerId: 'c3', customerName: 'Corner Deli Chain', whatsappCount: 5, emailCount: 10 },
  { customerId: 'c4', customerName: 'BioTech Labs', whatsappCount: 0, emailCount: 8 },
];
