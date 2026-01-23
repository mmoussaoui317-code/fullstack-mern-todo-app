/**
 * XSS Protection 
 * manually sanitize the input
 * the xss library think logically not fully`
 */

function simpleSanitizer(input) {
    if(typeof input !== "string") return input;

    let clean = input.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, ''); // remove <script> tags/);
    clean = clean.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, ''); // remove <style> tags/);
    clean = clean.replace(/<link\b[^>]*>([\s\S]*?)<\/link>/gi, ''); // remove <link> tags/);
    clean = clean.replace(/<img\b[^>]*>([\s\S]*?)<\/img>/gi, ''); // remove <img> tags/);
    clean = clean.replace(/<iframe\b[^>]*>([\s\S]*?)<\/iframe>/gi, ''); // remove <iframe> tags/);

    

    const dangerousTags = ["iframe", "object", "embed", "link"];

    dangerousTags.forEach( tag => {
        const regex = new RegExp(`<${tag}\\b[^>]*>[\s\S]*?<\/${tag}>`, "gi");
        clean =  clean.replace(regex, '');
    });

    clean = clean.replace(/javascript:/gi, '');

    clean = clean.replace(/</g, '&lt;');
    clean = clean.replace(/>/g, '&gt;')

    return clean;


}


const testInputs = [
    "Hello <script>alert('XSS')</script> World",
    '<img src="x" onerror="alert(1)">',
    '<a href="javascript:alert(\'XSS\')">Click me</a>',
    'Normal text without XSS',
    '<iframe id=\'video\' src="javascript:alert(\'XSS\')">Hello This Is The XSS vulnerability</iframe>'
];

console.log('🔍 Testing our sanitizer:');
testInputs.forEach((input, i) => {
    const cleaned = simpleSanitizer(input);
    console.log(`Test ${i + 1}:`);
    console.log(`Input:  ${input}`);
    console.log(`Output: ${cleaned}`);
    console.log('---');
});
