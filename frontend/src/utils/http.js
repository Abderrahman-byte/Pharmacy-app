const apiHost = 'http://localhost:8000'

export const getRequest = async (path) => {
    try {
        const response = await fetch(`${apiHost}/${path}`, {
            credentials: 'include',
        })
        const data = await response.json()

        return data
    } catch {}

    return null
}

export const postRequest = async (path, data) => {
    try {
        const response = await fetch(`${apiHost}/${path}`, {
            body: data,
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        const returnedData = await response.json()

        return returnedData
    } catch {}

    return null
}
