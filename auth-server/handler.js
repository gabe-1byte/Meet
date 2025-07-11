'use strict';

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
    "https://meet-sigma-livid.vercel.app/"
];

const allowedOrigins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://10.0.0.204:8080",
    "https://meet-sigma-livid.vercel.app"
];

function getCorsHeaders(origin) {
    const isAllowed = allowedOrigins.includes(origin);
    return {
        'Access-Control-Allow-Origin': isAllowed ? origin : '',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': true
    };
}


const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirect_uris[0]
);

module.exports.getAuthURL = async (event) => {
    const origin = event.headers.origin || '';
    const headers = getCorsHeaders(origin);

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ authUrl }),
    };
};

module.exports.getAccessToken = async (event) => {
    const origin = event.headers.origin || '';
    const headers = getCorsHeaders(origin);

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    const code = decodeURIComponent(`${event.pathParameters.code}`);

    return new Promise((resolve, reject) => {
        oAuth2Client.getToken(code, (error, response) => {
            if (error) return reject(error);
            return resolve(response);
        });
    })
    .then((results) => {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(results),
        };
    })
    .catch((error) => {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify(error),
        };
    });
};

module.exports.getCalendarEvents = async (event) => {
    const origin = event.headers.origin || '';
    const headers = getCorsHeaders(origin);

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);

    return new Promise((resolve, reject) => {
        oAuth2Client.setCredentials({ access_token });

        calendar.events.list(
            {
                calendarId: CALENDAR_ID,
                auth: oAuth2Client,
                timeMin: new Date().toISOString(),
                singleEvents: true,
                orderBy: "startTime",
            },
            (error, response) => {
                if (error) return reject(error);
                return resolve(response);
            }
        );
    })
    .then(results => {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ events: results.data.items }),
        };
    })
        .catch(error => {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify(error),
            };
        });
    };