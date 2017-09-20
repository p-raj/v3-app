/**
 * Converts the provided object to dot notation object form
 *
 * @example
 * toDotNotation({
 *  "name": {
 *      "first": "A",
 *      "last": "P"
 *  }
 * })
 * >> { "name.first": "A", "name.last": "P" }
 *
 * @param json
 * @param prefix
 * @returns {{}}
 */
export const toDotNotation = (json = {}, prefix = undefined) => {
    let obj = JSON.parse(JSON.stringify(json));
    let dot = {};
    for (let key of Object.keys(obj)) {
        const k = prefix ? `${prefix}.${key}` : key;
        if (typeof (obj[key]) === typeof ({}) && !Array.isArray(obj[key])) {
            dot = {
                ...dot,
                ...toDotNotation(obj[key], k)
            };
        } else {
            dot[k] = obj[key];
        }
    }
    return dot;
};
