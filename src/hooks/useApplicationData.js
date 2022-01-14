import {useEffect, useState} from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return new Promise((resolve, reject) => {
      axios.put(`/api/appointments/${id}`, {interview: interview}
      ).then(res => {

        const days = updateSpots(appointments);
        setState({...state, appointments, days});
        resolve(null, res);

      }).catch(err => {
        reject(err, null);
      });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`
      ).then(res => {
        const days = updateSpots(appointments);
        setState({...state, appointments, days});
        resolve(null, res);
      }).catch(err => {
        reject(err, null);
      });
    })
  }

  function updateSpots(appointments) {
    let freeSpots = 0;

    state.days.find(element => element.name === state.day).appointments.forEach(appointment => {
      if (appointments[appointment].interview === null) {
        freeSpots++;
      }
    });
    return state.days.map(element => element.name === state.day ?
      {...element, spots: freeSpots} : element);
  }

  const setDay = day => setState({...state, day});

  useEffect(() => {
    Promise.all(
      [axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers')])
      .then(all => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));

      });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}