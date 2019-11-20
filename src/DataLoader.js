import React from 'react'
import useFetchData from './useFetchData'

// remove duplicates in the list
const cleanData = data => [...new Set(data)]

export default ({ url, children }) => {
    const { data, loading, error } = useFetchData('data.json')
    if (loading) {
        return 'loading'
    }
    if (error) {
        return 'something went wrong'
    }
    if (data) {
        return React.cloneElement(children, { data: cleanData(data) })
    }
}
