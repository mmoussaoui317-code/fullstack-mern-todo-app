export function dataFormValidation(dataObjFrom) {
    const keys = Object.keys(dataObjFrom);
    let validity = {};
        validity = { valid: true, errors: {}}
    keys.forEach(key => {

        if(key != 'description' && dataObjFrom[key].trim().length === 0) {
            validity = { valid: false, errors: {  ...validity.errors, [key]: `The ${key} Is Required!` }};
            return validity;
        }

        if (key.toLocaleLowerCase() === 'username' &&  key.toLowerCase().length < 3) {
            validity = {valid: false, errors: { ...validity.errors, [key]: `The ${key} Must Be at least 3 characters!!` }}; return;
        }

        if(key.toLocaleLowerCase() === "title" && dataObjFrom[key].trim().length > 100) {
            validity = {valid: false, errors: { ...validity.errors, [key]: `The ${key} Must Be Less Then 100 Chars!!` }}; return;
        }

        if(key.toLowerCase() === "description" && dataObjFrom[key].trim().length > 1000) {
            validity = { valid: false, errors: { ...validity.errors, [key]: `The ${key} Must Be Less Then 1000 Chars` }}; return;
        }

        if(key.toLowerCase() === "email" && !(/\w+@\w+\.\S+/.test(dataObjFrom[key].trim())) ) {
            validity = { valid: false, errors: { ...validity.errors, [key]: `The ${key} Format Is Incorrect!` }}; return;
        }

        if(key.toLowerCase() === "password" && !(/[\w\d-]{8,}/.test(dataObjFrom[key].trim()))) {
            validity = { valid: false, errors: { ...validity.errors, [key]: `The ${key} Must contain chars and numbers and bigger then 8 chars`}}; return;
        }

        if (key.toLocaleLowerCase() === 'confirmPassword'.toLocaleLowerCase() && dataObjFrom[key].trim() !== dataObjFrom['password'].trim()) {
            validity = { valid: false, errors: { ...validity.errors, [key]: `Passwords do not match`}}; return;
        }

    });

    return validity;
}


// export const validationFrom = (inputContent) => {
//     let validity = {valid: true};
//     if(inputContent.title.trim().length > 100) {
//         validity = {...validity, valid: false, title: "Title Must be Less Then 100 Characters!!"};
//     } else if(inputContent.description.trim() > 1000) {
//         validity = {...validity, valid: false, description: "Description Must be Less Then 1000 Characters!!"};
//         validity = false;
//     } else {
//         validity = {valid: true};
//     }

//     return validity;
// }

// const dataFormValidation = () => {
//     let valid = true;
//     if(email.trim() === '') {
//         setErrors(prv => { return {...prv, email: "The Email Is Required !!"} });
//         valid = false;
//     } else if(!(/^\w+@\w+\.com/.test(email.trim()))) {
//         setErrors(prv => { return {...prv, email: "Your Email Doesn't respect Format" } })
//         valid = false;
//     }

//     if(password.trim() === '') {
//         setErrors(prv => { return {...prv, password: "Password Is Required"}});
//         valid = false;
//     } else if(!(/\w+\d+/.test(password.trim())) || password.toString().length < 8) {
//         setErrors(prv => { return {...prv, password: "Password Must bigger then 8 char and has just chars and numbers"} });
//         valid = false;
//     }
//     return valid;
// }


// const validateForm = () => {
//         const newErrors = {};
        
//         if (!formData.username.trim()) {
//             newErrors.username = 'Username is required';
//         } else if (formData.username.length < 3) {
//             newErrors.username = 'Username must be at least 3 characters';
//         }
        
//         if (!formData.email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = 'Email is invalid';
//         }
        
//         if (!formData.password) {
//             newErrors.password = 'Password is required';
//         } else if (formData.password.length < 8) {
//             newErrors.password = 'Password must be at least 8 characters';
//         }
        
//         if (formData.password !== formData.confirmPassword) {
//             newErrors.confirmPassword = 'Passwords do not match';
//         }
        
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };
