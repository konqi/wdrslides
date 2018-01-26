import * as React from 'react'
import {Slide} from './slide'
import {throttle} from 'lodash'
const styles = require('./canvas.css')

export interface Props extends React.Props<Canvas> {
	slidesLoadedCallback: any
	currentSlide: number
	aspectRatio: number
	border: number
}

export interface State {
	scale: number
}

export class Canvas extends React.Component<Props, State> {
	size: {
		width:number
		height: number
	}
	numberOfSlides: number = 0

	constructor (props: Props) {
		super(props)
		this.updateDimensions = throttle(this.updateDimensions.bind(this), 100)
		this.size = {
			width: 960,
			height: Math.floor(960 / props.aspectRatio)
		}
	}

	static defaultProps = {
		border: 50,
		aspectRatio: 4 / 3,
		slidesLoadedCallback: () => {
			console.log(
				'It appears you are using Canvas outside a Presentation context. Please only use Canvas inside <Presentation></Presentation>.'
			)
		},
		currentSlide: 0
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

	getSlideState (n: number) : 'past' | 'future' | 'current' {
		return this.props.currentSlide > n
			? 'past'
			: this.props.currentSlide < n ? 'future' : 'current'
	}

	render () {
		this.numberOfSlides = 0

		let render = React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
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

export default Canvas
