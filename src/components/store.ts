import {combineReducers} from 'redux'
import {createAction} from 'typesafe-actions'

const ActionTypes = {
	REPORT_NUMBER_OF_SLIDES: 'REPORT_NUMBER_OF_SLIDES',
	MOVE_TO_SLIDE: 'MOVE_TO_SLIDE'
}

export type SingleParamActionType = {
	type: string
	value: number
}

const reportNumberOfSlides = createAction(
	ActionTypes.REPORT_NUMBER_OF_SLIDES,
	(numberOfSlides: number) => ({
		type: ActionTypes.REPORT_NUMBER_OF_SLIDES,
		value: numberOfSlides
	})
)

const moveToSlide = createAction(
	ActionTypes.MOVE_TO_SLIDE,
	(newSlideNumber: number) => ({
		type: ActionTypes.MOVE_TO_SLIDE,
		value: newSlideNumber
	})
)

function createReducer(
	initialState: any,
	handlers: {[key: string]: (...args: any[]) => any}
) {
	return function reducer(state = initialState, action: any) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action)
		} else {
			return state
		}
	}
}

const reducers = {
	reportNumberOfSlides: createReducer(0, {
		[ActionTypes.REPORT_NUMBER_OF_SLIDES](
			state: any,
			action: SingleParamActionType
		) {
			return action.value
		}
	}),
	moveToSlide: createReducer(0, {
		[ActionTypes.MOVE_TO_SLIDE](state: any, action: SingleParamActionType) {
			return action.value
		}
	})
}

export default combineReducers(reducers)
