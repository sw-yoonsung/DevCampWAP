import '../base.css';

var _ = require('lodash');

// module {0} on main.js
function component () {
    var element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML = _.join(['Hello','webpack'], ' ');

    return element;
}

document.body.appendChild(component());