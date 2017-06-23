import axios from 'axios';
import _ from 'lodash';
import { RUNTIMES_API } from '../../utils/endpoints';


export default function (obj) {
    console.log(obj);
    const {actionContext, data, options} = obj;
    const {runtime, session, token, widget} = actionContext;

    let url = `${RUNTIMES_API}${runtime.uuid}/widgets/${widget.uuid}/${options.operationId}/`;

    let dataTypes = pullChild(widget.schema.paths, "properties");

    /*
     * Suppose a third party API specifies in its schema that it needs an integer field.
     * But our TextInput returns a string value. So we need to transform the data into the field type specified in
     * swagger schema
     */
    for (let i in data.data) {
        if (dataTypes.hasOwnProperty(i) && data.data.hasOwnProperty(i)) {
            console.log(i, data.data[i], '===', dataTypes[i]["type"],
                typeof data.data[i] === dataTypes[i]["type"]);
        }
    }


    axios.post(url, data, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "X-VRT-SESSION": session,
            "HOST-VERIS": "apis.veris.in"
        }
    })
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            // Can't send err, cause some parts of it doesn't get serialised
            // So send err.response
            console.log(err);
        })
}

/**
 * Get nested key from a parent object
 * @param obj
 * @param key
 * @returns {*}
 */
function pullChild(obj, key) {
    if (key in obj) return obj[key];

    let res = {};
    _.forEach(obj, function (v) {
        if (typeof v === "object" && (v = pullChild(v, key)))
            res = _.merge(res, v);
    });

    return res;
}