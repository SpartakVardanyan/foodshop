export const validate = (email, password, setEmailError, setPasswordError, users) => {
    let item = users.find(user => user.data.email === email);
    
    if (!item) {
        setEmailError("Invalid email");
        return { answer: false };
    }
    setEmailError(false);
    
    if (item.data.password !== password) {
        setPasswordError("Invalid password");
        return { answer: false };
    }
    setPasswordError(false);
    
    return { answer: true, uid: item.data.email };
};