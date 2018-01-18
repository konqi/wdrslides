// @flow
import React from 'react'
import PropTypes from 'prop-types'

class NavButton extends React.Component {
	render () {
		let addonClasses = [this.props.className]
		if (this.props.isFirst) addonClasses.push('first')
		if (this.props.isLast) addonClasses.push('last')

		return (
			<button
				onClick={this.props.handleNavigationCallback.bind(
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

NavButton.propTypes = {
	children: PropTypes.any,
	action: PropTypes.oneOf(['forward', 'backward', 'up', 'down']),
	className: PropTypes.string,
	handleNavigationCallback: PropTypes.func,
	isFirst: PropTypes.bool,
	isLast: PropTypes.bool
}

NavButton.defaultProps = {
	className: '',
	handleNavigationCallback: () => {
		console.log(
			'It appears you are using NavButton outside a Presentation context. Please only use NavButton inside <Presentation></Presentation>.'
		)
	}
}

export default NavButton
