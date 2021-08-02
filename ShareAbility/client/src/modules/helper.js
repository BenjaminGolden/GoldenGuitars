import * as moment from 'moment';

export const momentStartDateFixer = (object) => {
    const date = new Date(object.startDate);
    const cutDate = moment(date).format("YYYY-MM-DD")
    return cutDate
};

export const momentCompletionDateFixer = (object) => {
    const date = new Date(object.completionDate);
    const cutDate = moment(date).format("YYYY-MM-DD")
    return cutDate
};