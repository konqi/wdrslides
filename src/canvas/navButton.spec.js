import React from 'react'
import NavButton from './navButton'
import {shallow} from 'enzyme'

describe('NavButton component', () => {
	it('should move forward when the button is clicked', done => {
		const mockFn = jest.fn(param => {
			expect(param).toBe('forward')
			done()
		})

		const component = shallow(
			<NavButton action="forward">Hello World!</NavButton>,
			{
				context: {handleNavigation: mockFn}
			}
		)
		expect(mockFn).not.toHaveBeenCalled()
		component.simulate('click')
		expect(mockFn).toHaveBeenCalled()
	})

	it('should move backward when the button is clicked', done => {
		const mockFn = jest.fn(param => {
			expect(param).toBe('backward')
			done()
		})

		const component = shallow(
			<NavButton action="backward">Hello World!</NavButton>,
			{
				context: {handleNavigation: mockFn}
			}
		)
		expect(mockFn).not.toHaveBeenCalled()
		component.simulate('click')
		expect(mockFn).toHaveBeenCalled()
	})
})
