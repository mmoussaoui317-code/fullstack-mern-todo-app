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


export function dataFormValidation(dataObjFrom) {
    const keys = Object.keys(dataObjFrom);
    let validity = {};

    keys.forEach(key => {

        if(dataObjFrom[key].trim().length === 0) {
            validity = { valid: false, errors: {  [key]: `The ${key} Is Required!` }};
            return validity;
        }

        if(key.toLocaleLowerCase() === "title" && dataObjFrom[key].trim().length > 100) {
            validity = {valid: false, errors: { [key]: `The ${key} Must Be Less Then 100 Chars!!` }}
        } else if(key.toLowerCase() === "description" && dataObjFrom[key].trim().length > 1000) {
            validity = { valid: false, errors: { [key]: `The ${key} Must Be Less Then 1000 Chars` } }
        } else if(key.toLowerCase() === "email" && !(/^\w+@\w+\.com/.test(dataObjFrom[key].trim())) ) {
            validity = { valid: false, errors: {  [key]: `The ${key} Format Is Incorrect!` } }
        } else if(!(/[\w\d]{8}/.test(dataObjFrom[key].trim()))) {
            validity = { valid: false, errors: { [key]: `The ${key} Must contain chars and numbers and bigger then 8 chars`}  }
        } else {
            validity = { valid: true, errors: {} }
        }
    });

    return validity;
}