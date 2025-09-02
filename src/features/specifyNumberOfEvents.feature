Feature: Specify number of events

    Scenario: When user hasn't specified a number 32 events are shown by default
        Given the user has opened the app
        When the user views the list of events
        Then the app should display 32 events

    Scenario: : User can change the number of events displayed
        Given the user has opened the app
        When the user specifies a number of events to display
        Then the app should display the specified number of events