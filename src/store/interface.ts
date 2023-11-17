
enum ServiceType {
  SoundProduction,
  SpeechTherapyMassage,
  StutteringTreatment,
  SpeechInitiation,
}

interface SpecialistInterface {
  id: number;
  name: string;
  servicesProvided: ServiceType[];
  // Other properties...
}

interface OfficeInterface {
  id: number;
  name: string;

  // Other properties...
}


export interface EmployeeInterface {
  id: number;
  status: string;
  position:string;
  profession?:string;
  first_name:string;
  last_name:string;
  contact_email?:string;
  contact_telephone?:string;
  telegram_id?:string;
  online?:boolean;
  offline?:boolean;
}

export interface EmployeesListInterface {
  employeesList: EmployeeInterface[];
}


export interface StudentInterface {
  id: number;
  first_name: string;
  last_name:string;
  parentsName?:string;
  age:number;
  status:string;
  session_transfer_rate?:number;
  percentage_of_absences?:number;
  contact_email?:string;
  contact_telephone?:string;
  allow_telegram_notification?:boolean;
  telegram_id?:number;
  issue?:string;
  date_of_initial_diagnosis?:string;
  address?:string;
  found_us_through?:string;
  online?: boolean;
  notes?:string;
}

export interface StudentListInterface {
  studentsList: StudentInterface[];
}


export interface SessionInterface {
  id: number;
  startDateTime: string;
  duration: number; // in minute
  week_first_day: string;
  student_id: number; // ID of the Student
  specialist_id: number; // ID of the Specialist
  office_id: number; // ID of the Office
  serviceType: ServiceType;
  performed: boolean;
  paid: boolean;
  online: boolean;
  confirmed: boolean;
  repeatable: boolean;
  notes: string;
  status: string; // Could be an enum if there's a fixed set of statuses
}

export interface SessionListInterface {
  sessionsList: SessionInterface[]
}


export interface SessionsListInterface extends Array<SessionInterface> {}



