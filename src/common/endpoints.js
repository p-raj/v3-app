import { Platform } from 'react-native';

export const BASE_URL = (Platform.OS === 'web') ? '' :
    'http://192.168.1.250:8000';


export const LIST_RUNTIMES = `${BASE_URL}/api/v1/runtimes/`;
export const LIST_WIDGETS = `${BASE_URL}/api/v1/widgets/`;
export const LIST_PROCESSES = `${BASE_URL}/api/v1/processes/`;


export const LOGIN = `${BASE_URL}/micro-service/user/login/`;
export const REFRESH_TOKEN = `${BASE_URL}/api/v1/token/`;
export const PROCESSES = `${BASE_URL}/api/v1/process-lockers/`;
export const WIDGETS = `${BASE_URL}/api/v1/widget-lockers/`;
export const GET_SESSION_DATA = `${BASE_URL}/api/v1/sessions/`;

export const PROCESS_API = `${BASE_URL}/api/v1/processes/`;
export const WIDGETS_API = `${BASE_URL}/api/v1/widgets/`;
export const RUNTIMES_API = `${BASE_URL}/api/v1/runtimes/`;


//ND's server's APIS as of now (will be a single server in some time)

export const RESOURCES = `${BASE_URL}/micro-service/service-vault/service/`;
export const USER = `${BASE_URL}/micro-service/user/`;


//AM server
export const POLICY = `${BASE_URL}/micro-service/am/policy/`;


export const Processes = {
    system: `${BASE_URL}/api/v1/processes/system/`,
    execute: (process) => `/api/v1/processes/${process.uuid}/execute/`,
    get: (lockerId) => `${BASE_URL}/api/v1/process-lockers/${lockerId}/processes/`
};

export const Widgets = {
    system: `${BASE_URL}/api/v1/widgets/system/`
};

export const Runtimes = {
    get: (id) => `${BASE_URL}/api/v1/runtimes/${id}/`
};