import React from 'react';
import { render, within, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {
  let container;

  test('renders list of events', async () => {
    await act(async () => {
      ({ container } = render(<App />));
    });

    await waitFor(() => {
      expect(container.querySelector('#event-list')).toBeInTheDocument();
    });
  });

  test('render CitySearch', async () => {
    await act(async () => {
      ({ container } = render(<App />));
    });

    await waitFor(() => {
      expect(container.querySelector('#city-search')).toBeInTheDocument();
    });
  });

  test('renders NumberOfEvents component', async () => {
    await act(async () => {
      ({ container } = render(<App />));
    });

    await waitFor(() => {
      expect(container.querySelector('#number-of-events')).toBeInTheDocument();
    });
  });
});

describe('<App /> integration', () => {
    test('renders a list of events after a user selects a city', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

        await user.type(CitySearchInput, 'Berlin');
        const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);

        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEvents = within(EventListDOM).queryAllByRole('listitem');

        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
            event => event.location === 'Berlin, Germany'
        );

        allRenderedEvents.forEach(event => {
            expect(event.textContent).toContain('Berlin, Germany');
        });
    });
})