import Storage from '../../v3-core/utils/storage/index';

export const STORE = 'Veris';
export const KEY = 'redux';

const storage = new Storage(STORE);

const storageMiddleware = (store) => (next) => (action) => {
    next(action);

    if (!store.getState().storage) return;
    storage.write(KEY, store.getState());
};

export default storageMiddleware;
