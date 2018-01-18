// @flow
import React from 'react'
import PropTypes from 'prop-types'

class Presentation extends React.Component {
	constructor (props) {
		super(props)
		this.state = {position: 0, total: 0}
		this.handleNavigation = this.handleNavigation
	}

	goForward () {
		if (this.state.position + 1 < this.state.total) {
			this.setState({position: this.state.position + 1})
		} else {
			console.log('no more slides in that direction')
		}
	}

	goBackward () {
		if (this.state.position > 0) {
			this.setState({position: this.state.position - 1})
		} else {
			console.log('no more slides in that direction')
		}
	}

	handleNavigation (action: 'forward' | 'backward' | 'up' | 'down') {
		// determine where to go
		switch (action) {
			case 'forward' || 'down':
				this.goForward()
				break
			case 'backward' || 'up':
				this.goBackward()
				break
			default:
				console.error(`Unhandled navigation event ${action}.`)
		}
	}

	slidesLoadedCallback (numberOfSlides) {
		this.setState({total: numberOfSlides})
	}

	render () {
		return React.Children.map(this.props.children, child => {
			return React.cloneElement(child, {
				slidesLoadedCallback: this.slidesLoadedCallback.bind(this),
				handleNavigationCallback: this.handleNavigation.bind(this),
				isFirst: this.state.position <= 0,
				isLast: this.state.position + 1 >= this.slides,
				currentSlide: this.state.position,
				numberOfSlides: this.state.total
			})
		})
	}
}

Presentation.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element)
}

export default Presentation
