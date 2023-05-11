
var chart = LightweightCharts.createChart(document.getElementById('chart'), {
	width: 900,
  	height: 500,
	layout: {
		backgroundColor: '#000000',
		textColor: 'rgba(255, 255, 255, 0.9)',
	},
	grid: {
		vertLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
		horzLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
	},
	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
	priceScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
	},
	timeScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
		timeVisible: true,
		secondsVisible: false,
	},
});

var chart_hull = LightweightCharts.createChart(document.getElementById('chart2'), {
	width: 900,
  	height: 500,
	layout: {
		backgroundColor: '#000000',
		textColor: 'rgba(255, 255, 255, 0.9)',
	},
	grid: {
		vertLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
		horzLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
	},
	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
	priceScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
	},
	timeScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
		timeVisible: true,
		secondsVisible: false,
	},
});

var chart_hull_4hr = LightweightCharts.createChart(document.getElementById('chart3'), {
	width: 1200,
  	height: 700,
	layout: {
		backgroundColor: '#000000',
		textColor: 'rgba(255, 255, 255, 0.9)',
	},
	grid: {
		vertLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
		horzLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
	},
	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
	priceScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
	},
	timeScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
		timeVisible: true,
		secondsVisible: false,
	},
});

var candleSeries = chart.addCandlestickSeries({
	upColor: '#00ff00',
	downColor: '#ff0000', 
	borderDownColor: 'rgba(255, 144, 0, 1)',
	borderUpColor: 'rgba(255, 144, 0, 1)',
	wickDownColor: 'rgba(255, 144, 0, 1)',
	wickUpColor: 'rgba(255, 144, 0, 1)',
});



var candleSeries_hull = chart_hull.addCandlestickSeries({
	upColor: '#00ff00',
	downColor: '#ff0000', 
	borderDownColor: 'rgba(255, 144, 0, 1)',
	borderUpColor: 'rgba(255, 144, 0, 1)',
	wickDownColor: 'rgba(255, 144, 0, 1)',
	wickUpColor: 'rgba(255, 144, 0, 1)',
});

var candleSeries_hull_4hr = chart_hull_4hr.addCandlestickSeries({
	upColor: '#00ff00',
	downColor: '#ff0000', 
	borderDownColor: 'rgba(255, 144, 0, 1)',
	borderUpColor: 'rgba(255, 144, 0, 1)',
	wickDownColor: 'rgba(255, 144, 0, 1)',
	wickUpColor: 'rgba(255, 144, 0, 1)',
});


var lineSeries = chart.addLineSeries({
	color: '#e91e63',
  	lineWidth: 1,
});

var lineSeries2 = chart.addLineSeries({
	color: '#22d130',
  	lineWidth: 1,
});


function calcProft(buy_sell_ratio, starting_bal, profit_loss){
	var current_bal;
	var bal;
	if(buy_sell_ratio > 0){

		current_bal = Math.abs(profit_loss)+Math.abs(starting_bal);

	}else{

		current_bal = Math.abs(profit_loss)-Math.abs(starting_bal);
	}

	bal = Math.abs(current_bal)
	

	return bal

}

var tradePair = document.getElementById('tradepair').innerHTML;
var timeFrm = document.getElementById('time').innerHTML;
var timeFrm2 = document.getElementById('time2').innerHTML;
//var timeFrm2 = "1d";

fetch('http://127.0.0.1:5000/charthistory_4hr/'+tradePair+'/'+timeFrm)
	.then((r) => r.json())
	.then((response) => {
		//console.log(response)

		candleSeries_hull_4hr.setData(response);
	})

fetch('http://127.0.0.1:5000/charthistory/'+tradePair+'/'+timeFrm)
	.then((r) => r.json())
	.then((response) => {
		//console.log(response)

		candleSeries.setData(response);
	})

