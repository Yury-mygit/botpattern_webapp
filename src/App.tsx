import React from 'react';
import './App.css';
import { Calendar} from "./Components/Calendar/Calendar";

declare global {
  interface Window {
    Telegram: any;
  }
}

let a = window.Telegram.WebApp

console.log(a.version)

// Generate random events for testing


function App() {
  return (
    <div className="App">
        <div className="border-2 border-amber-950">
            <Calendar/>
        </div>

    </div>
  );
}

export default App;
