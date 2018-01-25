/**
 * @flow
 */
import * as React from 'react'

export interface Props {
	currentSlide: number;
	numberOfSlides: number;
}

export class Progress extends React.Component<Props, {}> {
	render() {
		return (
			<span>
				{this.props.currentSlide + 1}/{this.props.numberOfSlides}
			</span>
		)
	}
}

// export default Progress
