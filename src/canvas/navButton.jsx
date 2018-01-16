import React from 'react'
import PropTypes from 'prop-types'

class NavButton extends React.Component {
	// @flow
	handleNavigation (action) {
		console.log(action)
		this.context.handleNavigation({forward: 1, back: -1}[action])
	}

	render () {
		return (
			<button onClick={this.handleNavigation.bind(this, this.props.action)}>
				{this.props.children}
			</button>
		)
	}
}

NavButton.propTypes = {
	children: PropTypes.any,
	action: PropTypes.string
}

NavButton.contextTypes = {
	handleNavigation: PropTypes.func
}

export default NavButton
