// @flow
import React from 'react'
import PropTypes from 'prop-types'
import Canvas from './canvas'

class Presentation extends React.Component {
	constructor (props) {
		super(props)
		this.state = {position: 0}
		this.numberOfSlides = 0
		this.handleNavigation = this.handleNavigation
	}

	getChildContext () {
		return {
			handleNavigation: this.handleNavigation.bind(this),
			position: this.state.position,
			total: this.slides,
			isFirst: this.state.position <= 0,
			isLast: this.state.position + 1 >= this.slides
		}
	}

	goForward () {
		if (this.state.position + 1 < this.numberOfSlides) {
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
		this.numberOfSlides = numberOfSlides
	}

	render () {
		return React.Children.map(this.props.children, child => {
			if (child.type === Canvas) {
				return React.cloneElement(child, {
					slidesLoadedCallback: this.slidesLoadedCallback.bind(this),
					currentSlide: this.state.position
				})
			}
			return child
		})
	}
}

Presentation.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element)
}

Presentation.childContextTypes = {
	handleNavigation: PropTypes.func,
	position: PropTypes.number,
	total: PropTypes.number,
	isLast: PropTypes.bool,
	isFirst: PropTypes.bool
}

export default Presentation
