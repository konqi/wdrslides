/**
 * @flow
 */
import * as React from 'react'
// import PropTypes from 'prop-types'

type Props = {
  handleNavigationCallback: (direction: string) => void
};

class KeyboardControls extends React.Component<Props> {
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
				this.props.handleNavigationCallback('forward')
				break
			case 'ArrowUp': // move one slide up
				this.props.handleNavigationCallback('backward')
				break
			case 'ArrowLeft': // move to slide to the left
				this.props.handleNavigationCallback('backward')
				break
			case 'ArrowRight': // move to slide to the right
				this.props.handleNavigationCallback('forward')
				break
			case 'Space': // logically the next slide
				this.props.handleNavigationCallback('forward')
				break
			case 'Backspace':
				this.props.handleNavigationCallback('backward')
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

  static defaultProps = {};
}

// KeyboardControls.propTypes = {
// 	handleNavigationCallback: PropTypes.func
// }

KeyboardControls.defaultProps = {
	handleNavigationCallback: () => {
		console.log(
			'It appears you are using KeyboardControls outside a Presentation context. Please only use KeyboardControls inside <Presentation></Presentation>.'
		)
	}
}

export default KeyboardControls
