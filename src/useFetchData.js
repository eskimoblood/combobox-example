import { useState, useEffect } from 'react'

export default url => {
    const [data, setData] = useState({ loading: true, data: null })
    useEffect(() => {
        fetch(url)
            .then(response => {
                if (response.ok) return response.json()
                throw new Error('HTTP error ' + response.status)
            })
            .then(data => setData({ data, loading: false }))
            .catch(error => setData({ loading: false, error }))
    }, [url])
    return data
}
