import React from "react";
const { loadFeature, defineFeature } = require("jest-cucumber");
import App from "../App";
import { getEvents } from "../api";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppComponent;
        given('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        when('the user sees the list of events', () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            expect(EventListDOM).toBeDefined();
        });

        then('the event details should be collapsed', () => {
            const EventItems = AppComponent.container.querySelectorAll('.event-item');
            EventItems.forEach(item => {
                const Details = item.querySelector('.event-details');
                expect(Details).toBeDefined();
                expect(Details).not.toBeVisible();
            });
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        let AppComponent;
        given('the user sees a list of events', () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            expect(EventListDOM).toBeDefined();
        });

        let EventItems;
        when(/^the user clicks on an event's "(.*)" button$/, async (arg0) => {
            const user = userEvent.setup();
            const EventItems = AppComponent.container.querySelectorAll('.event-item');
            EventItems.forEach(item => {
                const Button = item.querySelector('.details-btn');
                user.click(Button);
            });
        });

        then('the event details should expand', () => {
            const EventItems = AppComponent.container.querySelectorAll('.event-item');
            EventItems.forEach(item => {
                const Details = item.querySelector('.event-details');
                expect(Details).toBeDefined();
                expect(Details).toBeVisible();
            });
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {        
        let AppComponent;
        given('the user has expanded an event to see its details', () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            const EventItems = AppComponent.container.querySelectorAll('.event-item');
            EventItems.forEach(item => {
                const Button = item.querySelector('.details-btn');
                user.click(Button);
            });
        });                                                                                    
                                                                                               
        when(/^the user clicks on the event's "(.*)" button$/, (arg0) => {                     
            const user = userEvent.setup();
            const EventItems = AppComponent.container.querySelectorAll('.event-item');
            EventItems.forEach(item => {
                const Button = item.querySelector('.details-btn');
                user.click(Button);
            });
        });

        then('the event details should collapse', () => {
            const EventItems = AppComponent.container.querySelectorAll('.event-item');
            EventItems.forEach(item => {
                const Details = item.querySelector('.event-details');
                expect(Details).toBeDefined();
                expect(Details).not.toBeVisible();
            });
        });
    });
});