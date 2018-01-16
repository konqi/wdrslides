import React from 'react'
import PropTypes from 'prop-types'
import styles from './slide.css'

class Slide extends React.Component {
	constructor () {
		super()
		this.state = {
			width: 0,
			height: 0
		}
	}
	componentWillMount () {
		this.updateDimensions()
	}
	componentDidMount () {
		window.addEventListener('resize', this.updateDimensions.bind(this))
	}
	componentWillUnmount () {
		window.removeEventListener('resize', this.updateDimensions.bind(this))
	}

	updateDimensions () {
		this.setState({ width: window.innerWidth, height: window.innerHeight })
	}

	render () {
		return (
			<div
				role="Slide"
				className={styles.slide + ' ' + styles[this.props.state]}
				style={{
					width: `${this.state.width}px`,
					height: `${this.state.height}px`
				}}
			>
				{this.props.children}
			</div>
		)
	}
}

// transform: `translate3d(${this.props.x * 100}%, ${this.props.y *	100}%, ${this.props.z * 100}px)`,

Slide.propTypes = {
	state: PropTypes.oneOf(['past', 'current', 'future']),
	children: PropTypes.any
}

Slide.defaultProps = {
	state: 'future'
}
export default Slide
