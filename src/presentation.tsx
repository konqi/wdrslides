import * as React from 'react'
import * as PropTypes from 'prop-types'
// import {Provider} from 'react-redux'

// import {createStore} from 'redux'
// import PresentationStore from './store'
// store: any
// this.store = createStore(PresentationStore)

export interface PresentationProps extends React.Props<Presentation> {
}

export interface PresentationState {
	position: number
	total: number
}

export interface PresentationContext {
	currentSlide: number
	totalNumberOfSlides: number
	handleNavigationCallback: (action: 'forward' | 'backward' | 'up' | 'down') => void
	isFirst: boolean
	isLast: boolean
}

export class Presentation extends React.Component<PresentationProps, PresentationState> {
	constructor (props: PresentationProps) {
		super(props)
		this.state = {position: 0, total: 0}
		this.handleNavigation = this.handleNavigation
	}

	getChildContext() : PresentationContext {
		return {
			currentSlide: this.state.position,
			totalNumberOfSlides: this.state.total,
			handleNavigationCallback: this.handleNavigation.bind(this),
			isFirst: this.state.position <= 0,
			isLast: this.state.position + 1 >= this.state.total
		}
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

	slidesLoadedCallback (numberOfSlides: number) {
		this.setState({total: numberOfSlides})
	}

	render () {
		return React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
			if(typeof child.type === 'string'){
				return child
			} else {
			return React.cloneElement(child, {
				slidesLoadedCallback: this.slidesLoadedCallback.bind(this),
				currentSlide: this.state.position
			})
			}
		})
	}

	static childContextTypes = {
		currentSlide: PropTypes.number,
		totalNumberOfSlides: PropTypes.number,
		handleNavigationCallback: PropTypes.func,
		isFirst: PropTypes.bool,
		isLast: PropTypes.bool
	}
}

export default Presentation
