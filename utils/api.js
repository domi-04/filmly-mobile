import Constants from 'expo-constants';

// get the dynamic IP from Expo
const debuggerHost = Constants.expoConfig?.hostUri;

// extract the IP address and append nodejs backend port
const localIp = debuggerHost ? debuggerHost.split(':')[0] : null;

// define environment configurations
const ENV = {
  development: {
    API_URL: localIp ? `http://${localIp}:5000` : 'http://localhost:5000',
  },
  production: {
    API_URL: 'https://change-this-in-future.com', // change this address when we have a production backend
  },
};

// export the correct URL based on the build type
export const API_URL = __DEV__ ? ENV.development.API_URL : ENV.production.API_URL;