import React from 'react'
import {render} from 'react-dom'
import {
	Presentation,
	Canvas,
	Slide,
	NavButton,
	KeyboardControls
} from './canvas'
import styles from './main.css'

const slides = (
	<Presentation>
		<div className={styles.nav}>
			<KeyboardControls />
			<NavButton action="backward">«</NavButton>
			<NavButton action="forward">»</NavButton>
		</div>

		<Canvas aspectRatio={4 / 3}>
			<Slide>
				<h1>Hello World!</h1>
			</Slide>
			<Slide>
				<h2>Ok, Computer.</h2>
				<p>by Radiohead</p>
			</Slide>
			<Slide>
				<h3>i forgot</h3>
			</Slide>
		</Canvas>
	</Presentation>
)

render(slides, document.getElementById('root'))
