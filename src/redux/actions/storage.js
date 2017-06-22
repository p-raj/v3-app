import Storage from '../../v3-core/utils/storage/index';
import { STORE, KEY } from '../middlewares/storage';

export const LOAD_REDUX_STATE = 'LOAD_REDUX_DATA';

const storage = new Storage(STORE);
export default function readFromStorage() {
    return (dispatch) => {
        storage.read(KEY).then((data) => {
            dispatch({
                type: LOAD_REDUX_STATE,
                payload: data
            })
        });
    }
}
