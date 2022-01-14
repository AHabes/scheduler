import React, {useState} from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer("");
  };

  // reset the student and interviewer states on cancel.
  const cancel = () => {
    reset();
    props.onCancel();
  };

  // validate the form before saving, a student and an interviewer must be selected.
  function validate() {
    if (!student) {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("An interviewer must be selected");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder='Enter Student Name'
            value={student}
            onChange={(e) => {
              setStudent(e.target.value);
            }
            }
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />

      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}
