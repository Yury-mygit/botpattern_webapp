

export interface Session {
    id:number;
    student: string;
    specialist: string;
    online: boolean;
    paid: boolean;
    confirmed: boolean;
    session_id: number;
    student_id: number;
    specialist_id: number;
    repeatable: boolean;
    time: string;
}

export interface Sessions {
    [date: string]: Session[];
}