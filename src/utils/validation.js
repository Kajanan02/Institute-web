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

    if (!values.username) {
        errors.username = 'Username is is Required';
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

export function validatePay(values){
    let errors = {};
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

    if (!values.regNo) {
        errors.regNo = "Reg.Nois Required"
    }
    if (!values.amount) {
        errors.amount = 'Amount is required';
    } else if (isNaN(values.amount) || parseFloat(values.amount) <= 0) {
        errors.amount = 'Amount must be a valid positive number';
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

export function validateinstitutesetting(values) {
    console.log(values)
    let errors = {};

    if (!values.firstname) {
        errors.firstname = " First Name is Required"
    }
    if (!values.lastname) {
        errors.lastname = "Last name  is Required"
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

    if (!values.currentPassword) {
        errors.currentPassword = "Current Password is Required"
    }
    if (!values.newPassword) {
        errors.newPassword = " New Password is Required"
    }


    return errors;
}


export function validatemarks(values) {
    console.log(values)
    let errors = {};

    if (!values.nicNo) {
        errors.nicNo = "Reg.No is Required"
    }
    if (!values.subject) {
        errors.subject = "Subjects is Required"
    }

    if (!values.marks) {
        errors.marks = 'Marks is required';
    } else if (isNaN(values.marks) || parseFloat(values.marks) <= 0) {
        errors.marks = 'Marks must be a valid positive number';
    }

    if (!values.date) {
        errors.date = "Date Of Exam is Required"
    }

    return errors;
}

export function validateStudentSettings(values) {
    console.log(values)
    let errors = {};

    if (!values.firstname) {
        errors.firstname = "Name is Required"
    }
    if (!values.lastname) {
        errors.lastname = "Name is Required"
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
    return errors;
}
export function validateStudentPasswordSettings(values) {
    console.log(values)
    let errors = {};


    if (!values.newPassword) {
        errors.newPassword = "Please enter new password"
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Please enter current password"
    }
    return errors;
}

export function validateinstitute(values) {
    console.log(values)
    let errors = {};


    if (!values.name) {
        errors.name = "Name is Required"
    }

    if (!values.email && !/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is not valid';
    }
    if (!values.phoneNumber) {
        errors.phoneNumber = 'Contact No is required';
    } else if (!values.phoneNumber.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)) {
        errors.phoneNumber = 'Contact No is not valid';
    }
    if (!values.address) {
        errors.address = "Address is Required"
    }
    return errors;
}
export function validateCareer(values) {
    console.log(values)
    let errors = {};


    if (!values.course) {
        errors.course = "Course is Required"
    }
    if (!values.degreeProgramme) {
        errors.degreeProgramme = "Degree Programme is Required"
    }
    if (!values.availableUniversities) {
        errors.availableUniversities = "Available Universities is Required"
    }
    if (!values.medium) {
        errors.medium = "Medium of Instructions is Required"
    }
    if (!values.duration) {
        errors.duration = "Duration is required";
    } else if (!values.duration.match(/^[1-8]$/)) {
        errors.duration = 'Duration must be a number from 1 to 8';
    }
    if (!values.description) {
        errors.description = "Description is Required"
    }

    return errors;
}