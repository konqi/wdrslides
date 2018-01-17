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

	it('should add class "first" when the context says that we are on the first slide', () => {
		const component = shallow(<NavButton />, {
			context: {isFirst: true, handleNavigation: () => {}}
		})
		expect(component.render()[0].attribs.class).toEqual(
			expect.stringContaining('first')
		)
	})

	it('should add class "last" when the context says that we are on the last slide', () => {
		const component = shallow(<NavButton />, {
			context: {isLast: true, handleNavigation: () => {}}
		})
		expect(component.render()[0].attribs.class).toEqual(
			expect.stringContaining('last')
		)
	})

	it('should add classes "first" and "last" when there is just one slide', () => {
		const component = shallow(<NavButton />, {
			context: {isLast: true, isFirst: true, handleNavigation: () => {}}
		})
		expect(component.render()[0].attribs.class).toEqual(
			expect.stringContaining('last')
		)
		expect(component.render()[0].attribs.class).toEqual(
			expect.stringContaining('first')
		)
	})
})
