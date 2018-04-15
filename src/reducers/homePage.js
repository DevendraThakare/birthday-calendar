import { createReducer } from "./createReducer";
const initialState = {
    calendarData: null,  // Used from global var
    selectedYear: null
}
export default createReducer(initialState, {
    SET_CALENDERS: (state, payload) => {
        return Object.assign({}, state, { calendarData: payload.calendarData })
    },
    SET_SELECTED_YEAR: (state, payload) => {
        return Object.assign({}, state, { selectedYear: payload })
    },
    SET_SELECTED_JSON_STRING: (state, payload) => {
        return Object.assign({}, state, { selectedJSONString: payload })
    }
})