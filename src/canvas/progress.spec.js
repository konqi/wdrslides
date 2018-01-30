import * as React from 'react'
import {Progress} from './progress'
import * as Enzyme from 'enzyme'

describe('Progress component', () => {
	it('should show the current progress', () => {
		const component = Enzyme.shallow(<Progress />, {
			context: {currentSlide: 2, totalNumberOfSlides: 5}
		})
		expect(component.render()[0].children[0].data).toBe('3/5') // index is zero based
	})
})
