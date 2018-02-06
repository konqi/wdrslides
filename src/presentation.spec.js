import React from 'react'
import {shallow} from 'enzyme'
import Presentation from './presentation'
import Slide from './slide'
import Canvas from './canvas'

const setupSpies = tap => {
	return {
		log: jest.spyOn(global.console, 'log').mockImplementation(() => tap()),
		error: jest.spyOn(global.console, 'error').mockImplementation(() => tap())
	}
}

describe('Presentation component', () => {
	afterEach(() => {
		jest.restoreAllMocks()
	})

	it('should allow forward/backward navigation', () => {
		const {error, log} = setupSpies()
		expect(error).not.toHaveBeenCalled()
		expect(log).not.toHaveBeenCalled()

		const component = shallow(<Presentation />)
		component.instance().slidesLoadedCallback(5)
		component.instance().handleNavigation('forward')
		component.instance().handleNavigation('backward')

		expect(error).not.toHaveBeenCalled()
		expect(log).not.toHaveBeenCalled()
	})

	it('should not allow going backward when on the first slide', done => {
		const component = shallow(<Presentation />)
		component.instance().slidesLoadedCallback(5)

		const {log} = setupSpies(done)
		// precondition: nothing should've been logged thus far
		expect(log).not.toHaveBeenCalled()
		component.instance().handleNavigation('backward')
		expect(log).toHaveBeenCalled()
	})

	it('should not allow going forward when on the last slide', done => {
		const component = shallow(<Presentation />)
		component.instance().slidesLoadedCallback(5)
		component.setState({position: 4})

		const {log} = setupSpies(done)
		// precondition: nothing should've been logged thus far
		expect(log).not.toHaveBeenCalled()
		component.instance().handleNavigation('forward')
		expect(log).toHaveBeenCalled()
	})

	it('should report an error when navigationCallback is called with an invalid parameter', done => {
		const component = shallow(<Presentation />)

		const {error} = setupSpies(done)
		expect(error).not.toHaveBeenCalled()
		component.instance().handleNavigation('Bogus')
		expect(error).toHaveBeenCalled()
	})

	it('should not throw any errors for mixed element types primitive HTML/React', () => {
		const {error, log} = setupSpies()
		expect(error).not.toHaveBeenCalled()
		expect(log).not.toHaveBeenCalled()

		const component = shallow(
			<Presentation>
				<div>non-react element</div>
				<Canvas>
					<Slide />
				</Canvas>
			</Presentation>
		)

		expect(error).not.toHaveBeenCalled()
		expect(log).not.toHaveBeenCalled()
	})
})
