import React from "react";

import {cleanup, render} from "@testing-library/react";
import Appointment from "../Appointment";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment/>);
  });
});