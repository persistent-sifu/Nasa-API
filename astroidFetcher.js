/**
 * Fetches asteroid data from the NASA API for the next 7 days.
 *
 * @param {string} apiKey - The NASA API key.
 * @returns {Promise<object>} A promise resolving to the asteroid data.
 */
async function fetchAsteroidData(apiKey) {
    try {
        // Get the current date and calculate the date 7 days later
        const today = new Date();
        const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

        // Format the dates as YYYY-MM-DD
        const startDate = today.toISOString().split('T')[0];
        const endDate = sevenDaysLater.toISOString().split('T')[0];

        // Construct the API URL
        const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
        // Fetch the data from the API
        const response = await fetch(apiUrl);

        // Check if the response was successful
        if (response.ok) {
            // Convert the response to JSON
            const data = await response.json();

            // Return the near earth objects
            return data.near_earth_objects;
        } else {
            // Print an error message if the response was not successful
            console.error(`Error: API request failed with status code ${response.status}`);
            return null;
        }
    } catch (error) {
        // Print an error message if an error occurred
        console.error(`Error fetching data: ${error.message}`);
        return null;
    }
}

// Example usage:
const apiKey = 'kpRZ9Y7oXKEGIErNEHYR5BIKmVQo9gRAnSyycEot';
fetchAsteroidData(apiKey).then(data => console.log(data));
