
$('document').ready(function(){

	
})

function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
	var switcherElement = document.createElement('div');
	switcherElement.classList.add('switcher');

	var intervalElements = items.map(function(item) {
		var itemEl = document.createElement('button');
		itemEl.innerText = item;
		itemEl.classList.add('switcher-item');
		itemEl.classList.toggle('switcher-active-item', item === activeItem);
		itemEl.addEventListener('click', function() {
			onItemClicked(item);
		});
		switcherElement.appendChild(itemEl);
		return itemEl;
	});

	function onItemClicked(item) {
		if (item === activeItem) {
			return;
		}

		intervalElements.forEach(function(element, index) {
			element.classList.toggle('switcher-active-item', items[index] === item);
		});

		activeItem = item;

		activeItemChangedCallback(item);
	}

	return switcherElement;
}

var tradePair = document.getElementById('tradepair').innerHTML;
var timeFrm = document.getElementById('time').innerHTML;
var timeFrm2 = document.getElementById('time2').innerHTML;



var intervals = ['SMA CrossOver', 'Baseline', 'Confirmation', '2nd Confirmation-Volume', '1Hr S-trend'];

var weekData;
var dayData;
var monthData;
var yearData;



var seriesesData = new Map([
  ['1D-SMA', dayData ],
  ['1D', dayData ],
  ['1W', weekData ],
  ['1M', monthData ],
  ['1Y', yearData ],
]);

var switcherElement = createSimpleSwitcher(intervals, intervals[0], syncToInterval);

var chartElement = document.createElement('div');

