import React, { createContext, useContext } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/src/db';
import { Animal, LogEntry, Task, User, SiteLogEntry, Incident, FirstAidLogEntry, DailyRoundEntry, BCSData, AnimalMovement, OrganisationProfile, Contact, HolidayRequest, GlobalDocument, LogType, AnimalCategory, StaffTraining } from '@/types';
import { useAuthStore } from '@/src/store/authStore';
import { DEFAULT_FOOD_OPTIONS, DEFAULT_FEED_METHODS, DEFAULT_EVENT_TYPES } from '@/constants';
import { addAnimal, updateAnimal, deleteAnimal, archiveAnimal } from '@/src/services/animalService';
import { addLogEntry, updateLogEntry, deleteLogEntry } from '@/src/services/logEntryService';
import { addTask, updateTask, deleteTask } from '@/src/services/taskService';
import { updateUsers } from '@/src/services/userService';
import { updateOrgProfile } from '@/src/services/orgProfileService';
import { addStaffTraining, updateStaffTraining, deleteStaffTraining } from '@/src/services/staffTrainingService';
import { addDocument, updateDocument, deleteDocument } from '@/src/services/documentService';
import { addContact, updateContact, deleteContact } from '@/src/services/contactService';
import { addHolidayRequest, updateHolidayRequest, deleteHolidayRequest } from '@/src/services/holidayRequestService';
import { addIncident, updateIncident, deleteIncident } from '@/src/services/incidentService';
import { addFirstAidLog, updateFirstAidLog, deleteFirstAidLog } from '@/src/services/firstAidLogService';
import { addSiteLog, updateSiteLog, deleteSiteLog } from '@/src/services/siteLogService';
import { addDailyRound, updateDailyRound, deleteDailyRound } from '@/src/services/dailyRoundService';
import { addBCSData, updateBCSData, deleteBCSData } from '@/src/services/bcsDataService';
import { addAnimalMovement, updateAnimalMovement, deleteAnimalMovement } from '@/src/services/animalMovementService';

export const useAppDataValues = () => {
  const { user: authUser, profile: authProfile } = useAuthStore();

  // Reactive data feeds from Dexie
  const animals = useLiveQuery(() => db.animals.toArray(), []) || [];
  const log_entries = useLiveQuery(() => db.log_entries.toArray(), []) || [];
  const tasks = useLiveQuery(() => db.tasks.toArray(), []) || [];
  const users = useLiveQuery(() => db.users.toArray(), []) || [];
  const site_log_entries = useLiveQuery(() => db.site_log_entries.toArray(), []) || [];
  const incidents = useLiveQuery(() => db.incidents.toArray(), []) || [];
  const first_aid_log_entries = useLiveQuery(() => db.first_aid_log_entries.toArray(), []) || [];
  const daily_round_entries = useLiveQuery(() => db.daily_round_entries.toArray(), []) || [];
  const bcs_data = useLiveQuery(() => db.bcs_data.toArray(), []) || [];
  const animal_movements = useLiveQuery(() => db.animal_movements.toArray(), []) || [];
  const staff_training = useLiveQuery(() => db.staff_training.toArray(), []) || [];
  const orgProfile = useLiveQuery(async () => {
    const profiles = await db.organisation_profiles.toArray();
    return profiles[0];
  }, []) || undefined;
  const contacts = useLiveQuery(() => db.contacts.toArray(), []) || [];
  const holidayRequests = useLiveQuery(() => db.holiday_requests.toArray(), []) || [];
  const documents = useLiveQuery(() => db.documents.toArray(), []) || [];

  // Find the current user's profile from the users table
  const currentUser = React.useMemo(() => {
    if (!authProfile) return null;
    return users.find(u => u.id === authProfile.id) || authProfile;
  }, [authProfile, users]);

  const [sortOption, setSortOption] = React.useState<'alpha-asc' | 'alpha-desc' | 'custom'>('alpha-asc');

  return {
    currentUser,
    animals,
    log_entries,
    tasks,
    users,
    site_log_entries,
    siteLogs: site_log_entries, // Alias for backward compatibility
    incidents,
    first_aid_log_entries,
    daily_round_entries,
    bcs_data,
    animal_movements,
    staff_training,
    orgProfile,
    contacts,
    holidayRequests,
    documents,
    sortOption,
    setSortOption,
    foodOptions: DEFAULT_FOOD_OPTIONS,
    feedMethods: DEFAULT_FEED_METHODS,
    eventTypes: DEFAULT_EVENT_TYPES,
    // Mutations
    addAnimal,
    updateAnimal,
    deleteAnimal,
    archiveAnimal,
    addLogEntry,
    updateLogEntry,
    deleteLogEntry,
    addTask,
    updateTask,
    deleteTask,
    updateUsers,
    updateOrgProfile,
    addStaffTraining,
    updateStaffTraining,
    deleteStaffTraining,
    addDocument,
    updateDocument,
    deleteDocument,
    addContact,
    updateContact,
    deleteContact,
    addHolidayRequest,
    updateHolidayRequest,
    deleteHolidayRequest,
    addIncident,
    updateIncident,
    deleteIncident,
    addFirstAidLog,
    updateFirstAidLog,
    deleteFirstAidLog,
    addSiteLog,
    updateSiteLog,
    deleteSiteLog,
    addDailyRound,
    updateDailyRound,
    deleteDailyRound,
    addBCSData,
    updateBCSData,
    deleteBCSData,
    addAnimalMovement,
    updateAnimalMovement,
    deleteAnimalMovement,
  };
};

