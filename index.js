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