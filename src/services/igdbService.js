const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

let cachedAccessToken = null;

async function getAccessToken() {
  try {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: process.env.CLIENT_ID, // Fetch from environment variables
        client_secret: process.env.CLIENT_SECRET, // Fetch from environment variables
        grant_type: 'client_credentials'
      }
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.response.data);
    throw error;
  }
}

async function fetchWithAccessToken(url, query, accessToken) {
  try {
    const response = await axios.post(url, query,
    {
      headers: {
        'Accept': 'application/text',
        'Client-ID': process.env.CLIENT_ID, // Fetch from environment variables
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data with token:', error.response.data);
    throw error;
  }
}

async function fetchData(query) {
  if (cachedAccessToken) {
    try {
      return await fetchWithAccessToken('https://api.igdb.com/v4/games', query, cachedAccessToken);
    } catch {
      cachedAccessToken = null;
    }
  }

  const newAccessToken = await getAccessToken();
  cachedAccessToken = newAccessToken;
  return await fetchWithAccessToken('https://api.igdb.com/v4/games', query, newAccessToken);
}

module.exports = { fetchData };
