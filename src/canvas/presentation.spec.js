import React from 'react'
import {shallow} from 'enzyme'
import Presentation from './presentation'

describe('Presentation component', () => {
	it('should not allow going backward when on the first slide', done => {
		const component = shallow(<Presentation />)
		component.instance().slidesLoadedCallback(5)

		const consoleLog = console.log
		console.log = jest.fn(() => {
			done()
		})
		// precondition: nothing should've been logged thus far
		expect(console.log).not.toHaveBeenCalled()
		component.instance().handleNavigation('backward')
		expect(console.log).toHaveBeenCalled()
		console.log = consoleLog
	})

	it('should not allow going forward when on the last slide', done => {
		const component = shallow(<Presentation />)
		component.instance().slidesLoadedCallback(5)
		component.setState({position: 4})

		const consoleLog = console.log
		console.log = jest.fn(() => {
			done()
		})
		// precondition: nothing should've been logged thus far
		expect(console.log).not.toHaveBeenCalled()

		component.instance().handleNavigation('forward')

		expect(console.log).toHaveBeenCalled()
		console.log = consoleLog
	})
})
