// @flow

import React from 'react'
import PropTypes from 'prop-types'
import styles from './canvas.css'
import Slide from './slide'
// import {filter, size, chain} from 'lodash'

class Canvas extends React.Component {
	constructor (props) {
		super(props)
		this.state = {position: 0}
		this.slides = 0
		this.handleNavigation = this.handleNavigation
	}

	// componentDidMount () {
	// 	this.chain(React.Children.toArray(this.props.children))
	// 		.filter(child => child.type === Slide)
	// 		.size()
	// }

	getChildContext () {
		return {
			handleNavigation: this.handleNavigation.bind(this),
			position: this.state.position,
			isFirst: this.state.position <= 0,
			isLast: this.state.position + 1 >= this.slides
		}
	}

	goForward () {
		if (this.state.position + 1 < this.slides) {
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

	render () {
		this.slides = 0
		let getState = n =>
			this.state.position > n
				? 'past'
				: this.state.position < n ? 'future' : 'current'

		let render = React.Children.map(this.props.children, child => {
			switch (child.type) {
				case Slide:
					return React.cloneElement(child, {
						state: getState(this.slides++)
					})
				default:
					return child
			}
		})

		return <div className={styles.stage}>{render}</div>
	}
}

Canvas.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element)
}

Canvas.childContextTypes = {
	handleNavigation: PropTypes.func,
	position: PropTypes.number,
	isLast: PropTypes.bool,
	isFirst: PropTypes.bool
}

export default Canvas
