import React, { useCallback, useReducer } from 'react'
import { createUseStyles } from 'react-jss'
import Option from './Option'

const INITIAL_STATE = {
    isOpen: false,
    value: '',
    hoverValue: '',
    filteredData: [],
    selected: '',
    cursorPosition: 0,
}

const KEY_CODE_ACTIONS = {
    40: 'MOVE_CURSOR_UP',
    38: 'MOVE_CURSOR_DOWN',
    13: 'SELECT_ON_ENTER',
}

const useStyles = createUseStyles({
    widget: {
        outline: 'none',
    },
    label: {
        fontSize: 32,
    },
    input: {
        display: '  block',
        width: 200,
        padding: 3,
        fontSize: 24,
        outline: 'none',
        border: 'none',
        borderBottom: 'solid 3px',
    },
    comboBox: {
        position: 'absolute',
        height: 120,
        overflow: 'auto',
        listStyle: 'none',
        margin: 0,
        padding: 3,
        width: 200,
    },
    option: {
        color: 'RGB(20, 0, 255)',
        fontSize: 24,
        margin: [2, 0],
        '&.selected, &:hover': {
            cursor: 'pointer',
            backgroundImage:
                'linear-gradient(45deg, #ebeeff 27.27%, #ffffff 27.27%, #ffffff 50%, #ebeeff 50%, #ebeeff 77.27%, #ffffff 77.27%, #ffffff 100%)',
            backgroundSize: '15.56px 15.56px',
        },
        '& mark': {
            backgroundImage:
                'linear-gradient(45deg, #ff8fa4 25%, #ffffff 25%, #ffffff 50%, #ff8fa4 50%, #ff8fa4 75%, #ffffff 75%, #ffffff 100%)',
            backgroundSize: '14.14px 14.14px',
            borderRadius: 2,
            color: 'RGB(20, 0, 255)',
        },
    },
})

const calcCursorPosition = ({ cursorPosition, filteredData }, n) =>
    Math.max(0, Math.min(cursorPosition + n, filteredData.length - 1))

const filterData = (data, value) => {
    const regex = new RegExp(value, 'ig')
    return value === '' ? [] : data.filter(regex.test.bind(regex))
}

const moveCursor = (state, direction) => {
    const cursorPosition = calcCursorPosition(state, direction)
    return {
        ...state,
        cursorPosition,
    }
}

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'INPUT_FOCUS':
            return { ...state, isOpen: true }
        case 'ON_CHANGE':
            return {
                ...state,
                value: payload,
                filteredData: filterData(state.data, payload),
                cursorPosition: 0,
                isOpen: true,
            }
        case 'SELECT':
            return {
                ...state,
                isOpen: false,
                value: payload,
                filteredData: [],
                hoverValue: '',
            }
        case 'MOVE_CURSOR_UP':
            return moveCursor(state, 1)
        case 'MOVE_CURSOR_DOWN':
            return moveCursor(state, -1)
        case 'SELECT_ON_ENTER':
            return {
                ...state,
                value: state.filteredData[state.cursorPosition],
                cursorPosition: 0,
                isOpen: false,
            }
        case 'ON_HOVER':
            return {
                ...state,
                hoverValue: payload,
            }
        case 'ON_MOUSE_OUT':
            return {
                ...state,
                hoverValue: '',
            }
        default:
            return state
    }
}

export default ({ data }) => {
    const [
        { isOpen, value, hoverValue, filteredData, cursorPosition },
        dispatch,
    ] = useReducer(reducer, {
        ...INITIAL_STATE,
        data,
    })
    const onKeyPress = useCallback(
        event => {
            const type = KEY_CODE_ACTIONS[event.keyCode]
            if (type) {
                event.preventDefault()
                dispatch({ type })
            }
        },
        [dispatch]
    )
    const classes = useStyles()

    return (
        <div
            role="combobox"
            aria-controls="listbox"
            aria-expanded={isOpen}
            tabIndex="0"
            className={classes.widget}
        >
            <label htmlFor="search" className={classes.label}>
                search
            </label>
            <input
                autoComplete="false"
                id="search"
                className={classes.input}
                onFocus={() => dispatch({ type: 'INPUT_FOCUS' })}
                type="text"
                value={hoverValue || value}
                onChange={e =>
                    dispatch({ type: 'ON_CHANGE', payload: e.target.value })
                }
                onKeyDown={onKeyPress}
            />
            {filteredData.length > 0 && isOpen && (
                <ul
                    role="listbox"
                    id="listbox"
                    className={classes.comboBox}
                    onMouseLeave={() => dispatch({ type: 'ON_MOUSE_OUT' })}
                >
                    {filteredData.map((name, i) => (
                        <Option
                            className={classes.option}
                            key={name}
                            name={name}
                            position={i}
                            value={hoverValue || value}
                            dispatch={dispatch}
                            cursorPosition={cursorPosition}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}
