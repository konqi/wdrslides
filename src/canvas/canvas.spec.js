import React from 'react'
import Slide from './slide'
import Canvas from './canvas'
import {mount} from 'enzyme'

const markup = (
	<Canvas slidesLoadedCallback={() => {}}>
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
		expect(component.find('Slide').at(0).render()[0].attribs.class).toEqual(
			expect.stringContaining('current')
		)

		expect(component.find('Slide').at(1).render()[0].attribs.class).toEqual(
			expect.stringContaining('future')
		)

		component.setProps({currentSlide: 1})
		expect(component.find('Slide').at(0).render()[0].attribs.class).toEqual(
			expect.stringContaining('past')
		)

		expect(component.find('Slide').at(1).render()[0].attribs.class).toEqual(
			expect.stringContaining('current')
		)
	})

	it('should show the previous slide when the "go back" button is clicked', () => {
		// move forward
		component.setProps({currentSlide: 1})
		// validate
		expect(component.find('Slide').at(0).render()[0].attribs.class).toEqual(
			expect.stringContaining('past')
		)
		expect(component.find('Slide').at(1).render()[0].attribs.class).toEqual(
			expect.stringContaining('current')
		)
		// move back
		component.setProps({currentSlide: 0})
		// validate
		expect(component.find('Slide').at(0).render()[0].attribs.class).toEqual(
			expect.stringContaining('current')
		)
		expect(component.find('Slide').at(1).render()[0].attribs.class).toEqual(
			expect.stringContaining('future')
		)
	})
})
