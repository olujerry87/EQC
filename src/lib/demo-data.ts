// ============================================================
// src/lib/demo-data.ts
// Central demo data for Vercel showcase. All dashboard pages
// import from here instead of hitting the database directly.
// ============================================================

export type DemoShift = {
    id: string;
    roleRequired: string;
    status: string;
    isPublic: boolean;
    startTime: string;
    endTime: string;
    location: string;
    address: string;
    priority: string;
    staffId: string | null;
    staffName: string | null;
    distance: string;
};

export const DEMO_TENANT = {
  id: 'tenant-demo-001',
  name: 'EQC Workforce Solutions',
};

export const DEMO_STAFF = [
  { id: 's1', firstName: 'Aisha',   lastName: 'Okafor',   role: 'PSW',    phone: '647-555-0101', availability: 'Full-time', skills: 'Meal Prep, Mobility Assistance' },
  { id: 's2', firstName: 'James',   lastName: 'Tremblay', role: 'RN',     phone: '416-555-0202', availability: 'Weekdays',  skills: 'IV Therapy, Wound Care' },
  { id: 's3', firstName: 'Sophie',  lastName: 'Martin',   role: 'PSW',    phone: '905-555-0303', availability: 'Evenings',  skills: 'Companionship, Errands' },
  { id: 's4', firstName: 'Michael', lastName: 'Chen',     role: 'RPN',    phone: '647-555-0404', availability: 'Weekends',  skills: 'Medication Management' },
  { id: 's5', firstName: 'Fatima',  lastName: 'Hassan',   role: 'PSW',    phone: '416-555-0505', availability: 'Full-time', skills: 'Light Housekeeping, Transportation' },
];

export const DEMO_SHIFTS = [
  {
    id: 'sh1',
    roleRequired: 'RN',
    status: 'UNFILLED',
    isPublic: true,
    startTime: '2026-06-25T08:00:00',
    endTime: '2026-06-25T16:00:00',
    location: 'Downtown Wellness Centre',
    address: '100 King St W, Toronto, ON',
    priority: 'HIGH',
    staffId: null,
    staffName: null,
    distance: '2.4 mi',
  },
  {
    id: 'sh2',
    roleRequired: 'PSW',
    status: 'FILLED',
    isPublic: false,
    startTime: '2026-06-25T10:00:00',
    endTime: '2026-06-25T14:00:00',
    location: 'Client Home – North York',
    address: '123 Mockingbird Lane, North York, ON',
    priority: 'NORMAL',
    staffId: 's1',
    staffName: 'Aisha Okafor',
    distance: '5.1 mi',
  },
  {
    id: 'sh3',
    roleRequired: 'PSW',
    status: 'UNFILLED',
    isPublic: true,
    startTime: '2026-06-25T14:00:00',
    endTime: '2026-06-25T20:00:00',
    location: 'Sunrise Assisted Living',
    address: '87 Sunrise Blvd, Scarborough, ON',
    priority: 'URGENT',
    staffId: null,
    staffName: null,
    distance: '8.3 mi',
  },
  {
    id: 'sh4',
    roleRequired: 'RPN',
    status: 'FILLED',
    isPublic: false,
    startTime: '2026-06-26T07:00:00',
    endTime: '2026-06-26T15:00:00',
    location: 'Baycrest Health Sciences',
    address: '3560 Bathurst St, Toronto, ON',
    priority: 'NORMAL',
    staffId: 's4',
    staffName: 'Michael Chen',
    distance: '3.7 mi',
  },
  {
    id: 'sh5',
    roleRequired: 'PSW',
    status: 'UNFILLED',
    isPublic: true,
    startTime: '2026-06-26T16:00:00',
    endTime: '2026-06-26T22:00:00',
    location: 'Client Home – Etobicoke',
    address: '55 Lakeshore Dr, Etobicoke, ON',
    priority: 'NORMAL',
    staffId: null,
    staffName: null,
    distance: '11.2 mi',
  },
];

