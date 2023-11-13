import * as React from "react";

type SessionProps = {
  selectedDay: Date | null;
  meetings: {[key: string]: {specialist: string, time: string}};
  onRegister: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Session: React.FC<SessionProps> = ({selectedDay, meetings, onRegister}) => {
  if (!selectedDay) return null;

  return (
    <>
      <p>Dear customer, you are registering for a session on {selectedDay.toLocaleDateString()}</p>
      <form onSubmit={onRegister}>
        <label>
          Specialist:
          <input type="text" name="specialist" required />
        </label>
        <label>
          Time:
          <input type="time" name="time" required />
        </label>
        <button type="submit">Register</button>
      </form>
      {meetings[selectedDay.toISOString()] && (
        <div>
          <h2>Scheduled meeting:</h2>
          <p>Specialist: {meetings[selectedDay.toISOString()].specialist}</p>
          <p>Time: {meetings[selectedDay.toISOString()].time}</p>
        </div>
      )}
    </>
  );
};
