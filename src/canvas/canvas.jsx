import React from 'react'
import PropTypes from 'prop-types'
import styles from './canvas.css'
import {Slide} from './slide'
import {throttle} from 'lodash'

class Canvas extends React.Component {
	constructor (props) {
		super(props)
		this.size = {
			width: 960,
			height: Math.floor(960 / props.aspectRatio)
		}
		this.updateDimensions = throttle(this.updateDimensions.bind(this), 100)
		this.numberOfSlides = 0
	}

	componentWillMount () {
		this.updateDimensions()
	}

	componentDidMount () {
		window.addEventListener('resize', this.updateDimensions)
		this.props.slidesLoadedCallback(this.numberOfSlides)
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this.updateDimensions)
	}

	updateDimensions () {
		this.setState({scale: this.calcScale()})
	}

	calcScale () {
		let xMax = window.innerWidth - this.props.border * 2
		let yMax = window.innerHeight - this.props.border * 2

		let scaleX = xMax / this.size.width
		let scaleY = yMax / this.size.height

		return Math.min(scaleX, scaleY)
	}

	getSlideState (n) {
		return this.props.currentSlide > n
			? 'past'
			: this.props.currentSlide < n ? 'future' : 'current'
	}

	render () {
		this.numberOfSlides = 0

		let render = React.Children.map(this.props.children, child => {
			switch (child.type) {
				case Slide:
					return React.cloneElement(child, {
						state: this.getSlideState(this.numberOfSlides++)
					})
				default:
					return child
			}
		})

		return (
			<div
				className={styles.stage}
				style={{
					top: '50%',
					left: '50%',
					width: `${this.size.width}px`,
					height: `${this.size.height}px`,
					transform: `scale3d(${this.state.scale}, ${this.state.scale}, 1) translate3d(-50%,-50%, 0)`
				}}
			>
				{render}
			</div>
		)
	}
}

Canvas.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
	slidesLoadedCallback: PropTypes.func,
	currentSlide: PropTypes.number,
	aspectRatio: PropTypes.number,
	border: PropTypes.number
}

Canvas.defaultProps = {
	border: 50,
	aspectRatio: 4 / 3,
	slidesLoadedCallback: () => {
		console.log(
			'It appears you are using Canvas outside a Presentation context. Please only use Canvas inside <Presentation></Presentation>.'
		)
	},
	currentSlide: 0
}

export default Canvas
