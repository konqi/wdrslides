import * as React from 'react'
import NavButton from './navButton'
import * as Enzyme from 'enzyme'

describe('NavButton component', () => {
	it('should move forward when the button is clicked', done => {
		const mockFn = jest.fn(param => {
			expect(param).toBe('forward')
			done()
		})

		const component = Enzyme.shallow(
			<NavButton action="forward" handleNavigationCallback={mockFn}>
        Hello World!
			</NavButton>
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

		const component = Enzyme.shallow(
			<NavButton action="backward" handleNavigationCallback={mockFn}>
        Hello World!
			</NavButton>
		)
		expect(mockFn).not.toHaveBeenCalled()
		component.simulate('click')
		expect(mockFn).toHaveBeenCalled()
	})

	it('should add class "first" when the context says that we are on the first slide', () => {
		const component = Enzyme.shallow(<NavButton isFirst={true} />)
		expect(component.render()[0].attribs.class).toEqual(
			expect.stringContaining('first')
		)
	})

	it('should add class "last" when the context says that we are on the last slide', () => {
		const component = Enzyme.shallow(<NavButton isLast={true} />)
		expect(component.render()[0].attribs.class).toEqual(
			expect.stringContaining('last')
		)
	})

	it('should add classes "first" and "last" when there is just one slide', () => {
		const component = Enzyme.shallow(
			<NavButton isFirst={true} isLast={true} />
		)
		expect(component.render()[0].attribs.class).toEqual(
			expect.stringContaining('last')
		)
		expect(component.render()[0].attribs.class).toEqual(
			expect.stringContaining('first')
		)
	})
})
