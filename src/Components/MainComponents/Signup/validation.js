export function validate(name, surname, email, password, repeatPassword, setNameError, setSurnameError, setEmailError, setPasswordError, setRepeatPasswordError, users) {
    let nameSuccess = true;
    let surnameSuccess = true;
    let emailSuccess = true;
    let passwordSuccess = true;
    let repeatPasswordSuccess = true;

    function existsEmail(mail) {
        for (const item of users) {
            if (item.data.email === mail) {
                return true;
            }
        }
        return false;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    if (name.trim() === '') {
        nameSuccess = false;
        setNameError('* Name is required');
    } else if (name.length < 3) {
        nameSuccess = false;
        setNameError('* Not a valid name');
    } else {
        setNameError(false);
    }

    if (surname.trim() === '') {
        setSurnameError('* Surname is required');
        surnameSuccess = false;
    } else if (surname.length < 3) {
        setSurnameError('* Not a valid surname');
        surnameSuccess = false;
    } else {
        setSurnameError(false);
    }

    if (email.trim() === '') {
        setEmailError('* Email is required');
        emailSuccess = false;
    } else if (!validateEmail(email)) {
        setEmailError('* Not a valid email');
        emailSuccess = false;
    } else if (existsEmail(email)) {
        setEmailError("* Email exists");
        emailSuccess = false;
    } else {
        setEmailError(false);
    }

    if (password.trim() === '') {
        setPasswordError('* Password is required');
        passwordSuccess = false;
    } else if (password.length < 6) {
        setPasswordError("* Password's length mustn't be lower than 6");
        passwordSuccess = false;
    } else {
        setPasswordError(false);
    }

    if (repeatPassword.trim() === '') {
        setRepeatPasswordError('* Repeat Password is required');
        repeatPasswordSuccess = false;
    } else if (password !== repeatPassword) {
        setRepeatPasswordError('* Passwords do not match');
        repeatPasswordSuccess = false;
    } else {
        setRepeatPasswordError(false);
    }


    return nameSuccess && surnameSuccess && emailSuccess && passwordSuccess && repeatPasswordSuccess;
}