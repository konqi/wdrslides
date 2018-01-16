import React from 'react'
import KeyboardControls from './keyboardControls'
import {shallow} from 'enzyme'

describe('KeyboardControls component', () => {
	it('should gracefully handle invalid events', done => {
		const consoleLog = jest.spyOn(console, 'log')
		const mockFn = jest.fn()
		let component = shallow(<KeyboardControls />, {
			context: {handleNavigation: mockFn}
		})
		component.instance().handleKeyPress({code: 'Hi!'})
		expect(mockFn).not.toHaveBeenCalled()
		expect(consoleLog).toHaveBeenCalled()
		done()
	})

	it('should fire the correct action', done => {
		const mockFn = jest.fn(param => {
			expect(param).toBe('forward')
			done()
		})
		let component = shallow(<KeyboardControls />, {
			context: {handleNavigation: mockFn}
		})
		component.instance().handleKeyPress({code: 'ArrowDown'})
		expect(mockFn).toHaveBeenCalled()
	})
})
