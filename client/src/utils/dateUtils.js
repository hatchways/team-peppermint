import moment from 'moment'
const dateToString = (date) => {
    let output = moment(date)
    return output.format('HH:mm')
}

export { dateToString }