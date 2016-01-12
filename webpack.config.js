'use strict';

module.exports = {
	entry: "./Public/Scripts/main",
	output: {
	    path: "./Public/Scripts",
	    filename: "build.js",
        library: "main"
	},
    watch: true,
    module: {

    	loaders: [{
    		test: /\.js$/,
    		loader: 'babel'
    	}]
    }
}