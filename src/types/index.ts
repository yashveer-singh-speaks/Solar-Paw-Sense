export type Role = 'SUPER_ADMIN' | 'PET_OWNER' | 'VETERINARIAN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl: string;
  phone?: string;
  joinedDate: string;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Other';
  breed: string;
  ageYears: number;
  weightKg: number;
  photoUrl: string;
  microchipId: string;
  medicalConditions: string[];
  feedingSchedule: string;
  collarId: string;
  activityGoalSteps: number;
  pawPoints: number;
  badges: string[];
}

export interface VitalTelemetry {
  heartRateBpm: number;
  bodyTempCelsius: number;
  airQualityAqi: number;
  ambientNoiseDb: number;
  stepsToday: number;
  caloriesBurned: number;
  distanceKm: number;
  stressScore: number; // 0 - 100
  sleepHours: number;
  lastSyncTimestamp: string;
}

export interface CollarDevice {
  id: string;
  serialNumber: string;
  petId: string;
  batteryPercentage: number;
  isSolarCharging: boolean;
  solarGainWatts: number;
  firmwareVersion: string;
  hardwareModel: string;
  status: 'ONLINE' | 'OFFLINE' | 'CHARGING_SOLAR' | 'LOW_BATTERY';
  latitude: number;
  longitude: number;
  lastGpsUpdate: string;
}

export interface SafeZone {
  id: string;
  petId: string;
  name: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  isActive: boolean;
  alertOnExit: boolean;
}

export interface AlertNotification {
  id: string;
  petId: string;
  title: string;
  message: string;
  type: 'HEALTH' | 'ENVIRONMENT' | 'SAFE_ZONE' | 'BATTERY' | 'SYSTEM';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: string;
  isRead: boolean;
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: 'Accessories' | 'Wellness' | 'Vet Voucher' | 'Eco Gear';
  imageUrl: string;
  inStock: boolean;
  redemptionCode?: string;
}

export interface RewardRedemption {
  id: string;
  rewardId: string;
  rewardTitle: string;
  pointsSpent: number;
  redeemedAt: string;
  code: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  timestamp: string;
  recommendations?: string[];
}

export interface SupportTicket {
  id: string;
  userId: string;
  userEmail: string;
  subject: string;
  category: 'Collar Issue' | 'App Bug' | 'Subscription' | 'General';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
  messages: { sender: string; text: string; time: string }[];
}

export interface OTAFirmware {
  version: string;
  releaseDate: string;
  description: string;
  sizeMb: number;
  isMandatory: boolean;
}
