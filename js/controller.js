(function (window) {
	'use strict';

	/**
	 * Takes a model and view and acts as the controller between them
	 *
	 * @constructor
	 * @param {object} model The model instance
	 * @param {object} view The view instance
	 */
	function Controller() {
		var self = this;
		this.fullFlightDetais = '';
	}

	/**
	 * Loads and initialises the view
	 *
	 * @param {string} '' | 'active' | 'completed'
	 */
	Controller.prototype.setView = function (locationHash) {
		this.getLocationDetails();
		this.getFlightDetails();
	};

	/**
	 * A call to fetch origin and destination location
	 */
	Controller.prototype.getLocationDetails = function () {
		makeAjaxCall('GET', '/json/locationDetails.json').then(function (data) {
			var originOptions = '<option value="all">All</option>'
			var destinationOptions = '<option value="all">All</option>';
			var response = JSON.parse(data);
			window.localStorage.setItem('locationDetails',data);

		  response.payload.origin.forEach(function(val){
				originOptions = originOptions + '<option value=' + val + '>' + val + '</option>'
			})
			qs('#sel1').innerHTML = originOptions

		  response.payload.destination.forEach(function(val){
				destinationOptions = destinationOptions + '<option value=' + val + '>' + val + '</option>'
			})
			qs('#sel2').innerHTML = destinationOptions
		})
		.catch(function (err) {
		  console.error('Augh, there was an error!', err.statusText);
		});
	};

	/**
	 * A call to fetch flight Details
	 */
	Controller.prototype.getFlightDetails = function () {
		var self = this;
		makeAjaxCall('GET', '/json/flightDetails.json').then(function (data) {
			var response = JSON.parse(data);
			var flightDetails = '';
			$('#flightRange').attr('min','0');
			$('#flightRange').attr('max','0')
			window.localStorage.setItem('flightDetails',data);
			response.payload.flightList.forEach(function(val,index){
				if(index === 0){
					$('#flightRange').attr('min',val.fare);
					$('#flightRange').attr('max',val.fare);
				} else {
					if($('#flightRange').attr('min') >  val.fare){
						$('#flightRange').attr('min',val.fare);
					}
					if($('#flightRange').attr('max') <  val.fare){
						$('#flightRange').attr('max',val.fare);
					}
				}
				var temp = '<div class="well">'
				+		'<h3>'+'Rs '+ val.fare+'</h3>'
				+			'<div>'+ 'Airline '+ val.airline+'</div>'
				+			'<h3>'+val.origin + '>' + val.destination+'</h3>'
				+			'<button type="button" class="btn btn-primary">Book</button>'
				+		'</div>';
				flightDetails = flightDetails + temp;
			})
			window.localStorage.setItem('flightTemplate',flightDetails);
			qs('.main').innerHTML = flightDetails
		})
		.catch(function (err) {
		  console.error('Augh, there was an error!', err.statusText);
		});

		qs('#flightRange').oninput = function(event) {
		    qs('#sliderPrice').innerHTML = this.value;
		}
		qs('#searchFlights').onclick = function(event) {
		    var origin = qs('#sel1').value;
				var destination = qs('#sel2').value;
				var priceRange = qs('#flightRange').value;
				var flightDetail = JSON.parse(window.localStorage.getItem('flightDetails'));
				var flightDetails = '';
				flightDetail.payload.flightList.forEach(function(val,index){
					if(val.fare <= priceRange){
						if(val.origin === origin && val.destination === destination){
							var temp = '<div class="well">'
							+		'<h3>'+'Rs '+ val.fare+'</h3>'
							+			'<div>'+ 'Airline '+ val.airline+'</div>'
							+			'<h3>'+val.origin + '>' + val.destination+'</h3>'
							+			'<button type="button" class="btn btn-primary">Book</button>'
							+		'</div>';
							flightDetails = flightDetails + temp;
						} else if(origin === 'all' && destination === 'all'){
							flightDetails = window.localStorage.getItem('flightTemplate');
						}
					}
				})
				if(flightDetails)
					qs('.main').innerHTML = flightDetails
				else {
					qs('.main').innerHTML = '<h3>No Flights Found For this Search</h3>'
				}


		}

	};
	// Export to window
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);
