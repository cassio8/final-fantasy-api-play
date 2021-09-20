var API_URL = 'https://www.moogleapi.com/api/v1';

var app = new Vue({
	el: '#app',
	data: {
		characters: {},
		monsters: {},
		games: {},
		tab: 0,
		popup: false,
		searchQuery: null,
		loading: true
	},
	computed: {
	    resultQuery() {
	    	if(this.searchQuery){
	      		return this.characters.filter((item)=>{
	        		return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
	      		})
	      	} else{
	        	return this.characters;
	      	}
	    }
	},
	methods: {
		loadCharacter: function(id) {
			axios.get(API_URL + '/characters/' + id).then(function (response) {
				data = response.data[0];

				html      = '';
				app.popup = true;

				$('#popup').empty();

				html = `
					<div class="content">
						<a href="#" class="close">x</a>
						<img src="${ (data.pictures[0]) ? data.pictures[0].url : '' }">
						<ul class="right _unstyled">
					   	    <li>
					   			<p class="_h6 _mb10">${ data.name }</p>
					   	    </li>
						    <li>
								<b>Gender:</b>
								<p>${ data.gender }</p>
						    </li>
						    <li>
								<b>Race:</b>
								<p>${ data.race }</p>
						    </li>
						    <li>
								<b>Age:</b>
								<p>${ data.age }</p>
						    </li>
						    <li>
								<b>Job:</b>
								<p>${ data.job }</p>
						    </li>
					        <li>
					    		<b>Height:</b>
					    		<p>${ data.height }</p>
					        </li>
					        <li>
					    		<b>Weight:</b>
					    		<p>${ data.weight }</p>
					        </li>
						    <li>
								<b>Description:</b>
						    </li>
							<p>${ (data.description) ? data.description : '' }</p>
						</ul>
					</div>
				`;

				$('#popup').append(html);	
			});
		},
		loadGame: function(id) {
			axios.get(API_URL + '/games/' + id).then(function (response) {
				data = response.data[0];

				html      = '';
				app.popup = true;

				$('#popup').empty();

				html = `
					<div class="content">
						<a href="#" class="close">x</a>
						<ul class="right _w100 _unstyled">
						    <li>
								<p class="_h6 _mb10">${ data.title }</p>
						    </li>
						    <li>
								<b>Description:</b>
						    </li>
							<p>${ (data.description) ? data.description : '' }</p>
						</ul>
					</div>
				`;

				$('#popup').append(html);	
			});
		}
	}
});

axios.get(API_URL + '/characters').then(function (response) {
	app.characters = response.data;
	app.loading    = false;
});

axios.get(API_URL + '/games').then(function (response) {
    app.games = response.data;
});

$('.scroll').click(function() {
 	$('html, body').animate({ scrollTop: 0 }, 'slow');
});

$(document).on('click', '.Popup .close', function(event) {
	event.preventDefault();
	app.popup = false;
});