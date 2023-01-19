import { ProMaF } from "./ProMaF";

//match chars with regexp: /^[dkhl0-9\[\]\(\)\+\*\-\/]+$/.test(str)
//return true if includes bad char(s): !myStr.match(/^[dkhl0-9\[\]\(\)\+\*\-\/]+$/)
//  or !/^[dkhl0-9\[\]\(\)\+\*\-\/]+$/.test(myStr)

const checkParens = (s, open, close) => {
    let layers = 0;
    for (let i=0; i<s.length; i++){
        switch (s[i]) {
            case open:
                layers++;
                break;
            case close:
                if (layers > 0) {
                    layers--;
                } else {
                    return false;
                }
                break;
            default:
        }
    }
    return layers === 0;
}

const getParenContents = (s, start) => {
    let layers = 1;
    let i = start + 1;
    while (layers > 0) {
        switch (s[i]) {
            case '(':
                layers++;
                break;
            case ')':
                layers--;
                break;
            default:
        }
        i++;
        if (i >= s.length) {
            return '';
        }
    }
    return s.substring(start+1, i);
}

export default function parse(rollString) {
    //Accepts a string, returns a promise for ProMaF
    //Will probably be recursive
    // - Split string into parseable chunks and connectors
    // - Generate ProMaF for each chunk
    // - Combine chunks into complete ProMaF
    // - Complicated chunks will need to be parsed recursively
    // Parentheses set aside chunk to calculate recursively
    // Arithmetic operators + - * / link chunks to be parsed recursively then combined
    // - use PEMDAS, ugh.
    // remember: (typeof [ProMaF]) will return "object"
    // - ProMaF objects should be the only objects in the split-to-chunks array
    // TODO: Check character, parentheses/brackets validity ONCE, then use subParse() recursively
    return new Promise(function(myResolve, myReject) {
        if (!/^[dkhl0-9[]()\+\*-\/]+$/.test(rollString)) {
            myReject("Invalid characters")
        } else if (checkParens(rollString, '(', ')') === false) {
            myReject("Unmatched parentheses");
        } else if (checkParens(rollString, '[', ']')) {
            myReject("Unmatched brackets")
        };
    })
}