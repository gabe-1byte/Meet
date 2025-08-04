import mockData from "./mock-data";

export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};

const checkToken = async (accessToken) => {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
}

export const getEvents = async () => {
    if (window.location.href.startsWith("http://localhost")) {
        console.log("Using mock data for events");
        return mockData;
    }

    const token = await getAccessToken();
    console.log("Access token:", token);

    if (token) {
        removeQuery();
        const url = `https://ubg9w1be0j.execute-api.us-east-2.amazonaws.com/dev/api/get-events/${token}`;
        console.log("Fetching events from:", url);

        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log("API result:", result);

            if (result && result.events) {
                return result.events;
            } else{
                console.warn("No events found in API response");
                return null;
            }
        } catch (error) {
            console.error("Error fetching events:", error);
            return null;
        }
    }
};

const removeQuery = () => {
    let newurl;
    if (window.history.pushState && window.location.pathname) {
        newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
}

const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
        `https://ubg9w1be0j.execute-api.us-east-2.amazonaws.com/dev/api/token/${encodeCode}`
    );
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);

    return access_token;
};

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem("access_token");
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");
        if (!code) {
                const response = await fetch(
                    "https://ubg9w1be0j.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url"
                );
                const { authUrl } = await response.json();
                return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
};