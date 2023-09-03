export function loadCredential(credential) {
    localStorage.setItem('ACCESS_TOKEN', credential.token);
    localStorage.setItem('EMAIL', credential.email);
    localStorage.setItem('PHONE', credential.phoneNumber);
    localStorage.setItem('ROLE', credential.role);
    localStorage.setItem('ADDRESS', credential.address);
    localStorage.setItem('PROFILE_PIC', credential.profilePic);
    localStorage.setItem('USER_ID', credential._id);
    localStorage.setItem('NAME', credential.name);
}

export function signOut() {
    localStorage.clear();
    console.log("Sign out")
}

export function getAccessToken() {
    return localStorage.getItem('ACCESS_TOKEN');
}

export function isAdminAccount() {
    return localStorage.getItem('ROLE') === "1";
}
export function isInstituteAccount() {
    return localStorage.getItem('ROLE') === "2";
}

export function isParentAccount() {
    return localStorage.getItem('ROLE') === "4";
}

export function isStudentAccount() {
    return localStorage.getItem('ROLE') === "3";
}

export function isCareerAccess() {
    return ["3","4","1"].includes(localStorage.getItem('ROLE'));
}

export function isReportAccess() {
    return ["3","4"].includes(localStorage.getItem('ROLE'));
}
export function isAppointmentAccess() {
    return ["2","4"].includes(localStorage.getItem('ROLE'));
}

export function getRoleName() {
    const role = localStorage.getItem("ROLE")
    switch (role) {
        case "1":
            return 'Admin';
        case "2":
            return 'Institute';
        case "3":
            return 'Student';
        case "4":
            return 'Parent';
        default:
            return 'Unknown Role';
    }
}

export function initialNavigate(role) {

    if (role === "2") {
        return "/"
    } else if (role === "3" || role === "4") {
        return "/student"
    } else {
        return "/institute"
    }
}

export function getName() {
    return localStorage.getItem('NAME');
}

