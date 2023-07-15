export function isEmpty(obj) {
    if (!obj) {
        return true;
    }
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

export function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
