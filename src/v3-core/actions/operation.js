import axios from 'axios';
import { RUNTIMES_API } from '../../utils/endpoints';


export default function (obj) {
    const {options, context, data} = obj;
    const {runtime, session, widget} = context;

    let url = `${RUNTIMES_API}${runtime.uuid}/widgets/${widget.uuid}/${options.operationId}/`;

    axios.post(url, data, {
        headers: {
            'X-VRT-SESSION': session
        }
    }).then((response) => {
        console.log(response);
    }).catch((err) => {
        /* Can't send err, cause some parts of it doesn't get serialised So send err.response*/
        console.log(err);
    })
}
