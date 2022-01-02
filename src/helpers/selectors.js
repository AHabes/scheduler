export function getAppointmentsForDay(state, day) {
  let appointments = [];
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.appointments.forEach(appointment => {
        appointments.push(state.appointments[appointment]);
      })
    }
  })
  return appointments
}


export function getInterviewersForDay(state, day) {
  let interviewers = [];
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.interviewers.forEach(interviewer => {
        interviewers.push(state.interviewers[interviewer]);
      })
    }
  })
  return interviewers
}


export function getInterview(state, interview) {
  if (interview === null)
    return null;
  Object.keys(state.interviewers).forEach(key => {
    if (state.interviewers[key].id === interview.interviewer) {
      interview.interviewer = state.interviewers[key];
    }
  })
  return interview;

}