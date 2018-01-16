import React from 'react'
import Slide from './slide'
import Canvas from './canvas'
import {mount} from 'enzyme'

const markup = (
	<Canvas>
		<Slide>
			<div>
				<h1>Hello World!</h1>
				<strong>Hey!</strong>
			</div>
		</Slide>
		<Slide>
			<div>
				<h1>OK! Computer</h1>
				<strong>Radiohead</strong>
			</div>
		</Slide>
	</Canvas>
)
let component

beforeEach(() => {
	component = mount(markup)
})

describe('Canvas component', () => {
	it('should show the fist slide', () => {
		expect(component.find('Slide').at(0).render()[0].attribs.class).toEqual(
			expect.stringContaining('current')
		)

		expect(component.find('Slide').at(1).render()[0].attribs.class).toEqual(
			expect.stringContaining('future')
		)
	})

	it('should show the next slide when the "go forward" button is clicked', () => {
		component.instance().handleNavigation('forward')
		expect(component.find('Slide').at(0).render()[0].attribs.class).toEqual(
			expect.stringContaining('past')
		)

		expect(component.find('Slide').at(1).render()[0].attribs.class).toEqual(
			expect.stringContaining('current')
		)
	})

	it('should show the previous slide when the "go back" button is clicked', () => {
		// move forward
		component.instance().handleNavigation('forward')
		// validate
		expect(component.find('Slide').at(0).render()[0].attribs.class).toEqual(
			expect.stringContaining('past')
		)
		expect(component.find('Slide').at(1).render()[0].attribs.class).toEqual(
			expect.stringContaining('current')
		)
		// move back
		component.instance().handleNavigation('backward')
		// validate
		expect(component.find('Slide').at(0).render()[0].attribs.class).toEqual(
			expect.stringContaining('current')
		)
		expect(component.find('Slide').at(1).render()[0].attribs.class).toEqual(
			expect.stringContaining('future')
		)
	})

	it('should not allow going backward when on the first slide', done => {
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
		const consoleLog = console.log
		console.log = jest.fn(() => {
			done()
		})
		// precondition: nothing should've been logged thus far
		expect(console.log).not.toHaveBeenCalled()

		component.instance().handleNavigation('forward')
		component.instance().handleNavigation('forward')

		expect(console.log).toHaveBeenCalled()
		console.log = consoleLog
	})
})
