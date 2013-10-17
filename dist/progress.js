(function(e){if("function"==typeof bootstrap)bootstrap("progressbar",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeProgressBar=e}else"undefined"!=typeof window?window.ProgressBar=e():global.ProgressBar=e()})(function(){var define,ses,bootstrap,module,exports;
return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var duration = 1000;

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

progress.prototype.inc = function() {
    // increment randomly part of the way, never reaching finish
    if (!this.finished) {
        var to = this.current = this.current + Math.random() * 0.6 * (100 - this.current);
        
        var t = this;
        setTimeout(function() {
            t.el.style.width = to + '%';
            t.el.style.opacity = 1;
        }, 0);

    }
};

progress.prototype.end = function() {
    // finish the animation
    var t = this;
    if (!this.finished) {
        this.finished = true;
        setTimeout(function() {
            t.el.style.width = '100%';
            t.el.style.opacity = 0;
            setTimeout(function() {
                t.parent.removeChild(t.el);
            }, duration); // duration of the transition    
        }, 0);

    }

};

module.exports = progress;
},{}]},{},[1])
(1)
});
;