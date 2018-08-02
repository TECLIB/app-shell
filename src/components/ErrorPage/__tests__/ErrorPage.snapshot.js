import React from 'react'
import renderer from 'react-test-renderer'
import ErrorPage from '../index'

describe('ErrorPage', () => {
  test('renders ErrorPage', () => {
    const component = renderer.create(
      <ErrorPage />,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
