import * as React from 'react'
const styles = require('./slide.css')

export interface Props {
	state: 'past' | 'current' | 'future'
	children: any
	className: string,
	style: object
}

export class Slide extends React.Component<Props, {}> {
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
				<div className={`${styles.body} ${this.props.className}`} style={{...this.props.style}}>{this.props.children}</div>
			</div>
		)
	}

	static defaultProps = {
		state: 'future',
		className: ''
	}
}

export default Slide
