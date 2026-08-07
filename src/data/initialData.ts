import { User, Pet, VitalTelemetry, CollarDevice, SafeZone, AlertNotification, RewardItem, SupportTicket, OTAFirmware, AiChatMessage } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin-01',
    email: 'ekaa@superadminpaw.com',
    name: 'Ekaa (Super Admin)',
    role: 'SUPER_ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    phone: '+1 (555) 019-2831',
    joinedDate: '2025-01-10',
  },
  {
    id: 'user-owner-01',
    email: 'petowner@admin.com',
    name: 'Petowner',
    role: 'PET_OWNER',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    phone: '+1 (555) 014-9922',
    joinedDate: '2025-03-15',
  },
];

export const INITIAL_PETS: Pet[] = [
  {
    id: 'pet-01',
    ownerId: 'user-owner-01',
    name: 'Apollo',
    species: 'Dog',
    breed: 'Golden Retriever',
    ageYears: 3.5,
    weightKg: 28.5,
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
    microchipId: '985141002938471',
    medicalConditions: ['Mild Dust Allergy', 'Loves Outdoor Runs'],
    feedingSchedule: '7:30 AM (Royal Canin 350g) & 6:30 PM (350g + Fish Oil)',
    collarId: 'collar-01',
    activityGoalSteps: 10000,
    pawPoints: 4250,
    badges: ['Sun Chaser ☀️', '10k Step Streak 🏃', 'Optimal Vitality 💚', 'Eco Solar Hero 🌿'],
  },
  {
    id: 'pet-02',
    ownerId: 'user-owner-01',
    name: 'Luna',
    species: 'Cat',
    breed: 'Persian Longhair',
    ageYears: 2.0,
    weightKg: 4.2,
    photoUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    microchipId: '985141008821940',
    medicalConditions: ['Sensitive Stomach'],
    feedingSchedule: '8:00 AM (Wet Salmon 100g) & 7:00 PM (Dry Kibble 50g)',
    collarId: 'collar-02',
    activityGoalSteps: 6000,
    pawPoints: 2850,
    badges: ['Sun Bather ☀️', 'Night Prowler 🌙', 'Calm Heartbeat 💓'],
  },
];

export const INITIAL_TELEMETRY: Record<string, VitalTelemetry> = {
  'pet-01': {
    heartRateBpm: 74,
    bodyTempCelsius: 38.4,
    airQualityAqi: 42, // Good AQI
    ambientNoiseDb: 48,
    stepsToday: 8420,
    caloriesBurned: 520,
    distanceKm: 5.6,
    stressScore: 14, // Low stress
    sleepHours: 9.2,
    lastSyncTimestamp: 'Just now',
  },
  'pet-02': {
    heartRateBpm: 118,
    bodyTempCelsius: 38.7,
    airQualityAqi: 38,
    ambientNoiseDb: 35,
    stepsToday: 4150,
    caloriesBurned: 180,
    distanceKm: 2.1,
    stressScore: 18,
    sleepHours: 12.5,
    lastSyncTimestamp: '2 mins ago',
  },
};

export const INITIAL_COLLARS: Record<string, CollarDevice> = {
  'pet-01': {
    id: 'collar-01',
    serialNumber: 'SPS-COLLAR-7749-GOLD',
    petId: 'pet-01',
    batteryPercentage: 88,
    isSolarCharging: true,
    solarGainWatts: 4.2,
    firmwareVersion: 'v2.4.1-solar-boost',
    hardwareModel: 'SolarPaw Pro Collar v2',
    status: 'CHARGING_SOLAR',
    latitude: 40.785091, // Central Park NY area simulation
    longitude: -73.968285,
    lastGpsUpdate: 'Just now (GPS High Accuracy)',
  },
  'pet-02': {
    id: 'collar-02',
    serialNumber: 'SPS-COLLAR-9902-LUNA',
    petId: 'pet-02',
    batteryPercentage: 94,
    isSolarCharging: true,
    solarGainWatts: 3.8,
    firmwareVersion: 'v2.4.1-solar-boost',
    hardwareModel: 'SolarPaw Mini Collar v2',
    status: 'ONLINE',
    latitude: 40.783100,
    longitude: -73.965400,
    lastGpsUpdate: '1 min ago',
  },
};

export const INITIAL_SAFE_ZONES: SafeZone[] = [
  {
    id: 'sz-01',
    petId: 'pet-01',
    name: 'Home Sanctuary & Backyard',
    latitude: 40.785091,
    longitude: -73.968285,
    radiusMeters: 180,
    isActive: true,
    alertOnExit: true,
  },
  {
    id: 'sz-02',
    petId: 'pet-01',
    name: 'Central Park Dog Run',
    latitude: 40.781200,
    longitude: -73.969000,
    radiusMeters: 300,
    isActive: true,
    alertOnExit: false,
  },
];

