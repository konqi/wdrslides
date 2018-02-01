import * as React from 'react'
import * as PropTypes from 'prop-types'

export interface Context {
	handleNavigationCallback: (action: 'forward' | 'backward' | 'up' | 'down') => void
}

export class KeyboardControls extends React.Component {
	context: Context

	static contextTypes = {
		handleNavigationCallback: PropTypes.func
	}

	handleNavigationCallback(action: 'forward' | 'backward' | 'up' | 'down') : void {
		const fallback = () => {console.log(
			'It appears you are using KeyboardControls outside a Presentation context. Please only use KeyboardControls inside <Presentation></Presentation>.'
		)}

		(this.context.handleNavigationCallback || fallback)(action)

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

	handleKeyPress (event: KeyboardEvent) {
		switch (event.code) {
			case 'ArrowDown': // move one slide down
				this.handleNavigationCallback('forward')
				break
			case 'ArrowUp': // move one slide up
				this.handleNavigationCallback('backward')
				break
			case 'ArrowLeft': // move to slide to the left
				this.handleNavigationCallback('backward')
				break
			case 'ArrowRight': // move to slide to the right
				this.handleNavigationCallback('forward')
				break
			case 'Space': // logically the next slide
				this.handleNavigationCallback('forward')
				break
			case 'Backspace':
				this.handleNavigationCallback('backward')
				break
			default:
				console.log(
					`Event code >> ${event.code} << is not handled at the moment.`
				)
		}
	}

	render () : React.ReactNode {
		return null
	}
}

export default KeyboardControls