fetch('http://127.0.0.1:5000/charthistory/'+tradePair+'/'+timeFrm)
	.then((r) => r.json())
	.then((response) => {
		//console.log(response)

		candleSeries_hull.setData(response);
	})


	fetch('http://127.0.0.1:5000/chartz_runbot_sma/'+tradePair+'/'+timeFrm)
	.then((r) => r.json())
	.then((response) => {
		//console.log(response)


		lineSeries.setData(response);
		// lineSeries2.setData(response);
		
	})


	fetch('http://127.0.0.1:5000/chartz_runbot_sma_fast/'+tradePair+'/'+timeFrm)
	.then((r) => r.json())
	.then((response) => {
		//console.log(response)

		// lineSeries.setData(response);
		lineSeries2.setData(response);

		
		
	})
		
	
	fetch('http://127.0.0.1:5000/chartz_runbot_hull_4hr/'+tradePair+'/'+timeFrm2)
	.then((r) => r.json())
	.then((response_hull) => {
		//console.log(response_hull)

		// candleSeries.setData(response);

		var datesForMarkers_hull = response_hull
		var markers_hull = [];
		var starting_bal = 100;
		var profit_loss_bal = [];

		for (var i = 2; i < datesForMarkers_hull.length; i++) {

			var amt_buy;
			var amt_sell;

			if(datesForMarkers_hull[i].position == "buy"){

				var amt_buy = datesForMarkers_hull[i].low;

				markers_hull.push({
					time: datesForMarkers_hull[i].time,
					position: 'belowBar',
					color: '#22d130',
					shape: 'circle',
					text: 'Buy @ ' + Math.floor(datesForMarkers_hull[i].low - 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'
				});
				
			}else if(datesForMarkers_hull[i].position == "sell"){

				var amt_sell = datesForMarkers_hull[i].high;

				markers_hull.push({
					time: datesForMarkers_hull[i].time,
					position: 'aboveBar',
					color: '#e91e63',
					shape: 'circle',
					text: 'Sell @ ' + Math.floor(datesForMarkers_hull[i].high + 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'
				  });


				var buy_sell_ratio = amt_sell-amt_buy;
				var pcent_ratio = (buy_sell_ratio/amt_buy)*100
				var pcent_ratio_pcent = (buy_sell_ratio/amt_buy)
				var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
				
				balc = calcProft(buy_sell_ratio, starting_bal, profit_loss)

				starting_bal = balc;

				//profit_loss_bal += Math.abs(profit_loss)
				profit_loss_bal.push(profit_loss)

				//console.log(profit_loss_bal)

				if(pcent_ratio <= 1 ){

					markers_hull.push({
						time: datesForMarkers_hull[i].time,
						position: 'belowBar',
						color: '#dbce33',
						shape: 'arrowDown',
						text: 'Down - [ '+Math.floor(pcent_ratio)+'% ] - P/L [ '+Math.floor(profit_loss)+' ] - [ '+starting_bal+' ]'
					});
					
				}else if(pcent_ratio > 1){

					markers_hull.push({
						time: datesForMarkers_hull[i].time,
						position: 'aboveBar',
						color: '#22d130',
						shape: 'arrowUp',
						text: 'Profit - [ '+Math.floor(pcent_ratio)+'% ] - P/L [ '+Math.floor(profit_loss)+' ] - [ '+starting_bal+' ]'
					});	
				}
			}
			//#d52b2b
			//text: 'Down - [ '+Math.floor(pcent_ratio)+'% ] - P/L [ '+Math.floor(profit_loss)+' ] - [ '+starting_bal+' ]'
			//text: 'Profit - [ '+Math.floor(pcent_ratio)+'% ] - P/L [ '+Math.floor(profit_loss)+' ] - [ '+starting_bal+' ]'
			

			
		}

		candleSeries_hull_4hr.setMarkers(markers_hull);
	})


// fetch('http://127.0.0.1:5000/chartz_runbot_sma_crossover/'+tradePair+'/'+timeFrm2)
// 	.then((r) => r.json())
// 	.then((response_hull) => {
// 		//console.log(response_hull)

// 		// candleSeries.setData(response);

// 		var datesForMarkers_cross = response_hull
// 		var markers_cross = [];

// 		for (var i = 2; i < datesForMarkers_cross.length; i++) {


// 			if(datesForMarkers_cross[i].position == "buy"){
// 				markers_cross.push({
// 					time: datesForMarkers_cross[i].time,
// 					position: 'aboveBar',
// 					color: '#22d130',
// 					shape: 'circle',
// 					text: 'Bullish '
// 				});
				
// 			}else if(datesForMarkers_cross[i].position == "sell"){

// 				markers_cross.push({
// 					time: datesForMarkers_cross[i].time,
// 					position: 'belowBar',
// 					color: '#e91e63',
// 					shape: 'circle',
// 					text: 'Bearish'
// 				});
// 			}			

			
// 		}

// 		///candleSeries.setMarkers(markers_cross);
// 	})


fetch('http://127.0.0.1:5000/chartz_runbot/'+tradePair+'/'+timeFrm)
	.then((r) => r.json())
	.then((response) => {
		//console.log(response)

		// candleSeries.setData(response);

		var datesForMarkers = response
		var markers = [];
		var starting_bal = 100;
		var profit_loss_bal = [];

		for (var i = 2; i < datesForMarkers.length; i++) {

			var amt_buy;
			var amt_sell;

			if(datesForMarkers[i].position == "buy"){

				var amt_buy = datesForMarkers[i].low;

				markers.push({
					time: datesForMarkers[i].time,
					position: 'belowBar',
					color: '#2196F3',
					shape: 'arrowUp',
					text: 'Buy @ ' + Math.floor(datesForMarkers[i].low - 2) + ' { ATR -- ' + Math.floor(datesForMarkers[i].atr)+' }'
				});
				
			}else if(datesForMarkers[i].position == "sell"){

				var amt_sell = datesForMarkers[i].high;

				markers.push({
					time: datesForMarkers[i].time,
					position: 'aboveBar',
					color: '#e91e63',
					shape: 'arrowDown',
					text: 'Sell @ ' + Math.floor(datesForMarkers[i].high + 2) + ' { ATR -- ' + Math.floor(datesForMarkers[i].atr)+' }'
				});


				var buy_sell_ratio = amt_sell-amt_buy;
				var pcent_ratio = (buy_sell_ratio/amt_buy)*100
				var pcent_ratio_pcent = (buy_sell_ratio/amt_buy)
				var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
				
				balc = calcProft(buy_sell_ratio, starting_bal, profit_loss)

				starting_bal = balc;

				//profit_loss_bal += Math.abs(profit_loss)
				profit_loss_bal.push(profit_loss)

				//console.log(profit_loss_bal)
				

				if(pcent_ratio <= 1 ){

					markers.push({
						time: datesForMarkers[i].time,
						position: 'aboveBar',
						color: '#dbce33',
						shape: 'circle',
						text: 'Down - [ '+Math.floor(pcent_ratio)+'% ] - P/L [ '+Math.floor(profit_loss)+' ] - [ '+starting_bal+' ]'
					});
					
				}else if(pcent_ratio > 1){

					markers.push({
						time: datesForMarkers[i].time,
						position: 'aboveBar',
						color: '#22d130',
						shape: 'circle',
						text: 'Profit - [ '+Math.floor(pcent_ratio)+'% ] - P/L [ '+Math.floor(profit_loss)+' ] - [ '+starting_bal+' ]'
					});	
				}

				
			}

			
			
		}

		candleSeries.setMarkers(markers);
	})	

	fetch('http://127.0.0.1:5000/chartz_runbot_hull/'+tradePair+'/'+timeFrm)
	.then((r) => r.json())
	.then((response_hull) => {
		//console.log(response_hull)

		// candleSeries.setData(response);

		var datesForMarkers_hull = response_hull
		var markers_hull = [];
		var starting_bal = 100;
		var profit_loss_bal = [];

		for (var i = 2; i < datesForMarkers_hull.length; i++) {

			var amt_buy;
			var amt_sell;

			if(datesForMarkers_hull[i].position == "buy"){

				var amt_buy = datesForMarkers_hull[i].low;

				markers_hull.push({
					time: datesForMarkers_hull[i].time,
					position: 'belowBar',
					color: '#22d130',
					shape: 'circle',
					text: 'Buy @ ' + Math.floor(datesForMarkers_hull[i].low - 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'
				});
				
			}else if(datesForMarkers_hull[i].position == "sell"){

				var amt_sell = datesForMarkers_hull[i].high;

				markers_hull.push({
					time: datesForMarkers_hull[i].time,
					position: 'aboveBar',
					color: '#e91e63',
					shape: 'circle',
					text: 'Sell @ ' + Math.floor(datesForMarkers_hull[i].high + 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'
				  });


				var buy_sell_ratio = amt_sell-amt_buy;
				var pcent_ratio = (buy_sell_ratio/amt_buy)*100
				var pcent_ratio_pcent = (buy_sell_ratio/amt_buy)
				var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
				
				balc = calcProft(buy_sell_ratio, starting_bal, profit_loss)

				starting_bal = balc;

				//profit_loss_bal += Math.abs(profit_loss)
				profit_loss_bal.push(profit_loss)

				//console.log(profit_loss_bal)

				if(pcent_ratio <= 1 ){

					markers_hull.push({
						time: datesForMarkers_hull[i].time,
						position: 'belowBar',
						color: '#dbce33',
						shape: 'arrowDown',
						text: 'Down - [ '+Math.floor(pcent_ratio)+'% ] - P/L [ '+Math.floor(profit_loss)+' ] - [ '+starting_bal+' ]'
					});
					
				}else if(pcent_ratio > 1){

					markers_hull.push({
						time: datesForMarkers_hull[i].time,
						position: 'aboveBar',
						color: '#22d130',
						shape: 'arrowUp',
						text: 'Profit - [ '+Math.floor(pcent_ratio)+'% ] - P/L [ '+Math.floor(profit_loss)+' ] - [ '+starting_bal+' ]'
					});	
				}
			}
			//#d52b2b
			

			
		}

		candleSeries_hull.setMarkers(markers_hull);
	})


	
	var tradingpairreal = tradePair.toLowerCase();

var binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws/"+tradingpairreal+"@kline_4h");

binanceSocket.onmessage = function (event) {	
	var message = JSON.parse(event.data);

	var candlestick = message.k;

	//console.log(candlestick)

	// candleSeries_hull_4hr.update({
	// 	time: candlestick.t / 1000,
	// 	open: candlestick.o,
	// 	high: candlestick.h,
	// 	low: candlestick.l,
	// 	close: candlestick.c
	// })
}


var binanceSocket2 = new WebSocket("wss://stream.binance.com:9443/ws/"+tradingpairreal+"@kline_1d");

binanceSocket2.onmessage = function (event) {	
	var message = JSON.parse(event.data);

	var candlestick = message.k;

	//console.log(candlestick)

	// candleSeries_hull.update({
	// 	time: candlestick.t / 1000,
	// 	open: candlestick.o,
	// 	high: candlestick.h,
	// 	low: candlestick.l,
	// 	close: candlestick.c
	// })

	// candleSeries.update({
	// 	time: candlestick.t / 1000,
	// 	open: candlestick.o,
	// 	high: candlestick.h,
	// 	low: candlestick.l,
	// 	close: candlestick.c
	// })


}

