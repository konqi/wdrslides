// @flow
import React from 'react'
import PropTypes from 'prop-types'

class Progress extends React.Component {
	render () {
		return (
			<span>
				{this.props.currentSlide + 1}/{this.props.numberOfSlides}
			</span>
		)
	}
}

Progress.propTypes = {
	currentSlide: PropTypes.number,
	numberOfSlides: PropTypes.number
}

export default Progress
