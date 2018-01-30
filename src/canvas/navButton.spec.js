import * as React from 'react'
import NavButton from './navButton'
import * as Enzyme from 'enzyme'

describe('NavButton component', () => {
	it('should move forward when the button is clicked', done => {
		const handleNavigationCallback = jest.fn(param => {
			expect(param).toBe('forward')
			done()
		})

		const component = Enzyme.shallow(
			<NavButton action="forward">Hello World!</NavButton>,
			{context: {handleNavigationCallback}}
		)
		expect(handleNavigationCallback).not.toHaveBeenCalled()
		component.simulate('click')
		expect(handleNavigationCallback).toHaveBeenCalled()
	})

	it('should move backward when the button is clicked', done => {
		const handleNavigationCallback = jest.fn(param => {
			expect(param).toBe('backward')
			done()
		})

		const component = Enzyme.shallow(
			<NavButton action="backward">Hello World!</NavButton>,
			{context: {handleNavigationCallback}}
		)
		expect(handleNavigationCallback).not.toHaveBeenCalled()
		component.simulate('click')
		expect(handleNavigationCallback).toHaveBeenCalled()
	})

	it('should add class "first" when the context says that we are on the first slide', () => {
		const component = Enzyme.shallow(<NavButton />, {context: {isFirst: true}})
		expect(component.render()[0].attribs.class).toEqual(
			expect.stringContaining('first')
		)
	})

	it('should add class "last" when the context says that we are on the last slide', () => {
		const component = Enzyme.shallow(<NavButton />, {context: {isLast: true}})
		expect(component.render()[0].attribs.class).toEqual(
			expect.stringContaining('last')
		)
	})

	it('should add classes "first" and "last" when there is just one slide', () => {
		const component = Enzyme.shallow(<NavButton />, {
			context: {isFirst: true, isLast: true}
		})
		expect(component.render()[0].attribs.class).toEqual(
			expect.stringContaining('last')
		)
		expect(component.render()[0].attribs.class).toEqual(
			expect.stringContaining('first')
		)
	})
})
