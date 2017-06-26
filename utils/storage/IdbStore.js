import idb from 'idb';
import Storage from  './Storage';


export default class IdbStore extends Storage {
    DB_NAME = 'Veris';
    DB_VERSION = 1;

    constructor(objStore) {
        super(objStore);
        this.db = idb.open(this.DB_NAME, this.DB_VERSION, db => {
            db.createObjectStore(objStore);
        });
    }

    read(key) {
        return this.db.then(db => {
            return db.transaction(this.objStore)
                .objectStore(this.objStore).get(key)
        });
    }

    write(key, value) {
        return this.db.then(db => {
            const tx = db.transaction(this.objStore, 'readwrite');
            tx.objectStore(this.objStore).put(value, key);
            return tx.complete;
        });
    }
}
