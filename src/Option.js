import React from 'react'

import findMatches from './findMatches'

export default ({
    name,
    onClick,
    onHover,
    cursorPosition,
    value,
    position,
    className,
}) => {
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
