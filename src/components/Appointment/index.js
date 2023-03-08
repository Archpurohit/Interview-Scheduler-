import React from "react";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

const Appointment = (props) => {
 const  { time, interview, interviewers, bookInterview, id } = props
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  // const ERROR_SAVE = "ERROR_SAVE"
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
  new Promise((resolve, reject) => {
    props.bookInterview(props.id, interview, resolve, reject);
  }).then(() => {
    transition(SHOW);
  });
}

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && (
        <Show
          student={interview?.student}
          interviewer={interview?.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
         {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
    </article>
  );
      }


export { Appointment };
