// index.js
// import & export is ES6 that doesn't work in the browser
// but webpack would replace them with compatible wrapper code
// import _ from 'lodash';
// module {1} on main.js
var _ = require('lodash');

// module {0} on main.js
function component () {
    var element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML = _.join(['Hello','webpack'], ' ');

    return element;
}

document.body.appendChild(component());