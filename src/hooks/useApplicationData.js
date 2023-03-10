import axios from "axios";
import { useState, useEffect } from "react";


export default function useApplicationData(initial) {

useEffect(() => {
  Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers"),
  ]).then((all) => {
    console.log(all);
    setState((prev) => ({
      ...prev,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data,
    }));
  });
}, []);

function bookInterview(id, interview) {
  // send PUT request to update appointment with interview data
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview },
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment,
  };
  return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
    setState({
      ...state,
      appointments,
    });
  });
}

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null,
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment,
  };
  return axios.delete(`/api/appointments/${id}`).then(() => {
    setState(...state, appointments);
  });
}


const setDay = (day) => setState({ ...state, day });

const [state, setState] = useState({
  day: "Monday",
  days: [],
  // you may put the line below, but will have to remove/comment hardcoded appointments variable
  appointments: {},
});

return {setDay, cancelInterview, bookInterview, state};

}