import React from 'react'
import PropTypes from 'prop-types'
import styles from './slide.css'

class Slide extends React.Component {
	render () {
		return (
			<div
				role="Slide"
				className={[
					this.props.className,
					styles.slide,
					styles[this.props.state]
				].join(' ')}
			>
				<div className={styles.body}>{this.props.children}</div>
			</div>
		)
	}
}

// transform: `translate3d(${this.props.x * 100}%, ${this.props.y *	100}%, ${this.props.z * 100}px)`,

Slide.propTypes = {
	state: PropTypes.oneOf(['past', 'current', 'future']),
	children: PropTypes.any,
	className: PropTypes.string
}

Slide.defaultProps = {
	state: 'future',
	className: ''
}
export default Slide
