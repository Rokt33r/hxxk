import React from 'react'
import { hxxk } from '../src'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { useState, useCallback } from 'react'

describe('hxxk', () => {
  it('test', () => {
    const { useStore, StoreProvider } = hxxk(() => {
      const [count, setCount] = useState(0)
      const plusOne = useCallback(() => {
        setCount(count => count + 1)
      }, [])

      return {
        count,
        plusOne
      }
    })

    const Consumer: React.FC = () => {
      const { count, plusOne } = useStore()
      return (
        <div>
          <span role="count">{count}</span>
          <button role="plus" onClick={plusOne}>
            +
          </button>
        </div>
      )
    }

    const tree = (
      <StoreProvider>
        <Consumer />
      </StoreProvider>
    )

    const { getByRole } = render(tree)
    expect(getByRole('count')).toHaveTextContent('0')

    fireEvent.click(getByRole('plus'))

    expect(getByRole('count')).toHaveTextContent('1')
  })
})
