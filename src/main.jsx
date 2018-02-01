import React from 'react'
import {render} from 'react-dom'
import {
	Presentation,
	Canvas,
	NavButton,
	KeyboardControls,
	Progress,
	ProgressBar
} from './components'
import slides from './inc/slides'

const presentation = (
	<Presentation>
		<KeyboardControls />

		<Canvas aspectRatio={4 / 3}>
			<ProgressBar />
			<div className="navigation">
				<NavButton action="backward">«</NavButton>
				<Progress />
				<NavButton action="forward">»</NavButton>
			</div>
			{slides.map((slide, index) => {
				return React.cloneElement(slide, {key: index})
			})}
		</Canvas>
	</Presentation>
)

render(presentation, document.getElementById('root'))
