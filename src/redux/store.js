import {createStore} from "redux";
import reducer from "./reducer";

export const store = createStore(reducer, {
    setting: {
        toggle: false,
        confirmationDialog: {},
    },
    loader: {
        isLoading: false,
    },
    userDetail: {
        data: {},
    },
    mqttDetail: {
        data: {},
    }
})