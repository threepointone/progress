check: 
	browserify -r ./index.js -o ./dist/progress.js -s ProgressBar
	cat ./dist/progress.js | uglifyjs --mangle --compress > dist/progress.min.js