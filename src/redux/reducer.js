import {combineReducers} from 'redux';


const settingReducer = (state = {toggle: false}, action) => {
    switch (action.type) {
        case 'TOGGLE':
            return {...state, toggle: action.payload};
        default:
            return state;
    }
}
const loaderReducer = (state = {toggle: false}, action) => {
    switch (action.type) {
        case 'TOGGLE_LOADER':
            return {...state, isLoading: action.payload};
        default:
            return state;
    }
}

const reducers = combineReducers({
    setting: settingReducer,
    loader: loaderReducer,
});

export default reducers;
