import * as React from 'react'
import {Slide} from '../components'
import includedHtml from './includeHTMLSample.html'
import includedMarkdown from './includedMarkdownSample.md'

export default [
	<Slide key="1">
		<div
			style={{margin: '20px'}}
			dangerouslySetInnerHTML={{
				__html: includedHtml
			}}
		/>
	</Slide>,
	<Slide key="2">
		<div
			style={{margin: '20px'}}
			dangerouslySetInnerHTML={{
				__html: includedMarkdown
			}}
		/>
	</Slide>
]
