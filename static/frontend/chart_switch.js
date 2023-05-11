$("document").ready(function(){

	load_fastEMA();
	load_slowEMA();
	//alert("kfjfj")
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

var lineSeries_ema_basline= chart_sma.addLineSeries({
	color: '#fff',
  	lineWidth: 2,
});

var lineSeries_ema_basline_price= chart_sma.addLineSeries({
	color: '#fff',
  	lineWidth: 1,
});


var lineSeries_ema_fast = chart_sma.addLineSeries({
	color: '#22d130',
  	lineWidth: 2,
});

var lineSeries_ema_slow_1hr = chart_hull_1hr.addLineSeries({
	color: '#fff',
  	lineWidth: 1,
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
	$("#trade_detailss").append("</div>")

}

document.body.appendChild(chartElement);
document.getElementById("switch").appendChild(switcherElement);

var candleSeries = null;
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

			candleSeries = chart_sma.addCandlestickSeries({
				upColor: '#00ff00',
				downColor: '#ff0000', 
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			});

				fetch('http://127.0.0.1:5000/charthistory/'+tradePair+'/4h')
				.then((r) => r.json())
				.then((response) => {
					//console.log(response)		
					candleSeries.setData(response);
		
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

			
			fetch('http://127.0.0.1:5000/chartz_runbot_ema_slow/'+tradePair+'/4h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				lineSeries_ema_slow.setData(response);
				
			})

			fetch('http://127.0.0.1:5000/chartz_runbot_ema_fast/'+tradePair+'/4h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				lineSeries_ema_fast.setData(response);
				
			})

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_baseline/'+tradePair+'/4h')
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)

			// 	// lineSeries.setData(response);
			// 	lineSeries_ema_basline.setData(response);
				
			// })

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_baseline_price/'+tradePair+'/4h')
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)

			// 	// lineSeries.setData(response);
			// 	lineSeries_ema_basline_price.setData(response);
				
			// })


			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_baseline_crossover/'+tradePair+'/4h')
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)

			// 	// lineSeries.setData(response);
			// 	var datesForMarkers = response
			// 	var markers = [];
				
			// 	for (var i = 2; i < datesForMarkers.length; i++) {

			// 		var amt_buy;
			// 		var amt_sell;
			// 		var amt_buy_time;
			// 		var amt_sell_time;

			// 		if(datesForMarkers[i].position == "buy"){

			// 			var amt_buy = datesForMarkers[i].low;
			// 			var amt_buy_time = datesForMarkers[i].time_utc;

			// 			markers.push({
			// 				time: datesForMarkers[i].time,
			// 				position: 'belowBar',
			// 				color: '#fff',
			// 				shape: 'arrowUp',
			// 				text: 'Baseline @ ' + datesForMarkers[i].close+' - '+datesForMarkers[i].position
			// 			});

			// 		}else if(datesForMarkers[i].position == "sell"){

			// 			var amt_sell = datesForMarkers[i].high;
			// 			var amt_sell_time = datesForMarkers[i].time_utc;

			// 			markers.push({
			// 				time: datesForMarkers[i].time,
			// 				position: 'aboveBar',
			// 				color: '#f2fb6f',
			// 				shape: 'arrowDown',
			// 				text: 'Baseline @ ' + datesForMarkers[i].close+' - '+datesForMarkers[i].position
			// 			});

			// 		}

					
			// 	}

			// 	// candleSeries.setMarkers(markers);
				
			// })



			fetch('http://127.0.0.1:5000/chartz_runbot_ema_crossover/'+tradePair+'/4h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				var datesForMarkers = response
				var markers = [];
				
				for (var i = 2; i < datesForMarkers.length; i++) {

					if(datesForMarkers[i].position == "buy"){

						markers.push({
							time: datesForMarkers[i].time,
							position: 'belowBar',
							color: '#2196F3',
							shape: 'arrowUp',
							text: 'CrossOver @ ' + datesForMarkers[i].close+' - '+datesForMarkers[i].position
						});

					}else if(datesForMarkers[i].position == "sell"){

						markers.push({
							time: datesForMarkers[i].time,
							position: 'aboveBar',
							color: '#e91e63',
							shape: 'arrowDown',
							text: 'CrossOver @ ' + datesForMarkers[i].close+' - '+datesForMarkers[i].position
						});

						
						
					}

					
				}

				//calcDetails(trade_details);
				candleSeries.setMarkers(markers);
				
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

				fetch('http://127.0.0.1:5000/charthistory/'+tradePair+'/'+timeFrm)
				.then((r) => r.json())
				.then((data) => {
					//console.log(response)
		
					candleSeries.setData(data);

					var lastClose = data[data.length - 1].close;
					var lastDataIndex = data.length - 1;

					var lengthIndex = lastDataIndex - 200

					var minimumPrice = data[lengthIndex].close;
					var maximumPrice = minimumPrice;

					
					// alert(lastDataIndex)

					for(var i = lengthIndex; i < data.length; i++) {
						var price = data[i].close;
						if (price > maximumPrice) {
							maximumPrice = price;
						}
						if (price < minimumPrice) {
							minimumPrice = price;
						}
					}

					var avgUpperPrice = (maximumPrice + minimumPrice) / 1.7;
					var avgPrice = (maximumPrice + minimumPrice) / 2;
					var avgLowerPrice = (maximumPrice + minimumPrice) / 2.358;


					var lineWidth = 3;
					var minPriceLine = {
						price: minimumPrice,
						color: '#5ac75a',
						lineWidth: lineWidth,
						lineStyle: LightweightCharts.LineStyle.Solid,
						axisLabelVisible: true,
						title: 'minimum price',
					};
					var avgPriceLine = {
						price: avgPrice,
						color: '#aeb54d',
						lineWidth: lineWidth,
						lineStyle: LightweightCharts.LineStyle.Solid,
						axisLabelVisible: true,
						title: 'average price',
					};

					var avgUpperPriceLine = {
						price: avgUpperPrice,
						color: '#52afd3',
						lineWidth: lineWidth,
						lineStyle: LightweightCharts.LineStyle.Solid,
						axisLabelVisible: true,
						title: 'average price',
					};

					var avgLowerPriceLine = {
						price: avgLowerPrice,
						color: '#52afd3',
						lineWidth: lineWidth,
						lineStyle: LightweightCharts.LineStyle.Solid,
						axisLabelVisible: true,
						title: 'average price',
					};
					
					var maxPriceLine = {
						price: maximumPrice,
						color: '#be1238',
						lineWidth: lineWidth,
						lineStyle: LightweightCharts.LineStyle.Solid,
						axisLabelVisible: true,
						title: 'maximum price',
					}



					// alert(minPriceLine)
					

					if(timeFrm == "1d"){				
						candleSeries.createPriceLine(avgUpperPriceLine);
						candleSeries.createPriceLine(avgLowerPriceLine);				
					}

					candleSeries.createPriceLine(minPriceLine);
					candleSeries.createPriceLine(avgPriceLine);
					candleSeries.createPriceLine(maxPriceLine);
		
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

			var candleSeries_hull = chart_hull.addCandlestickSeries({
				upColor: '#00ff00',
				downColor: '#ff0000', 
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			});

			fetch('http://127.0.0.1:5000/charthistory/'+tradePair+'/'+timeFrm)
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

				fetch('http://127.0.0.1:5000/charthistory/'+tradePair+'/'+timeFrm2)
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

			var candleSeries_hull_1hr = chart_hull_1hr.addCandlestickSeries({
				upColor: '#00ff00',
				downColor: '#ff0000', 
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			});

			fetch('http://127.0.0.1:5000/charthistory/'+tradePair+'/1h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				candleSeries_hull_1hr.setData(response);
			})


			fetch('http://127.0.0.1:5000/chartz_runbot_ema_price/'+tradePair+'/1h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)


				lineSeries_ema_slow_1hr.setData(response);
				// lineSeries2.setData(response);
				
			})

			
			fetch('http://127.0.0.1:5000/chartz_runbot_ema_fast/'+tradePair+'/1h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				lineSeries_ema_fast_1hr.setData(response);
				
			});


			fetch('http://127.0.0.1:5000/chartz_runbot_ema_base_crossover/'+tradePair+'/1h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				var datesForMarkers = response
				var markers = [];
				
				for (var i = 2; i < datesForMarkers.length; i++) {

					if(datesForMarkers[i].position == "buy"){

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

					}
					
				}

				candleSeries_hull_1hr.setMarkers(markers);
				
			})

			document.getElementById('chart4Data').innerHTML = "Loaded";

		}

	}

	
}

