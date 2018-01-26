import * as React from 'react'

export interface Props {
	className: string
	isFirst: boolean
	isLast: boolean
	children: any
	handleNavigationCallback: (action: 'forward' | 'backward' | 'up' | 'down') => void
	action: 'forward' | 'backward' | 'up' | 'down'
}

export class NavButton extends React.Component<Props, {}> {
	static defaultProps = {
		className: '',
		handleNavigationCallback: () => {
			console.log(
				'It appears you are using NavButton outside a Presentation context. Please only use NavButton inside <Presentation></Presentation>.'
			)
		}
	}

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

export default NavButton
