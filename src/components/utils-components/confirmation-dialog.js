import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import FeatherIcon from "feather-icons-react";
import FormHandler from "../../utils/FormHandler";

import {toggleConfirmationDialog} from "../../redux/actions";
import {validateConfirmationDialog, validateConfirmationDialogNoValidation} from "../../utils/validation";


const ConfirmationDialog = () => {
  const dispatch = useDispatch();
  const [multiSelectValues, setMultiSelectValues] = useState([])

  const confirmationDialog = useSelector(state => {
    return state.setting.confirmationDialog
  });

  console.log(confirmationDialog)

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleOnBlur,
    initForm
  } = FormHandler(confirmationSuccess, confirmationDialog && confirmationDialog.showReasonField ? validateConfirmationDialog : validateConfirmationDialogNoValidation
  );


  function hideDialog() {
    dispatch(toggleConfirmationDialog({isVisible: false}));
  }

  function onConfirm() {
    handleSubmit()
  }

  useEffect(() => {
    if (confirmationDialog?.selectedData) {
      setMultiSelectValues(confirmationDialog.selectedData)
    }
  }, [confirmationDialog])


  useEffect(() => {
    if (!confirmationDialog || confirmationDialog.isVisible) {
      return;
    }

    initForm({});
  }, [confirmationDialog]);

  function confirmationSuccess() {
    if (confirmationDialog && confirmationDialog.showReasonField) {
      dispatch(toggleConfirmationDialog({isVisible: false, onSuccess: true, reason: values.reason}));
    } else if (confirmationDialog.multipleDropDwn) {
      dispatch(toggleConfirmationDialog({isVisible: false, onSuccess: true, selectedValues: multiSelectValues}));
    } else {
      dispatch(toggleConfirmationDialog({isVisible: false, onSuccess: true}));
    }
  }

  return (
    confirmationDialog &&
    <div className={"sa-popup-bg " + (!confirmationDialog.isVisible && 'hide')}>
      <div className="sa-popup">
        <form className={'sa-modal-box-style'} onSubmit={handleSubmit} noValidate>
          <div className="sa-popup-header">
            <span className={'sa-model-heading'}>{confirmationDialog.confirmationMainHeading || "CONFIRMATION"}</span>
            <div className="sa-popup-close-icon" onClick={hideDialog}><FeatherIcon className={"sa-modal-close-icon"}
                                                                                   icon={"x"}/>
            </div>
          </div>
          <div className="sa-modal-content p-l-16 pr-4">
            <div
              className={"warning-heading text-red"}>{confirmationDialog.confirmationHeading || "Are you sure you want to delete this?"}</div>
            <div
              className={"warning-text"}>{confirmationDialog.confirmationDescription || "The delete action can't be undone and the content will be permanently gone."}
            </div>

            {/*{confirmationDialog.multipleDropDwn &&*/}
            {/*  <div className="multie-select-conform form-group m-b-16">*/}
            {/*    <Typeahead*/}
            {/*      id="basic-typeahead-multiple"*/}
            {/*      labelKey={option => option}*/}
            {/*      onChange={(selected) => {*/}
            {/*        setMultiSelectValues(selected)*/}

            {/*      }}*/}
            {/*      multiple={true}*/}
            {/*      disabled={confirmationDialog.disabled}*/}
            {/*      options={confirmationDialog.multipleOptions}*/}
            {/*      placeholder={"Select Services"}*/}
            {/*      selected={multiSelectValues}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*}*/}
          </div>
          {(confirmationDialog.type && confirmationDialog.type == "request") ?
            (<div className="sa-popup-btn">
              <button type={"button"} className="sa-popup-secondary-btn-style sa-popup-cancel-btn-style"
                      onClick={hideDialog}>{"Cancel"}
              </button>
              <button className="sa-popup-secondary-btn-style btn-sa-danger">{"Ok"}</button>
            </div>) :
            (<div>
              {confirmationDialog && confirmationDialog.showReasonField &&
                <div className={'p-l-16 m-t-40'}>
                  <div className="form-group m-b-16 col-md-6 deleteReason">
                    <select
                      className={`form-control ${errors.reason && "warning-input"}`}
                      name="reason"
                      value={values.reason || ''}
                      onBlur={handleOnBlur} onChange={handleChange}>
                      <option value={""} hidden>{confirmationDialog.reasonTitle || "Please select the reason"}</option>
                      {
                        confirmationDialog.reasons.map(item => (
                          <option
                            value={item} key={item}>{item}</option>
                        ))

                      }
                    </select>
                    {errors.reason && (
                      <p className="warning-input-msg ">{errors.reason}</p>)}
                  </div>
                </div>
              }


              <div className="sa-popup-btn" style={{paddingTop: 16}}>
                <button className="sa-popup-secondary-btn-style sa-popup-cancel-btn-style" type={"button"}
                        onClick={hideDialog}>{"Cancel"}</button>
                <button
                  className={confirmationDialog.successButtonClass ? "btn w-120p " + confirmationDialog.successButtonClass : "sa-popup-secondary-btn-style btn-sa-danger w-120p"}
                >{confirmationDialog.successButtonText || "DELETE"}</button>
              </div>
            </div>)
          }
        </form>
      </div>
    </div>


  );

};

export default ConfirmationDialog