syncToInterval(intervals[0]);


function load_data(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").val();
	var date_backtest = $("#date_backtest").val();

    var comment_json = {
                        "symbol_pair": $("#symbol_backtest").val(),
						"timeframe": $("#timeframe_backtest").val()
                        }

    $.ajax({
        type: "POST",
        url: "/chartz/pair",        
        contentType: "application/json",
        dataType: "json",  
        data: JSON.stringify(comment_json),      
        success: function(response){

			load_chart_backtest(symbl, tmfrm, date_backtest);
           
			$("#tradepair_backtest").html(symbl)
			$("#time_backtest").html(" - "+tmfrm)
            // alert(response)
			var datesForMarkers = response
			var init_starting_bal = 100;
			var starting_bal = 100;
			var profit_loss_bal = [];
			var trade_details = [];
				
			for (var i = 2; i < datesForMarkers.length; i++) {

				var amt_buy;
				var amt_sell;
				var amt_buy_time;
				var amt_sell_time;

				if(datesForMarkers[i].position == "buy" && datesForMarkers[i].time > date_backtest){

					var amt_buy = datesForMarkers[i].close;
					var amt_buy_time = datesForMarkers[i].time_utc;

				}else if(datesForMarkers[i].position == "sell" && datesForMarkers[i].time > date_backtest){

					var amt_sell = datesForMarkers[i].close;
					var amt_sell_time = datesForMarkers[i].time_utc;

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

			// for (var i = 2; i < datesForMarkers.length; i++) {

			// 	var amt_buy;
			// 	var amt_sell;
			// 	var amt_buy_time;
			// 	var amt_sell_time;

			// 	if(datesForMarkers[i].position == "sell" && datesForMarkers[i].time > date_backtest){

			// 		var amt_buy = datesForMarkers[i].close;
			// 		var amt_buy_time = datesForMarkers[i].time_utc;

			// 	}else if(datesForMarkers[i].position == "buy" && datesForMarkers[i].time > date_backtest){

			// 		var amt_sell = datesForMarkers[i].close;
			// 		var amt_sell_time = datesForMarkers[i].time_utc;

			// 		if(typeof(amt_buy) === "undefined"){

			// 			amt_buy = amt_sell;

			// 		}
			// 		var buy_sell_ratio = amt_buy-amt_sell;
			// 		var pcent_ratio = (buy_sell_ratio/amt_buy)*100
			// 		var pcent_ratio_pcent = (buy_sell_ratio/amt_sell)
			// 		var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
			// 		var profit_loss_pcent = Math.floor(pcent_ratio_pcent*100);
					
			// 		balc = calcProft(buy_sell_ratio, starting_bal, profit_loss)

			// 		starting_bal = balc;

			// 		//profit_loss_bal += Math.abs(profit_loss)
			// 		profit_loss_bal.push(profit_loss)
			// 		trade_details.push({
			// 			start_balance: init_starting_bal,
			// 			amount_buy:amt_buy,
			// 			amount_sell:amt_sell,
			// 			time_buy:amt_buy_time,
			// 			time_sell:amt_sell_time,
			// 			remaining_balance: balc,
			// 			pcent_profit_loss:profit_loss,
			// 			trade_outcome: profit_loss_pcent
			// 		})
					
			// 	}
				
			// }

			calcDetails(trade_details);

            // alert(response["comment_body"])
            // alert(response["blog_id"])
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }
    });

}


function load_chart_backtest(tradePair, timeFrame, date_backtest){

	$("#chart0").html("")


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
	
	var lineSeries_ema_basline= chart_sma.addLineSeries({
		color: '#fff',
		  lineWidth: 2,
	});
	
	var lineSeries_ema_basline_price= chart_sma.addLineSeries({
		color: '#fff',
		  lineWidth: 1,
	});
	
	
	var lineSeries_ema_fast = chart_sma.addLineSeries({
		color: '#22d130',
		  lineWidth: 2,
	});

	// alert(lineSeries_ema_fast);
	// console.log(lineSeries_ema_fast)

	var candleSeries = null;

	document.getElementById('chart0').style.display = "block";
	document.getElementById('chart').style.display = "none";
	document.getElementById('chart2').style.display = "none";
	document.getElementById('chart3').style.display = "none";
	document.getElementById('chart4').style.display = "none";


	document.getElementById('chart0Data').innerHTML = "Loaded";

	candleSeries = chart_sma.addCandlestickSeries({
		upColor: '#00ff00',
		downColor: '#ff0000', 
		borderDownColor: 'rgba(255, 144, 0, 1)',
		borderUpColor: 'rgba(255, 144, 0, 1)',
		wickDownColor: 'rgba(255, 144, 0, 1)',
		wickUpColor: 'rgba(255, 144, 0, 1)',
	});

		fetch('http://127.0.0.1:5000/charthistory/'+tradePair+'/'+timeFrame)
		.then((r) => r.json())
		.then((data) => {

			//console.log(response)

			candleSeries.setData(data);

			var lastClose = data[data.length - 1].close;
			var lastDataIndex = data.length - 1;

			var lengthIndex = lastDataIndex - 200

			var minimumPrice = data[lengthIndex].close;
			var maximumPrice = minimumPrice;

			
			// alert(lastDataIndex)

			for(var i = lengthIndex; i < data.length; i++) {
				var price = data[i].close;
				if (price > maximumPrice) {
					maximumPrice = price;
				}
				if (price < minimumPrice) {
					minimumPrice = price;
				}
			}

			var avgUpperPrice = (maximumPrice + minimumPrice) / 1.7;
			var avgPrice = (maximumPrice + minimumPrice) / 2;
			var avgLowerPrice = (maximumPrice + minimumPrice) / 2.358;

			// var avgUpperPrice = (maximumPrice + minimumPrice) * 0.618;
			// var avgPrice = (maximumPrice + minimumPrice) * 0.5;
			// var avgLowerPrice = (maximumPrice + minimumPrice) * 0.382;


			var lineWidth = 3;
			var minPriceLine = {
				price: minimumPrice,
				color: '#5ac75a',
				lineWidth: lineWidth,
				lineStyle: LightweightCharts.LineStyle.Solid,
				axisLabelVisible: true,
				title: 'minimum price',
			};
			var avgPriceLine = {
				price: avgPrice,
				color: '#aeb54d',
				lineWidth: lineWidth,
				lineStyle: LightweightCharts.LineStyle.Solid,
				axisLabelVisible: true,
				title: 'average price',
			};

			var avgUpperPriceLine = {
				price: avgUpperPrice,
				color: '#52afd3',
				lineWidth: lineWidth,
				lineStyle: LightweightCharts.LineStyle.Solid,
				axisLabelVisible: true,
				title: 'average Upper price',
			};

			var avgLowerPriceLine = {
				price: avgLowerPrice,
				color: '#52afd3',
				lineWidth: lineWidth,
				lineStyle: LightweightCharts.LineStyle.Solid,
				axisLabelVisible: true,
				title: 'average Lower price',
			};
			
			var maxPriceLine = {
				price: maximumPrice,
				color: '#be1238',
				lineWidth: lineWidth,
				lineStyle: LightweightCharts.LineStyle.Solid,
				axisLabelVisible: true,
				title: 'maximum price',
			}



			//alert(minPriceLine)

			if(timeFrame == "1d"){				
				candleSeries.createPriceLine(avgUpperPriceLine);
				candleSeries.createPriceLine(avgLowerPriceLine);				
			}

			candleSeries.createPriceLine(minPriceLine);
			candleSeries.createPriceLine(avgPriceLine);
			candleSeries.createPriceLine(maxPriceLine);

			// chart_sma.timeScale().fitContent();

		});

		
	
	fetch('http://127.0.0.1:5000/chartz_runbot_ema_slow/'+tradePair+'/'+timeFrame)
	.then((r) => r.json())
	.then((response) => {

		lineSeries_ema_slow.setData(response);
		
	})


	fetch('http://127.0.0.1:5000/chartz_runbot_ema_fast/'+tradePair+'/'+timeFrame)
	.then((r) => r.json())
	.then((response) => {

		lineSeries_ema_fast.setData(response);
		
	})

	// fetch('http://127.0.0.1:5000/chartz_runbot_ema_baseline/'+tradePair+'/'+timeFrame)
	// .then((r) => r.json())
	// .then((response) => {

	// 	lineSeries_ema_basline.setData(response);
		
	// })

	

	fetch('http://127.0.0.1:5000/chartz_runbot_ema_crossover/'+tradePair+'/'+timeFrame)
	.then((r) => r.json())
	.then((response) => {

		var datesForMarkers = response
		var markers = [];
		//1577404800
		//1639360800
		for (var i = 2; i < datesForMarkers.length; i++) {

			// if(datesForMarkers_hull[i].position == "buy" && datesForMarkers_hull[i].time > 1640678400){

			// if(datesForMarkers_hull[i].position == "buy" && datesForMarkers_hull[i].time > 1640678400){
			if(datesForMarkers[i].position == "buy" && datesForMarkers[i].time > date_backtest){

				markers.push({
					time: datesForMarkers[i].time,
					position: 'belowBar',
					color: '#2196F3',
					shape: 'arrowUp',
					text: 'CrossOver @ ' + datesForMarkers[i].close+' - '+datesForMarkers[i].position
				});

			}else if(datesForMarkers[i].position == "sell" && datesForMarkers[i].time > date_backtest){

				markers.push({
					time: datesForMarkers[i].time,
					position: 'aboveBar',
					color: '#e91e63',
					shape: 'arrowDown',
					text: 'CrossOver @ ' + datesForMarkers[i].close+' - '+datesForMarkers[i].position
				});
				
				
			}

			
		}

		//calcDetails(trade_details);
		candleSeries.setMarkers(markers);
		
	})
			

}

var init_data = "gg";

function load_simulation_data(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").val();
	var date_backtest = $("#date_backtest").val();

    var comment_json = {
                        "symbol_pair": $("#symbol_backtest").val(),
						"timeframe": $("#timeframe_backtest").val()
                        }

	

    $.ajax({
        type: "POST",
        url: "/chartz/simulation",        
        contentType: "application/json",
        dataType: "json",  
        data: JSON.stringify(comment_json),      
        success: function(response){
           
            // alert(response)
			init_data = response
			
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }
    });

	return init_data;
}

function load_slowEMA(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").val();
	var date_backtest = $("#date_backtest").val();

	let emaline =[]

	var emaline_output = $(".fast_emaline_output").html()
	
	fetch('http://127.0.0.1:5000/chartz_runbot_ema_slow_sim/'+symbl+'/'+tmfrm)
	.then((r) => r.json())
	.then((response) => {

		lineSeries_ema_slow.setData(response);

		for(i = 0; i < response.length; i++){

			emaline[i] = response[i]
		}

		//$(".fast_emaline_output").html(emaline.close)
		//alert(emaline)
		
	})

	return emaline
}

function load_fastEMA(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").val();
	var date_backtest = $("#date_backtest").val();

	let emaline =[]

	var emaline_output = $(".fast_emaline_output").html()
	
	fetch('http://127.0.0.1:5000/chartz_runbot_ema_fast_sim/'+symbl+'/'+tmfrm)
	.then((r) => r.json())
	.then((response) => {

		lineSeries_ema_slow.setData(response);

		for(i = 0; i < response.length; i++){

			emaline[i] = response[i]
		}

		//$(".fast_emaline_output").html(emaline.close)
		//alert(emaline)
		
	})

	return emaline
}

var fast_emaoutput = load_fastEMA();
var slow_emaoutput = load_slowEMA();

function playPrice(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").val();
	var date_backtest = $("#date_backtest").val();

	// alert(fast_emaoutput)
	// alert(slow_emaoutput)

	$("#chart0").html("")

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
	
	var lineSeries_ema_basline= chart_sma.addLineSeries({
		color: '#fff',
		lineWidth: 2,
	});
	
	var lineSeries_ema_basline_price= chart_sma.addLineSeries({
		color: '#fff',
		lineWidth: 1,
	});
	
	
	var lineSeries_ema_fast = chart_sma.addLineSeries({
		color: '#22d130',
		lineWidth: 2,
	});

	var candleSeries = null;

	document.getElementById('chart0').style.display = "block";
	document.getElementById('chart').style.display = "none";
	document.getElementById('chart2').style.display = "none";
	document.getElementById('chart3').style.display = "none";
	document.getElementById('chart4').style.display = "none";


	document.getElementById('chart0Data').innerHTML = "Loaded";

	candleSeries = chart_sma.addCandlestickSeries({
		upColor: '#00ff00',
		downColor: '#ff0000', 
		borderDownColor: 'rgba(255, 144, 0, 1)',
		borderUpColor: 'rgba(255, 144, 0, 1)',
		wickDownColor: 'rgba(255, 144, 0, 1)',
		wickUpColor: 'rgba(255, 144, 0, 1)',
	});

	

	var noise_tmfrm = "4h";
	var startpoint = 1;
	var noise_startpoint = 1;
	var noise_loop = 6;

	if(tmfrm == "1d"){

		noise_tmfrm = "4h";
		var noise_startpoint = 1;
		var noise_loop = 6;

	}else if(tmfrm == "4h"){

		noise_tmfrm = "1h";
		var noise_startpoint = 1;
		var noise_loop = 4;

	}else if(tmfrm == "1h"){

		noise_tmfrm = "15m";
		var noise_startpoint = 1;
		var noise_loop = 4;

	}else if(tmfrm == "15m"){

		noise_tmfrm = "15m";
		var noise_startpoint = 1;
		var noise_loop = 4;

	}	

	// alert(tmfrm+" - "+noise_tmfrm+" -- "+noise_loop+" --- "+noise_startpoint)

	fetch('http://127.0.0.1:5000/chartsimulatenoise/'+symbl+'/'+noise_tmfrm)
	.then((r) => r.json())
	.then((noise_response) => {

				//console.log(response)
		fetch('http://127.0.0.1:5000/chartsimulateinit/'+symbl+'/'+tmfrm+"/"+startpoint)
			.then((r) => r.json())
			.then((data) => {
				
				var data3 = [];				

				// var tradePair = "BTCUSDT";
				// var timeFrame = "1d";

				// var datt = get1day("BTCUSDT", "1d");
				// alert(datt);				

				fetch('http://127.0.0.1:5000/chartsimulate/'+symbl+'/'+tmfrm)
					.then((r) => r.json())
					.then((response) => {

						//console.log(response)

						for(i = 0; i < response.length; i++){

							data3[i] = response[i]
						}

						///alert(noise_response)

						//alert(data3)

						candleSeries.setData(data);

						var lastClose = data[data.length - 1].close;
						var lastIndex = data.length - 1;

						//alert(lastIndex+" - "+lastClose);
						
						var targetIndex = lastIndex + 105 + Math.round(Math.random() + 30);
						var targetPrice = getRandomPrice();
						// var targetPrice = 41888;

						// alert(targetIndex+" - "+targetPrice);
						
						var currentIndex = lastIndex + 1;
						// var currentBusinessDay = { day: 14, month: 12, year: 2019 };
						var currentBusinessDay = data[lastIndex].time;
						var ticksInCurrentBar = 0;
						var currentBar = {
							open: data[lastIndex].open,
							high: data[lastIndex].high,
							low: data[lastIndex].low,
							close: data[lastIndex].close,
							time: currentBusinessDay,
						};
						
						function mergeTickToBar(price) {
							if (currentBar.open === null) {
								currentBar.open = price;
								currentBar.high = price;
								currentBar.low = price;
								currentBar.close = price;
							} else {
								currentBar.open = currentBar.open;
								currentBar.close = currentBar.close;
								currentBar.high = currentBar.high;
								currentBar.low = currentBar.low;
							}
							candleSeries.update(currentBar);
						}

						function mergeTickToBarNoise(price) {
							if (currentBar.open === null) {
								currentBar.open = price;
								currentBar.high = price;
								currentBar.low = price;
								currentBar.close = price;
							} else {
								currentBar.close = price;
								currentBar.high = Math.max(currentBar.high, price);
								currentBar.low = Math.min(currentBar.low, price);
							}
							candleSeries.update(currentBar);
						}

						
						function reset() {
							candleSeries.setData(data);
							lastClose = data[data.length - 1].close;
							lastIndex = data.length - 1;
						
							targetIndex = lastIndex + 5 + Math.round(Math.random() + 30);
							targetPrice = getRandomPrice();
						
							currentIndex = lastIndex + 1;
							currentBusinessDay = { day: 20, month: 4, year: 2022 };
							ticksInCurrentBar = 0;
						}
						
						function getRandomPrice() {
							return 10 + Math.round(Math.random() * 100) / 100;
						}
						
						function nextBusinessDay(time) {
							var d = new Date();
							d.setUTCFullYear(time.year);
							d.setUTCMonth(time.month - 1);
							d.setUTCDate(time.day + 1);
							d.setUTCHours(0, 0, 0, 0);
							return {
								year: d.getUTCFullYear(),
								month: d.getUTCMonth() + 1,
								day: d.getUTCDate(),
							};
						}



						function timeConverter(UNIX_timestamp){
							var a = new Date(UNIX_timestamp * 1000);
							var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
							var year = a.getFullYear();
							var month = months[a.getMonth()];
							var date = a.getDate();
							var hour = a.getHours();
							var min = a.getMinutes();
							var sec = a.getSeconds();
							var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
							return time;
						  }
						
						var counter = startpoint;
						var counter_noise = noise_startpoint;
						var counter_ema = 1;
						var markers = [];

						var init_starting_bal = 100;
						var starting_bal = 100;
						var profit_loss_bal = [];
						var trade_details = [];

						var amt_buy;
						var amt_sell;
						var amt_buy_time;
						var amt_sell_time;

						setInterval(function() {
							var deltaY = targetPrice - lastClose;
							var deltaX = targetIndex - lastIndex;
							var angle = deltaY / deltaX;

							// var basePrice = lastClose + (currentIndex - lastIndex) * angle;
							var basePrice = data3[counter].close;
							
							var noise = (0.1 - Math.random() * 0.2) + 1.0;
							// var noisedPrice = basePrice * noise; // hourly data
							var noisedPrice = noise_response[counter_noise].close; // hourly data

							//alert(noisedPrice)
							if(tmfrm == "15m"){
								mergeTickToBarNoise(basePrice);
							}else{
								mergeTickToBarNoise(noisedPrice);
							}
							
							if (++ticksInCurrentBar === noise_loop) {
								// alert(fast_emaoutput[counter_ema].close)
								// alert(slow_emaoutput[counter_ema].close)
								// move to next bar
								var datesForMarkers = data3.slice(0, counter)
								

								if(counter_ema > 21){

									var last_ema_short = slow_emaoutput[counter_ema-2].value
									var last_ema_long = fast_emaoutput[counter_ema-2].value

									var ema_short = slow_emaoutput[counter_ema-1].value
									var ema_long = fast_emaoutput[counter_ema-1].value

									

									currentDay = timeConverter(fast_emaoutput[counter_ema].time);

									if(ema_short > ema_long && last_ema_short < last_ema_long){

										// alert("Short EMA Crossover Long EMA at "+data3[counter].close+ " Time: "+currentDay);
										//alert("Sell at "+data3[counter].close+ " Time: "+currentDay);

										markers.push({
											time: currentDay,
											position: 'aboveBar',
											color: '#e91e63',
											shape: 'arrowDown',
											text: 'CrossOver @ ' + data3[counter].close+' - Sell'
										});

										
						
										var amt_sell = data3[counter].close;
										var amt_sell_time = currentDay;

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

										calcDetails(trade_details);
										candleSeries.setMarkers(markers);

									}else if(ema_long > ema_short && last_ema_long < last_ema_short){

										//alert("Buy at "+data3[counter].close+ " Time: "+currentDay);

										markers.push({
											time: currentDay,
											position: 'belowBar',
											color: '#2196F3',
											shape: 'arrowUp',
											text: 'CrossOver @ ' + data3[counter].close+' - Buy'
										});

										amt_buy = data3[counter].close;
										amt_buy_time = currentDay;

										
										candleSeries.setMarkers(markers);

									}									

								}

								if(counter_ema > 21){

									lineSeries_ema_slow.setData(slow_emaoutput.slice(0, counter_ema+13));
									lineSeries_ema_fast.setData(fast_emaoutput.slice(0, counter_ema));
								}
															
								// alert("last_ema_short - "+last_ema_short+" -- last_ema_long - "+last_ema_long)
								// alert("ema_short - "+ema_short+" -- ema_long - "+ema_long)

								currentIndex++;
								currentBusinessDay = nextBusinessDay(currentBusinessDay);								
								// alert(currentBusinessDay.hour)
								currentBar = {
									open: data3[counter].open,
									high: data3[counter].high,
									low: data3[counter].low,
									close: data3[counter].close,
									// open: null,
									// high: null,
									// low: null,
									// close: null,
									time: data3[counter].time,
								};
								ticksInCurrentBar = 0;
								// if (currentIndex === 5000) {
								//     reset();
								//     return;
								// }
								// if (currentIndex === targetIndex) {
								//     // change trend
								//     lastClose = noisedPrice;
								//     lastIndex = currentIndex;
								//     targetIndex = lastIndex + 5 + Math.round(Math.random() + 30);
								//     targetPrice = data3[counter].close;
								// }

								counter++;
								if(counter > 21){

									counter_ema++;
								}
															
							}
							counter_noise++;
						}, 200);

					});
				})
				
			});

	// fetch('http://127.0.0.1:5000/chartz_runbot_ema_crossover/'+symbl+'/'+tmfrm)
	// .then((r) => r.json())
	// .then((response) => {

	// 	var datesForMarkers = response
	// 	var markers = [];
	// 	//1577404800
	// 	//1639360800
	// 	//alert(datesForMarkers)
	// 	for (var i = 2; i < datesForMarkers.length; i++) {

	// 		// if(datesForMarkers_hull[i].position == "buy" && datesForMarkers_hull[i].time > 1640678400){

	// 		// if(datesForMarkers_hull[i].position == "buy" && datesForMarkers_hull[i].time > 1640678400){
	// 		if(datesForMarkers[i].position == "buy" && datesForMarkers[i].time){

	// 			markers.push({
	// 				time: datesForMarkers[i].time,
	// 				position: 'belowBar',
	// 				color: '#2196F3',
	// 				shape: 'arrowUp',
	// 				text: 'CrossOver @ ' + datesForMarkers[i].close+' - '+datesForMarkers[i].position
	// 			});

	// 		}else if(datesForMarkers[i].position == "sell" && datesForMarkers[i].time){

	// 			markers.push({
	// 				time: datesForMarkers[i].time,
	// 				position: 'aboveBar',
	// 				color: '#e91e63',
	// 				shape: 'arrowDown',
	// 				text: 'CrossOver @ ' + datesForMarkers[i].close+' - '+datesForMarkers[i].position
	// 			});
				
				
	// 		}

			
	// 	}

	// 	//calcDetails(trade_details);
	// 	candleSeries.setMarkers(markers);
		
	// })	
		

}



