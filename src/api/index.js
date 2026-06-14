// Centralized API configuration for the URL Shortener application
// All API calls should use this configuration to ensure consistency

const API_BASE_URL = 'https://url-shortenerbackend-silk.vercel.app/api/url';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    GENERATE_SHORT_URL: `${API_BASE_URL}/genrateshorturl`,
    GET_RECORDS: (id) => `${API_BASE_URL}/getrecords?id=${id}`,
    REDIRECT: (shortUrl) => `${API_BASE_URL}/${shortUrl}`
  }
};

export default API_CONFIG;
