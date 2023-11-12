import React from 'react';
import './App.css';
import {  MonthlyCalendar} from "./Components/Calendar/Monthly/Calendar" ;
import {WeeklyCalendar} from "./Components/Calendar/Weekly/WeeklyCalendar";
import { Outlet, Link } from "react-router-dom";


interface Params {
  get: (name: string) => string | null;
}

interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    allows_write_to_pm: boolean;
}
interface AppProps {
    user: User;
}

function App({ user }: AppProps) {

    const [view, setView] = React.useState<'monthly' | 'weekly'>('weekly');
    const [selectedDay, setSelectedDay] = React.useState<Date | null>(null);
    const [meetings, setMeetings] = React.useState<{[key: string]: {specialist: string, time: string}}>({});

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    // ... your handleRegister code
    };


    return (
      <div className="app">
           <Link to={`/user`}>Your Friend</Link>
        <button onClick={() => setView('monthly')}>Monthly view</button>
        <button onClick={() => setView('weekly')}>Weekly view</button>
        {view === 'monthly' ? (
          <MonthlyCalendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} meetings={meetings} handleRegister={handleRegister} />
        ) : (
          <WeeklyCalendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} meetings={meetings} handleRegister={handleRegister} />
        )}

          <div>
          {/*<textarea readOnly value={Object.entries(user).map(([key, value]) => `${key}: ${value}`).join('\n')} />*/}
          <textarea readOnly value={user.id} />

        </div>
      </div>
    );

}

export default App;



//reference
// query_id=AAEM760hAAAAAAzvrSEARQWe&user=%7B%22id%22%3A565047052%2C%22first_name%22%3A%22Yury%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Yury_Gurian%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1699713413&hash=7b9bd0d6adbf4ddb2101728938a63f2a49fac26382dd2fd6b8c1bee5f5561877
// const params = new URLSearchParams('query_id=AAEM760hAAAAAAzvrSEARQWe&user=%7B%22id%22%3A565047052%2C%22first_name%22%3A%22Yury%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Yury_Gurian%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1699713413&hash=7b9bd0d6adbf4ddb2101728938a63f2a49fac26382dd2fd6b8c1bee5f5561877');
// console.log(queryId); // AAEM760hAAAAAAzvrSEARQWe
// console.log(user); // {id: 565047052, first_name: "Yury", last_name: "", username: "Yury_Gurian", language_code: "en", allows_write_to_pm: true}
// console.log(authDate); // 1699713413
// console.log(hash); // 7b9bd0d6adbf4ddb2101728938a63f2a49fac26382dd2fd6b8c1bee5f5561877
//