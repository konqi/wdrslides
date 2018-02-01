import * as React from 'react'
import * as PropTypes from 'prop-types'
import {pick} from 'lodash'

export interface Context {
	currentSlide: number
	totalNumberOfSlides: number
}

export class Progress extends React.Component<{}, {}> {
	context: Context

	static contextTypes = {
		currentSlide: PropTypes.number,
		totalNumberOfSlides: PropTypes.number
	}

	render() {
		const context = pick(this.context, ['currentSlide', 'totalNumberOfSlides'])
		return (
			<span>
				{1 + context.currentSlide}/{context.totalNumberOfSlides}
			</span>
		)
	}
}

export default Progress
