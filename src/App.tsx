import React from 'react';
import './App.css';
import {  MonthlyCalendar} from "./Components/Calendar/Calendar" ;
import {WeeklyCalendar} from "./Components/Calendar/WeeklyCalendar";

declare global {
  interface Window {
    Telegram: any;
  }
}

let tg = window.Telegram.WebApp;

// query_id=AAEM760hAAAAAAzvrSEARQWe&user=%7B%22id%22%3A565047052%2C%22first_name%22%3A%22Yury%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Yury_Gurian%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1699713413&hash=7b9bd0d6adbf4ddb2101728938a63f2a49fac26382dd2fd6b8c1bee5f5561877



// const params = new URLSearchParams('query_id=AAEM760hAAAAAAzvrSEARQWe&user=%7B%22id%22%3A565047052%2C%22first_name%22%3A%22Yury%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Yury_Gurian%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1699713413&hash=7b9bd0d6adbf4ddb2101728938a63f2a49fac26382dd2fd6b8c1bee5f5561877');
const params = new URLSearchParams(tg.initData);


const queryId = params.get('query_id');
const user = JSON.parse(decodeURIComponent(params.get('user')!));
const authDate = params.get('auth_date');
const hash = params.get('hash');

// console.log(queryId); // AAEM760hAAAAAAzvrSEARQWe
// console.log(user); // {id: 565047052, first_name: "Yury", last_name: "", username: "Yury_Gurian", language_code: "en", allows_write_to_pm: true}
// console.log(authDate); // 1699713413
// console.log(hash); // 7b9bd0d6adbf4ddb2101728938a63f2a49fac26382dd2fd6b8c1bee5f5561877
//


let count = Object.keys(user).length;

console.log(tg.initDataUnsafe)
function App() {



  const [view, setView] = React.useState<'monthly' | 'weekly'>('monthly');
  const [selectedDay, setSelectedDay] = React.useState<Date | null>(null);
  const [meetings, setMeetings] = React.useState<{[key: string]: {specialist: string, time: string}}>({});

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    // ... your handleRegister code
  };


return (
  <div className="app">
    <button onClick={() => setView('monthly')}>Monthly view</button>
    <button onClick={() => setView('weekly')}>Weekly view</button>
    {view === 'monthly' ? (
      <MonthlyCalendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} meetings={meetings} handleRegister={handleRegister} />
    ) : (
      <WeeklyCalendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} meetings={meetings} handleRegister={handleRegister} />
    )}

      <div>
      <textarea readOnly value={Object.entries(user).map(([key, value]) => `${key}: ${value}`).join('\n')} />

    </div>
  </div>
);

}

export default App;