// Define the shape of the context data
export interface AppContextType {
  currentUser: any;
  animals: Animal[];
  log_entries: LogEntry[];
  tasks: Task[];
  users: User[];
  site_log_entries: SiteLogEntry[];
  siteLogs: SiteLogEntry[];
  incidents: Incident[];
  first_aid_log_entries: FirstAidLogEntry[];
  daily_round_entries: DailyRoundEntry[];
  bcs_data: BCSData[];
  animal_movements: AnimalMovement[];
  staff_training: StaffTraining[];
  orgProfile: OrganisationProfile | undefined;
  contacts: Contact[];
  holidayRequests: HolidayRequest[];
  documents: GlobalDocument[];
  sortOption: 'alpha-asc' | 'alpha-desc' | 'custom';
  setSortOption: (option: 'alpha-asc' | 'alpha-desc' | 'custom') => void;
  foodOptions: typeof DEFAULT_FOOD_OPTIONS;
  feedMethods: typeof DEFAULT_FEED_METHODS;
  eventTypes: string[];
  // Mutations
  addAnimal: typeof addAnimal;
  updateAnimal: typeof updateAnimal;
  deleteAnimal: typeof deleteAnimal;
  archiveAnimal: typeof archiveAnimal;
  addLogEntry: typeof addLogEntry;
  updateLogEntry: typeof updateLogEntry;
  deleteLogEntry: typeof deleteLogEntry;
  addTask: typeof addTask;
  updateTask: typeof updateTask;
  deleteTask: typeof deleteTask;
  updateUsers: typeof updateUsers;
  updateOrgProfile: typeof updateOrgProfile;
  addStaffTraining: typeof addStaffTraining;
  updateStaffTraining: typeof updateStaffTraining;
  deleteStaffTraining: typeof deleteStaffTraining;
  addDocument: typeof addDocument;
  updateDocument: typeof updateDocument;
  deleteDocument: typeof deleteDocument;
  addContact: typeof addContact;
  updateContact: typeof updateContact;
  deleteContact: typeof deleteContact;
  addHolidayRequest: typeof addHolidayRequest;
  updateHolidayRequest: typeof updateHolidayRequest;
  deleteHolidayRequest: typeof deleteHolidayRequest;
  addIncident: typeof addIncident;
  updateIncident: typeof updateIncident;
  deleteIncident: typeof deleteIncident;
  addFirstAidLog: typeof addFirstAidLog;
  updateFirstAidLog: typeof updateFirstAidLog;
  deleteFirstAidLog: typeof deleteFirstAidLog;
  addSiteLog: typeof addSiteLog;
  updateSiteLog: typeof updateSiteLog;
  deleteSiteLog: typeof deleteSiteLog;
  addDailyRound: typeof addDailyRound;
  updateDailyRound: typeof updateDailyRound;
  deleteDailyRound: typeof deleteDailyRound;
  addBCSData: typeof addBCSData;
  updateBCSData: typeof updateBCSData;
  deleteBCSData: typeof deleteBCSData;
  addAnimalMovement: typeof addAnimalMovement;
  updateAnimalMovement: typeof updateAnimalMovement;
  deleteAnimalMovement: typeof deleteAnimalMovement;
}

// Create the context
export const AppContext = createContext<AppContextType | null>(null);

// Create the provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const appData = useAppDataValues();

  return (
    <AppContext.Provider value={appData as AppContextType}>
      {children}
    </AppContext.Provider>
  );
};

// Create the consumer hook
export const useAppData = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppProvider');
  }
  return context;
};
