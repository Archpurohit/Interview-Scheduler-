/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";
import axios from "../../__mocks__/axios.js";
/*
  We import the component that we are testing
*/
import Application from "components/Application";

/*
  A test that renders a React Component
*/
describe("Appointment", ()=> {
  xit("renders without crashing", () => {
    render(<Application />);
  });
  xit("does something it is supposed to do", () => {
    // ...
  });

  // or if using test
  test.skip("does something it is supposed to do", () => {
    // ...
  });

})