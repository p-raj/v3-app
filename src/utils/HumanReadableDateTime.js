import moment from 'moment';

export default function humanReadableDateTime(dateTimeString) {

    let date = moment(dateTimeString);
    let MM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return `${MM[date.month()]} ${date.date()}, ${date.year()}`;
}