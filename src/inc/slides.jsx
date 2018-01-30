import React from 'react'
import included from './includeMe'
import {Slide} from '../canvas'

const intro = (
	<Slide>
		<span style={{textAlign: 'center'}}>
			<h1>wdslides.js</h1>
			<p>a webpack driven slide presenter</p>
			<p>
				<small>
          Source available on{' '}
					<a href="https://github.com/konqi/reimagined-umbrella">github</a>
				</small>
			</p>
		</span>
	</Slide>
)

const brag = (
	<Slide>
		<div style={{margin: '20px'}}>
			<h2>block content</h2>
			<p>
        Nowadays we are used to have presentations that have keywords somewhere
        centered on the screen. Which is great, but not necessary.
			</p>
			<p>
        The only thing that would be confusing is if the content were to appear
        somewhere unexpected, like at the lower top. Thus it is a good idea to
        vertically center content in presentations.<br />
        Sadly, this is basically the holy grail of web development and not as
        easy as it may sound.
			</p>
			<p>
        Lucky for you, basically all presentation frameworks do this for you, so
        you can concentrate on your content.
			</p>
		</div>
	</Slide>
)

const warning = (
	<Slide
		style={{
			top: 0,
			transform: 'translate3d(0, 0, 0)',
			margin: '20px'
		}}
	>
		<div style={{position: 'absolute', top: '400px', left: '50%'}}>
			<h3>but screw it</h3>
      you can place your content <br />
      where ever you please
		</div>
		<span style={{position: 'absolute', left: '85%'}}>Seriously!</span>
		<span style={{position: 'absolute', left: '85%', top: '13px'}}>
      everywhere!
		</span>
		<span style={{position: 'absolute', left: '25%', top: '250px'}}>
      You have been warned
		</span>
	</Slide>
)

const end = (
	<Slide style={{margin: '20px'}}>
		<h2>That is it</h2>
    Go create some nice presentations!
	</Slide>
)

export default [intro, included, brag, warning, end]
