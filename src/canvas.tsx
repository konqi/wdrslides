import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Slide} from './slide'
import {throttle} from 'lodash'
import * as Hammer from 'hammerjs'
const styles = require('./canvas.css')
import * as PropTypes from 'prop-types'

export interface CanvasProps extends React.Props<Canvas> {
	slidesLoadedCallback: any
	currentSlide: number
	aspectRatio: number
	border: number
}

export interface CanvasState {
	scale: number
}

export interface CanvasContext {
	handleNavigationCallback: (action: 'forward' | 'backward' | 'up' | 'down') => void
}

export class Canvas extends React.Component<CanvasProps, CanvasState> {
	size: {
		width:number
		height: number
	}
	numberOfSlides: number = 0
	context: CanvasContext

	static contextTypes = {
		handleNavigationCallback: PropTypes.func
	}

	constructor (props: CanvasProps) {
		super(props)
		this.recalculateScale = throttle(this.recalculateScale.bind(this), 100)
		this.size = {
			width: 960,
			height: Math.floor(960 / (props.aspectRatio))
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

	handleNavigationCallback(action: 'forward' | 'backward' | 'up' | 'down') : void {
		const fallback = () => {console.log(
			'It appears you are using Canvas outside a Presentation context. Please only use KeyboardControls inside <Presentation></Presentation>.'
		)}

		(this.context.handleNavigationCallback || fallback)(action)
	}

	componentWillMount() {
		this.setState({scale: 1})
		window.addEventListener('resize', this.recalculateScale)
	}

	enableTouchControl() {
		let domNode = ReactDOM.findDOMNode(this) as HTMLElement
		let hammer = new Hammer(domNode)
		hammer.get('swipe').set({direction: Hammer.DIRECTION_HORIZONTAL})
		hammer.on('swipe', this.handleSwipe)
	}

	handleSwipe(event : any) {
		if(event.type === 'swipe' && event.direction === Hammer.DIRECTION_LEFT) {
			this.handleNavigationCallback('forward')
		} else if(event.type === 'swipe' && event.direction === Hammer.DIRECTION_RIGHT) {
			this.handleNavigationCallback('backward')
		}
	}

	componentDidMount () {
		this.props.slidesLoadedCallback(this.numberOfSlides)
		this.enableTouchControl()
		this.recalculateScale()
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this.recalculateScale)
	}

	recalculateScale () {
		let domNode = ReactDOM.findDOMNode(this) as HTMLElement
		if(domNode) {
			let parent = domNode.parentNode as HTMLElement
			let scale = Math.min(parent.clientWidth / this.size.width, parent.clientHeight / this.size.height)
			this.setState({scale})
		}
	}

	getSlideState (n: number) : 'past' | 'future' | 'current' {
		return this.props.currentSlide > n
			? 'past'
			: this.props.currentSlide < n ? 'future' : 'current'
	}

	render () {
		this.numberOfSlides = 0

		let render = React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
			if(child.type === Slide || ((child.type as React.ComponentClass).prototype instanceof Slide)){
				return React.cloneElement(child, {
					state: this.getSlideState(this.numberOfSlides++)
				})
			}else{
				return child
			}
		})

		return (
			<div
				className={`${styles.stage} stage`}
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
