'use strict';

let express = require('express');
let fs = require('fs');
let request = require('request');
let cheerio = require('cheerio');
let app     = express();
let jade = require('jade');


app.get('/', function(req, res){
	let url = 'http://www.bbc.com/travel/story/20180108-the-truth-about-italys-white-truffles/'

	let news = {};

	request(url, function(err, response, html) {
		let $ = cheerio.load(html);
		let header, info;

		// get header
		$('.byline').filter(function() {
			let data = $(this);


			header = data.children().last().text();
			let fixed = header.replace(/\s\s+/g, ' '); // remove any whitespaces('\n')

			news.header = fixed;
		})

		// get body
		$('.body-content').filter(function() {
			let data = $(this);

			info = data.children().text();
			news.info = info;
		})

		res.json(news);
	})

})

app.listen('8080')

console.log('Up this shit on 8080');

exports = module.exports = app;