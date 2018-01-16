import React from 'react'
import Slide from './slide'
import { shallow } from 'enzyme'

describe('Slide component', () => {
	it('should show the child components', () => {
		const component = shallow(
			<Slide>
				<h1>Hello World!</h1>
			</Slide>
		)
		expect(component.text()).toEqual('Hello World!')
		expect(component.children.length).toEqual(1)
	})

	describe('component must follow state prop', () => {
		it('default state is "future"', () => {
			const component = shallow(<Slide />)
			expect(component.render()[0].attribs.class).toEqual(
				expect.stringContaining('future')
			)
		})

		it('other states', () => {
			let props = {}

			const component = shallow(<Slide {...props} />)
			;['current', 'past', 'future'].forEach(state => {
				component.setProps({ state })
				expect(component.render()[0].attribs.class).toEqual(
					expect.stringContaining(state)
				)
			})
		})
	})
})