var chart_sma = LightweightCharts.createChart(document.getElementById('chart0'), {
	width: 1320,
  	height: 600,
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

var chart = LightweightCharts.createChart(document.getElementById('chart'), {
	width: 1320,
  	height: 600,
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
	width: 1320,
  	height: 600,
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
	width: 1320,
  	height: 600,
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

var chart_hull_1hr = LightweightCharts.createChart(document.getElementById('chart4'), {
	width: 1320,
  	height: 600,
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



var lineSeries = chart.addLineSeries({
	color: '#e91e63',
  	lineWidth: 2,
});

var lineSeries2 = chart.addLineSeries({
	color: '#22d130',
  	lineWidth: 2,
});

var lineSeries3 = chart_sma.addLineSeries({
	color: '#e91e63',
  	lineWidth: 1,
});

var lineSeries4 = chart_sma.addLineSeries({
	color: '#22d130',
  	lineWidth: 1,
});

var lineSeries_ema_slow = chart_sma.addLineSeries({
	color: '#1558ed',
  	lineWidth: 2,
});

var lineSeries_ema_fast = chart_sma.addLineSeries({
	color: '#22d130',
  	lineWidth: 2,
});

var lineSeries_ema_slow_1hr = chart_hull_1hr.addLineSeries({
	color: '#1558ed',
  	lineWidth: 2,
});

var lineSeries_ema_fast_1hr = chart_hull_1hr.addLineSeries({
	color: '#22d130',
  	lineWidth: 2,
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


function calcDetails(trade_details){

	$("#trade_detailss").html("<tr><th colspan='7'> Starting Balance - "+trade_details[0].start_balance+"</th></tr>")
	$("#trade_detailss").append("<tr><th>No.</th><th>Amount Buy</th><th>Amount Sell</th><th>Buy Time</th><th>Sell Time</th><th>Remaining Bal</th><th>Trade Outcome</th></tr>")

	var bgcolor = "#5ac75a";

	

	for (var i = 0; i < trade_details.length; i++) {

		if(trade_details[i].trade_outcome < 0){

			bgcolor = "#d98b8b";

		}else if(trade_details[i].trade_outcome > 0){

			bgcolor = "#5ac75a";

		}else if(trade_details[i].trade_outcome == 0){

			bgcolor = "#aeb54d";
		}

		var dt = "<tr style='height: 60px;'><td>"+i+"</td><td>"+trade_details[i].amount_buy+"</td><td>"+trade_details[i].amount_sell+"</td><td>"+trade_details[i].time_buy+"</td><td>"+trade_details[i].time_sell+"</td><td>"+trade_details[i].remaining_balance+"</td><td style='background:"+bgcolor+"'>"+trade_details[i].trade_outcome+"%</td></tr>"
		$("#trade_detailss").append(dt)

	}

	//$("#trade_detailss").append("</table>")

}

document.body.appendChild(chartElement);
document.getElementById("switch").appendChild(switcherElement);

var candleSeries = null;
var candleSeries_ema = null;
var candleSeries_hull = null;
var candleSeries_hull_4hr = null;
var candleSeries_hull_1hr = null;

function syncToInterval(interval) {
	// if (candleSeries) {
	// 	chart.removeSeries(candleSeries);
	// 	candleSeries = null;
	// }
	var chartData = document.getElementById('chartData').innerHTML;
	var chartData0 = document.getElementById('chart0Data').innerHTML;
	var chart2Data = document.getElementById('chart2Data').innerHTML;
	var chart3Data = document.getElementById('chart3Data').innerHTML;
	var chart4Data = document.getElementById('chart4Data').innerHTML;

	// alert(interval)

	if(interval == "SMA CrossOver"){

		

		document.getElementById('chart0').style.display = "block";
		document.getElementById('chart').style.display = "none";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart3').style.display = "none";
		document.getElementById('chart4').style.display = "none";

		//alert(chartData)

		if(chartData0 == "Open"){

			document.getElementById('chart0Data').innerHTML = "Loaded";

			candleSeries_ema = chart_sma.addCandlestickSeries({
				upColor: '#00ff00',
				downColor: '#ff0000', 
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			});

				fetch('http://127.0.0.1:5000/charthistory_online/'+tradePair+'/4h')
				.then((r) => r.json())
				.then((response) => {
					//console.log(response)
		
					candleSeries_ema.setData(response);
		
				});

				

			// fetch('http://127.0.0.1:5000/chartz_runbot_sma/'+tradePair+'/'+timeFrm)
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)


			// 	lineSeries3.setData(response);
			// 	// lineSeries2.setData(response);
				
			// })


			// fetch('http://127.0.0.1:5000/chartz_runbot_sma_fast/'+tradePair+'/'+timeFrm)
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)

			// 	// lineSeries.setData(response);
			// 	lineSeries4.setData(response);
				
			// })

			// get todays date
				
			
			fetch('http://127.0.0.1:5000/chartz_runbot_ema_slow_online/'+tradePair+'/4h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				lineSeries_ema_slow.setData(response);
				
			})

			
			fetch('http://127.0.0.1:5000/chartz_runbot_ema_fast_online/'+tradePair+'/4h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				lineSeries_ema_fast.setData(response);
				
			})



			fetch('http://127.0.0.1:5000/chartz_runbot_ema_crossover_online/'+tradePair+'/4h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				var datesForMarkers = response
				var markers = [];
				
				var init_starting_bal = 100;
				var starting_bal = 100;
				var profit_loss_bal = [];
				var trade_details = [];
				

				for (var i = 2; i < datesForMarkers.length; i++) {

					var amt_buy;
					var amt_sell;
					var amt_buy_time;
					var amt_sell_time;

					if(datesForMarkers[i].position == "buy"){

						var amt_buy = datesForMarkers[i].low;
						var amt_buy_time = datesForMarkers[i].time_utc;

						markers.push({
							time: datesForMarkers[i].time,
							position: 'belowBar',
							color: '#2196F3',
							shape: 'arrowUp',
							text: 'CrossOver @ ' + datesForMarkers[i].close+' - '+datesForMarkers[i].position
						});

					}else if(datesForMarkers[i].position == "sell"){

						var amt_sell = datesForMarkers[i].high;
						var amt_sell_time = datesForMarkers[i].time_utc;

						markers.push({
							time: datesForMarkers[i].time,
							position: 'aboveBar',
							color: '#e91e63',
							shape: 'arrowDown',
							text: 'CrossOver @ ' + datesForMarkers[i].close+' - '+datesForMarkers[i].position
						});

						if(typeof(amt_buy) === "undefined"){

							amt_buy = amt_sell;

						}
						var buy_sell_ratio = amt_sell-amt_buy;
						var pcent_ratio = (buy_sell_ratio/amt_buy)*100
						var pcent_ratio_pcent = (buy_sell_ratio/amt_buy)
						var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
						var profit_loss_pcent = Math.floor(pcent_ratio_pcent*100);
						
						balc = calcProft(buy_sell_ratio, starting_bal, profit_loss)

						starting_bal = balc;

						//profit_loss_bal += Math.abs(profit_loss)
						profit_loss_bal.push(profit_loss)
						trade_details.push({
							start_balance: init_starting_bal,
							amount_buy:amt_buy,
							amount_sell:amt_sell,
							time_buy:amt_buy_time,
							time_sell:amt_sell_time,
							remaining_balance: balc,
							pcent_profit_loss:profit_loss,
							trade_outcome: profit_loss_pcent
						})
						
					}

					
				}

				//calcDetails(trade_details);
				candleSeries_ema.setMarkers(markers);
				
			})
			
		}	


	}else if(interval == "Baseline"){

		

		document.getElementById('chart0').style.display = "none";
		document.getElementById('chart').style.display = "block";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart3').style.display = "none";
		document.getElementById('chart4').style.display = "none";

		//alert(chartData)

		if(chartData == "Open"){

			document.getElementById('chartData').innerHTML = "Loaded";

			candleSeries = chart.addCandlestickSeries({
				upColor: '#00ff00',
				downColor: '#ff0000', 
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			});

				fetch('http://127.0.0.1:5000/charthistory_online/'+tradePair+'/'+timeFrm)
				.then((r) => r.json())
				.then((response) => {
					//console.log(response)
		
					candleSeries.setData(response);
		
				});

			// 	fetch('http://127.0.0.1:5000/chartz_runbot/'+tradePair+'/'+timeFrm)
			// 	.then((r) => r.json())
			// 	.then((response) => {
			// 		//console.log(response)

			// 		// candleSeries.setData(response);

			// 		var datesForMarkers = response
			// 		var markers = [];
			// 		var init_starting_bal = 100;
			// 		var starting_bal = 100;
			// 		var profit_loss_bal = [];
			// 		var trade_details = [];

			// 		for (var i = 2; i < datesForMarkers.length; i++) {

			// 			var amt_buy;
			// 			var amt_sell;
			// 			var amt_buy_time;
			// 			var amt_sell_time;

			// 			if(datesForMarkers[i].position == "buy"){

			// 				var amt_buy = datesForMarkers[i].low;
			// 				var amt_buy_time = datesForMarkers[i].time_utc;

			// 				markers.push({
			// 					time: datesForMarkers[i].time,
			// 					position: 'belowBar',
			// 					color: '#2196F3',
			// 					shape: 'arrowUp',
			// 					text: 'Buy @ ' + Math.floor(datesForMarkers[i].low - 2) + ' { ATR -- ' + Math.floor(datesForMarkers[i].atr)+' }'
			// 				});
							
			// 			}else if(datesForMarkers[i].position == "sell"){

			// 				var amt_sell = datesForMarkers[i].high;
			// 				var amt_sell_time = datesForMarkers[i].time_utc;

			// 				markers.push({
			// 					time: datesForMarkers[i].time,
			// 					position: 'aboveBar',
			// 					color: '#e91e63',
			// 					shape: 'arrowDown',
			// 					text: 'Sell @ ' + Math.floor(datesForMarkers[i].high + 2) + ' { ATR -- ' + Math.floor(datesForMarkers[i].atr)+' }'
			// 				});

			// 				if(typeof(amt_buy) === "undefined"){

			// 					amt_buy = amt_sell;

			// 				}
			// 				var buy_sell_ratio = amt_sell-amt_buy;
			// 				var pcent_ratio = (buy_sell_ratio/amt_buy)*100
			// 				var pcent_ratio_pcent = (buy_sell_ratio/amt_buy)
			// 				var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
			// 				var profit_loss_pcent = Math.floor(pcent_ratio_pcent*100);
							
			// 				balc = calcProft(buy_sell_ratio, starting_bal, profit_loss)

			// 				starting_bal = balc;

			// 				//profit_loss_bal += Math.abs(profit_loss)
			// 				profit_loss_bal.push(profit_loss)
			// 				trade_details.push({
			// 					start_balance: init_starting_bal,
			// 					amount_buy:amt_buy,
			// 					amount_sell:amt_sell,
			// 					time_buy:amt_buy_time,
			// 					time_sell:amt_sell_time,
			// 					remaining_balance: balc,
			// 					pcent_profit_loss:profit_loss,
			// 					trade_outcome: profit_loss_pcent
			// 				})

			// 				//console.log(profit_loss_bal)
							

			// 				if(pcent_ratio <= 1 ){

			// 					markers.push({
			// 						time: datesForMarkers[i].time,
			// 						position: 'aboveBar',
			// 						color: '#dbce33',
			// 						shape: 'circle',
			// 						text: 'Down - [ '+Math.floor(pcent_ratio)+'% ] - P/L [ '+Math.floor(profit_loss)+' ] - [ '+starting_bal+' ]'
			// 					});
								
			// 				}else if(pcent_ratio > 1){

			// 					markers.push({
			// 						time: datesForMarkers[i].time,
			// 						position: 'aboveBar',
			// 						color: '#22d130',
			// 						shape: 'circle',
			// 						text: 'Profit - [ '+Math.floor(pcent_ratio)+'% ] - P/L [ '+Math.floor(profit_loss)+' ] - [ '+starting_bal+' ]'
			// 					});	
			// 				}

							
			// 			}

						
						
			// 		}

			// 		//alert(trade_details.length);

			// 		//calcDetails(trade_details);
			// 		candleSeries.setMarkers(markers);
			// })

			fetch('http://127.0.0.1:5000/chartz_runbot_ema_price/'+tradePair+'/'+timeFrm)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)


				lineSeries.setData(response);
				// lineSeries2.setData(response);
				
			})


			fetch('http://127.0.0.1:5000/chartz_runbot_ema_fast/'+tradePair+'/'+timeFrm)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				lineSeries2.setData(response);
				
			})

			fetch('http://127.0.0.1:5000/chartz_runbot_ema_base_crossover/'+tradePair+'/'+timeFrm)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				var datesForMarkers = response
				var markers = [];
				
				var init_starting_bal = 100;
				var starting_bal = 100;
				var profit_loss_bal = [];
				var trade_details = [];
				

				for (var i = 2; i < datesForMarkers.length; i++) {

					var amt_buy;
					var amt_sell;
					var amt_buy_time;
					var amt_sell_time;

					if(datesForMarkers[i].position == "buy"){

						var amt_buy = datesForMarkers[i].low;
						var amt_buy_time = datesForMarkers[i].time_utc;

						markers.push({
							time: datesForMarkers[i].time,
							position: 'belowBar',
							color: '#2196F3',
							shape: 'arrowUp',
							text: 'CrossOver @ ' + datesForMarkers[i].close+' - '+datesForMarkers[i].position
						});

					}else if(datesForMarkers[i].position == "sell"){

						var amt_sell = datesForMarkers[i].high;
						var amt_sell_time = datesForMarkers[i].time_utc;

						markers.push({
							time: datesForMarkers[i].time,
							position: 'aboveBar',
							color: '#e91e63',
							shape: 'arrowDown',
							text: 'CrossOver @ ' + datesForMarkers[i].close+' - '+datesForMarkers[i].position
						});

						if(typeof(amt_buy) === "undefined"){

							amt_buy = amt_sell;

						}
						var buy_sell_ratio = amt_sell-amt_buy;
						var pcent_ratio = (buy_sell_ratio/amt_buy)*100
						var pcent_ratio_pcent = (buy_sell_ratio/amt_buy)
						var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
						var profit_loss_pcent = Math.floor(pcent_ratio_pcent*100);
						
						balc = calcProft(buy_sell_ratio, starting_bal, profit_loss)

						starting_bal = balc;

						//profit_loss_bal += Math.abs(profit_loss)
						profit_loss_bal.push(profit_loss)
						trade_details.push({
							start_balance: init_starting_bal,
							amount_buy:amt_buy,
							amount_sell:amt_sell,
							time_buy:amt_buy_time,
							time_sell:amt_sell_time,
							remaining_balance: balc,
							pcent_profit_loss:profit_loss,
							trade_outcome: profit_loss_pcent
						})
						
					}

					
				}

				//calcDetails(trade_details);
				candleSeries.setMarkers(markers);
				
			})

		
			
		}	

		document.getElementById('chartData').innerHTML = "Loaded";


	}else if(interval == "Confirmation"){

		document.getElementById('chart2').style.display = "block";
		document.getElementById('chart0').style.display = "none";
		document.getElementById('chart').style.display = "none";
		document.getElementById('chart3').style.display = "none";
		document.getElementById('chart4').style.display = "none";

		if(chart2Data == "Open"){

			candleSeries_hull = chart_hull.addCandlestickSeries({
				upColor: '#00ff00',
				downColor: '#ff0000', 
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			});

			fetch('http://127.0.0.1:5000/charthistory_online/'+tradePair+'/'+timeFrm)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				candleSeries_hull.setData(response);
			});


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
			});

			document.getElementById('chart2Data').innerHTML = "Loaded";
		}

	}else if(interval == "2nd Confirmation-Volume"){

		document.getElementById('chart3').style.display = "block";
		document.getElementById('chart0').style.display = "none";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart').style.display = "none";
		document.getElementById('chart4').style.display = "none";

			if(chart3Data == "Open"){

				var candleSeries_hull_4hr = chart_hull_4hr.addCandlestickSeries({
					upColor: '#00ff00',
					downColor: '#ff0000', 
					borderDownColor: 'rgba(255, 144, 0, 1)',
					borderUpColor: 'rgba(255, 144, 0, 1)',
					wickDownColor: 'rgba(255, 144, 0, 1)',
					wickUpColor: 'rgba(255, 144, 0, 1)',
				});

				fetch('http://127.0.0.1:5000/charthistory_online/'+tradePair+'/'+timeFrm2)
				.then((r) => r.json())
				.then((response) => {
					//console.log(response)

					candleSeries_hull_4hr.setData(response);
				});

				fetch('http://127.0.0.1:5000/chartz_runbot_hull_4hr/'+tradePair+'/'+timeFrm2)
				.then((r) => r.json())
				.then((response_hull) => {
					//console.log(response_hull)

					// candleSeries.setData(response);

					// var datesForMarkers_hull = response_hull
					// var markers_hull = [];
					// var starting_bal = 100;
					// var profit_loss_bal = [];


					var datesForMarkers_hull = response_hull
					var markers_hull = [];
					var init_starting_bal = 100;
					var starting_bal = 100;
					var profit_loss_bal = [];
					var trade_details = [];
					
					

						for (var i = 2; i < datesForMarkers_hull.length; i++) {

							var amt_buy;
							var amt_sell;
							var amt_buy_time;
							var amt_sell_time;	
							
							// if(datesForMarkers_hull[i].position == "buy" && datesForMarkers_hull[i].time > 1640678400){

							if(datesForMarkers_hull[i].position == "buy"){

								var amt_buy = datesForMarkers_hull[i].low;
								var amt_buy_time = datesForMarkers_hull[i].time_utc;

								markers_hull.push({
									time: datesForMarkers_hull[i].time,
									position: 'belowBar',
									color: '#22d130',
									shape: 'circle',
									text: 'Buy @ ' + Math.floor(datesForMarkers_hull[i].low - 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'+' -- '+datesForMarkers_hull[i].time
								});
								
							}else if(datesForMarkers_hull[i].position == "sell"){

								var amt_sell = datesForMarkers_hull[i].high;
								var amt_sell_time = datesForMarkers_hull[i].time_utc;

								markers_hull.push({
									time: datesForMarkers_hull[i].time,
									position: 'aboveBar',
									color: '#e91e63',
									shape: 'circle',
									text: 'Sell @ ' + Math.floor(datesForMarkers_hull[i].high + 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'+' -- '+datesForMarkers_hull[i].time
								});


								// var buy_sell_ratio = amt_sell-amt_buy;
								// var pcent_ratio = (buy_sell_ratio/amt_buy)*100
								// var pcent_ratio_pcent = (buy_sell_ratio/amt_buy)
								// var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
								
								// balc = calcProft(buy_sell_ratio, starting_bal, profit_loss)

								// starting_bal = balc;

								// //profit_loss_bal += Math.abs(profit_loss)
								// profit_loss_bal.push(profit_loss)

								// //console.log(profit_loss_bal)

								if(typeof(amt_buy) === "undefined"){

									amt_buy = amt_sell;

								}

								var buy_sell_ratio = amt_sell-amt_buy;
								var pcent_ratio = (buy_sell_ratio/amt_buy)*100
								var pcent_ratio_pcent = (buy_sell_ratio/amt_buy)
								var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
								var profit_loss_pcent = Math.floor(pcent_ratio_pcent*100);
								
								balc = calcProft(buy_sell_ratio, starting_bal, profit_loss);

								starting_bal = balc;

								//profit_loss_bal += Math.abs(profit_loss)

						

								profit_loss_bal.push(profit_loss)
								trade_details.push({
									start_balance: init_starting_bal,
									amount_buy:amt_buy,
									amount_sell:amt_sell,
									time_buy:amt_buy_time,
									time_sell:amt_sell_time,
									remaining_balance: balc,
									pcent_profit_loss:profit_loss,
									trade_outcome: profit_loss_pcent
								})

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

							

							
						}

					
						calcDetails(trade_details);
						candleSeries_hull_4hr.setMarkers(markers_hull);
				})

				document.getElementById('chart3Data').innerHTML = "Loaded";

		}

	}else if(interval == "1Hr S-trend"){

		//alert(chart4Data)

		document.getElementById('chart4').style.display = "block";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart0').style.display = "none";
		document.getElementById('chart').style.display = "none";
		document.getElementById('chart3').style.display = "none";		

		if(chart4Data == "Open"){

			candleSeries_hull_1hr = chart_hull_1hr.addCandlestickSeries({
				upColor: '#00ff00',
				downColor: '#ff0000', 
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			});

			fetch('http://127.0.0.1:5000/charthistory_online/'+tradePair+'/1h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				candleSeries_hull_1hr.setData(response);
			})



			fetch('http://127.0.0.1:5000/chartz_runbot_ema_slow/'+tradePair+'/1h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				lineSeries_ema_slow_1hr.setData(response);
				
			})

			
			fetch('http://127.0.0.1:5000/chartz_runbot_ema_fast/'+tradePair+'/1h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				lineSeries_ema_fast_1hr.setData(response);
				
			})

			document.getElementById('chart4Data').innerHTML = "Loaded";

		}

	}

	
}

