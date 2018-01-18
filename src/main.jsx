import React from 'react'
import {render} from 'react-dom'
import {
	Presentation,
	Canvas,
	Slide,
	NavButton,
	KeyboardControls,
	Progress
} from './canvas'
import styles from './main.css'

const slides = (
	<Presentation>
		<KeyboardControls />
		<NavButton action="backward">«</NavButton>
		<Progress />
		<NavButton action="forward">»</NavButton>

		<Canvas aspectRatio={4 / 3}>
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
