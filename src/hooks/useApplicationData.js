import { useState, useEffect } from "react";
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const updateSpots = (day, days, appointments) => {
    const dayObj = days.find((d) => d.name === day);

    const spots = dayObj.appointments.filter((id) => !appointments[id].interview).length;

    const newDay = { ...dayObj, spots };
    const newDays = days.map((d) => (d.name === day ? newDay : d));

    return newDays;
  };

  const bookInterview = (id, interview) => {
    // send PUT request to update appointment with interview data
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(state.day, state.days, appointments);

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prev) => ({
        ...prev,
        appointments,
        days,
      }));
    });
  };

  const cancelInterview = (id) => {
    // send DELETE request to delete interview data from appointment
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(state.day, state.days, appointments);

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState((prev) => ({
        ...prev,
        appointments,
        days,
      }));
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
