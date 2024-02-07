const validate = (name, phone, comment, setNameError, setPhoneError, setCommentError) => {
    const phonePattern = /^\d{9}$/;
    const isValidPhone = phonePattern.test(phone);

    let nameSuccess = true;
    let phoneSuccess = true;
    let commentSuccess = true;

    if(name.length === 0) {
        setNameError("* Name is required"); 
        nameSuccess = false;
    } else if(name.length < 3) {
        setNameError("* Not a valid name");
        nameSuccess = false;
    } else {
        setNameError(false);
    }

    if(phone.length === 0) {
        setPhoneError("* Phone is required");
        phoneSuccess = false;
    } else if(!isValidPhone) {
        setPhoneError("* Not a valid phone");
        phoneSuccess = false;
    } else {
        setPhoneError(false);
    }

    if(comment.length === 0) {
        setCommentError("* Comment is required");
        commentSuccess = false;
    } else {
        commentSuccess = true;
        setCommentError(false);
    }

    return nameSuccess && phoneSuccess && commentSuccess;
};

export default validate;