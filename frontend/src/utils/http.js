const apiHost = 'http://localhost:8000'

export const getRequest = async (path) => {
    try {
        const response = await fetch(`${apiHost}/${path}`)
        const data = response.json()

        if (data.ok && data.data) return data.data
        else if (data.ok) return data
    } catch {}

    return null
}