import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from 'axios';




const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
    },
  ],
  appointments: {}
  // appointments: {
  //   1: { id: 1, time: "12pm", interview: null },
  //   2: { id: 2, time: "1pm", interview: null },
  //   3: {
  //     id: 3,
  //     time: "2pm",
  //     interview: { student: "Archie Cohen", interviewer: 2 },
  //   },
  //   4: { id: 4, time: "3pm", interview: null },
  //   5: {
  //     id: 5,
  //     time: "4pm",
  //     interview: { student: "Chad Takahashi", interviewer: 2 },
  //   },
  // },
};



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const dailyAppointments = [];

  const setDay = day => setState({ ...state, day });

  const { day, days, appointments } = state;

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
    ]).then((all) => {
      console.log("Days response:", all[0].data);
      console.log("Appointments response:", all[1].data);
      setDays(all[0].data);
      setAppointments(all[1].data);
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {dailyAppointments.map(appointment => (
        <Appointment key={appointment.id} {...appointment} />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

