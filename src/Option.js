import React, { useCallback } from 'react'

import findMatches from './findMatches'

export default ({
    name,
    dispatch,
    cursorPosition,
    value,
    position,
    className,
}) => {
    const onClick = useCallback(() => {
        dispatch({ type: 'SELECT', payload: name })
    }, [name, dispatch])

    const onHover = useCallback(() => {
        dispatch({ type: 'ON_HOVER', payload: name })
    }, [name, dispatch])
    return (
        <li
            title={name}
            onMouseOver={onHover}
            className={`${className} ${
                cursorPosition === position ? 'selected' : ''
            }`}
            onClick={onClick}
        >
            {findMatches(new RegExp(value, 'ig'), name).map((t, i) =>
                t.toLowerCase() === value.toLowerCase() ? (
                    <mark key={i}>{t}</mark>
                ) : (
                    t
                )
            )}
        </li>
    )
}
