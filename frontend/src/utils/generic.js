export const getChangedData = (original, newData) => {
    return Object.keys(original).reduce((obj, key) => {
        if (newData[key] && original[key] !== newData[key]) obj[key] = newData[key]
        return obj
    }, {})
}