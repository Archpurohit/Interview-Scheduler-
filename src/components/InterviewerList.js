import "components/InterviewerList.scss"
import React from "react"
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)}
    />
    );
  });
 return interviewers

}