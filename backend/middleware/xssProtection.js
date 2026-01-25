const xss = require('xss');
const { sanitizeObject } = require('../utils/sanitizer');


function xssProtection(req, res, next) {
    try {
        if(req.body && req.method === 'POST') {
            Object.keys(req.body).forEach(key => {
                req.body[key] = xss(req.body[key], {
                whiteList: {}, // don't allow any tags
                stripIgnoreTag: true, // ignore all tags
                stripIgnoreTagBody: ['script', 'object', 'iframe', 'canvas', 'embed', 'link'] // delete all dangerous tags
                });
            });
            req.body = sanitizeObject(req.body);
        }
    } catch(error) {
        return res.status(500).json({ message: "error" });
    }
    /**
     * this statement is doing an error if use it with the next
     * so i will comment it
     * the res sent response
     * and the next is the next middleware
     * so give the Errors cannot set headers after they are sent
     */
    // res.status(200).json({ message: "viewed is right!!!" });
    next();
}


module.exports = xssProtection;


/**
 * -------------------------------------------------------
 * ************* for way i comment this code *************
 * -------------------------------------------------------
 * Creation of the middleware to protect against XSS
 * but i want to do 2 floor of it
 * by using the sanitizeObject
 * and XSS sanitizer
 */
// const xssProtection = (req, res, next) => {
//     if(req.body) {
//         req.body = sanitizeObject(req.body);
//     }
//     if(req.query) {
//         req.query = sanitizeObject(req.query);
//     }
//     next(res);
// }
// module.exports = xssProtection;
// // const sanitizeInput = (input) => {
// //     if (typeof input === 'string') {
// //         return xss(input, {
// //             whiteList: {}, // لا تسمح بأي tags
// //             stripIgnoreTag: true, // إزالة جميع tags
// //             stripIgnoreTagBody: ['script'] // إزالة محتوى script
// //         });
// //     }
// //     return input;
// // };
// // const xssProtection = (req, res, next) => {
// //     if (req.body) {
// //         Object.keys(req.body).forEach(key => {
// //             req.body[key] = sanitizeInput(req.body[key]);
// //         });
// //     }
// //     next();
// // };
// // module.exports = xssProtection;