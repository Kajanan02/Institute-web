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
