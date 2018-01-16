import React from 'react'
import KeyboardControls from './keyboardControls'
import {shallow} from 'enzyme'

describe('KeyboardControls component', () => {
	it('should gracefully handle invalid events', () => {
		const consoleLog = console.log
		console.log = jest.fn()
		const mockFn = jest.fn()
		let component = shallow(<KeyboardControls />, {
			context: {handleNavigation: mockFn}
		})
		component.instance().handleKeyPress({code: 'Hi!'})
		expect(mockFn).not.toHaveBeenCalled()
		expect(console.log).toHaveBeenCalled()
		console.log = consoleLog
	})

	it('should fire the correct action', done => {
		// setup mock
		const mockFn = jest.fn(param => {
			expect(param).toBe('forward')
			done()
		})
		// shallow render component for test
		let component = shallow(<KeyboardControls />, {
			context: {handleNavigation: mockFn}
		})
		// precondition: the mock must not have been called
		expect(mockFn).not.toHaveBeenCalled()
		// perform action
		component.instance().handleKeyPress({code: 'ArrowDown'})
		// validate outcome
		expect(mockFn).toHaveBeenCalled()
	})
})
