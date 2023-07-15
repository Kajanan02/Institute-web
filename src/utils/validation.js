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
