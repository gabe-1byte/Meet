Feature: Show/Hide Event Details

    Scenario: An event element is collapsed by default
        Given the user opens the app
        When the user sees the list of events
        Then the event details should be collapsed

    Scenario: User can expand an event to see its details
        Given the user sees a list of events
        When the user clicks on an event's "Show Details" button
        Then the event details should expand

    Scenario: User can collapse an event to hide its details
        Given the user has expanded an event to see its details
        When the user clicks on the event's "Hide Details" button
        Then the event details should collapse