import { Platform } from 'react-native';

export const BASE_URL = (Platform.OS === 'web') ? '' :
    'http://192.168.1.250:8000';


export const LIST_RUNTIMES = `${BASE_URL}/api/v1/runtimes/`;
export const REFRESH_TOKEN = `${BASE_URL}/api/v1/token/`;
export const GET_SESSION_DATA = `${BASE_URL}/api/v1/sessions/`;
export const RUNTIMES_API = `${BASE_URL}/api/v1/runtimes/`;
export const Widgets = {
    system: `${BASE_URL}/api/v1/widgets/system/`
};