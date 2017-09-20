import axios from 'axios';
import { RUNTIMES_API } from 'shell/utils/endpoints';


export default ({options, context, data}) => {
    const {runtime, session, widget} = context;
    const postData = data || {};

    let url = `${RUNTIMES_API}${runtime.uuid}/widgets/${widget.uuid}/${options.operationId}/`;
    axios.post(url, postData, {
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
