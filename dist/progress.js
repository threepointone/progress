require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Ca9gtD":[function(require,module,exports){
var _ = require('fn'),
    duration = 1000;

function progress(el, config) {
    if (!(this instanceof progress)) {
        return new progress(el, config);
    }
    this.current = 0;
    this.parent = el || document.body;
    this.el = document.createElement('div');
    this.el.className = 'progress-bar';
    this.parent.appendChild(this.el);
    this.el.style.opacity = 1;    
}

_.extend(progress.prototype, {
    inc: function() {
        // increment randomly part of the way, never reaching finish
        if (!this.finished) {
            var to = this.current = this.current + Math.random() * 0.6 * (100 - this.current);
            this.el.style.width = to + '%';
            this.el.style.opacity = 1;
        }
    },
    end: function() {
        // finish the animation
        var t = this;
        this.finished = true;
        this.el.style.width = '100%';
        this.el.style.opacity = 0;
        setTimeout(function() {
            t.parent.removeChild(t.el);            
        }, duration);
    }
});


module.exports = progress;
},{"fn":3}],"./index.js":[function(require,module,exports){
module.exports=require('Ca9gtD');
},{}],3:[function(require,module,exports){
// fair caveat, this is code collected from various places, and I don't have tests yet. YET.

"use strict";

module.exports = {
    isValue: isValue,
    identity: identity,
    indexOf: indexOf,
    keys: keys,
    values: values,
    isArray: isArray,
    toArray: toArray,
    each: each,
    extend: extend,
    map: map,
    times: times,
    invoke: invoke,
    filter: filter,
    find: find,
    reduce: reduce,
    debounce: debounce,
    compose: compose,
    chain: chain
};

var slice = [].slice,
    has = {}.hasOwnProperty,
    toString = {}.toString;

function isValue(v) {
    return v != null;
}

function identity(x) {
    return x;
}

function indexOf(arr, obj) {
    if (arr.indexOf) {
        return arr.indexOf(obj);
    }
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i] === obj) {
            return i;
        }
    }
    return -1;
}

function keys(obj) {
    if (obj !== Object(obj)) {
        throw new TypeError('Invalid object');
    }
    var keys = [];
    for (var key in obj) {
        if (has.call(obj, key)) {
            keys.push(key);
        }
    }
    return keys;
}

function values(obj) {
    var values = [];
    for (var key in obj) {
        if (has.call(obj, key)) {
            values.push(obj[key]);
        }
    }
    return values;
}

function isArray(obj) {
    if (Array.isArray) {
        return Array.isArray(obj);
    }
    return toString.call(obj) === '[object Array]';
}

function toArray(obj) {
    if (!obj) {
        return [];
    }
    if (isArray(obj)) {
        return slice.call(obj);
    }
    if (obj.length === +obj.length) {
        return map(obj, identity);
    }
    return values(obj);
}

function each(obj, fn) {
    if (isArray(obj)) {
        for (var i = 0, j = obj.length; i < j; i++) {
            fn(obj[i], i);
        }
    } else {
        for (var prop in obj) {
            if (has.call(obj, prop)) {
                fn(obj[prop], prop);
            }
        }
    }
}

function extend(obj) {
    var args = slice.call(arguments, 1);
    each(args, function(arg) {
        each(arg, function(val, prop) {
            obj[prop] = val;
        });
    });
    return obj;
}

function map(obj, fn) {
    var arr = [];
    each(obj, function(v, k) {
        arr.push(fn(v, k));
    });
    return arr;
}

function times(n, fn) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr[i] = fn(i);
    }
    return arr;
}

function invoke(obj, fnName) {
    var args = slice.call(arguments, 2);
    return map(obj, function(v) {
        return v[fnName].apply(v, args);
    });
}

function filter(arr, fn) {
    var ret = [];
    for (var i = 0, j = arr.length; i < j; i++) {
        if (fn(arr[i], i)) {
            ret.push(arr[i]);
        }
    }
    return ret;
}

function find(arr, fn) {
    for (var i = 0, j = arr.length; i < j; i++) {
        if (fn(arr[i], i)) {
            return arr[i];
        }
    }
    return null;
}

function reduce(arr, fn, initial) {
    var idx = 0;
    var len = arr.length;
    var curr = arguments.length === 3 ? initial : arr[idx++];

    while (idx < len) {
        curr = fn.call(null, curr, arr[idx], ++idx, arr);
    }
    return curr;
}

function debounce(func, wait, immediate) {
    var result;
    var timeout = null;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
        }
        return result;
    };
}

function compose() {
    var funcs = arguments;
    return function() {
        var args = arguments;
        each(funcs, function(fn) {
            args = [fn.apply(this, args)];
        });
        return args[0];
    };
}

// chaining, à la underscore

function chain(obj) {
    if (!(this instanceof chain)) {
        return new chain(obj);
    }
    this._obj = obj;
}

each(module.exports, function(fn, name) {
    chain.prototype[name] = function() {
        this._obj = fn.apply(this, [this._obj].concat(slice.call(arguments, 0)));
        return this;
    };
});

chain.prototype.val = function() {
    return this._obj;
};
},{}]},{},[])
;