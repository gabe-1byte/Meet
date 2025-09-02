import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, test => {
    test('When user hasn\'t specified a number 32 events are shown by default', ({ given, when, then }) => {
        let AppComponent;
        given('the user has opened the app', () => {
            AppComponent = render(<App />);
        });

        when('the user views the list of events', () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
        });

        then(/^the app should display (\d+) events$/, async (arg0) => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(Number(arg0));
            });
        });
    });

    test(': User can change the number of events displayed', ({ given, when, then }) => {
        let AppComponent;
        given('the user has opened the app', () => {
            AppComponent = render(<App />);
        });

        when('the user specifies a number of events to display', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
            const NumberOfEventsInput = within(NumberOfEventsDOM).getByRole('textbox');
            await user.clear(NumberOfEventsInput);
            await user.type(NumberOfEventsInput, '2');
        });

        then('the app should display the specified number of events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(2);
            });
        });
    });
});