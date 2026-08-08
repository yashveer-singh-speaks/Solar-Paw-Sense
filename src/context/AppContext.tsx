'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Pet, VitalTelemetry, CollarDevice, SafeZone, AlertNotification, RewardItem, RewardRedemption, AiChatMessage, SupportTicket, OTAFirmware, Role } from '../types';
import { INITIAL_USERS, INITIAL_PETS, INITIAL_TELEMETRY, INITIAL_COLLARS, INITIAL_SAFE_ZONES, INITIAL_ALERTS, INITIAL_REWARDS, INITIAL_AI_CHAT, INITIAL_OTA_FIRMWARE, INITIAL_TICKETS } from '../data/initialData';

interface AppContextType {
  currentUser: User | null;
  login: (email: string, pass: string) => boolean;
  createAccount: (name: string, email: string, pass: string, role?: Role) => boolean;
  logout: () => void;
  switchUserRole: (role: Role) => void;

  pets: Pet[];
  activePetId: string;
  setActivePetId: (id: string) => void;
  activePet: Pet | undefined;
  addPet: (pet: Omit<Pet, 'id' | 'ownerId' | 'pawPoints' | 'badges'>) => void;
  updatePet: (id: string, petData: Partial<Pet>) => void;

  telemetry: Record<string, VitalTelemetry>;
  activeTelemetry: VitalTelemetry | undefined;
  
  collars: Record<string, CollarDevice>;
  activeCollar: CollarDevice | undefined;
  toggleSolarCharging: (petId: string) => void;
  triggerManualGpsSync: () => void;

  safeZones: SafeZone[];
  addSafeZone: (zone: Omit<SafeZone, 'id'>) => void;
  toggleSafeZone: (id: string) => void;

  alerts: AlertNotification[];
  markAlertRead: (id: string) => void;
  clearAllAlerts: () => void;

  rewards: RewardItem[];
  redemptions: RewardRedemption[];
  redeemReward: (reward: RewardItem) => boolean;

  aiChatMessages: AiChatMessage[];
  sendAiMessage: (text: string) => void;

  // Super Admin state
  allUsers: User[];
  otaFirmwareList: OTAFirmware[];
  triggerOTAUpdate: (version: string) => void;
  supportTickets: SupportTicket[];

