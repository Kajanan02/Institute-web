export function validateConfirmationDialog(values) {
    let errors = {};
    if (!values.reason) {
        errors.reason = 'Reason is required';
    }

    return errors;
}
export function validateConfirmationDialogNoValidation(values) {
    let errors = {};

    return errors;
}
export function validateStudent(values) {
    console.log(values)
    let errors = {};

    if(!values.name){
        errors.name = "Name is Required"
    }
     if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is not valid';
    }
    if (!values.phoneNumber) {
        errors.phoneNumber = 'Mobile No is required';
    } else if (!values.phoneNumber.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)) {
        errors.phoneNumber = 'Mobile No is not valid';
    }

    return errors;
}
export function validateEvent(values) {
    console.log(values)
    let errors = {};

    if(!values.title){
        errors.title = "Title is Required"
    }
    if(!values.start){
        errors.start = "Start Date is Required"
    }
    if(!values.end){
        errors.end = "End Date is Required"
    }

    return errors;
}
