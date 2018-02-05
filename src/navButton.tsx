import * as React from 'react'
import * as PropTypes from 'prop-types'
import {pick, defaults} from 'lodash'

export interface NavButtonContext {
	isFirst: boolean
	isLast: boolean
	handleNavigationCallback: (action: 'forward' | 'backward' | 'up' | 'down') => void
}

export interface NavButtonProps {
	className: string
	children: any
	action: 'forward' | 'backward' | 'up' | 'down'
}

export class NavButton extends React.Component<NavButtonProps, {}> {
	static defaultProps = {
		className: ''
	}

	fallbackFunctionForCallback() {
		console.log(
			'It appears you are using NavButton outside a Presentation context. Please only use NavButton inside <Presentation></Presentation>.'
		)
	}

	context: NavButtonContext

	static contextTypes = {
        isFirst: PropTypes.bool,
				isLast: PropTypes.bool,
				handleNavigationCallback: PropTypes.func
    }

	render () {
		const context = {
			isFirst: this.context.isFirst,
			isLast: this.context.isLast,
			handleNavigationCallback: this.context.handleNavigationCallback || this.fallbackFunctionForCallback
		}
		let addonClasses = [this.props.className]
		if (context.isFirst) addonClasses.push('first')
		if (context.isLast) addonClasses.push('last')

		return (
			<button
				onClick={context.handleNavigationCallback.bind(
					this,
					this.props.action
				)}
				className={addonClasses.join(' ')}
			>
				{this.props.children}
			</button>
		)
	}
}

export default NavButton
