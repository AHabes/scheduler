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

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    const res = props.bookInterview(props.id, interview);
    res.then(() => {
      transition(SHOW);
    }).catch(err => {
      transition(ERROR_SAVE, true);
      console.log("Error saving the appointment: ", err);
    })
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function delete_() {
    transition(DELETING, true);
    const res = props.cancelInterview(props.id);
    res.then(() => {
      transition(EMPTY);
    }).catch(err => {
      transition(ERROR_DELETE, true);
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
        onConfirm={delete_}
      />}
      {mode === ERROR_SAVE && <Error
        message={"Error saving the appointment"}
        onClose={() => transition(SHOW)}
      />}
      {mode === ERROR_DELETE && <Error
        message={"Error canceling the appointment"}
        onClose={() => transition(SHOW)}
      />}
    </article>
  );
}