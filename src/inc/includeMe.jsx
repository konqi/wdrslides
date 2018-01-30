import * as React from 'react'
import {Slide} from '../canvas'
import includedContent from './includeSample.html'

export default (
	<Slide>
		<div
			style={{margin: '20px'}}
			dangerouslySetInnerHTML={{
				__html: includedContent
			}}
		/>
	</Slide>
)
