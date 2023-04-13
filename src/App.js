import React, { useState } from "react";
import "./App.css";

function App() {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reminder = {
      title,
      date,
      time,
    };
    setReminders([...reminders, reminder]);
    setTitle("");
    setDate("");
    setTime("");
    setNotification(reminder);
  };

  const handleDelete = (index) => {
    const newReminders = [...reminders];
    newReminders.splice(index, 1);
    setReminders(newReminders);
  };

  const setNotification = (reminder) => {
    const notificationTime = new Date(
      `${reminder.date} ${reminder.time}`
    ).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = notificationTime - currentTime;

    if (timeDifference > 0) {
      setTimeout(() => {
        const notification = new Notification(`Reminder: ${reminder.title}`);
      }, timeDifference);
    }
  };

  return (
    <div className="App">
      <h1>Reminder App</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={handleTitleChange} />
        <br />
        <label>Date:</label>
        <input type="date" value={date} onChange={handleDateChange} />
        <br />
        <label>Time:</label>
        <input type="time" value={time} onChange={handleTimeChange} />
        <br />
        <button type="submit">Add Reminder</button>
      </form>
      <div className="reminders">
        {reminders.map((reminder, index) => (
          <div key={index} className="reminder">
            <h3>{reminder.title}</h3>
            <p>{reminder.date}</p>
            <p>{reminder.time}</p>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
