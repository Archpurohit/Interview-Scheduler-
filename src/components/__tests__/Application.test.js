import React from 'react';
import { render, getAllByTestId, queryByText, fireEvent, prettyDOM, cleanup, waitForElement,getByAltText, getByPlaceholderText } from '@testing-library/react';
import axios from "../../__mocks__/axios.js";
import Application from "components/Application";
import DayListItem from '../DayListItem';




afterEach(cleanup);
it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  const { container, queryByText, getByText } = render(<Application />);
  await waitForElement(() => getByText("Archie Cohen"));

  // const appointments = container.querySelectorAll(".appointment");

  const appointments = getAllByTestId(container, "appointment");
  const appointment = getAllByTestId(container, "appointment")[0];

  fireEvent.click(getByAltText(appointment, "Add"));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText("Save"));

  expect(getByText("Saving")).toBeInTheDocument();

  await waitForElement(() => getByText("Lydia Miller-Jones"));


  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));


  });
});


