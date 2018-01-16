// @flow
import React from 'react'
import PropTypes from 'prop-types'

class KeyboardControls extends React.Component {
	handleNavigation (action) {
		console.log(action)
		this.context.handleNavigation({forward: 1, back: -1}[action])
	}

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
				this.handleNavigation('forward')
				break
			case 'ArrowUp': // move one slide up
				this.handleNavigation('backward')
				break
			case 'ArrowLeft': // move to slide to the left
				this.handleNavigation('back')
				break
			case 'ArrowRight': // move to slide to the right
				this.handleNavigation('forward')
				break
			case 'Space': // logically the next slide
				this.handleNavigation('forward')
				break
			case 'Backspace':
				this.handleNavigation('back')
				break
			default:
				console.log(`event code ${event.code} is not handled at the moment.`)
		}
	}

	render () {
		return <div />
	}
}

KeyboardControls.contextTypes = {
	handleNavigation: PropTypes.func
}

export default KeyboardControls
