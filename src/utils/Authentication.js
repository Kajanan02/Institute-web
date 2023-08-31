export function loadCredential(credential) {
    localStorage.setItem('ACCESS_TOKEN', credential.token);
    localStorage.setItem('EMAIL', credential.email);
    localStorage.setItem('PHONE', credential.phoneNumber);
    localStorage.setItem('ROLE', credential.role);
    localStorage.setItem('REF_COUNT', credential.references.length);
    localStorage.setItem('REFERENCES', credential.references);
    localStorage.setItem('USER_ID', credential._id);
    localStorage.setItem('NAME', credential.name);
}