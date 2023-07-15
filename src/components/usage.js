import React from 'react';
import Layout from "../layout/layout";
import {toggleConfirmationDialog} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";

function Usage(props) {

    const dispatch = useDispatch();

    const confirmationDialog = useSelector(state => {
        return state.setting.confirmationDialog
    });

    console.log(confirmationDialog)

    function handleDelete() {
        dispatch(toggleConfirmationDialog({
            isVisible: true,
            confirmationHeading: ('ARE YOU SURE YOU WANT TO DELETE THIS WATER SOURCE'),
            confirmationDescription: ('THE DELETE ACTION WILL REMOVE THE WATER SOURCE')
        }));
    }

    console.log()

    return (
        <Layout>
            <button className={"btn btn-primary m-5"} onClick={handleDelete}>asd</button>
        </Layout>
    );
}

export default Usage;