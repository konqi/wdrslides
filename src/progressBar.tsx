import * as React from 'react'
import * as PropTypes from 'prop-types'
import {pick} from 'lodash'

export interface ProgressBarContext {
	currentSlide: number
	totalNumberOfSlides: number
}

export class ProgressBar extends React.Component<{}, {}> {
	context: ProgressBarContext

	static contextTypes = {
		currentSlide: PropTypes.number,
		totalNumberOfSlides: PropTypes.number
	}

	render() {
		const context = pick(this.context, ['currentSlide', 'totalNumberOfSlides'])
		return (
			<div style={{width: `${100*context.currentSlide/(context.totalNumberOfSlides-1)}%`}}
			className="progressbar"/>
		)
	}
}

export default ProgressBar
