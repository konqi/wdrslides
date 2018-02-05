# wdrslides

**W**ebpack **D**riven **R**eact **Slides** is a set of lightweight react
components to create presentations.

## Installation
Add the package from npm repository via

	npm i -S wdrslides

or

	yarn add wdrslides

## Usage

wdrslides syntax is super simple. Your first presentation could be as simple as:

	import React from 'react'
	import {render} from 'react-dom'
	import {
		Presentation,
		KeyboardControls,
		Canvas,
		Slide
	} from 'wdrslides' // import the basic elements

	const presentation = (
		<Presentation>
			<KeyboardControls />
			<Canvas aspectRatio={4 / 3}>
				<Slide>
					<h1>Hello World!</h1>
				</Slide>
				<Slide>
					<h1>Thank You and Goodbye!</h1>
				</Slide>
			</Canvas>
		</Presentation>
	)

	render(presentation, document.getElementById('root'))

Your index.html should look something like this:

	<!DOCTYPE html>
	<html lang="en">
	  <head>
	    <meta charset="utf-8">
	    <title>Presentation Title</title>
			<style type="text/css">
			body {  // increase font size, make background dark
				font-size: 2em;
				background-color: black;
			}

			#root { // use all of the available space
				position: absolute;
				top:0;
				right:0;
				bottom:0;
				left:0;
			}

			.stage { // set presentation background and border
				border: 1px solid #2d4759;
				background-color: #fff;
			}
			</style>
	  </head>
	  <body>
	    <div id='root'/>
	  </body>
	</html>


## Keyboard Navigation

The *KeyboardControls* component adds event listeners to key presses.
It allows navigation with the arrow, space and backspace keys.

## Mouse Navigation

Keyboard control doesn't do the trick for you?
Add navigation buttons like this:

	<ProgressBar />
	<div className="navigation">
		<NavButton action="backward">«</NavButton>
		<Progress />
		<NavButton action="forward">»</NavButton>
	</div>

Add styles to your index.html

	.progressbar {
		height: 5px;
		background-color: #7dcbff;
		transition: width 0.5s ease-in-out;
		top: 100%;
		position: absolute;
		transform: translateY(-5px);
	}

	.navigation {
		z-index: 999;
		width: 100%;
		text-align: right;
		position: absolute;
		top: 100%;
		transform: translateY(-100%);
		font-size: 1em;
	}

## Full Example

See the [demo branch](https://github.com/konqi/reimagined-umbrella/tree/demo) of this repository.

## Extend

If you wish to add external content to your slides you can use various loaders for webpack.
I recommend taking a look at [markdown-loader](https://github.com/peerigon/markdown-loader) and [html-loader](https://github.com/webpack-contrib/html-loader).

You can also extend wdrslides however you wish.
To get started you may want to look at the Progress components.
