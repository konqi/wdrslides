// @flow
import React from 'react'
import PropTypes from 'prop-types'

class KeyboardControls extends React.Component {
	componentDidMount () {
		document.addEventListener('keydown', this.handleKeyPress.bind(this), false)
	}
	componentWillUnmount () {
		document.removeEventListener(
			'keydown',
			this.handleKeyPress.bind(this),
			false
		)
	}

	handleKeyPress (event) {
		switch (event.code) {
			case 'ArrowDown': // move one slide down
				this.context.handleNavigation('forward')
				break
			case 'ArrowUp': // move one slide up
				this.context.handleNavigation('backward')
				break
			case 'ArrowLeft': // move to slide to the left
				this.context.handleNavigation('backward')
				break
			case 'ArrowRight': // move to slide to the right
				this.context.handleNavigation('forward')
				break
			case 'Space': // logically the next slide
				this.context.handleNavigation('forward')
				break
			case 'Backspace':
				this.context.handleNavigation('backward')
				break
			default:
				console.log(
					`Event code >> ${event.code} << is not handled at the moment.`
				)
		}
	}

	render () {
		return null
	}
}

KeyboardControls.contextTypes = {
	handleNavigation: PropTypes.func
}

export default KeyboardControls
