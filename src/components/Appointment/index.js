import React from "react";
import './styles.scss';
import Header from "./Header";
import Empty from "./Empty";
import {useVisualMode} from "../../hooks/useVisualMode";
import Show from "./show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  // save the appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => {
      transition(ERROR_SAVE, true); // replace the SAVING mode in the history.
      console.log("Error saving the appointment: ", err);
    })
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  // delete the appointment.
  function destroy() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => {
      transition(ERROR_DELETE, true); // replace the DELETING mode in the history.
      console.log("Error deleting the appointment: ", err);
    })
  }

  function edit() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>

      {mode === EMPTY && <Empty
        onAdd={() => transition(CREATE)}
      />}
      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onSave={save}
        onEdit={edit}
        onDelete={confirmDelete}
      />}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />}

      {mode === EDIT && <Form
        interviewers={props.interviewers}
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        onSave={save}
        onCancel={back}
      />}

      {mode === SAVING && <Status
        message={"Saving"}
      />}

      {mode === DELETING && <Status
        message={"Deleting"}
      />}
      {mode === CONFIRM && <Confirm
        onCancel={back}
        onConfirm={destroy}
      />}
      {mode === ERROR_SAVE && <Error
        message={"Error saving the appointment"}
        onClose={back}
      />}
      {mode === ERROR_DELETE && <Error
        message={"Error canceling the appointment"}
        onClose={back}
      />}
    </article>
  );
}