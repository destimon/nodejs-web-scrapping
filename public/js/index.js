let app = new Vue({
	el: '#app',
	data: {
		text: '',
		author: ''
	},
	methods: {
		getInfo: function() {
			let url = '/scrape';

			axios.get(url)
			.then(function(res) {
				app.text = res.data.info;
				app.author = res.data.header;
			})
		}
	},
	created: function() {
		this.getInfo();
	}
})