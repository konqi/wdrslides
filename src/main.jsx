import React from 'react'
import {render} from 'react-dom'
import {
	Presentation,
	Canvas,
	Slide,
	NavButton,
	KeyboardControls,
	Progress,
	ProgressBar
} from './canvas'
import styles from './main.css'

// <Provider store={this.store}>
const slides = (
	<Presentation>
		<KeyboardControls />

		<Canvas aspectRatio={4 / 3}>
			<ProgressBar />
			<div className="navigation">
				<NavButton action="backward">«</NavButton>
				<Progress />
				<NavButton action="forward">»</NavButton>
			</div>

			<Slide className={styles.centered}>
				<span style={{textAlign: 'center'}}>
					<h1>Hello World!</h1>
					<p>Lets just add</p>
					<p>a little more text</p>
					<p>to see how the positioning behaves.</p>
				</span>
			</Slide>
			<Slide>
				<div style={{margin: '20px'}}>
					<h2>Ok, Computer.</h2>
					<p>by Radiohead</p>
				</div>
			</Slide>
			<Slide>
				<h3>i forgot</h3>
			</Slide>
		</Canvas>
	</Presentation>
)

render(slides, document.getElementById('root'))
