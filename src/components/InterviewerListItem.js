import React from "react";
import './InterviewerListItem.scss';
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const {name, avatar, selected, setInterviewer, id} = props;
  const interviewerClass = classNames('interviewers__item', {'interviewers__item--selected': selected});

  return (
    <li className={interviewerClass} onClick={() => setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected ? name : ""}
    </li>
  );
}




