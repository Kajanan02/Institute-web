import {combineReducers} from 'redux';


const settingReducer = (state = {toggle: false}, action) => {
    switch (action.type) {
        case 'TOGGLE':
            return {...state, toggle: action.payload};
        case "CONFIRMATION_DIALOG": {
            return {
                ...state,
                confirmationDialog: action.payload
            };
        }
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

const userDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_DETAIL':
            return {...state, data: action.payload};
        default:
            return state;
    }
}
const mqttDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case 'MQTT_DETAIL':
            return {...state, data: action.payload};
        default:
            return state;
    }
}

const reducers = combineReducers({
    setting: settingReducer,
    loader: loaderReducer,
    userDetail: userDetailReducer,
    mqttDetail: mqttDetailReducer
});

export default reducers;
