import React from 'react'
import {Slide} from './slide'
import Canvas from './canvas'
import {mount, render} from 'enzyme'
import * as Hammer from 'hammerjs'

const markup = (
	<Canvas slidesLoadedCallback={() => {}}>
		<div />
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

afterEach(() => {
	component.unmount()
})

describe('Canvas component', () => {
	it('should show the fist slide', () => {
		expect(
			component
				.find('Slide')
				.at(0)
				.render()[0].attribs.class
		).toEqual(expect.stringContaining('current'))

		expect(
			component
				.find('Slide')
				.at(1)
				.render()[0].attribs.class
		).toEqual(expect.stringContaining('future'))
	})

	it('should show the next slide when the "go forward" button is clicked', () => {
		expect(
			component
				.find('Slide')
				.at(0)
				.render()[0].attribs.class
		).toEqual(expect.stringContaining('current'))

		expect(
			component
				.find('Slide')
				.at(1)
				.render()[0].attribs.class
		).toEqual(expect.stringContaining('future'))

		component.setProps({currentSlide: 1})
		expect(
			component
				.find('Slide')
				.at(0)
				.render()[0].attribs.class
		).toEqual(expect.stringContaining('past'))

		expect(
			component
				.find('Slide')
				.at(1)
				.render()[0].attribs.class
		).toEqual(expect.stringContaining('current'))
	})

	it('should show the previous slide when the "go back" button is clicked', () => {
		// move forward
		component.setProps({currentSlide: 1})
		// validate
		expect(
			component
				.find('Slide')
				.at(0)
				.render()[0].attribs.class
		).toEqual(expect.stringContaining('past'))
		expect(
			component
				.find('Slide')
				.at(1)
				.render()[0].attribs.class
		).toEqual(expect.stringContaining('current'))
		// move back
		component.setProps({currentSlide: 0})
		// validate
		expect(
			component
				.find('Slide')
				.at(0)
				.render()[0].attribs.class
		).toEqual(expect.stringContaining('current'))
		expect(
			component
				.find('Slide')
				.at(1)
				.render()[0].attribs.class
		).toEqual(expect.stringContaining('future'))
	})

	it('should show an error message when no handleNavigationCallback function is present in context', () => {
		const mock = jest.fn()
		const spy = jest.spyOn(global.console, 'log').mockImplementation(mock)

		expect(mock).not.toHaveBeenCalled()
		component.instance().handleNavigationCallback('forward')
		expect(mock).toHaveBeenCalled()
		spy.mockRestore()
	})

	it('should  show an error message when no slidesLoadedCallback function has been provided', () => {
		const mock = jest.fn()
		const spy = jest.spyOn(global.console, 'log').mockImplementation(mock)
		expect(mock).not.toHaveBeenCalled()
		component = mount(<Canvas />)
		expect(mock).toHaveBeenCalled()
		spy.mockRestore()
	})

	it('should react to swipe guestures for mobile capability', () => {
		const handleNavigationCallback = jest.fn()
		const component = mount(<Canvas slidesLoadedCallback={() => {}} />, {
			context: {handleNavigationCallback}
		})

		expect(handleNavigationCallback).not.toHaveBeenCalled()

		component
			.instance()
			.handleSwipe({type: 'swipe', direction: Hammer.DIRECTION_LEFT})

		expect(handleNavigationCallback).toHaveBeenCalled()
		handleNavigationCallback.mockReset()
		expect(handleNavigationCallback).not.toHaveBeenCalled()

		component
			.instance()
			.handleSwipe({type: 'swipe', direction: Hammer.DIRECTION_RIGHT})
		expect(handleNavigationCallback).toHaveBeenCalled()
	})

	it('should scale properly', () => {
		// i have no idea how to test this
		component = mount(
			<div>
				<Canvas slidesLoadedCallback={() => {}} />
			</div>
		)
		console.log(component.childAt(0).render()[0].attribs.style)
	})
})
