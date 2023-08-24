import React from 'react';
import User from "../../assets/BasicDetails.svg";
import FeatherIcon from "feather-icons-react";

function ToggleLayout({
                          title, image, toggleIndex, visibleToggleIndex, onVisibleToggleIndexChange,
                          children, feather, featherclass
                      }) {


    return (
        <div className="container text-left pt-3">
            <div className={`accordion-section ${visibleToggleIndex.includes(toggleIndex) ? 'open' : ''}`}>
                <div className="accordion-header" onClick={() => onVisibleToggleIndexChange(toggleIndex)}>
                    <div className={"d-flex align-items-center"}>
                        <div className={"image-container-toggle me-3"}>
                            {image && <img src={User} width={'24px'}
                                           className={visibleToggleIndex.includes(toggleIndex) ? 'toggle-icon-active' : null}/>}
                            {feather && <FeatherIcon icon={feather}
                                                     className={featherclass + ' ' + (visibleToggleIndex.includes(toggleIndex) ? 'toggle-active-feather' : null)}/>}
                        </div>
                        <div
                            className={"toggleLayout-heading " + (visibleToggleIndex.includes(toggleIndex) ? 'toggle-text-green' : 'text-dark-gray')}>{title}</div>
                    </div>
                    <div className="dropdown-icon ">
                        <FeatherIcon icon={visibleToggleIndex.includes(toggleIndex) ? "chevron-up" : "chevron-up"}/>
                    </div>
                </div>
                {visibleToggleIndex.includes(toggleIndex) && children}
            </div>
        </div>
    );
}

export default ToggleLayout;