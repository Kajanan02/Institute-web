import React from "react";
import {useSelector} from "react-redux";
import {PropagateLoader} from "react-spinners";


const Loader = (props) => {
    const isLoading = useSelector(state => {
        return state.loader.isLoading
    });


    return (

        <div hidden={!isLoading}
             className={(!isLoading && !props.load) ? "loader-model-bg-hidden" : "loader-model-bg-visible"}>
            <div className="sa-modal-bg-inner">
                <div className="loader-model">
                    <div className="container">
                        <div className={"sa-modal-bg loader " + ((!isLoading && !props.load) && 'hide')}>
                            <div className="sa-modal-bg-inner">
                                <div className="container">
                                    <div className="sweet-loading d-flex justify-content-center">
                                        <PropagateLoader
                                            size={20}
                                            color={"#22C687 "}
                                            loading={true}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
};

export default Loader
