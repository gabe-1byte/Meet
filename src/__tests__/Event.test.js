import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";
import mockData from "../mock-data";

describe("<Event /> component", () => {
  let getByText, queryByText;
  const event = mockData[0];

  beforeEach(() => {
    ({ getByText, queryByText } = render(<Event event={event} />));
  });

  test("renders event title", () => {
    expect(queryByText(event.summary)).toBeInTheDocument();
  });

  test("renders event start time", () => {
    expect(
      queryByText(`Start time: ${event.created}`)
    ).toBeInTheDocument();
  });

  test("renders event location", () => {
    expect(
      queryByText(`Location: ${event.location}`)
    ).toBeInTheDocument();
  });

  test("event details should be hidden by default", () => {
    // Use partial match for description
    expect(
      queryByText(new RegExp(event.description.slice(0, 15), "i"))
    ).not.toBeInTheDocument();
  });

  test("shows event details when show details button is clicked", async () => {
    const user = userEvent.setup();
    await user.click(getByText("Show Details"));

    expect(
      queryByText(new RegExp(event.description.slice(0, 15), "i"))
    ).toBeInTheDocument();
  });

  test("hides event details when hide details button is clicked", async () => {
    const user = userEvent.setup();
    await user.click(getByText("Show Details"));
    await user.click(getByText("Hide Details"));

    expect(
      queryByText(new RegExp(event.description.slice(0, 15), "i"))
    ).not.toBeInTheDocument();
  });
});