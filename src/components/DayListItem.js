import React from "react";
import './DayListItem.scss';
import classNames from "classnames";

export default function DayListItem(props) {
  const {name, spots, selected, setDay} = props;

  const classes = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  const formatSpots = spots => spots > 0 ? spots > 1 ? `${spots} spots remaining` : `${spots} spot remaining` : "no spots remaining"
  return (
    <li onClick={setDay} className={classes}>
      <h2 className="text--regular">
        {name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}