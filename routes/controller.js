'use strict';

let request = require('request');
let cheerio = require('cheerio');

module.exports = function(app) {
	

	app.get('/', function(req, res) {
		res.sendfile('views/index.html');
	});

	app.get('/scrape', function(req, res){
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
			});

			// get body
			$('.body-content').filter(function() {
				let data = $(this);

				info = data.children().text();
				info = info.replace(/\s\s+/g, ' ');

				news.info = info;
			});

			res.json(news);
		});
	});

}