  // Demo state
  isLostPetMode: boolean;
  toggleLostPetMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'sps_current_user',
  PETS: 'sps_pets',
  ACTIVE_PET: 'sps_active_pet',
  TELEMETRY: 'sps_telemetry',
  COLLARS: 'sps_collars',
  SAFE_ZONES: 'sps_safe_zones',
  ALERTS: 'sps_alerts',
  REWARDS: 'sps_rewards',
  REDEMPTIONS: 'sps_redemptions',
  AI_CHAT: 'sps_ai_chat',
  USERS_LIST: 'sps_users_list',
  TICKETS: 'sps_tickets',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with null so Auth screen is shown first unless session saved
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(INITIAL_USERS);
  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [activePetId, setActivePetId] = useState<string>('pet-01');
  const [telemetry, setTelemetry] = useState<Record<string, VitalTelemetry>>(INITIAL_TELEMETRY);
  const [collars, setCollars] = useState<Record<string, CollarDevice>>(INITIAL_COLLARS);
  const [safeZones, setSafeZones] = useState<SafeZone[]>(INITIAL_SAFE_ZONES);
  const [alerts, setAlerts] = useState<AlertNotification[]>(INITIAL_ALERTS);
  const [rewards] = useState<RewardItem[]>(INITIAL_REWARDS);
  const [redemptions, setRedemptions] = useState<RewardRedemption[]>([]);
  const [aiChatMessages, setAiChatMessages] = useState<AiChatMessage[]>(INITIAL_AI_CHAT);
  const [otaFirmwareList] = useState<OTAFirmware[]>(INITIAL_OTA_FIRMWARE);
  const [supportTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [isLostPetMode, setIsLostPetMode] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      // Use sessionStorage for user login session so opening domain URL always lands on Auth screen
      const savedUser = sessionStorage.getItem(STORAGE_KEYS.USER);
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
      // Clean up legacy localStorage user if present
      localStorage.removeItem(STORAGE_KEYS.USER);

      const savedPets = localStorage.getItem(STORAGE_KEYS.PETS);
      if (savedPets) setPets(JSON.parse(savedPets));

      const savedActivePet = localStorage.getItem(STORAGE_KEYS.ACTIVE_PET);
      if (savedActivePet) setActivePetId(savedActivePet);

      const savedTelemetry = localStorage.getItem(STORAGE_KEYS.TELEMETRY);
      if (savedTelemetry) setTelemetry(JSON.parse(savedTelemetry));

      const savedCollars = localStorage.getItem(STORAGE_KEYS.COLLARS);
      if (savedCollars) setCollars(JSON.parse(savedCollars));

      const savedSafeZones = localStorage.getItem(STORAGE_KEYS.SAFE_ZONES);
      if (savedSafeZones) setSafeZones(JSON.parse(savedSafeZones));

      const savedAlerts = localStorage.getItem(STORAGE_KEYS.ALERTS);
      if (savedAlerts) setAlerts(JSON.parse(savedAlerts));

      const savedRedemptions = localStorage.getItem(STORAGE_KEYS.REDEMPTIONS);
      if (savedRedemptions) setRedemptions(JSON.parse(savedRedemptions));

      const savedAiChat = localStorage.getItem(STORAGE_KEYS.AI_CHAT);
      if (savedAiChat) setAiChatMessages(JSON.parse(savedAiChat));
    } catch (err) {
      console.warn('LocalStorage load error, fallback to initial state', err);
    } finally {
      setIsMounted(true);
    }
  }, []);

  // Sync state changes to LocalStorage
  useEffect(() => {
    try {
      if (currentUser) {
        sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } else {
        sessionStorage.removeItem(STORAGE_KEYS.USER);
      }
      localStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(pets));
      localStorage.setItem(STORAGE_KEYS.ACTIVE_PET, activePetId);
      localStorage.setItem(STORAGE_KEYS.TELEMETRY, JSON.stringify(telemetry));
      localStorage.setItem(STORAGE_KEYS.COLLARS, JSON.stringify(collars));
      localStorage.setItem(STORAGE_KEYS.SAFE_ZONES, JSON.stringify(safeZones));
      localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
      localStorage.setItem(STORAGE_KEYS.REDEMPTIONS, JSON.stringify(redemptions));
      localStorage.setItem(STORAGE_KEYS.AI_CHAT, JSON.stringify(aiChatMessages));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [currentUser, pets, activePetId, telemetry, collars, safeZones, alerts, redemptions, aiChatMessages]);

  // Real-time sensor tick simulation (Heart rate subtle fluctuation, solar energy charging gain, step count increment)
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((petId) => {
          const item = next[petId];
          if (item) {
            // Heart rate fluctuates slightly around baseline
            const hrDelta = (Math.random() - 0.5) * 2;
            const newHr = Math.max(60, Math.min(140, Math.round(item.heartRateBpm + hrDelta)));
            // Small step increments
            const stepDelta = Math.floor(Math.random() * 3);
            next[petId] = {
              ...item,
              heartRateBpm: newHr,
              stepsToday: item.stepsToday + stepDelta,
              caloriesBurned: item.caloriesBurned + stepDelta * 0.05,
              distanceKm: Number((item.distanceKm + stepDelta * 0.0008).toFixed(2)),
              lastSyncTimestamp: 'Just now',
            };
          }
        });
        return next;
      });

      // Solar Battery recharge tick
      setCollars((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((petId) => {
          const device = next[petId];
          if (device && device.isSolarCharging && device.batteryPercentage < 100) {
            // Recharge slowly
            const newBattery = Math.min(100, device.batteryPercentage + 0.1);
            next[petId] = {
              ...device,
              batteryPercentage: Number(newBattery.toFixed(1)),
            };
          }
        });
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail === 'ekaa@superadminpaw.com' && pass === 'ekaa.not.so.smart') {
      const admin = INITIAL_USERS[0];
      setCurrentUser(admin);
      sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(admin));
      return true;
    }
    if (cleanEmail === 'petowner@admin.com' && pass === 'petowner.so.smart') {
      const owner = INITIAL_USERS[1];
      setCurrentUser(owner);
      sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(owner));
      return true;
    }
    // Generic fallback login for demo purposes
    if (email && pass) {
      const fallbackUser: User = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0],
        role: 'PET_OWNER',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        joinedDate: new Date().toISOString().split('T')[0],
      };
      setCurrentUser(fallbackUser);
      sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(fallbackUser));
      return true;
    }
    return false;
  };

  const createAccount = (name: string, email: string, pass: string, role: Role = 'PET_OWNER'): boolean => {
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail || !pass) return false;
    const existing = allUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      // User already exists, log them in
      setCurrentUser(existing);
      sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(existing));
      return true;
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: cleanEmail,
      name: name.trim() || cleanEmail.split('@')[0],
      role,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setAllUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  const switchUserRole = (role: Role) => {
    if (role === 'SUPER_ADMIN') {
      setCurrentUser(INITIAL_USERS[0]);
    } else {
      setCurrentUser(INITIAL_USERS[1]);
    }
  };

  const activePet = pets.find((p) => p.id === activePetId) || pets[0];
  const activeTelemetry = telemetry[activePetId] || telemetry['pet-01'];
  const activeCollar = collars[activePetId] || collars['pet-01'];

  const addPet = (petData: Omit<Pet, 'id' | 'ownerId' | 'pawPoints' | 'badges'>) => {
    const newId = `pet-${Date.now()}`;
    const newCollarId = `collar-${Date.now()}`;
    const newPet: Pet = {
      ...petData,
      id: newId,
      ownerId: currentUser?.id || 'user-owner-01',
      collarId: newCollarId,
      pawPoints: 500, // Welcome bonus
      badges: ['Solar Pioneer ☀️'],
    };

    const newCollar: CollarDevice = {
      id: newCollarId,
      serialNumber: `SPS-COLLAR-${Math.floor(1000 + Math.random() * 9000)}-NEW`,
      petId: newId,
      batteryPercentage: 95,
      isSolarCharging: true,
      solarGainWatts: 4.0,
      firmwareVersion: 'v2.4.1-solar-boost',
      hardwareModel: 'SolarPaw Smart Collar',
      status: 'CHARGING_SOLAR',
      latitude: 40.784,
      longitude: -73.967,
      lastGpsUpdate: 'Just now',
    };

    const newTelem: VitalTelemetry = {
      heartRateBpm: 80,
      bodyTempCelsius: 38.5,
      airQualityAqi: 40,
      ambientNoiseDb: 40,
      stepsToday: 120,
      caloriesBurned: 15,
      distanceKm: 0.1,
      stressScore: 10,
      sleepHours: 8.0,
      lastSyncTimestamp: 'Just now',
    };

    setPets((prev) => [...prev, newPet]);
    setCollars((prev) => ({ ...prev, [newId]: newCollar }));
    setTelemetry((prev) => ({ ...prev, [newId]: newTelem }));
    setActivePetId(newId);
  };

  const updatePet = (id: string, petData: Partial<Pet>) => {
    setPets((prev) => prev.map((p) => (p.id === id ? { ...p, ...petData } : p)));
  };

  const toggleSolarCharging = (petId: string) => {
    setCollars((prev) => {
      const device = prev[petId];
      if (!device) return prev;
      return {
        ...prev,
        [petId]: {
          ...device,
          isSolarCharging: !device.isSolarCharging,
          solarGainWatts: !device.isSolarCharging ? 4.2 : 0.0,
          status: !device.isSolarCharging ? 'CHARGING_SOLAR' : 'ONLINE',
        },
      };
    });
  };

  const triggerManualGpsSync = () => {
    setCollars((prev) => {
      const device = prev[activePetId];
      if (!device) return prev;
      return {
        ...prev,
        [activePetId]: {
          ...device,
          lastGpsUpdate: 'High-Precision GPS Refreshed Just Now',
          latitude: device.latitude + (Math.random() - 0.5) * 0.0005,
          longitude: device.longitude + (Math.random() - 0.5) * 0.0005,
        },
      };
    });
  };

  const addSafeZone = (zoneData: Omit<SafeZone, 'id'>) => {
    const newZone: SafeZone = {
      ...zoneData,
      id: `sz-${Date.now()}`,
    };
    setSafeZones((prev) => [...prev, newZone]);
  };

  const toggleSafeZone = (id: string) => {
    setSafeZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, isActive: !z.isActive } : z))
    );
  };

  const markAlertRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
  };

  const clearAllAlerts = () => {
    setAlerts([]);
  };

  const redeemReward = (reward: RewardItem): boolean => {
    if (!activePet) return false;
    if (activePet.pawPoints < reward.pointsCost) return false;

    // Deduct points from active pet
    const updatedPoints = activePet.pawPoints - reward.pointsCost;
    updatePet(activePet.id, { pawPoints: updatedPoints });

    const newRedemption: RewardRedemption = {
      id: `red-${Date.now()}`,
      rewardId: reward.id,
      rewardTitle: reward.title,
      pointsSpent: reward.pointsCost,
      redeemedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      code: `SOLAR-PAW-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setRedemptions((prev) => [newRedemption, ...prev]);
    return true;
  };

  const sendAiMessage = (text: string) => {
    const userMsg: AiChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'USER',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAiChatMessages((prev) => [...prev, userMsg]);

    // AI Intelligence Response Logic
    setTimeout(() => {
      let replyText = `I have logged your question regarding ${activePet?.name || 'your pet'}. Based on live collar telemetry, all vital indicators remain within optimal range.`;
      const lower = text.toLowerCase();

      if (lower.includes('battery') || lower.includes('solar') || lower.includes('charge')) {
        replyText = `Apollo's collar is currently harvesting ${activeCollar?.solarGainWatts || 4.2}W of direct solar power. Battery is at ${activeCollar?.batteryPercentage || 88}%. Extended battery duration estimated: 18 days without wall charging.`;
      } else if (lower.includes('heart') || lower.includes('health') || lower.includes('bpm')) {
        replyText = `${activePet?.name}'s current heart rate is ${activeTelemetry?.heartRateBpm || 74} BPM (Optimal resting baseline for a ${activePet?.breed}). Respiratory and stress indices are low (Score: ${activeTelemetry?.stressScore || 14}/100).`;
      } else if (lower.includes('air') || lower.includes('aqi') || lower.includes('pollution')) {
        replyText = `Current ambient Air Quality Index (AQI) around the collar is ${activeTelemetry?.airQualityAqi || 42} (Good quality). Low allergen and particulate density detected.`;
      } else if (lower.includes('walk') || lower.includes('exercise') || lower.includes('steps')) {
        replyText = `${activePet?.name} has completed ${activeTelemetry?.stepsToday || 8420} steps today (${activeTelemetry?.distanceKm || 5.6} km). You are ${Math.max(0, (activePet?.activityGoalSteps || 10000) - (activeTelemetry?.stepsToday || 8420))} steps away from earning your daily +150 Paw Points bonus!`;
      }

      const aiReply: AiChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'AI',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendations: [
          'View detailed vital graphs',
          'Check collar solar harvest rate',
          'Export Vet Summary Card',
        ],
      };
      setAiChatMessages((prev) => [...prev, aiReply]);
    }, 1000);
  };

  const triggerOTAUpdate = (version: string) => {
    setCollars((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((petId) => {
        if (next[petId]) {
          next[petId] = {
            ...next[petId],
            firmwareVersion: version,
            lastGpsUpdate: `Firmware updated to ${version} (Success)`,
          };
        }
      });
      return next;
    });
  };

  const toggleLostPetMode = () => {
    setIsLostPetMode((prev) => !prev);
    if (!isLostPetMode) {
      // Add emergency notification
      const newAlert: AlertNotification = {
        id: `alt-emergency-${Date.now()}`,
        petId: activePetId,
        title: '🚨 LOST PET EMERGENCY MODE ACTIVATED',
        message: `High-frequency GPS beacon broadcast enabled for ${activePet?.name}. Solar battery output prioritized for live 5-second tracking.`,
        type: 'SAFE_ZONE',
        severity: 'CRITICAL',
        timestamp: 'Just now',
        isRead: false,
      };
      setAlerts((prev) => [newAlert, ...prev]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        createAccount,
        logout,
        switchUserRole,
        pets,
        activePetId,
        setActivePetId,
        activePet,
        addPet,
        updatePet,
        telemetry,
        activeTelemetry,
        collars,
        activeCollar,
        toggleSolarCharging,
        triggerManualGpsSync,
        safeZones,
        addSafeZone,
        toggleSafeZone,
        alerts,
        markAlertRead,
        clearAllAlerts,
        rewards,
        redemptions,
        redeemReward,
        aiChatMessages,
        sendAiMessage,
        allUsers,
        otaFirmwareList,
        triggerOTAUpdate,
        supportTickets,
        isLostPetMode,
        toggleLostPetMode,
      }}
    >
      {isMounted ? children : null}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
