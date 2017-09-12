import ActionRegistry from '../../redux/actions/index';


export default class Action {
    constructor(action) {
        this.type = action.type || action.trigger;
        this.options = action.options;
        this.success = action.success;
        this.error = action.error;
        this.return = null;
    }

    execute = (context, data) => {
        const action = this;
        const args = {
            options: this.options,
            context,
            data
        };
        return new Promise(function (resolve, reject) {
            try {
                const result = ActionRegistry.get(action.type)(args);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    };
}