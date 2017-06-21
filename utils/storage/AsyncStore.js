import { AsyncStorage } from 'react-native';
import Storage from  './Storage';

export default class AsyncStore extends Storage {
    read(key) {
        return AsyncStorage.getItem(key)
            .then((data) => {
                return JSON.parse(data)
            })
    }

    write(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }
}
