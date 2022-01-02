import React from "react";
import './InterviewerList.scss';
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {
          props.interviewers.map(interviewer => <InterviewerListItem
              id={interviewer.id}
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={props.value === interviewer.id}
              setInterviewer={props.onChange}
            />
          )}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;



