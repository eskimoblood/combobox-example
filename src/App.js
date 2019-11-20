import React from 'react'
import { createUseStyles } from 'react-jss'
import DataLoader from './DataLoader'
import Combobox from './Combobox'

const useStyles = createUseStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
})
const App = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <DataLoader url="../public/data.json">
                <Combobox />
            </DataLoader>
        </div>
    )
}

export default App