export const INITIAL_ALERTS: AlertNotification[] = [
  {
    id: 'alt-01',
    petId: 'pet-01',
    title: '☀️ Optimal Solar Charging Active',
    message: 'Apollo’s collar is harvesting 4.2W of solar energy in direct sunlight. Battery extended by +12%.',
    type: 'BATTERY',
    severity: 'LOW',
    timestamp: '10:15 AM Today',
    isRead: false,
  },
  {
    id: 'alt-02',
    petId: 'pet-01',
    title: '🌿 Air Quality Alert Resolved',
    message: 'Ambient Air Quality Index (AQI) dropped from 85 to 42 (Fresh Air Zone). Safe for extended outdoor running.',
    type: 'ENVIRONMENT',
    severity: 'LOW',
    timestamp: 'Yesterday, 4:30 PM',
    isRead: true,
  },
  {
    id: 'alt-03',
    petId: 'pet-01',
    title: '💓 Heart Rate Vital Check Normal',
    message: 'Resting BPM averaged 72 BPM during afternoon nap. AI Wellness Confidence: 99.4%.',
    type: 'HEALTH',
    severity: 'LOW',
    timestamp: '2 days ago',
    isRead: true,
  },
];

export const INITIAL_REWARDS: RewardItem[] = [
  {
    id: 'rew-01',
    title: 'Aesop Organic Botanical Paw Salve (50ml)',
    description: 'Nourishing organic botanical balm for paws and snout, infused with soothing lavender & chamomile extract.',
    pointsCost: 1500,
    category: 'Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1608248597261-83325805435f?auto=format&fit=crop&w=400&q=80',
    inStock: true,
  },
  {
    id: 'rew-02',
    title: 'SolarPaw Sense Reflective Eco-Leash',
    description: 'Ultra-lightweight recycled ocean plastic lead with magnetic attachment for SolarPaw Collar.',
    pointsCost: 2400,
    category: 'Eco Gear',
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=400&q=80',
    inStock: true,
  },
  {
    id: 'rew-03',
    title: '$50 Virtual Vet Teleconsultation Voucher',
    description: 'Direct 1-on-1 video call with a licensed veterinary expert to review collar health telemetry.',
    pointsCost: 3500,
    category: 'Vet Voucher',
    imageUrl: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=400&q=80',
    inStock: true,
  },
  {
    id: 'rew-04',
    title: 'Solar Panel Backup Module (Champagne Gold)',
    description: 'Replacement high-efficiency flexible photovoltaic strip with quick magnetic click-in.',
    pointsCost: 4800,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=400&q=80',
    inStock: true,
  },
];

export const INITIAL_AI_CHAT: AiChatMessage[] = [
  {
    id: 'msg-01',
    sender: 'AI',
    text: 'Greetings Petowner. I am the Solar Paw Sense Wellness AI Copilot. I have analyzed Apollo’s telemetry over the last 24 hours:\n\n• Heart Rate: 74 BPM (Optimal resting baseline)\n• Solar Energy Harvested: 4.2W (+18% battery gain today)\n• Air Quality Exposure: AQI 42 (Excellent outdoor conditions)\n\nApollo is in peak physical health today. Would you like a personalized recommendation for his evening walk?',
    timestamp: '09:00 AM',
    recommendations: [
      'Plan a 30-min evening walk at 6:00 PM (Optimal temperature window)',
      'Review Apollo’s weekly heart rate trend graph',
      'Generate printable Vet Health Clearance Card',
    ],
  },
];

export const INITIAL_OTA_FIRMWARE: OTAFirmware[] = [
  {
    version: 'v2.4.1-solar-boost',
    releaseDate: '2026-07-28',
    description: 'Improved photovoltaic conversion efficiency during partial shaded sunlight and enhanced BLE sync throughput.',
    sizeMb: 4.8,
    isMandatory: false,
  },
  {
    version: 'v2.5.0-ai-heartbeat-beta',
    releaseDate: '2026-08-01',
    description: 'Neural edge processing algorithm for immediate arrhythmia and anxiety detection right on the collar MCU.',
    sizeMb: 7.2,
    isMandatory: true,
  },
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TCK-8821',
    userId: 'user-owner-01',
    userEmail: 'petowner@admin.com',
    subject: 'Inquiry regarding solar panel cleaning guidelines',
    category: 'Collar Issue',
    status: 'RESOLVED',
    createdAt: '2026-08-02',
    messages: [
      { sender: 'Petowner', text: 'How should I clean dirt off the flexible solar strip on Apollo’s collar after muddy walks?', time: 'Aug 2, 10:00 AM' },
      { sender: 'Ekaa (Support)', text: 'Hello Petowner! Use a soft damp microfiber cloth with warm water. The collar is IP68 waterproof, so a gentle rinse is perfectly fine.', time: 'Aug 2, 10:30 AM' },
    ],
  },
];
