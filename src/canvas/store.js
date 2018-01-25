import {combineReducers} from 'redux'

const ActionTypes = {
	REPORT_NUMBER_OF_SLIDES: 'REPORT_NUMBER_OF_SLIDES',
	MOVE_TO_SLIDE: 'MOVE_TO_SLIDE'
}

const reportNumberOfSlides = numberOfSlides => ({
	type: ActionTypes.REPORT_NUMBER_OF_SLIDES,
	value: numberOfSlides
})

const moveToSlide = newSlideNumber => ({
	type: ActionTypes.MOVE_TO_SLIDE,
	value: newSlideNumber
})

function createReducer (initialState, handlers) {
	return function reducer (state = initialState, action) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action)
		} else {
			return state
		}
	}
}

const reducers = {
	reportNumberOfSlides: createReducer(0, {
		[ActionTypes.REPORT_NUMBER_OF_SLIDES] (state, action) {
			return action.value
		}
	}),
	moveToSlide: createReducer(0, {
		[ActionTypes.MOVE_TO_SLIDE] (state, action) {
			return action.value
		}
	})
}

export default combineReducers(reducers)
