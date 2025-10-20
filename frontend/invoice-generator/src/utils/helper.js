

export const validateEmail=(email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email) return "email is reqired";
    if(!emailRegex.test(email)) return "Please enter a valid Email Address";
    return "";
};


export const validatePassword=(password)=>{
    if(!password) return "password is reqired";
    if(password.length<6) return "password must be at least 6 characters";
    return "";
};

