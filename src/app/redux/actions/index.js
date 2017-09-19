import operation from 'app/actions/operation';
import set from 'app/actions/set';
import get from 'app/actions/get';
import changeProperty from 'app/actions/change.property';
import imagePick from 'app/actions/image.pick';


/*
 * TODO
 * Find a better way as this
 * may grow fucking exponentially :/
 *
 * The only reason its here is it helps
 * keep the main component clean.
 */
class ActionFactory {
    static get = (type) => {
        switch (type) {
            case '$operation':
                return operation;
            case '$set':
                return set;
            case '$get':
                return get;
            case '$prop.change':
                return changeProperty;
            case '$image.pick':
                return imagePick;
            default:
                return null;
        }
    };

    static executor = type => context => {
        switch (type) {
            case '$set':
            case '$get':
            case '$template':
                return context.widget.name;
            case '$prop.change':
                return 'template';
            default:
                return context.runtime.uuid;
        }
    };

}

export default ActionFactory;
