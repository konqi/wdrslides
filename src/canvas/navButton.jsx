// @flow
import React from 'react'
import PropTypes from 'prop-types'

class NavButton extends React.Component {
	render () {
		return (
			<button
				onClick={this.context.handleNavigation.bind(this, this.props.action)}
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
	handleNavigation: PropTypes.func
}

export default NavButton