export const DEMO_ALERTS = [
  { id: 'a1', type: 'TARDY',             message: 'Aisha Okafor arrived 12 min late for Shift sh2.',         isResolved: false, time: '10:12 AM' },
  { id: 'a2', type: 'GEOFENCE_VIOLATION',message: 'Sophie Martin checked in 0.3km outside the geofence.',    isResolved: true,  time: 'Yesterday 4:05 PM' },
  { id: 'a3', type: 'MISSED_SHIFT',       message: 'Shift sh3 at Sunrise Assisted Living has no assignment.', isResolved: false, time: '8:00 AM' },
];

export const DEMO_INVOICES = [
  { id: 'inv-001', client: 'North York Home – Smith Family', shiftDate: 'Jun 24, 2026', hours: 4,  rate: 32.50, tax: 0.13, status: 'PAID'  },
  { id: 'inv-002', client: 'Downtown Wellness Centre',        shiftDate: 'Jun 25, 2026', hours: 8,  rate: 48.00, tax: 0.13, status: 'SENT'  },
  { id: 'inv-003', client: 'Baycrest Health Sciences',        shiftDate: 'Jun 26, 2026', hours: 8,  rate: 44.00, tax: 0.13, status: 'DRAFT' },
  { id: 'inv-004', client: 'Sunrise Assisted Living',         shiftDate: 'Jun 23, 2026', hours: 6,  rate: 36.00, tax: 0.13, status: 'PAID'  },
];

export const DEMO_EXPENSES = [
  { id: 'ex1', staff: 'Aisha Okafor',   category: 'Mileage',   description: 'Drive to North York site',  amount: 14.40, status: 'APPROVED' },
  { id: 'ex2', staff: 'Sophie Martin',  category: 'Parking',   description: 'Parking at Baycrest',       amount: 8.00,  status: 'PENDING'  },
  { id: 'ex3', staff: 'Fatima Hassan',  category: 'Supplies',  description: 'Cleaning supplies – client', amount: 22.50, status: 'APPROVED' },
  { id: 'ex4', staff: 'Michael Chen',   category: 'Mileage',   description: 'Drive to Bathurst client',  amount: 19.20, status: 'PENDING'  },
];

export const DEMO_PAYROLL = [
  { id: 'pay1', staff: 'Aisha Okafor',   hours: 36, rate: 32.50, gross: 1170.00, tax: 152.10, net: 1017.90, status: 'PROCESSED' },
  { id: 'pay2', staff: 'James Tremblay', hours: 40, rate: 48.00, gross: 1920.00, tax: 249.60, net: 1670.40, status: 'PENDING'   },
  { id: 'pay3', staff: 'Sophie Martin',  hours: 24, rate: 32.50, gross: 780.00,  tax: 101.40, net: 678.60,  status: 'PENDING'   },
  { id: 'pay4', staff: 'Michael Chen',   hours: 32, rate: 44.00, gross: 1408.00, tax: 183.04, net: 1224.96, status: 'PROCESSED' },
  { id: 'pay5', staff: 'Fatima Hassan',  hours: 40, rate: 32.50, gross: 1300.00, tax: 169.00, net: 1131.00, status: 'PROCESSED' },
];

export const DEMO_METRICS = {
  openShifts: 3,
  activeStaff: 45,
  completedToday: 12,
  matchEfficiency: 94,
  weeklyRevenue: 18420,
  pendingInvoices: 2,
  pendingExpenses: 2,
  pendingPayroll: 2,
};

// Family portal timeline
export const DEMO_TIMELINE = [
  { id: 't1', time: 'Today 10:00 AM',       event: 'Aisha Okafor clocked in',            icon: '✅', color: '#10b981' },
  { id: 't2', time: 'Today 10:12 AM',       event: 'Late arrival flagged (12 min)',       icon: '⚠️', color: '#f59e0b' },
  { id: 't3', time: 'Today 2:00 PM',        event: 'Shift completed – 4 hrs logged',      icon: '🕐', color: '#6366f1' },
  { id: 't4', time: 'Yesterday 4:00 PM',    event: 'Sophie Martin – Evening shift done',  icon: '✅', color: '#10b981' },
  { id: 't5', time: 'Jun 23 – 9:00 AM',    event: 'Invoice #inv-004 generated & sent',   icon: '💳', color: '#8b5cf6' },
];
