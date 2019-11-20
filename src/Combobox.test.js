import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Combobox from './Combobox'

const data = ['Açaí', 'Apple', 'Akee', 'Apricot']
describe('Combobox', () => {
    it('renders input with label ', () => {
        const { container } = render(<Combobox data={data} />)
        expect(container).toMatchSnapshot()
    })

    it('renders the suggestion when start typing', () => {
        const { getByLabelText, getByRole } = render(<Combobox data={data} />)

        fireEvent.change(getByLabelText('search'), { target: { value: 'Ap' } })

        expect(getByRole('listbox')).toMatchSnapshot()
    })

    it('selects an item onclick', () => {
        const { getByLabelText, getByTitle, getByDisplayValue } = render(
            <Combobox data={data} />
        )
        const input = getByLabelText('search')
        fireEvent.change(input, { target: { value: 'Ap' } })
        fireEvent.click(getByTitle('Apricot'))
        expect(input).toBe(getByDisplayValue('Apricot'))
    })
})
