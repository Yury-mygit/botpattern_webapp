// export interface Session {
//     id:number;
//     date: Date;
//
//     duration: number,   // in minute
//     week_first_day: Date,
//     student_id: number;
//     student_name: string;
//     specialist_id: number;
//     specialist_name: string;
//     office_id: number,
//     office_name: string,
//     performed: boolean,
//     paid: boolean;
//     online: boolean;
//     confirmed: boolean;
//     repeatable: boolean;
//     comments: string;
// }
// export interface Sessions extends Array<Session> {}


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

interface StudentInterface {
  id: number;
  name: string;
  // Other properties...
}

export interface SessionInterface {
  id: number;
  startDateTime: Date;
  duration: number; // in minute
  week_first_day: Date;
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


export interface SessionsListInterface extends Array<SessionInterface> {}



