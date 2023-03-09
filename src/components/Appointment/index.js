import React from "react";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";



const Appointment = (props) => {
 const  { time, interview, interviewers, bookInterview, id, cancelInterview } = props
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const ERROR_SAVE = "ERROR_SAVE"
  const DELETING = "DELETING";
  const ERROR_DELETE = "ERROR_DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"

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

const deleteAppointment = () => {
  transition(DELETING, true);
  Promise.resolve(props.cancelInterview(props.id))
    .then(() => transition(EMPTY))
    .catch(err => {
      transition(ERROR_DELETE, true)
      console.log(err)
    });
};


  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && (
        <Show
          student={interview?.student}
          interviewer={interview?.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onConfirm={deleteAppointment}
          onCancel = {back}
        />
      )}
       {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
       {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={interviewers}
          onCancel = {back}
          onSave = {save}
        />
       )};
    </article>
  );
      }


export { Appointment };
