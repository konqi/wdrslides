import React from 'react'
import PropTypes from 'prop-types'
import styles from './slide.css'

class Slide extends React.Component {
	render () {
		return (
			<div
				role="Slide"
				className={styles.slide + ' ' + styles[this.props.state]}
			>
				<div className={styles.body}>{this.props.children}</div>
			</div>
		)
	}
}

// transform: `translate3d(${this.props.x * 100}%, ${this.props.y *	100}%, ${this.props.z * 100}px)`,

Slide.propTypes = {
	state: PropTypes.oneOf(['past', 'current', 'future']),
	children: PropTypes.any
}

Slide.contextTypes = {
	aspectRatio: PropTypes.number,
	border: PropTypes.number
}

Slide.defaultProps = {
	state: 'future'
}
export default Slide
