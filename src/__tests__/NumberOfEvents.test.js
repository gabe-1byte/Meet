import { render } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

test('NumberOfEvents component contains a textbox', () => {
    const { getByRole } = render(<NumberOfEvents />);
    const textbox = getByRole('textbox');
    expect(textbox).toBeInTheDocument();
});

test('NumberOfEvents component has a default value of 32', () => {
    const { getByRole } = render(<NumberOfEvents />);
    const textbox = getByRole('textbox');
    expect(textbox.value).toBe('32');
});

test('NumberOfEvents component updates value when user types', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<NumberOfEvents />);
    const textbox = getByRole('textbox');
    await user.type(textbox, '{backspace}{backspace}10');
    expect(textbox.value).toBe('10');
});