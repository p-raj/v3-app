import operation from '../../v3-core/actions/operation';
import switchWidgetState from '../../v3-core/actions/switchWidgetState';
import set from '../../v3-core/actions/set';
import get from '../../v3-core/actions/get';
import changeProperty from '../../v3-core/actions/change.property';
import imagePick from '../../v3-core/actions/image.pick';


/*
 * TODO
 * Find a better way as this
 * may grow fucking exponentially :/
 *
 * The only reason its here is it helps
 * keep the main component clean.
 */
class ActionFactory {
    static get(type) {
        switch (type) {
            case '$operation':
                return operation;
            case '$switchWidgetState':
                return switchWidgetState;
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
    }
}

export default ActionFactory;
