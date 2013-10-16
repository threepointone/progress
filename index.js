var morpheus = require('morpheus'),
	_ = require('fn');


function duration() {
	// return a arandom time period between 0.5 - 0.8
	return 500 + (Math.random() * 300);
}

function easing(t) {
	// return (-Math.cos(pos * Math.PI) / 2) + 0.5;
	return Math.sin(t * Math.PI / 2);
}

function defaults() {
	return {
		easing: easing,
		duration: duration()
	};
}

function animate(el, options) {
	var opts = _.extend({}, options);
	if (el.animation) {
		el.animation.stop(opts.stop);
		delete opts.stop;
	}
	el.animation = morpheus(el, _.extend(defaults(), opts));
}

function glass(el, done) {
	if (typeof done === 'boolean' && done) {
		// no animation
		el.style.opacity = 0;
		return el;
	}
	animate(el, {
		opacity: 0,
		complete: done
	});
}

function wood(el, done) {
	if (typeof done === 'boolean' && done) {
		// no animation
		el.style.opacity = 1;
		return el;
	}
	animate(el, {
		opacity: 1,
		complete: done
	});
}

function widen(el, amt, done) {
	// assumption is the el will have width set in %. this is key. 
	if (typeof done === 'boolean' && done) {
		// no animation
		el.style.width = amt + '%';
		el.style.opacity = 1;
		return el;
	}

	animate(el, {
		width: amt + '%',
		opacity: 1
	});
}

function show(el) {
	el.style.display = el.__display || '';
	return el;
}

function hide(el) {
	el.__display = el.style.display !== 'none' ? el.style.display : '';
	el.style.display = 'none';
	return el;
}

function without(arr, el) {
	return _.filter(arr, function(datum) {
		return datum !== el;
	});
}


function progress(el, config) {
	if (!(this instanceof progress)) {
		return new progress(el, config);
	}
	this.current = 0;
	this.parent = el || document.body;
	this.el = document.createElement('div');
	this.el.className = 'progress-bar';
	this.current = 0;
	this.parent.appendChild(this.el);

}

_.extend(progress.prototype, {
	inc: function() {
		// increment randomly part of the way, never reaching finish
		if (!this.finished) {
			var to = this.current = this.current + Math.random() * 0.6 * (100 - this.current);
			widen(this.el, to);
		}

	},
	end: function(done) {
		var t = this;
		this.finished = true;
		animate(this.el, {
			width: '100%',
			opacity: 0,
			complete: function() {
				t.parent.removeChild(t.el);
				done && done();
			}
		});
	}

});


module.exports = progress;