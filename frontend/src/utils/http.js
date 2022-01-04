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

export const postFormData = async (path, fd) => {
    try {
        const response = await fetch(`${apiHost}/${path}`, {
            body: fd,
            method: 'POST',
            credentials: 'include'
        })

        const headers = response.headers

        const returnedData = headers.get('Content-Type').includes('json') ? await response.json() : await response.text()

        return returnedData
    } catch {}

    return null
}

export const apiHttpRequest = async (path, method, body, requestHeaders = {}) => {
    const defaultHeaders = { 'Content-Type': 'application/json' }

    try {
        const response = await fetch(`${apiHost}/${path}`, {
            method,
            body,
            credentials: 'include',
            headers: {...defaultHeaders, ...requestHeaders}
        })

        const headers = response.headers

        const returnedData = headers.get('Content-Type').includes('json') ? await response.json() : await response.text()

        return returnedData
    } catch {}

    return null
}