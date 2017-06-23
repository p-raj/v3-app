import ActionRegistry from '../../redux/actions/index';


export default class Action {
    constructor(action) {
        this.type = action.type || action.trigger;
        this.options = action.options;
        this.success = action.success;
        this.error = action.error;
        this.return = null;
    }

    execute = (data, actionContext) => {
        const action = this;
        const mergeOptions = {options: this.options, data: data, actionContext};
        return new Promise(function (resolve, reject) {
            try {
                const result = ActionRegistry.get(action.type)(mergeOptions);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    };
}