import React from 'react'
import {render} from 'react-dom'
import {Canvas, Slide, NavButton, KeyboardControls} from './canvas'
import styles from './main.css'

const slides = (
	<Canvas>
		<div className={styles.nav}>
			<KeyboardControls />
			<NavButton action="backward">«</NavButton>
			<NavButton action="forward">»</NavButton>
		</div>

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
)

render(slides, document.getElementById('root'))
