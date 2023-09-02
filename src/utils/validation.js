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

    if (!values.name) {
        errors.name = "Name is Required"
    }
    if (!values.nicNo) {
        errors.nicNo = "NIC No is Required"
    }
    if (!values.address) {
        errors.address = "Address is Required"
    }
    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is not valid';
    }
    if (!values.phoneNumber) {
        errors.phoneNumber = 'Contact No is required';
    } else if (!values.phoneNumber.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)) {
        errors.phoneNumber = 'Contact No is not valid';
    }
    if (!values.gender) {
        errors.gender = "Gender is Required"
    }
    if (!values.dob) {
        errors.dob = "Date of Birth is Required"
    }
    if (!values.subjects) {
        errors.subjects = "Subjects is Required"
    }

    return errors;
}
export function validateLogin(values) {
    let errors = {};

    if (!values.email) {
        errors.email = 'Email is Required';
    }else  if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is not valid';
    }
    if (!values.password) {
        errors.password = "Password is Required"
    }
    return errors;
}

export function validateParent(values) {
    console.log(values)
    let errors = {};

    if (!values.name) {
        errors.name = "Name is Required"
    }
    if (!values.nicNo) {
        errors.nicNo = "NIC No is Required"
    }
    if (!values.address) {
        errors.address = "Address is Required"
    }
    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is not valid';
    }
    if (!values.phoneNumber) {
        errors.phoneNumber = 'Contact No is required';
    } else if (!values.phoneNumber.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)) {
        errors.phoneNumber = 'Contact No is not valid';
    }
    if (!values.gender) {
        errors.gender = "Gender is Required"
    }
    if (!values.dob) {
        errors.dob = "Date of Birth is Required"
    }
    if (!values.relationship) {
        errors.relationship = "Relationship is Required"
    }

    return errors;
}

export function validateEvent(values) {
    console.log(values)
    let errors = {};

    if (!values.title) {
        errors.title = "Title is Required"
    }
    if (!values.start) {
        errors.start = "Start Date is Required"
    }
    if (!values.end) {
        errors.end = "End Date is Required"
    }

    return errors;
}

export function validateStateappointment(values) {
    console.log(values)
    let errors = {};


    if (!values.parentName) {
        errors.parentName = "Parent Name is Required"
    }
    if (!values.studentName) {
        errors.studentName = "Student Name is Required"
    }
    if (!values.date) {
        errors.date = "Date is Required"
    }
    if (!values.time) {
        errors.time = "Time is Required"
    }
    if (!values.topic) {
        errors.topic = "Topic is Required"
    }
    if (!values.description) {
        errors.description = "Description is Required"
    }

    return errors;
}


export function validateStatepayment(values) {
    console.log(values)
    let errors = {};


    if (!values.studentName) {
        errors.studentName = "Student Name is Required"
    }
    if (!values.studentNIC) {
        errors.studentNIC = "Student NIC is Required"
    }
    if (!values.amount) {
        errors.amount = "Amount is Required"
    }
    if (!values.parentName) {
        errors.parentName = "Parent Name is Required"
    }
    if (!values.topic) {
        errors.topic = "Topic is Required"
    }
    if (!values.date) {
        errors.date = "Date is Required"
    }
    if (!values.time) {
        errors.time = "Time is Required"
    }

    if (!values.topic) {
        errors.topic = "Topic is Required"
    }
    if (!values.paymentMethod) {
        errors.paymentMethod = "Payment Method is Required"
    }


    return errors;
}