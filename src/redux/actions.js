export const changeToggle = (toggle) => {
    return {
        type: "TOGGLE",
        payload: toggle
    };
};

export const toggleLoader = (view) => {
    return {
        type: "TOGGLE_LOADER",
        payload: view
    };
};

export const toggleConfirmationDialog = (view) => {
    return {
        type: "CONFIRMATION_DIALOG",
        payload: view
    };
};
export const resetConfirmationDialog = () => {
    return {
        type: "CONFIRMATION_DIALOG",
        payload: null
    };
};

export const setUserDetail = (userDetail) => {
    return {
        type: "USER_DETAIL",
        payload: userDetail
    };
}
export const setMqttDetail = (mqttDetail) => {
    return {
        type: "MQTT_DETAIL",
        payload: mqttDetail
    };
}

