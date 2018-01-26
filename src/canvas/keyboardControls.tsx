import * as React from 'react'

export interface Props {
  handleNavigationCallback: (direction: string) => void
}

export class KeyboardControls extends React.Component<Props> {
  static defaultProps = {
    handleNavigationCallback: () => {
      console.log(
        'It appears you are using KeyboardControls outside a Presentation context. Please only use KeyboardControls inside <Presentation></Presentation>.'
      )
    }
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

	render () : React.ReactNode {
		return null
	}
}

export default KeyboardControls
