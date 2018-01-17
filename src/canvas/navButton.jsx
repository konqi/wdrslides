// @flow
import React from 'react'
import PropTypes from 'prop-types'
// import styles from './navButton.css'

class NavButton extends React.Component {
	constructor (props, context) {
		super(props, context)

		if (!context.handleNavigation) {
			console.log(
				'It appears you are using NavButton outside a Canvas context. Please only use NavButton inside <Canvas></Canvas>.'
			)
		}
	}
	render () {
		let addonClasses = []
		if (this.context.isFirst) addonClasses.push('first')
		if (this.context.isLast) addonClasses.push('last')

		return (
			<button
				onClick={this.context.handleNavigation.bind(this, this.props.action)}
				className={addonClasses.join(' ')}
			>
				{this.props.children}
			</button>
		)
	}
}

NavButton.propTypes = {
	children: PropTypes.any,
	action: PropTypes.oneOf(['forward', 'backward', 'up', 'down'])
}

NavButton.contextTypes = {
	handleNavigation: PropTypes.func,
	isFirst: PropTypes.bool,
	isLast: PropTypes.bool,
	position: PropTypes.number
}

export default NavButton
