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

export function isInstituteAccount() {
    return localStorage.getItem('ROLE') === "1";
}

export function isParentAccount() {
    return localStorage.getItem('ROLE') === "3";
}

export function isStudentAccount() {
    return localStorage.getItem('ROLE') === "2";
}

export function isCareerAccess() {
    return ["2","3"].includes(localStorage.getItem('ROLE'));
}


