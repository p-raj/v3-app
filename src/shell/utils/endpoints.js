import { Platform } from 'react-native';
import { ENV_URL } from 'react-native-dotenv'

export const BASE_URL = (Platform.OS === 'web') ? '' : ENV_URL;


export const LIST_RUNTIMES = `${BASE_URL}/api/v1/runtimes/`;
export const REFRESH_TOKEN = `${BASE_URL}/api/v1/token/`;
export const GET_SESSION_DATA = `${BASE_URL}/api/v1/sessions/`;
export const RUNTIMES_API = `${BASE_URL}/api/v1/runtimes/`;
export const SYSTEM_WIDGETS = `${BASE_URL}/api/v1/widgets/system/`;