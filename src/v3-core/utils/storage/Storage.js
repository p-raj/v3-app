import NotImplemented from '../errors/NotImplemented';


export default class Storage {
    constructor(objStore) {
        this.objStore = objStore;
    }

    // noinspection JSUnusedGlobalSymbols
    read(key) {
        throw NotImplemented()
    }

    // noinspection JSUnusedGlobalSymbols
    write(key, value) {
        throw NotImplemented()
    }
}