syncToInterval(intervals[0]);

// var tradePair = "BTCUSDT";


// fetch('http://127.0.0.1:5000/charthistory_online/'+tradePair+"/1d")
// 	.then((r) => r.json())
// 	.then((response) => {
// 		//console.log(response)

// 		candleSeries.setData(response);
// 	})

var real_tm_pair = tradePair.toLowerCase();


// var binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1d");
var binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws/"+real_tm_pair+"@kline_1d");

binanceSocket.onmessage = function (event) {	
	var message = JSON.parse(event.data);

	var candlestick = message.k;

	//console.log(candlestick)

	candleSeries.update({
		time: candlestick.t / 1000,
		open: candlestick.o,
		high: candlestick.h,
		low: candlestick.l,
		close: candlestick.c
	})
}

var binanceSocket_4h = new WebSocket("wss://stream.binance.com:9443/ws/"+real_tm_pair+"@kline_4h");

binanceSocket_4h.onmessage = function (event) {	
	var message = JSON.parse(event.data);

	var candlestick = message.k;

	//console.log(candlestick)

	candleSeries_ema.update({
		time: candlestick.t / 1000,
		open: candlestick.o,
		high: candlestick.h,
		low: candlestick.l,
		close: candlestick.c
	})
}


var binanceSocket_1h = new WebSocket("wss://stream.binance.com:9443/ws/"+real_tm_pair+"@kline_1h");

binanceSocket_1h.onmessage = function (event) {	
	var message = JSON.parse(event.data);

	var candlestick = message.k;

	//console.log(candlestick)

	candleSeries_hull_1hr.update({
		time: candlestick.t / 1000,
		open: candlestick.o,
		high: candlestick.h,
		low: candlestick.l,
		close: candlestick.c
	})
}

var binanceSocket_hull = new WebSocket("wss://stream.binance.com:9443/ws/"+real_tm_pair+"@kline_1d");

binanceSocket_hull.onmessage = function (event) {	
	var message = JSON.parse(event.data);
	var candlestick = message.k;
	//console.log(candlestick)
	candleSeries_hull.update({
		time: candlestick.t / 1000,
		open: candlestick.o,
		high: candlestick.h,
		low: candlestick.l,
		close: candlestick.c
	})
}