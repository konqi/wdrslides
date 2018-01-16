import React from 'react'
import {render} from 'react-dom'
import {Canvas, Slide, NavButton, KeyboardControls} from './canvas'
import styles from './main.css'
// <button onClick={this.moveTo.bind(this, -1)}>&laquo;</button>
// <button onClick={this.moveTo.bind(this, +1)}>&raquo;</button>

const slides = (
	<Canvas>
		<div className={styles.nav}>
			<KeyboardControls />
			<NavButton action="back">«</NavButton>
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
