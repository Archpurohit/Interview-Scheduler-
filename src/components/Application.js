import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import { useState, useEffect } from "react";
import { Appointment } from "./Appointment/index.js";
import axios from 'axios';
import { getAppointmentsForDay,getInterviewersForDay } from "../helpers/selectors";
import {getInterview} from '../helpers/selectors';
import useVisualMode from "hooks/useVisualMode";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);


    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview={bookInterview}
        interviewers = {interviewers}
      />
    );
  });



  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      console.log(all)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  function bookInterview(id, interview, transition) {
    // send PUT request to update appointment with interview data
    axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState((prev) => {
          const appointment = {
            ...prev.appointments[id],
            interview: { ...interview }
          };
          const appointments = {
            ...prev.appointments,
            [id]: appointment
          };
          return {
            ...prev,
            appointments
          }
        });
        transition("SHOW");
      })
      .catch((error) => console.log(error));
  }


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
        <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {schedule }
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}