$("document").ready(function(){

	//alert('interval')
	//load_market_data();
	load_transaction();
	// syncToInterval, load_atr_0, gen_tradeLines
});



function changeTimeframe(timeframe){
	
	timeframe1="4h";

	if(timeframe == "1m"){
		timeframe1="1m"
	}  
    else if(timeframe == "5m"){
		timeframe1="1m"
	}   
    else if(timeframe == "15m"){
		timeframe1="1m"
	}   
    else if(timeframe == "30m"){
		timeframe1="5m"
	}      
    else if(timeframe == "1h"){
		timeframe1="5m"
	}    
    else if(timeframe == "4h"){
		timeframe1="15m"
	}        
    else if(timeframe == "6h"){
		timeframe1="30m"
	}    
    else if(timeframe == "1d"){
		timeframe1="4h"
	}        
    else{
		timeframe1="4h"
	}
        
	$("#timeframe_backtest").html(timeframe);
	$("#time2").val(timeframe1);
	

}


//#region Simple Switcher Function
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
//#endregion

//#region switch Intervals and switcherElement Instance

var intervals = ['Trade','D','4h','1h','30m','15m','5m'];
var candleSeries = null;
var candleSeries_hull = null;
var candleSeries_hull_4hr = null;
var candleSeries_hull_1hr = null;
var candleSeries_30m = null;
var candleSeries_15m = null;
var candleSeries_5m = null;

var weekData;
var dayData;
var monthData;
var yearData;


var switcherElement = createSimpleSwitcher(intervals, intervals[0], syncToInterval);

var chartElement = document.createElement('div');
var chartwidth = document.getElementById("chart0").clientWidth;

document.body.appendChild(chartElement);
document.getElementById("switch").appendChild(switcherElement);

//#endregion

//#region Simulation Charts

var chart_sma = LightweightCharts.createChart(document.getElementById('chart0'), {
	width: chartwidth,
  	height: 505,
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

const myChart = LightweightCharts.createChart(document.getElementById('chart0'), { 
	// options here
});

var chart = LightweightCharts.createChart(document.getElementById('chart'), {
	width: chartwidth,
  	height: 505,
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
	width: chartwidth,
  	height: 505,
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
	width: chartwidth,
  	height: 505,
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
	width: chartwidth,
  	height: 505,
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


var chart_30m = LightweightCharts.createChart(document.getElementById('chart5'), {
	width: chartwidth,
  	height: 505,
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

var chart_15m = LightweightCharts.createChart(document.getElementById('chart6'), {
	width: chartwidth,
  	height: 505,
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

var chart_5m = LightweightCharts.createChart(document.getElementById('chart7'), {
	width: chartwidth,
  	height: 505,
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

//#endregion

//#region Chart Line Series Properties

//#region Interval Synchronization Instance

var lineSeries_ema_slow11 = chart_sma.addLineSeries({
	color: '#fff',
	lineWidth: 2,
});

var priceLine1 = 0;
var priceLine2 = 0;
var priceLine3 = 0;

upper_limit = 0;
lower_limit = 0;

var tradeline_check = true;
var tresholdline_check = true;
var watch_mode = $("#threshold").html()
var watch_trade_mode = $("#watch_trade").html()
var watch_position = $("#watch_position").html()
var money_mngmt = $("#money_mngmt").html();
var loadlines = $("#LoadLines").html();
var loadwatch = $("#LoadWatch").html();
var loadclose = $("#LoadClose").html();
var signalShoww = $(".signalShow").html();
var tradestatus = $("#tradestatus").html();
var avgPrice = Number($("#price_update").html());
var minimumPrice = Number($("#stop_loss_update").html());
var maximumPrice = Number($("#take_profit_update").html());
var atrData = Number($("#atr_update_number").html());

var markers = [];
var markers2 = [];
var datesForMarkers_cross;
var datesForMarkers_baseline;
var markers_check = [];
var markers_base_check = [];

function syncToInterval(interval) {
	// if (candleSeries) {
	// 	chart.removeSeries(candleSeries);
	// 	candleSeries = null;
	// }
	//alert(interval)
	var chartData = document.getElementById('chartData').innerHTML;
	var chartData0 = document.getElementById('chart0Data').innerHTML;
	var chart2Data = document.getElementById('chart2Data').innerHTML;
	var chart3Data = document.getElementById('chart3Data').innerHTML;
	var chart4Data = document.getElementById('chart4Data').innerHTML;

	var chart5Data = document.getElementById('chart5Data').innerHTML;
	var chart6Data = document.getElementById('chart6Data').innerHTML;
	var chart7Data = document.getElementById('chart7Data').innerHTML;

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
	// var timeFrm2 = document.getElementById('time2').innerHTML;
	$("#timeframe_backtest").html(tmfrm);

	if(interval == "Trade"){

		document.getElementById('chart0').style.display = "block";
		document.getElementById('chart').style.display = "none";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart3').style.display = "none";
		document.getElementById('chart4').style.display = "none";

		document.getElementById('chart5').style.display = "none";
		document.getElementById('chart6').style.display = "none";
		document.getElementById('chart7').style.display = "none";
		//$("#timeframe_backtest").html('1d');

		if(money_mngmt == "False"){
			$(".TradeMode").html("1");
			tradeMode();
			$("#LoadLines").html('true');
		}

		if(tradestatus == "False" || tradestatus == "Exit"){
			$(".TradeModeEMA").html("1")
			tradeModeEMA();
			$("#LoadClose").html('true');
			$(".closetradebtn").html('Open');
			$(".closetradebtn").removeClass("sell")
			$(".closetradebtn").addClass("buy")
			
		}else{

			$(".tradebtns").prop('disabled', false);
		}

		//alert(chartData0)
		if(chartData0 == "Open"){

			document.getElementById('chart0Data').innerHTML = "Loaded";

			// candleSeries = chart_sma.addCandlestickSeries({
			// 	upColor: '#00ff00',
			// 	downColor: '#ff0000', 
			// 	borderDownColor: 'rgba(255, 144, 0, 1)',
			// 	borderUpColor: 'rgba(255, 144, 0, 1)',
			// 	wickDownColor: 'rgba(255, 144, 0, 1)',
			// 	wickUpColor: 'rgba(255, 144, 0, 1)',
			// 	priceFormat: {
			// 		type: 'price',
			// 		precision: 4,
			// 		minMove: 0.0001,						
			// 	},
				
			// });

			candleSeries = myChart.addCandleSeries({
				upColor: '#6495ED',
				downColor: '#FF6347',
				borderVisible: false,
				wickVisible: true,
				borderColor: '#000000',
				wickColor: '#000000',
				borderUpColor: '#4682B4',
				borderDownColor: '#A52A2A',
				wickUpColor: "#4682B4",
				wickDownColor: "#A52A2A",
			});

			// const mainSeries = chart_sma.addLineSeries({
			// 	priceFormat: {
			// 		minMove: 0.00001,
			// 		precision: 5,
			// 	},
			// });
		
			// mainSeries.setData(generateData());

			// candleSeries.applyOptions({
			// 	priceFormat: {
			// 		type: 'price',
			// 		precision: 6,
			// 		minMove: 0.000001,
			// 	},
			// });
			
			// Chart Data
			fetch('http://127.0.0.1:5000/chartrealtime/'+symbl+'/'+tmfrm)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)	

				// const cdata = response.map(d => {
				// 	return {time:d['time'],open:parseFloat(d['open']),high:parseFloat(d[2]),low:parseFloat(d[3]),close:parseFloat(d[4])}
				// });
				// //candleSeries.setData(cdata);	
				// console.log(cdata)
				

				

				candleSeries.setData(response);

				// candleSeries.applyOptions({
				// 	priceFormat: {
				// 		type: 'price',
				// 		precision: 4,
				// 		minMove: 0.0001,						
				// 	},
				// });

				// console.log(response)

				var lastcounter = response.length-1
				var lastprice = response[lastcounter].close;

				calcRealtimeProftLossInit(lastprice)

				//alert('chart')
				
				if(money_mngmt == "True" && watch_mode == "Inactive"){
					gen_tradeLines();
				}else if(watch_mode == "Active"){
					gen_tresholdLines()
				}

				// $("#price_update").html(lastprice)
				// $(".price_updt").html(lastprice)
				calcRealtimeProftLoss(lastprice)
				// alert(atr_output[100].value)
				//console.log(atr_output)				
	
			});

			

			//alert('fffhfh')

			// #region Chandellier
			
			fetch('http://127.0.0.1:5000/chartz_runbot_ut_bot_alert/'+symbl+'/'+tmfrm)
			.then((r) => r.json())
			.then((response) => {

				//console.log(response_hull)

				// candleSeries.setData(response);

				datesForMarkers_cross = response
				
				for (var i = 2; i < datesForMarkers_cross.length; i++) {


					if(datesForMarkers_cross[i].position == "buy"){
						markers.push({
							time: datesForMarkers_cross[i].time,
							position: 'belowBar',
							color: '#2196F3',
							shape: 'arrowUp',
							text: 'CrossOver @ ' + datesForMarkers_cross[i].close
						});

						markers_check.pop()
						markers_check.push('buy')
						
				
					}else if(datesForMarkers_cross[i].position == "sell"){
				
						markers.push({
							time: datesForMarkers_cross[i].time,
							position: 'aboveBar',
							color: '#e91e63',
							shape: 'arrowDown',
							text: 'CrossOver @ ' + datesForMarkers_cross[i].close+' - Sell'
						});	
						
						markers_check.pop()
						markers_check.push('sell')
				
					}			

					
				}

				//alert('buy_sell')
				candleSeries.setMarkers(markers);
				$(".signalShow").html(markers_check[0]);
					
			});

			fetch('http://127.0.0.1:5000/chartz_runbot_ut_bot_alert_baseline/'+symbl+'/'+tmfrm)
			.then((r) => r.json())
			.then((response) => {

				//console.log(response_hull)

				// candleSeries.setData(response);
				var lastcounter = response.length-1
				var time_utc = response[lastcounter].time_utc;

				datesForMarkers_baseline = response
				
				for (var i = 2; i < datesForMarkers_baseline.length; i++) {

					if(datesForMarkers_baseline[i].position == "buy"){
						// markers2.push({
						// 	time: datesForMarkers_baseline[i].time,
						// 	position: 'belowBar',
						// 	color: '#2196F3',
						// 	shape: 'circle',
						// 	text: 'CrossOver @ ' + datesForMarkers_baseline[i].close
						// });

						markers_base_check.pop()
						markers_base_check.push('Long')
						
				
					}else if(datesForMarkers_baseline[i].position == "sell"){
				
						// markers2.push({
						// 	time: datesForMarkers_baseline[i].time,
						// 	position: 'aboveBar',
						// 	color: '#e91e63',
						// 	shape: 'circle',
						// 	text: 'CrossOver @ ' + datesForMarkers_baseline[i].close+' - Sell'
						// });	
						
						markers_base_check.pop()
						markers_base_check.push('Short')
				
					}			
					
				}

				//candleSeries.setMarkers(markers);
				//alert(money_mngmt+" - "+watch_mode)
				

				//alert('direction')

				if(markers_base_check[0] == 'Long'){
					$("#longSignal").html("Bull Market <br>"+response[lastcounter].time_utc)
					$("#longSignal").removeClass()
					$("#longSignal").addClass("buy")

				}else if(markers_base_check[0] == 'Short'){
					$("#longSignal").html("Bear Market <br>"+response[lastcounter].time_utc)
					$("#longSignal").removeClass()
					$("#longSignal").addClass("sell")
				}

				load_atr_0(tmfrm);

					
			});


			// var data3_baseline = []
			// fetch('http://127.0.0.1:5000/chartz_runbot_ut_bot_alert_baseline/'+symbl+'/'+tmfrm)
			// .then((r) => r.json())
			// .then((response_baseline) => {

			// 	for(i = 0; i < response_baseline.length; i++){
			// 		data3_baseline[i] = response_baseline[i]
			// 	}

			// 	fetch('http://127.0.0.1:5000/chartz_runbot_ut_bot_alert/'+symbl+'/'+tmfrm)
			// 	.then((r) => r.json())
			// 	.then((response) => {

			// 		//console.log(response_hull)

			// 		// candleSeries.setData(response);

			// 		datesForMarkers_cross = response
			// 		var markers_check = [];
			// 		var markers_check_baseline = [];
			// 		datesForMarkers_baseline = data3_baseline

			// 		for (var i = 2; i < datesForMarkers_cross.length; i++) {
						
			// 			if(i < datesForMarkers_baseline.length){
			// 				if(datesForMarkers_baseline[i].position == "buy"){
			// 					markers.push({
			// 						time: datesForMarkers_baseline[i].time,
			// 						position: 'belowBar',
			// 						color: '#2196F3',
			// 						shape: 'circle',
			// 						text: 'CrossOver @ ' + datesForMarkers_baseline[i].close
			// 					});
		
			// 					// markers_check.pop()
			// 					// markers_check.push('buy')
								
						
			// 					}else if(datesForMarkers_baseline[i].position == "sell"){
							
			// 						markers.push({
			// 							time: datesForMarkers_baseline[i].time,
			// 							position: 'aboveBar',
			// 							color: '#e91e63',
			// 							shape: 'circle',
			// 							text: 'CrossOver @ ' + datesForMarkers_baseline[i].close+' - Sell'
			// 						});	
									
			// 						// markers_check.pop()
			// 						// markers_check.push('sell')
							
			// 					}
			// 			}
						

			// 			if(datesForMarkers_cross[i].position == "buy"){
			// 				markers.push({
			// 					time: datesForMarkers_cross[i].time,
			// 					position: 'belowBar',
			// 					color: '#2196F3',
			// 					shape: 'arrowUp',
			// 					text: 'CrossOver @ ' + datesForMarkers_cross[i].close
			// 				});

			// 				markers_check.pop()
			// 				markers_check.push('buy')
							
					
			// 			}else if(datesForMarkers_cross[i].position == "sell"){
					
			// 				markers.push({
			// 					time: datesForMarkers_cross[i].time,
			// 					position: 'aboveBar',
			// 					color: '#e91e63',
			// 					shape: 'arrowDown',
			// 					text: 'CrossOver @ ' + datesForMarkers_cross[i].close+' - Sell'
			// 				});	
							
			// 				markers_check.pop()
			// 				markers_check.push('sell')
					
			// 			}			

						
			// 		}

			// 		candleSeries.setMarkers(markers);

						
			// 	});

			// 	//console.log(response_hull)

			// 	// candleSeries.setData(response);

					
			// });

			// setTimeout(() => {
			// 	var all_markers = markers.concat(markers2)
			// 	candleSeries.setMarkers(all_markers);
			// }, 10000);

			

			// #endregion

			//#region EMA Lines

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud/'+symbl+'/'+tmfrm)
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)
			// 	//alert(symbl)
			// 	// lineSeries.setData(response);
			// 	lineSeries_ema_slow.setData(response);
				
			// });

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud_base/'+symbl+'/'+tmfrm)
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)

			// 	// lineSeries.setData(response);
			// 	lineSeries_ema_fast.setData(response);
				
			// });

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud_crossover/'+symbl+'/'+tmfrm)
			// .then((r) => r.json())
			// .then((response_cloud) => {
			// 	//console.log(response_cloud)

			// 	var datesForMarkers_cloud = response_cloud
			// 	var markers_cloud = [];

			// 	for (var i = 2; i < datesForMarkers_cloud.length; i++) {

			// 		if(datesForMarkers_cloud[i].position == "buy"){

			// 			markers_cloud.push({
			// 				time: datesForMarkers_cloud[i].time,
			// 				position: 'belowBar',
			// 				color: '#22d130',
			// 				shape: 'arrowUp',
			// 				text: 'Buy Baseline @ ' + Math.floor(datesForMarkers_cloud[i].low - 2)
			// 			});
						
			// 		}else if(datesForMarkers_cloud[i].position == "sell"){

			// 			markers_cloud.push({
			// 				time: datesForMarkers_cloud[i].time,
			// 				position: 'aboveBar',
			// 				color: '#e91e63',
			// 				shape: 'arrowDown',
			// 				text: 'Sell Baseline @ ' + Math.floor(datesForMarkers_cloud[i].high + 2)
			// 			});

			// 		}
			// 		//#d52b2b
										
			// 	}

			// 	candleSeries.setMarkers(markers_cloud);
			// })

			//#endregion



			//#region ema_crosses

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_crossover/'+symbl+'/'+tmfrm)
			// .then((r) => r.json())
			// .then((response_hull) => {
			// 	//console.log(response_hull)

			// 	var datesForMarkers_hull = response_hull
			// 	var markers_hull = [];

			// 	for (var i = 2; i < datesForMarkers_hull.length; i++) {

			// 		if(datesForMarkers_hull[i].position == "buy"){

			// 			markers_hull.push({
			// 				time: datesForMarkers_hull[i].time,
			// 				position: 'belowBar',
			// 				color: '#22d130',
			// 				shape: 'circle',
			// 				text: 'Buy @ ' + Math.floor(datesForMarkers_hull[i].low - 2)
			// 			});
						
			// 		}else if(datesForMarkers_hull[i].position == "sell"){

			// 			markers_hull.push({
			// 				time: datesForMarkers_hull[i].time,
			// 				position: 'aboveBar',
			// 				color: '#e91e63',
			// 				shape: 'circle',
			// 				text: 'Sell @ ' + Math.floor(datesForMarkers_hull[i].high + 2)
			// 			});

			// 		}
			// 		//#d52b2b
										
			// 	}

			// 	candleSeries.setMarkers(markers_hull);
			// })

			//#endregion



			// fetch('http://127.0.0.1:5000/chartz_runbot_ut_bot_alert/'+symbl+'/'+tmfrm)
			// .then((r) => r.json())
			// .then((response) => {

			// 	//console.log(response_hull)

			// 	// candleSeries.setData(response);

			// 	datesForMarkers_cross = response
				
			// 	var markers_check = [];

			// 	for (var i = 2; i < datesForMarkers_cross.length; i++) {


			// 		if(datesForMarkers_cross[i].position == "buy"){
			// 			markers.push({
			// 				time: datesForMarkers_cross[i].time,
			// 				position: 'belowBar',
			// 				color: '#2196F3',
			// 				shape: 'arrowUp',
			// 				text: 'CrossOver @ ' + datesForMarkers_cross[i].close
			// 			});

			// 			markers_check.pop()
			// 			markers_check.push('buy')
						
				
			// 		}else if(datesForMarkers_cross[i].position == "sell"){
				
			// 			markers.push({
			// 				time: datesForMarkers_cross[i].time,
			// 				position: 'aboveBar',
			// 				color: '#e91e63',
			// 				shape: 'arrowDown',
			// 				text: 'CrossOver @ ' + datesForMarkers_cross[i].close+' - Sell'
			// 			});	
						
			// 			markers_check.pop()
			// 			markers_check.push('sell')
				
			// 		}			

					
			// 	}

			// 	candleSeries.setMarkers(markers);

					
			// });
		}

		
	}else if(interval == "D"){

		interval = "1d";
		document.getElementById('chart0').style.display = "none";
		document.getElementById('chart').style.display = "block";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart3').style.display = "none";
		document.getElementById('chart4').style.display = "none";

		document.getElementById('chart5').style.display = "none";
		document.getElementById('chart6').style.display = "none";
		document.getElementById('chart7').style.display = "none";

		if(chart2Data == "Open"){

			//alert(chart2Data)

			document.getElementById('chart2Data').innerHTML = "Loaded";

			candleSeries_hull = chart.addCandlestickSeries({
				upColor: '#00ff00',
				downColor: '#ff0000', 
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			});

			

			fetch('http://127.0.0.1:5000/chartrealtime/'+symbl+'/'+interval)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)		
				candleSeries_hull.setData(response);
				//atr_output = load_atr_0(interval);
	
			});

			fetch('http://127.0.0.1:5000/chartz_runbot_ut_bot_alert/'+symbl+'/'+interval)
			.then((r) => r.json())
			.then((response) => {

				//console.log(response_hull)

				// candleSeries.setData(response);
				// var markers = [];
				
				// var markers_check = [];

				// var datesForMarkers_cross = response;
				var markers_0 = [];
				
				for (var i = 2; i < response.length; i++) {


					if(response[i].position == "buy"){
						markers_0.push({
							time: response[i].time,
							position: 'belowBar',
							color: '#2196F3',
							shape: 'arrowUp',
							text: 'CrossOver @ ' + response[i].close
						});

						// markers_check.pop()
						// markers_check.push('buy')
						
				
					}else if(response[i].position == "sell"){
				
						markers_0.push({
							time: response[i].time,
							position: 'aboveBar',
							color: '#e91e63',
							shape: 'arrowDown',
							text: 'CrossOver @ ' + response[i].close+' - Sell'
						});	
						
						// markers_check.pop()
						// markers_check.push('sell')
				
					}			

					
				}

				candleSeries_hull.setMarkers(markers_0);

					
			});

			

				// #region Chandellier
				
	
				// #endregion
	

			//#region ema_crosses

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_crossover/'+symbl+'/'+interval)
			// .then((r) => r.json())
			// .then((response_hull) => {
			// 	//console.log(response_hull)

			// 	// candleSeries.setData(response);

			// 	var datesForMarkers_hull = response_hull
			// 	var markers_hull = [];

			// 	for (var i = 2; i < datesForMarkers_hull.length; i++) {

			// 		if(datesForMarkers_hull[i].position == "buy"){

			// 			markers_hull.push({
			// 				time: datesForMarkers_hull[i].time,
			// 				position: 'belowBar',
			// 				color: '#22d130',
			// 				shape: 'circle',
			// 				text: 'Buy @ ' + Math.floor(datesForMarkers_hull[i].low - 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'
			// 			});
						
			// 		}else if(datesForMarkers_hull[i].position == "sell"){

			// 			markers_hull.push({
			// 				time: datesForMarkers_hull[i].time,
			// 				position: 'aboveBar',
			// 				color: '#e91e63',
			// 				shape: 'circle',
			// 				text: 'Sell @ ' + Math.floor(datesForMarkers_hull[i].high + 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'
			// 			});

						
			// 		}
			// 		//#d52b2b				
					
			// 	}

			// 	candleSeries_hull.setMarkers(markers_hull);
			// })

			//#endregion

		}
	
	}else if(interval == "4h"){

		document.getElementById('chart0').style.display = "none";
		document.getElementById('chart').style.display = "none";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart3').style.display = "block";
		document.getElementById('chart4').style.display = "none";

		document.getElementById('chart5').style.display = "none";
		document.getElementById('chart6').style.display = "none";
		document.getElementById('chart7').style.display = "none";

		if(chartData == "Open"){

			document.getElementById('chartData').innerHTML = "Loaded";

			candleSeries_hull_4hr = chart_hull_4hr.addCandlestickSeries({
				upColor: '#00ff00',
				downColor: '#ff0000', 
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			});

			fetch('http://127.0.0.1:5000/chartrealtime/'+symbl+'/'+interval)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)		
				candleSeries_hull_4hr.setData(response);
				//atr_output = load_atr_0(interval);
	
			});

			// alert(interval)

			fetch('http://127.0.0.1:5000/chartz_runbot_ut_bot_alert/'+symbl+'/'+interval)
			.then((r) => r.json())
			.then((response) => {

				//console.log(response_hull)

				// candleSeries.setData(response);

				//datesForMarkers_cross = response
				var markers_0 = [];
				
				for (var i = 2; i < response.length; i++) {

					if(response[i].position == "buy"){
						markers_0.push({
							time: response[i].time,
							position: 'belowBar',
							color: '#2196F3',
							shape: 'arrowUp',
							text: 'CrossOver @ ' + response[i].close
						});

						// markers_check.pop()
						// markers_check.push('buy')
						
				
					}else if(response[i].position == "sell"){
				
						markers_0.push({
							time: response[i].time,
							position: 'aboveBar',
							color: '#e91e63',
							shape: 'arrowDown',
							text: 'CrossOver @ ' + response[i].close+' - Sell'
						});	
						
						// markers_check.pop()
						// markers_check.push('sell')
				
					}			

					
				}

				candleSeries_hull_4hr.setMarkers(markers_0);

					
			});

			// #region Chandellier - chartz_runbot_chandelier
			

			// #endregion
	

			//#region ema_crosses

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud_price_crossover/'+symbl+'/'+interval)
			// .then((r) => r.json())
			// .then((response_hull) => {
			// 	//console.log(response_hull)

			// 	// candleSeries.setData(response);

			// 	var datesForMarkers_hull = response_hull
			// 	var markers_hull = [];

			// 	for (var i = 2; i < datesForMarkers_hull.length; i++) {

			// 		if(datesForMarkers_hull[i].position == "buy"){

			// 			markers_hull.push({
			// 				time: datesForMarkers_hull[i].time,
			// 				position: 'belowBar',
			// 				color: '#22d130',
			// 				shape: 'circle',
			// 				//text: 'Buy @ ' + Math.floor(datesForMarkers_hull[i].low)
			// 			});
						
			// 		}else if(datesForMarkers_hull[i].position == "sell"){

			// 			markers_hull.push({
			// 				time: datesForMarkers_hull[i].time,
			// 				position: 'aboveBar',
			// 				color: '#e91e63',
			// 				shape: 'circle',
			// 				//text: 'Sell @ ' + Math.floor(datesForMarkers_hull[i].high)
			// 			});

						
			// 		}
			// 		//#d52b2b				
					
			// 	}

			// 	candleSeries_hull_4hr.setMarkers(markers_hull);
			// })

			//#endregion

		}
	
	}else if(interval == "1h"){

		document.getElementById('chart0').style.display = "none";
		document.getElementById('chart').style.display = "none";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart3').style.display = "none";
		document.getElementById('chart4').style.display = "block";

		document.getElementById('chart5').style.display = "none";
		document.getElementById('chart6').style.display = "none";
		document.getElementById('chart7').style.display = "none";

		if(chart4Data == "Open"){

			document.getElementById('chart4Data').innerHTML = "Loaded";

			candleSeries_hull_1hr = chart_hull_1hr.addCandlestickSeries({
				upColor: '#00ff00',
				downColor: '#ff0000', 
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			});

			fetch('http://127.0.0.1:5000/chartrealtime/'+symbl+'/'+interval)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)		
				candleSeries_hull_1hr.setData(response);
	
			});

		
			// #region Chandellier - chartz_runbot_chandelier
			fetch('http://127.0.0.1:5000/chartz_runbot_ut_bot_alert/'+symbl+'/'+interval)
			.then((r) => r.json())
			.then((response) => {

				//console.log(response_hull)

			// candleSeries.setData(response);

			//var datesForMarkers_cross = response
			// var markers_noise = [];
			// var markers_check_noise = [];
			var markers_0 = [];

			for (var i = 2; i < response.length; i++) {


				if(response[i].position == "buy"){
					markers_0.push({
						time: response[i].time,
						position: 'belowBar',
						color: '#2196F3',
						shape: 'arrowUp',
						text: 'CrossOver @ ' + response[i].close
					});

					// markers_check_noise.pop()
					// markers_check_noise.push('buy')
					
			
				}else if(response[i].position == "sell"){
			
					markers_0.push({
						time: response[i].time,
						position: 'aboveBar',
						color: '#e91e63',
						shape: 'arrowDown',
						text: 'CrossOver @ ' + response[i].close+' - Sell'
					});	
					
					// markers_check_noise.pop()
					// markers_check_noise.push('sell')
			
				}			

				
			}

			candleSeries_hull_1hr.setMarkers(markers_0);

					
			});

			// #endregion
	
			//#region Lines

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud/'+symbl+'/'+interval)
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)
			// 	//alert(symbl)
			// 	// lineSeries.setData(response);
			// 	lineSeries_ema_slow_1hr.setData(response);
				
			// });

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud_base/'+symbl+'/'+interval)
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)
			// 	//alert(symbl)
			// 	// lineSeries.setData(response);
			// 	lineSeries_ema_fast_1hr.setData(response);
				
			// });

			//#endregion


			//#region ema_crosses

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud_price_crossover/'+symbl+'/'+interval)
			// .then((r) => r.json())
			// .then((response_hull) => {
			// 	//console.log(response_hull)

			// 	// candleSeries.setData(response);

			// 	var datesForMarkers_hull = response_hull
			// 	var markers_hull = [];

			// 	for (var i = 2; i < datesForMarkers_hull.length; i++) {

			// 		if(datesForMarkers_hull[i].position == "buy"){

			// 			markers_hull.push({
			// 				time: datesForMarkers_hull[i].time,
			// 				position: 'belowBar',
			// 				color: '#22d130',
			// 				shape: 'circle',
			// 				//text: 'Buy @ ' + Math.floor(datesForMarkers_hull[i].low - 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'
			// 			});
						
			// 		}else if(datesForMarkers_hull[i].position == "sell"){

			// 			markers_hull.push({
			// 				time: datesForMarkers_hull[i].time,
			// 				position: 'aboveBar',
			// 				color: '#e91e63',
			// 				shape: 'circle',
			// 				// text: 'Sell @ ' + Math.floor(datesForMarkers_hull[i].high + 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'
			// 			});

						
			// 		}
			// 		//#d52b2b				
					
			// 	}

			// 	candleSeries_hull_1hr.setMarkers(markers_hull);
			// })

			//#endregion

		}
	
	}else if(interval == "30m"){

		document.getElementById('chart0').style.display = "none";
		document.getElementById('chart').style.display = "none";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart3').style.display = "none";
		document.getElementById('chart4').style.display = "none";

		document.getElementById('chart5').style.display = "block";
		document.getElementById('chart6').style.display = "none";
		document.getElementById('chart7').style.display = "none";
		

		if(chart5Data == "Open"){

			var lineSeries_ema_slow_30m = chart_30m.addLineSeries({
				color: '#fff',
				  lineWidth: 2,
			});
			
			var lineSeries_ema_fast_30m = chart_30m.addLineSeries({
				color: '#22d130',
				  lineWidth: 2,
			});

			document.getElementById('chart5Data').innerHTML = "Loaded";

			candleSeries_30m = chart_30m.addCandlestickSeries({
				upColor: '#00ff00',
				downColor: '#ff0000', 
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			});

			fetch('http://127.0.0.1:5000/chartrealtime/'+symbl+'/'+interval)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)		
				candleSeries_30m.setData(response);
	
			});


			
			// #region Chandellier
			fetch('http://127.0.0.1:5000/chartz_runbot_ut_bot_alert/'+symbl+'/'+interval)
			.then((r) => r.json())
			.then((response) => {

				//console.log(response_hull)

			// candleSeries.setData(response);

			// var datesForMarkers_cross = response
			// var markers_noise = [];
			// var markers_check_noise = [];
			var markers_0 = [];

			for (var i = 2; i < response.length; i++) {


				if(response[i].position == "buy"){
					markers_0.push({
						time: response[i].time,
						position: 'belowBar',
						color: '#2196F3',
						shape: 'arrowUp',
						text: 'CrossOver @ ' + response[i].close
					});

					// markers_check_noise.pop()
					// markers_check_noise.push('buy')
					
			
				}else if(response[i].position == "sell"){
			
					markers_0.push({
						time: response[i].time,
						position: 'aboveBar',
						color: '#e91e63',
						shape: 'arrowDown',
						text: 'CrossOver @ ' + response[i].close+' - Sell'
					});	
					
					// markers_check_noise.pop()
					// markers_check_noise.push('sell')
			
				}			

				
			}

			candleSeries_30m.setMarkers(markers_0);

					
			});

			// #endregion
	
			//#region Line

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud/'+symbl+'/'+interval)
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)
			// 	//alert(symbl)
			// 	// lineSeries.setData(response);
			// 	lineSeries_ema_slow_30m.setData(response);
				
			// });

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud_base/'+symbl+'/'+interval)
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)
			// 	//alert(symbl)
			// 	// lineSeries.setData(response);
			// 	lineSeries_ema_fast_30m.setData(response);
				
			// });

			//#endregion


			//#region ema_crosses

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud_price_crossover/'+symbl+'/'+interval)
			// .then((r) => r.json())
			// .then((response_hull) => {
			// 	//console.log(response_hull)

			// 	// candleSeries.setData(response);

			// 	var datesForMarkers_hull = response_hull
			// 	var markers_hull = [];

			// 	for (var i = 2; i < datesForMarkers_hull.length; i++) {

			// 		if(datesForMarkers_hull[i].position == "buy"){

			// 			markers_hull.push({
			// 				time: datesForMarkers_hull[i].time,
			// 				position: 'belowBar',
			// 				color: '#22d130',
			// 				shape: 'circle',
			// 				//text: 'Buy @ ' + Math.floor(datesForMarkers_hull[i].low - 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'
			// 			});
						
			// 		}else if(datesForMarkers_hull[i].position == "sell"){

			// 			markers_hull.push({
			// 				time: datesForMarkers_hull[i].time,
			// 				position: 'aboveBar',
			// 				color: '#e91e63',
			// 				shape: 'circle',
			// 				// text: 'Sell @ ' + Math.floor(datesForMarkers_hull[i].high + 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'
			// 			});

						
			// 		}
			// 		//#d52b2b				
					
			// 	}

			// 	candleSeries_30m.setMarkers(markers_hull);
			// })

			//#endregion

		}
	
	}else if(interval == "15m"){

		document.getElementById('chart0').style.display = "none";
		document.getElementById('chart').style.display = "none";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart3').style.display = "none";
		document.getElementById('chart4').style.display = "none";

		document.getElementById('chart5').style.display = "none";
		document.getElementById('chart6').style.display = "block";
		document.getElementById('chart7').style.display = "none";


		if(chart6Data == "Open"){

			var lineSeries_ema_slow_15m = chart_15m.addLineSeries({
				color: '#fff',
				  lineWidth: 2,
			});
			
			var lineSeries_ema_fast_15m = chart_15m.addLineSeries({
				color: '#22d130',
				  lineWidth: 2,
			});

			document.getElementById('chart6Data').innerHTML = "Loaded";

			candleSeries_15m = chart_15m.addCandlestickSeries({
				upColor: '#00ff00',
				downColor: '#ff0000', 
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			});

			fetch('http://127.0.0.1:5000/chartrealtime/'+symbl+'/'+interval)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)		
				candleSeries_15m.setData(response);
	
			});

			
			// #region Chandellier - chartz_runbot_chandelier
			fetch('http://127.0.0.1:5000/chartz_runbot_ut_bot_alert/'+symbl+'/'+interval)
			.then((r) => r.json())
			.then((response) => {

				//console.log(response_hull)

			// candleSeries.setData(response);

			// var datesForMarkers_cross = response
			// var markers_noise = [];
			// var markers_check_noise = [];

			var markers_0 = [];

			for (var i = 2; i < response.length; i++) {


				if(response[i].position == "buy"){
					markers_0.push({
						time: response[i].time,
						position: 'belowBar',
						color: '#2196F3',
						shape: 'arrowUp',
						text: 'CrossOver @ ' + response[i].close
					});

					// markers_check_noise.pop()
					// markers_check_noise.push('buy')
					
			
				}else if(response[i].position == "sell"){
			
					markers_0.push({
						time: response[i].time,
						position: 'aboveBar',
						color: '#e91e63',
						shape: 'arrowDown',
						text: 'CrossOver @ ' + response[i].close+' - Sell'
					});	
					
					// markers_check_noise.pop()
					// markers_check_noise.push('sell')
			
				}			

				
			}

			candleSeries_15m.setMarkers(markers_0);

					
			});

			//#endregion
	
			//#region Lines

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud/'+symbl+'/'+interval)
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)
			// 	//alert(symbl)
			// 	// lineSeries.setData(response);
			// 	lineSeries_ema_slow_15m.setData(response);
				
			// });

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud_base/'+symbl+'/'+interval)
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)
			// 	//alert(symbl)
			// 	// lineSeries.setData(response);
			// 	lineSeries_ema_fast_15m.setData(response);
				
			// });

			//#endregion


			//#region ema_crosses

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud_price_crossover/'+symbl+'/'+interval)
			// .then((r) => r.json())
			// .then((response_hull) => {
			// 	//console.log(response_hull)

			// 	// candleSeries.setData(response);

			// 	var datesForMarkers_hull = response_hull
			// 	var markers_hull = [];

			// 	for (var i = 2; i < datesForMarkers_hull.length; i++) {

			// 		if(datesForMarkers_hull[i].position == "buy"){

			// 			markers_hull.push({
			// 				time: datesForMarkers_hull[i].time,
			// 				position: 'belowBar',
			// 				color: '#22d130',
			// 				shape: 'circle',
			// 				//text: 'Buy @ ' + Math.floor(datesForMarkers_hull[i].low - 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'
			// 			});
						
			// 		}else if(datesForMarkers_hull[i].position == "sell"){

			// 			markers_hull.push({
			// 				time: datesForMarkers_hull[i].time,
			// 				position: 'aboveBar',
			// 				color: '#e91e63',
			// 				shape: 'circle',
			// 				// text: 'Sell @ ' + Math.floor(datesForMarkers_hull[i].high + 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'
			// 			});

						
			// 		}
			// 		//#d52b2b				
					
			// 	}

			// 	candleSeries_15m.setMarkers(markers_hull);
			// })

			//#endregion

		}
	
	}else if(interval == "5m"){

		document.getElementById('chart0').style.display = "none";
		document.getElementById('chart').style.display = "none";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart3').style.display = "none";
		document.getElementById('chart4').style.display = "none";

		document.getElementById('chart5').style.display = "none";
		document.getElementById('chart6').style.display = "none";
		document.getElementById('chart7').style.display = "block";
		

		if(chart7Data == "Open"){

			var lineSeries_ema_slow_5m = chart_5m.addLineSeries({
				color: '#fff',
				  lineWidth: 2,
			});
			
			var lineSeries_ema_fast_5m = chart_5m.addLineSeries({
				color: '#22d130',
				  lineWidth: 2,
			});

			document.getElementById('chart7Data').innerHTML = "Loaded";

			candleSeries_5m = chart_5m.addCandlestickSeries({
				upColor: '#00ff00',
				downColor: '#ff0000', 
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			});

			fetch('http://127.0.0.1:5000/chartrealtime/'+symbl+'/'+interval)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)		
				candleSeries_5m.setData(response);
	
			});

			
			// #region Chandellier
			fetch('http://127.0.0.1:5000/chartz_runbot_ut_bot_alert/'+symbl+'/'+interval)
			.then((r) => r.json())
			.then((response) => {

			// console.log(response_hull)
			// candleSeries.setData(response);

			// var datesForMarkers_cross = response
			// var markers_noise = [];
			// var markers_check_noise = [];

			var markers_0 = [];

			for (var i = 2; i < response.length; i++) {

				if(response[i].position == "buy"){
					markers_0.push({
						time: response[i].time,
						position: 'belowBar',
						color: '#2196F3',
						shape: 'arrowUp',
						text: 'CrossOver @ ' + response[i].close
					});

					// markers_check_noise.pop()
					// markers_check_noise.push('buy')
					
			
				}else if(response[i].position == "sell"){
			
					markers_0.push({
						time: response[i].time,
						position: 'aboveBar',
						color: '#e91e63',
						shape: 'arrowDown',
						text: 'CrossOver @ ' + response[i].close+' - Sell'
					});	
					
					// markers_check_noise.pop()
					// markers_check_noise.push('sell')
			
				}			

				
			}

			candleSeries_5m.setMarkers(markers_0);

					
			});

			// #endregion
	
			//#region Lines

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud/'+symbl+'/'+interval)
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)
			// 	//alert(symbl)
			// 	// lineSeries.setData(response);
			// 	lineSeries_ema_slow_5m.setData(response);
				
			// });

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud_base/'+symbl+'/'+interval)
			// .then((r) => r.json())
			// .then((response) => {
			// 	//console.log(response)
			// 	//alert(symbl)
			// 	// lineSeries.setData(response);
			// 	lineSeries_ema_fast_5m.setData(response);
				
			// });

			//#endregion


			//#region ema_crosses

			// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud_price_crossover/'+symbl+'/'+interval)
			// .then((r) => r.json())
			// .then((response_hull) => {
			// 	//console.log(response_hull)

			// 	// candleSeries.setData(response);

			// 	var datesForMarkers_hull = response_hull
			// 	var markers_hull = [];

			// 	for (var i = 2; i < datesForMarkers_hull.length; i++) {

			// 		if(datesForMarkers_hull[i].position == "buy"){

			// 			markers_hull.push({
			// 				time: datesForMarkers_hull[i].time,
			// 				position: 'belowBar',
			// 				color: '#22d130',
			// 				shape: 'circle',
			// 				//text: 'Buy @ ' + Math.floor(datesForMarkers_hull[i].low - 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'
			// 			});
						
			// 		}else if(datesForMarkers_hull[i].position == "sell"){

			// 			markers_hull.push({
			// 				time: datesForMarkers_hull[i].time,
			// 				position: 'aboveBar',
			// 				color: '#e91e63',
			// 				shape: 'circle',
			// 				// text: 'Sell @ ' + Math.floor(datesForMarkers_hull[i].high + 2) + ' { ATR -- ' + Math.floor(datesForMarkers_hull[i].atr)+' }'
			// 			});

						
			// 		}
			// 		//#d52b2b				
					
			// 	}

			// 	candleSeries_5m.setMarkers(markers_hull);
			// })

			//#endregion

		}
	
	}

	
}

syncToInterval(intervals[0]);

//#endregion


// #region load chart

function load_chart(){

	document.getElementById('chart0Data').innerHTML = "Loaded";
	$("#chart0").html("")

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
	// var timeFrm2 = document.getElementById('time2').innerHTML;

	//alert(tmfrm)

	//alert(symbl)
	var chart_sma = LightweightCharts.createChart(document.getElementById('chart0'), {
		width: chartwidth,
		height: 505,
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

	var lineSeries_ema_slow = chart_sma.addLineSeries({
		color: '#1558ed',
		  lineWidth: 2,
	});

	var lineSeries_ema_fast = chart_sma.addLineSeries({
		color: '#22d130',
		  lineWidth: 2,
	});

	candleSeries = chart_sma.addCandlestickSeries({
		upColor: '#00ff00',
		downColor: '#ff0000', 
		borderDownColor: 'rgba(255, 144, 0, 1)',
		borderUpColor: 'rgba(255, 144, 0, 1)',
		wickDownColor: 'rgba(255, 144, 0, 1)',
		wickUpColor: 'rgba(255, 144, 0, 1)',
	});

	

	// Chart Data
	fetch('http://127.0.0.1:5000/chartrealtime/'+symbl+'/'+tmfrm)
	.then((r) => r.json())
	.then((response) => {
		//console.log(response)		
		candleSeries.setData(response);

		//var lastcounter = response.length-1
		//var lastprice = response[lastcounter].close;
		load_atr_0(tmfrm);

		// alert(atr_output[100].value)
		//console.log(atr_output)

		

	});

	

	//alert('fffhfh')

	// #region Chandellier
	
	fetch('http://127.0.0.1:5000/chartz_runbot_ut_bot_alert/'+symbl+'/'+tmfrm)
	.then((r) => r.json())
	.then((response) => {

		//console.log(response_hull)

		// candleSeries.setData(response);

		datesForMarkers_cross = response
		
		for (var i = 2; i < datesForMarkers_cross.length; i++) {


			if(datesForMarkers_cross[i].position == "buy"){
				markers.push({
					time: datesForMarkers_cross[i].time,
					position: 'belowBar',
					color: '#2196F3',
					shape: 'arrowUp',
					text: 'CrossOver @ ' + datesForMarkers_cross[i].close
				});

				markers_check.pop()
				markers_check.push('buy')
				
		
			}else if(datesForMarkers_cross[i].position == "sell"){
		
				markers.push({
					time: datesForMarkers_cross[i].time,
					position: 'aboveBar',
					color: '#e91e63',
					shape: 'arrowDown',
					text: 'CrossOver @ ' + datesForMarkers_cross[i].close+' - Sell'
				});	
				
				markers_check.pop()
				markers_check.push('sell')
		
			}			

			
		}

		candleSeries.setMarkers(markers);

			
	});

	fetch('http://127.0.0.1:5000/chartz_runbot_ut_bot_alert_baseline/'+symbl+'/'+tmfrm)
	.then((r) => r.json())
	.then((response) => {

		//console.log(response_hull)

		// candleSeries.setData(response);

		datesForMarkers_baseline = response
		
		for (var i = 2; i < datesForMarkers_baseline.length; i++) {

			if(datesForMarkers_baseline[i].position == "buy"){
				// markers2.push({
				// 	time: datesForMarkers_baseline[i].time,
				// 	position: 'belowBar',
				// 	color: '#2196F3',
				// 	shape: 'circle',
				// 	text: 'CrossOver @ ' + datesForMarkers_baseline[i].close
				// });

				markers_base_check.pop()
				markers_base_check.push('Long')
				
		
			}else if(datesForMarkers_baseline[i].position == "sell"){
		
				// markers2.push({
				// 	time: datesForMarkers_baseline[i].time,
				// 	position: 'aboveBar',
				// 	color: '#e91e63',
				// 	shape: 'circle',
				// 	text: 'CrossOver @ ' + datesForMarkers_baseline[i].close+' - Sell'
				// });	
				
				markers_base_check.pop()
				markers_base_check.push('Short')
		
			}			

			
		}

		//candleSeries.setMarkers(markers);

			
	});

	// #endregion

	// #region ema_cloud 

	// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud/'+symbl+'/'+tmfrm)
	// .then((r) => r.json())
	// .then((response) => {
	// 	//console.log(response)
	// 	//alert(symbl)
	// 	// lineSeries.setData(response);
	// 	lineSeries_ema_slow.setData(response);
		
	// });

	// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud_base/'+symbl+'/'+tmfrm)
	// .then((r) => r.json())
	// .then((response) => {
	// 	//console.log(response)

	// 	// lineSeries.setData(response);
	// 	lineSeries_ema_fast.setData(response);
		
	// });

	// #endregion
  

	// #region ema_cloud_crosses

	// fetch('http://127.0.0.1:5000/chartz_runbot_ema_cloud_crossover/'+symbl+'/'+tmfrm)
	// .then((r) => r.json())
	// .then((response_cloud) => {
	// 	//console.log(response_cloud)

	// 	var datesForMarkers_cloud = response_cloud
	// 	var markers_cloud = [];

	// 	for (var i = 2; i < datesForMarkers_cloud.length; i++) {

	// 		if(datesForMarkers_cloud[i].position == "buy"){

	// 			markers_cloud.push({
	// 				time: datesForMarkers_cloud[i].time,
	// 				position: 'belowBar',
	// 				color: '#22d130',
	// 				shape: 'arrowUp',
	// 				text: 'Buy Baseline @ ' + Math.floor(datesForMarkers_cloud[i].low - 2)
	// 			});
				
	// 		}else if(datesForMarkers_cloud[i].position == "sell"){

	// 			markers_cloud.push({
	// 				time: datesForMarkers_cloud[i].time,
	// 				position: 'aboveBar',
	// 				color: '#e91e63',
	// 				shape: 'arrowDown',
	// 				text: 'Sell Baseline @ ' + Math.floor(datesForMarkers_cloud[i].high + 2)
	// 			});

	// 		}
	// 		//#d52b2b
								
	// 	}

	// 	candleSeries.setMarkers(markers_cloud);
	// })

	//#endregion


	//#region ema_crossess

	// fetch('http://127.0.0.1:5000/chartz_runbot_ema_crossover/'+symbl+'/'+tmfrm)
	// .then((r) => r.json())
	// .then((response_hull) => {
	// 	//console.log(response_hull)

	// 	var datesForMarkers_hull = response_hull
	// 	var markers_hull = [];

	// 	for (var i = 2; i < datesForMarkers_hull.length; i++) {

	// 		if(datesForMarkers_hull[i].position == "buy"){

	// 			markers_hull.push({
	// 				time: datesForMarkers_hull[i].time,
	// 				position: 'belowBar',
	// 				color: '#22d130',
	// 				shape: 'circle',
	// 				text: 'Buy @ ' + Math.floor(datesForMarkers_hull[i].low - 2)
	// 			});
				
	// 		}else if(datesForMarkers_hull[i].position == "sell"){

	// 			markers_hull.push({
	// 				time: datesForMarkers_hull[i].time,
	// 				position: 'aboveBar',
	// 				color: '#e91e63',
	// 				shape: 'circle',
	// 				text: 'Sell @ ' + Math.floor(datesForMarkers_hull[i].high + 2)
	// 			});

	// 		}
	// 		//#d52b2b
								
	// 	}

	// 	candleSeries.setMarkers(markers_hull);
	// })

	//#endregion

	
}

// #endregion


//#region LineSeries
var lineSeries = chart.addLineSeries({
	color: '#e91e63',
  	lineWidth: 2,
});

var lineSeries2 = chart.addLineSeries({
	color: '#22d130',
  	lineWidth: 2,
});

var lineSeries3 = chart_hull_4hr.addLineSeries({
	color: '#fff',
  	lineWidth: 2,
});

var lineSeries33 = chart_hull_4hr.addLineSeries({
	color: '#e91e63',
  	lineWidth: 2,
});

var lineSeries4 = chart_hull_4hr.addLineSeries({
	color: '#22d130',
  	lineWidth: 2,
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
  	lineWidth: 2,
});


var lineSeries_ema_fast = chart_sma.addLineSeries({
	color: '#22d130',
  	lineWidth: 2,
});

var lineSeries_ema_slow_1hr = chart_hull_1hr.addLineSeries({
	color: '#fff',
  	lineWidth: 2,
});

var lineSeries_ema_fast_1hr = chart_hull_1hr.addLineSeries({
	color: '#22d130',
  	lineWidth: 2,
});



//#endregion

//#region Trade Calculation Functions

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

function transactionValues(trade_details){

	//$("#trade_detailss").show();

	//$("#trade_detailss").html("<tr><th colspan='7'> Starting Balance - "+trade_details[0].start_balance+"</th></tr>")
	//$("#trade_detailss").append("<tr><th>No.</th><th>Amount Buy</th><th>Amount Sell</th><th>Buy Time</th><th>Sell Time</th><th>Remaining Bal</th><th>Trade Outcome</th></tr>")

	var bgcolor = "#5ac75a";
	var pair = $("#current_pair").html()
	var tot_profit = 0;
	var tot_loss = 0;
	var real_pl = 0;
	var rel_balance = 100;
	var change_bal = 0;
	var position_type = "";
	var pos_type_long = 0;
	var pos_type_short = 0;
	var pl_ratio = 0

	var rec_current_loss = Number($(".rec_current_loss").val())
	var rec_track_loss = Number($(".rec_track_loss").val())
	var rec_type_loss = $(".rec_type_loss").val()

	var rec_loss_value = Number($(".rec_loss_value").val())
	var rec_track_loss_value = Number($(".rec_track_loss_value").val())
	var rec_tot_loss = 0;

	var rec_current_profit = Number($(".rec_current_profit").val())
	var rec_track_profit = Number($(".rec_track_profit").val())
	var rec_type_profit = $(".rec_type_profit").val()

	var rec_profit_value = Number($(".rec_profit_value").val())
	var rec_track_profit_value = Number($(".rec_track_profit_value").val())
	var rec_tot_profit = 0;
	

	var loss_drawdown = 0;
	var profit_drawdown = 0;

	var j = trade_details.length-1;

	for (var i = j; i > 0; i--) {

		rec_type_loss = $(".rec_type_loss").val()
		rec_track_loss = Number($(".rec_track_loss").val())
		rec_current_loss = Number($(".rec_current_loss").val())

		rec_loss_value = Number($(".rec_loss_value").val())
		rec_track_loss_value = Number($(".rec_track_loss_value").val())

		rec_type_profit = $(".rec_type_profit").val()
		rec_track_profit = Number($(".rec_track_profit").val())
		rec_current_profit = Number($(".rec_current_profit").val())

		rec_profit_value = Number($(".rec_profit_value").val())
		rec_track_profit_value = Number($(".rec_track_profit_value").val())

		if(trade_details[i].profit_loss < 0){

			tot_loss = Math.abs(trade_details[i].profit_loss)+Number(tot_loss);
			change_bal = (rel_balance*Number(trade_details[i].profit_loss))/100
			rel_balance = rel_balance-change_bal
			
			loss_drawdown = loss_drawdown+1
			rec_tot_loss = Math.abs(trade_details[i].profit_loss)+Number(rec_tot_loss);
			
			$(".rec_current_loss").val(loss_drawdown)
			$(".rec_loss_value").val(rec_tot_loss)
			$(".rec_type_loss").val("Loss")
			$(".rec_type_profit").val("Loss")

			bgcolor = "#d98b8b";

		}else if(trade_details[i].profit_loss > 0){

			

			bgcolor = "#5ac75a";
			tot_profit = Number(trade_details[i].profit_loss)+tot_profit;
			change_bal = (rel_balance*Number(trade_details[i].profit_loss))/100
			rel_balance = rel_balance+change_bal

			profit_drawdown = profit_drawdown+1
			rec_tot_profit = Math.abs(trade_details[i].profit_loss)+Number(rec_tot_profit);
			$(".rec_current_profit").val(profit_drawdown)
			$(".rec_profit_value").val(rec_tot_profit)
			$(".rec_type_profit").val("Profit")
			$(".rec_type_loss").val("Profit")
			
			
		}

		console.log("Time: "+trade_details[i].time+" | Pos Type: "+rec_type_loss+" | current_loss: "+ rec_current_loss+" | track_loss: "+ rec_track_loss+" | loss_value: "+ rec_loss_value)

		if(rec_type_loss == "Profit"){
			loss_drawdown = 0
			rec_tot_loss = 0
			$(".rec_current_loss").val(rec_tot_loss)
			rec_current_loss = $(".rec_current_loss").val()
			console.log(" - "+loss_drawdown+" | current_loss: "+ rec_current_loss)
			
		}
		if(rec_current_loss > rec_track_loss){
			//console.log("--- "+rec_current_loss)
			$(".rec_track_loss").val(rec_current_loss)
			$(".rec_track_loss_value").val(rec_loss_value)
			rec_track_loss = $(".rec_track_loss").val()
			rec_current_loss = $(".rec_current_loss").val()
			rec_track_loss_value = $(".rec_track_loss_value").val()
			
			console.log(" --- "+loss_drawdown+" | current_loss: "+ rec_current_loss+" | track_loss: "+ rec_track_loss)
			
			//console.log(trade_details[i].profit_loss)
			
		}

		if(rec_type_profit == "Loss"){
			//$(".rec_current_profit").val(profit_drawdown)
			profit_drawdown = 0
			rec_tot_profit = 0
		}
		if(rec_current_profit >= rec_track_profit){
			//console.log(rec_current_profit)
			$(".rec_track_profit").val(rec_current_profit)
			$(".rec_track_profit_value").val(rec_profit_value)
		}

		position_type = trade_details[i].position_type;
		if(position_type == "Long"){
			pos_type_long = pos_type_long+1;
		}else if(position_type == "Short"){
			pos_type_short = pos_type_short+1;
		}

		pl_ratio = Number(trade_details[i].profit_loss)+pl_ratio

		real_pl = Number(trade_details[i].profit_loss)+real_pl;

		//var dt = "<tr style='height: 60px;'><td>"+i+"</td><td>"+trade_details[i].amount_buy+"</td><td>"+trade_details[i].amount_sell+"</td><td>"+trade_details[i].time_buy+"</td><td>"+trade_details[i].time_sell+"</td><td>"+trade_details[i].remaining_balance+"</td><td style='background:"+bgcolor+"'>"+trade_details[i].trade_outcome+"%</td></tr>"

	}

	if(real_pl < 0){
		bgcolor1 = "#d98b8b";
	}else if(real_pl > 0){
		bgcolor1 = "#5ac75a";
	}else if(real_pl == 0){
		bgcolor1 = "#aeb54d";
	}

	

	tot_profit = parseFloat(tot_profit).toFixed(2);
	tot_loss = parseFloat(tot_loss).toFixed(2);
	real_pl = parseFloat(real_pl).toFixed(2);
	rel_balance = parseFloat(rel_balance).toFixed(2);
	rec_track_loss_value = parseFloat(rec_track_loss_value).toFixed(2);
	rec_track_profit_value = parseFloat(rec_track_profit_value).toFixed(2);

	var dt = `<tr>
				<td style="width: 150px;text-align: center;">${pair}</td>
				<td style="width: 150px;text-align: center;">1x</td>	
				<td style="width: 150px;text-align: center;"><span style="color:#5ac75a">${pos_type_long}</span>/<span style="color:#d98b8b">${pos_type_short}</span></td>
				<td style="width: 150px;text-align: center;">${rel_balance}</td>							
				<td style="width: 150px;text-align: center;color:#5ac75a">${tot_profit}</td>
				<td style="width: 150px;text-align: center;color:#d98b8b">${tot_loss}</td>	
				<td style="width: 150px;text-align: center;color:${bgcolor1}">${real_pl}</td>				
				<td style="width: 150px;text-align: center;"><span style="color:#5ac75a">${rec_track_profit}</span>/<span style="color:#d98b8b">${rec_track_loss}</span></td>
				<td style="width: 150px;text-align: center;color:#d98b8b"><span style="color:#5ac75a">${rec_track_profit_value}</span>/<span style="color:#d98b8b">${rec_track_loss_value}</span></td>
				
			</tr>`;

	$("#transactionValues tbody").html(dt)

	//$("#trade_detailss").append("</table>")
	//$("#trade_detailss").append("</div>")
	

}



function transactionDetails(trade_details){

	//$("#trade_detailss").show();

	//$("#trade_detailss").html("<tr><th colspan='7'> Starting Balance - "+trade_details[0].start_balance+"</th></tr>")
	//$("#trade_detailss").append("<tr><th>No.</th><th>Amount Buy</th><th>Amount Sell</th><th>Buy Time</th><th>Sell Time</th><th>Remaining Bal</th><th>Trade Outcome</th></tr>")

	var bgcolor = "#5ac75a";

	var j = trade_details.length-1;

	for (var i = j; i > 0; i--) {

		if(trade_details[i].profit_loss < 0){

			bgcolor = "#d98b8b";

		}else if(trade_details[i].profit_loss > 0){

			bgcolor = "#5ac75a";

		}else if(trade_details[i].profit_loss == 0){

			bgcolor = "#aeb54d";
		}

		var dt = `<tr>
					<td>${i}</td>
					<td style="text-align: center;width: 150px;">${trade_details[i].date}</td>
					<td style="text-align: center;width: 150px;">${trade_details[i].time}</td>
					<td style="width: 150px;text-align: center;">${trade_details[i].pair}</td>
					<td style="width: 150px;text-align: center;">${trade_details[i].timeframe}</td>
					<td style="width: 150px;text-align: center;">${trade_details[i].position_type}</td>
					<td style="width: 150px;text-align: center;">${trade_details[i].open_price}</td>
					<td style="width: 150px;text-align: center;">${trade_details[i].trade_price}</td>
					<td style="width: 150px;text-align: center;">${trade_details[i].stop_loss}</td>
					<td style="width: 150px;text-align: center;">${trade_details[i].take_profit}</td>					
					<td style="width: 150px;text-align: center;color:${bgcolor}">${trade_details[i].profit_loss}%</td>
				</tr>`;

		//var dt = "<tr style='height: 60px;'><td>"+i+"</td><td>"+trade_details[i].amount_buy+"</td><td>"+trade_details[i].amount_sell+"</td><td>"+trade_details[i].time_buy+"</td><td>"+trade_details[i].time_sell+"</td><td>"+trade_details[i].remaining_balance+"</td><td style='background:"+bgcolor+"'>"+trade_details[i].trade_outcome+"%</td></tr>"
		$("#transaction_details tbody").append(dt)

	}

	//$("#trade_detailss").append("</table>")
	//$("#trade_detailss").append("</div>")
	

}

function calcDetails(trade_details){

	//$("#trade_detailss").show();

	//$("#trade_detailss").html("<tr><th colspan='7'> Starting Balance - "+trade_details[0].start_balance+"</th></tr>")
	//$("#trade_detailss").append("<tr><th>No.</th><th>Amount Buy</th><th>Amount Sell</th><th>Buy Time</th><th>Sell Time</th><th>Remaining Bal</th><th>Trade Outcome</th></tr>")

	var bgcolor = "#5ac75a";

	
	for (var i = 0; i < trade_details.length; i++) {

		if(trade_details[i].trade_outcome < 0){

			bgcolor = "#d98b8b";

		}else if(trade_details[i].trade_outcome > 0){

			bgcolor = "#5ac75a";

		}else if(trade_details[i].trade_outcome == 0){

			bgcolor = "#aeb54d";
		}

		var dt = `<tr>
					<td>${i}</td>
					<td style="text-align: center;width: 150px;">${trade_details[i].amount_buy}</td>
					<td style="width: 150px;text-align: center;">${trade_details[i].amount_sell}</td>
					<td style="text-align: center;">${trade_details[i].time_buy}</td>
					<td style="text-align: center;">${trade_details[i].time_sell}</td>
					<td style="text-align: center;">${trade_details[i].remaining_balance}</td>
					<td style="width: 100px;text-align: right;color:${bgcolor}">${trade_details[i].trade_outcome}%</td>
				</tr>`;

		//var dt = "<tr style='height: 60px;'><td>"+i+"</td><td>"+trade_details[i].amount_buy+"</td><td>"+trade_details[i].amount_sell+"</td><td>"+trade_details[i].time_buy+"</td><td>"+trade_details[i].time_sell+"</td><td>"+trade_details[i].remaining_balance+"</td><td style='background:"+bgcolor+"'>"+trade_details[i].trade_outcome+"%</td></tr>"
		$("#trade_detailss tbody").append(dt)

	}

	//$("#trade_detailss").append("</table>")
	//$("#trade_detailss").append("</div>")
	

}

function calcDetailsx3(trade_details){

	//$("#trade_detailssx3").show();

	//$("#trade_detailssx3").html("<tr><th colspan='7'> Starting Balance x3 - "+trade_details[0].start_balance+"</th></tr>")
	//$("#trade_detailssx3").append("<tr><th>No.</th><th>Amount Buy</th><th>Amount Sell</th><th>Buy Time</th><th>Sell Time</th><th>Remaining Bal</th><th>Trade Outcome</th></tr>")

	var bgcolor = "#5ac75a";

	
	for (var i = 0; i < trade_details.length; i++) {

		if(trade_details[i].trade_outcome < 0){

			bgcolor = "#d98b8b";

		}else if(trade_details[i].trade_outcome > 0){

			bgcolor = "#5ac75a";

		}else if(trade_details[i].trade_outcome == 0){

			bgcolor = "#aeb54d";
		}

		var dt = `<tr>
					<td>${i}</td>
					<td style="text-align: center;width: 150px;">${trade_details[i].amount_buy}</td>
					<td style="width: 150px;text-align: center;">${trade_details[i].amount_sell}</td>
					<td>${trade_details[i].time_buy}</td>
					<td>${trade_details[i].time_sell}</td>
					<td style="width: 100px;">${trade_details[i].remaining_balance}</td>
					<td style="color:${bgcolor}">${trade_details[i].trade_outcome}%</td>
				</tr>`;

		//var dt = "<tr style='height: 60px;'><td>"+i+"</td><td>"+trade_details[i].amount_buy+"</td><td>"+trade_details[i].amount_sell+"</td><td>"+trade_details[i].time_buy+"</td><td>"+trade_details[i].time_sell+"</td><td>"+trade_details[i].remaining_balance+"</td><td style='background:"+bgcolor+"'>"+trade_details[i].trade_outcome+"%</td></tr>"
		$("#trade_detailssx3 tbody").append(dt)

	}

	//$("#trade_detailss").append("</table>")
	//$("#trade_detailssx3").append("</div>")
	

}

function calcDetailsx10(trade_details){

	//$("#trade_detailssx10").show();

	//$("#trade_detailssx10").html("<tr><th colspan='7'> Starting Balance x10 - "+trade_details[0].start_balance+"</th></tr>")
	//$("#trade_detailssx10").append("<tr><th>No.</th><th>Amount Buy</th><th>Amount Sell</th><th>Buy Time</th><th>Sell Time</th><th>Remaining Bal</th><th>Trade Outcome</th></tr>")

	var bgcolor = "#5ac75a";

	
	for (var i = 0; i < trade_details.length; i++) {

		if(trade_details[i].trade_outcome < 0){

			bgcolor = "#d98b8b";

		}else if(trade_details[i].trade_outcome > 0){

			bgcolor = "#5ac75a";

		}else if(trade_details[i].trade_outcome == 0){

			bgcolor = "#aeb54d";
		}
		
		var dt = `<tr>
					<td>${i}</td>
					<td style="text-align: center;width: 150px;">${trade_details[i].amount_buy}</td>
					<td style="width: 150px;text-align: center;">${trade_details[i].amount_sell}</td>
					<td>${trade_details[i].time_buy}</td>
					<td>${trade_details[i].time_sell}</td>
					<td style="width: 100px;">${trade_details[i].remaining_balance}</td>
					<td style="color:${bgcolor}">${trade_details[i].trade_outcome}%</td>
				</tr>`;

		//var dt = "<tr style='height: 60px;'><td>"+i+"</td><td>"+trade_details[i].amount_buy+"</td><td>"+trade_details[i].amount_sell+"</td><td>"+trade_details[i].time_buy+"</td><td>"+trade_details[i].time_sell+"</td><td>"+trade_details[i].remaining_balance+"</td><td style='background:"+bgcolor+"'>"+trade_details[i].trade_outcome+"%</td></tr>"
		$("#trade_detailssx10 tbody").append(dt)

	}

	//$("#trade_detailss").append("</table>")
	//$("#trade_detailssx10").append("</div>")
	

}

//#endregion

//#region Chart Backtest Loading
var tradePair = $('#symbol_backtest').val();
var timeFrm = document.getElementById('timeframe_backtest').innerHTML;
var timeFrm2 = $('#time2').val();

function load_chart_backtest(tradePair, timeFrame, date_backtest){

	$("#chart0").html("")


	var chart_sma = LightweightCharts.createChart(document.getElementById('chart0'), {
		width: chartwidth,
		  height: 505,
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

			// var lastClose = data[data.length - 1].close;
			// var lastDataIndex = data.length - 1;

			// var lengthIndex = lastDataIndex - 200

			// var minimumPrice = data[lengthIndex].close;
			// var maximumPrice = minimumPrice;

			
			// // alert(lastDataIndex)

			// for(var i = lengthIndex; i < data.length; i++) {
			// 	var price = data[i].close;
			// 	if (price > maximumPrice) {
			// 		maximumPrice = price;
			// 	}
			// 	if (price < minimumPrice) {
			// 		minimumPrice = price;
			// 	}
			// }

			// var avgUpperPrice = (maximumPrice + minimumPrice) / 1.7;
			// var avgPrice = (maximumPrice + minimumPrice) / 2;
			// var avgLowerPrice = (maximumPrice + minimumPrice) / 2.358;

			// // var avgUpperPrice = (maximumPrice + minimumPrice) * 0.618;
			// // var avgPrice = (maximumPrice + minimumPrice) * 0.5;
			// // var avgLowerPrice = (maximumPrice + minimumPrice) * 0.382;


			// var lineWidth = 3;
			// var minPriceLine = {
			// 	price: minimumPrice,
			// 	color: '#5ac75a',
			// 	lineWidth: lineWidth,
			// 	lineStyle: LightweightCharts.LineStyle.Solid,
			// 	axisLabelVisible: true,
			// 	title: 'minimum price',
			// };
			// var avgPriceLine = {
			// 	price: avgPrice,
			// 	color: '#aeb54d',
			// 	lineWidth: lineWidth,
			// 	lineStyle: LightweightCharts.LineStyle.Solid,
			// 	axisLabelVisible: true,
			// 	title: 'average price',
			// };

			// var avgUpperPriceLine = {
			// 	price: avgUpperPrice,
			// 	color: '#52afd3',
			// 	lineWidth: lineWidth,
			// 	lineStyle: LightweightCharts.LineStyle.Solid,
			// 	axisLabelVisible: true,
			// 	title: 'average Upper price',
			// };

			// var avgLowerPriceLine = {
			// 	price: avgLowerPrice,
			// 	color: '#52afd3',
			// 	lineWidth: lineWidth,
			// 	lineStyle: LightweightCharts.LineStyle.Solid,
			// 	axisLabelVisible: true,
			// 	title: 'average Lower price',
			// };
			
			// var maxPriceLine = {
			// 	price: maximumPrice,
			// 	color: '#be1238',
			// 	lineWidth: lineWidth,
			// 	lineStyle: LightweightCharts.LineStyle.Solid,
			// 	axisLabelVisible: true,
			// 	title: 'maximum price',
			// }



			// alert(minPriceLine)

			// if(timeFrame == "1d"){				
			// 	candleSeries.createPriceLine(avgUpperPriceLine);
			// 	candleSeries.createPriceLine(avgLowerPriceLine);				
			// }

			// candleSeries.createPriceLine(minPriceLine);
			// candleSeries.createPriceLine(avgPriceLine);
			// candleSeries.createPriceLine(maxPriceLine);

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
//#endregion

//#region Initial Data Loading
function load_data(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
	var date_backtest = $("#date_backtest").html();

    var comment_json = {
                        "symbol_pair": $("#symbol_backtest").val(),
						"timeframe": $("#timeframe_backtest").html()
                        }

    $.ajax({
        type: "POST",
        url: url_link+"/chartz/pair",        
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
//#endregion

//#region Simulation Data Loading
var init_data = "gg";

function load_simulation_data(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
	

    var comment_json = {
                        "symbol_pair": $("#symbol_backtest").val(),
						"timeframe": $("#timeframe_backtest").html()
                        }

	

    $.ajax({
        type: "POST",
        url: url_link+"/chartz/simulation",        
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
//#endregion


//#region Indicators Initial Loading

var atr_output_2;
var take_prf = 0.0;
var stop_lss = 0.0;
var handle_price;



function load_atr_0(tmfrm){

	var symbl = $("#symbol_backtest").val();
	//var tmfrm = $("#timeframe_backtest").html();
	

	//alert(symbl+" - "+tmfrm)

	let atrline =[]
	
	fetch('http://127.0.0.1:5000/realtime_atr_period/'+symbl+'/'+tmfrm)
	.then((r) => r.json())
	.then((response) => {

		// lineSeries_ema_slow.setData(response);

		// for(i = 0; i < response.length; i++){

		// 	atrline[i] = response[i]
		// }

		var lastcounter = response.length-1
		var lastprice = response[lastcounter].close;

		// alert(lastprice)
		// alert(response[lastcounter].value)
		// alert("atr")

		//console.log(lastprice)
		//atr_output_2 = atrline;
		
		var atr_crossover_trade1 = Number(Math.floor(response[lastcounter].value));
		//var price1 = Number($("#price_update").html());
		var price1 = lastprice;
		var avrAtr1 = parseFloat((atr_crossover_trade1/price1)*100).toFixed(2);
		var atrData1 = atr_crossover_trade1+" - x"+avrAtr1;
		var atrPrice = atr_crossover_trade1*avrAtr1;
		take_prf = parseFloat(Number(price1+atr_crossover_trade1*3.5)).toFixed(2)
		stop_lss = parseFloat(Number(price1-atr_crossover_trade1*1.5)).toFixed(2)
		var avrAtr1_ls = avrAtr1;
		var stop_ls = 0;
		
		if(markers_base_check[0] == 'Long'){
			take_prf = parseFloat(atrPrice+price1).toFixed(2)
			avrAtr1_ls = parseFloat(avrAtr1/2).toFixed(2)
			stop_ls = parseFloat(atr_crossover_trade1*avrAtr1_ls).toFixed(2)
			stop_lss = parseFloat(Number(price1)-Number(stop_ls)).toFixed(2)
			//alert("("+stop_lss+") - "+price1+" - "+stop_ls+" - Long || - "+baseline_check[0]+" | "+markers_check[0])

		
			// $("#longSignal").html("Bull Market <br>"+response[lastcounter].time_utc)
			// $("#longSignal").removeClass()
			// $("#longSignal").addClass("buy")

		}else if(markers_base_check[0] == 'Short'){
			take_prf = parseFloat(price1-atrPrice).toFixed(2)
			avrAtr1_ls = parseFloat(avrAtr1/2).toFixed(2)
			stop_ls = parseFloat(atr_crossover_trade1*avrAtr1_ls).toFixed(2)
			stop_lss = parseFloat(Number(price1)+Number(stop_ls)).toFixed(2)

			// $("#longSignal").html("Bear Market <br>"+response[lastcounter].time_utc)
			// $("#longSignal").removeClass()
			// $("#longSignal").addClass("sell")
			
			
			//alert("("+stop_lss+") - "+price1+" - "+stop_ls+" - Short || - "+baseline_check[0]+" | "+markers_check[0])
		}else if(markers_check[0] == 'sell'){
			take_prf = parseFloat(Number(price1-atr_crossover_trade1*3.5)).toFixed(2)
			stop_lss = parseFloat(Number(price1+atr_crossover_trade1*1.5)).toFixed(2)
		}
		//$("#atr_update").html(atrData1+" - "+atr_output[counterAtr].time_utc)
		if(avrAtr1 >= 3.5 ){

			$("#atr_update").addClass("longBtn");
			$("#atr_update").removeClass("shortBtn");
			
		}else if(avrAtr1 < 3){

			$("#atr_update").addClass("shortBtn");
			$("#atr_update").removeClass("longBtn");
		}

		$("#atr_update_number").html(atr_crossover_trade1)
		$("#atr_update").html(atrData1)
		$("#take_profit_update").html(take_prf)
		$("#stop_loss_update").html(stop_lss)		
		
		//alert(avrAtr1_ls+" - "+atr_crossover_trade1+" - "+price1)

		$("#price_update").html(lastprice)
		$(".price_updt").html(lastprice)

		//alert('disams')

		$(".linebtns button").prop('disabled', false);

		if(watch_mode == "Active"){
			$(".watch_btn").prop('disabled', true);
			$(".cleanwatch_btn").prop('disabled', false);
		}else if(watch_mode == "Inactive"){
			$(".watch_btn").prop('disabled', false);
			$(".cleanwatch_btn").prop('disabled', true);
		}
		
		

		
	})

	//return atrline
}

function load_atr(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
	

	///alert(symbl+tmfrm)

	let atrline =[]
	
	fetch('http://127.0.0.1:5000/chartz_runbot_atr_period/'+symbl+'/'+tmfrm)
	.then((r) => r.json())
	.then((response) => {

		// lineSeries_ema_slow.setData(response);

		for(i = 0; i < response.length; i++){

			atrline[i] = response[i]
		}

		
		
	})

	return atrline
}

function load_chandelier(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
	var date_backtest = $("#date_backtest").html();

	//alert(tmfrm)

	let atrline =[]
	
	fetch('http://127.0.0.1:5000/chartz_runbot_chandelier_sim/'+symbl+'/'+tmfrm)
	.then((r) => r.json())
	.then((response) => {

		// lineSeries_ema_slow.setData(response);

		for(i = 0; i < response.length; i++){

			atrline[i] = response[i]
		}

		
	})

	return atrline
}

function load_slowEMA(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
	var date_backtest = $("#date_backtest").html();

	let emaline =[]
	
	fetch('http://127.0.0.1:5000/chartz_runbot_ema_slow_sim/'+symbl+'/'+tmfrm)
	.then((r) => r.json())
	.then((response) => {

		// lineSeries_ema_slow.setData(response);

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
	var tmfrm = $("#timeframe_backtest").html();
	var date_backtest = $("#date_backtest").html();

	let emaline =[]


	
	fetch('http://127.0.0.1:5000/chartz_runbot_ema_fast_sim/'+symbl+'/'+tmfrm)
	.then((r) => r.json())
	.then((response) => {

		// lineSeries_ema_slow.setData(response);

		for(i = 0; i < response.length; i++){

			emaline[i] = response[i]
		}


		//alert(emaline)
		
	})

	return emaline
}

function load_crossoverEMA(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();

	let emaline =[]


	
	fetch('http://127.0.0.1:5000/chartz_runbot_ema_crossover_sim/'+symbl+'/'+tmfrm)
	.then((r) => r.json())
	.then((response) => {

		// lineSeries_ema_slow.setData(response);

		for(i = 0; i < response.length; i++){

			emaline[i] = response[i]
		}


		//alert(emaline)
		
	})

	return emaline
}

function load_slowNoiseEMA(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
	var date_backtest = $("#date_backtest").html();

	if(tmfrm == "1d"){

		tmfrm = "4h";
		
	}else if(tmfrm == "4h"){

		tmfrm = "1h";
	}

	let emaline =[]

	


	
	fetch('http://127.0.0.1:5000/chartz_runbot_ema_slow_sim/'+symbl+'/'+tmfrm)
	.then((r) => r.json())
	.then((response) => {

		// lineSeries_ema_slow.setData(response);

		for(i = 0; i < response.length; i++){

			emaline[i] = response[i]
		}

		//$(".fast_emaline_output").html(emaline.close)
		//alert(emaline)
		
	})

	return emaline
}

function load_fastNoiseEMA(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
	var date_backtest = $("#date_backtest").html();

	if(tmfrm == "1d"){

		tmfrm = "4h";
		
	}else if(tmfrm == "4h"){

		tmfrm = "1h";
	}

	let emaline =[]

	//alert(tmfrm)
	
	fetch('http://127.0.0.1:5000/chartz_runbot_ema_fast_sim/'+symbl+'/'+tmfrm)
	.then((r) => r.json())
	.then((response) => {

		// lineSeries_ema_slow.setData(response);

		for(i = 0; i < response.length; i++){

			emaline[i] = response[i]
		}


		// alert(emaline)
		
	})

	return emaline
}

function load_crossoverNoiseEMA(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();

	if(tmfrm == "1d"){

		tmfrm = "4h";
		
	}else if(tmfrm == "4h"){

		tmfrm = "1h";
	}

	let emaline =[]


	
	fetch('http://127.0.0.1:5000/chartz_runbot_ema_crossover_sim/'+symbl+'/'+tmfrm)
	.then((r) => r.json())
	.then((response) => {

		// lineSeries_ema_slow.setData(response);

		for(i = 0; i < response.length; i++){

			emaline[i] = response[i]
		}


		//alert(emaline)
		
	})

	return emaline
}

//#endregion

//#region Indicators Variables
var atr_output;
var fast_emaoutput;
var slow_emaoutput;
var crossover_emaoutput;

var fastNoise_emaoutput;
var slowNoise_emaoutput;
var crossoverNoise_emaoutput;
var load_chandelier;
//#endregion


function IntervalTimer(callback, interval) {
	var timerId, startTime, remaining = 0;
	var state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed

	this.pause = function () {
		if (state != 1) return;

		remaining = interval - (new Date() - startTime);
		window.clearInterval(timerId);
		state = 2;
		//alert(state)
	};

	this.resume = function () {
		if (state != 2) return;

		state = 3;
		window.setTimeout(this.timeoutCallback, remaining);
		//alert(state)
	};

	this.timeoutCallback = function () {
		if (state != 3) return;

		callback();

		startTime = new Date();
		timerId = window.setInterval(callback, interval);
		state = 1;
	};

	startTime = new Date();
	timerId = window.setInterval(callback, interval);
	state = 1;
}

//#region Simulation Price Playing Utilities Functions
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

//#endregion


var signalMode = $(".TradeMode").html();

//alert("bbfbf "+signalMode)

function tradeMode(){
	signalMode = $(".TradeMode").html();
	loadlines = $("#LoadLines").html();
	//alert(signalMode)
	if(loadlines == "open" || loadlines == "loaded"){

		if(signalMode == "1"){
			$(".TradeMode").html("0")
			$(".tradeModeBtn").html("Line Trade (Closed)");
			$(".tradeModeBtn2").html("Line Trade (Closed)");
			$(".tradeModeBtn2").addClass("shortBtn");
			$(".tradeModeBtn2").removeClass("longBtn");
			if(loadlines == "loaded"){
				save_money_mgmnt()
			}
				
		}else if(signalMode == "0"){
			$(".TradeMode").html("1")
			$(".tradeModeBtn").html("Line Trade (Opened)");
			$(".tradeModeBtn2").html("Line Trade (Opened)");
			
			$(".tradeModeBtn2").addClass("longBtn");
			$(".tradeModeBtn2").removeClass("shortBtn");
			if(loadlines == "loaded"){
				save_money_mgmnt()
			}
	
		}
	}
	
	
	
}

var signalMode_spot = $(".TradeModeEMA").html();

function tradeModeEMA(){
	signalMode_spot = $(".TradeModeEMA").html();
	loadclose = $("#LoadClose").html();
	//alert(loadclose)
	if(loadclose == "open" || loadclose == "loaded"){
		//alert(signalMode_spot)
		if(signalMode_spot == "1"){
			$(".TradeModeEMA").html("0")
			$(".tradeModeBtn3").html("Spot Trade (Closed)");
			$(".tradeModeBtn3").removeClass("longBtn");
			$(".tradeModeBtn3").addClass("shortBtn");
			$("#watch_trade").html("do")
			if(loadclose == "loaded"){
				change_spot_trading();
			}
			
	
		}else if(signalMode_spot == "0"){
			$(".TradeModeEMA").html("1")
			$(".tradeModeBtn3").html("Spot Trade (Opened)");	
			$(".tradeModeBtn3").removeClass("shortBtn");
			$(".tradeModeBtn3").addClass("longBtn");	
			$("#watch_trade").html("")
			if(loadclose == "loaded"){
				change_spot_trading();
			}
	
		} 
	}
	

	$("#watch_line_trade").html('do')

	
}

function playPause(){

	$(".pausePlay").html("1")
	$(".resumePlay").html("0")
	$("#pauseBtn").hide();
	$("#resumeBtn").show();
	$("#tradeModal").show();

}

function resumePause(){
    var transct = $(".tradeTransactx3").html();
	//alert(transct)
	
	if(transct == "0"){

		if(confirm("You haven't place a trade, Do you want to continue")){

			$(".resumePlay").html("1")
			$(".pausePlay").html("0")
			$("#pauseBtn").show();
			$("#resumeBtn").hide();
			$("#tradeModal").hide();
	
		}

	}else{

		$(".resumePlay").html("1")
		$(".pausePlay").html("0")
		$("#pauseBtn").show();
		$("#resumeBtn").hide();
		$("#tradeModal").hide();
	}


}

function playResetAll(){

	$(".resetPlay").html("1")

}

function openTradebox(entry_price, take_profit, stop_loss, atr_crossover_trade){

	$("#orderEntry").val(entry_price);
	$("#Takeprofit").val(take_profit);
	$("#stopLoss").val(stop_loss);
	$("#tradeModal").show();
	$("#orderModal").hide();

	signal = $(".signalShow").html();
	$("#atrBox").html(atr_crossover_trade);
	

	if(signal == "buy"){

		var pcentProfitbal = take_profit-entry_price;
		var pcentLosstbal = entry_price-stop_loss;
		var pcentProfit = Math.floor((pcentProfitbal/entry_price)*100);
		var pcentLoss = Math.floor((pcentLosstbal/entry_price)*100);

		$("#profitBox").html(pcentProfit+"%");
		$("#lossBox").html(pcentLoss+"%");
		
		$("#profitDiffBox").html(Math.floor(pcentProfitbal));
		$("#lossDiffBox").html(Math.floor(pcentLosstbal));

	}else if(signal == "sell"){

		var pcentProfitbal = entry_price-take_profit;
		var pcentLosstbal = stop_loss-entry_price;
		var pcentProfit = Math.floor((pcentProfitbal/entry_price)*100);
		var pcentLoss = Math.floor((pcentLosstbal/entry_price)*100);

		$("#profitBox").html(pcentProfit+"%");
		$("#lossBox").html(pcentLoss+"%");

		$("#profitDiffBox").html(Math.floor(pcentProfitbal));
		$("#lossDiffBox").html(Math.floor(pcentLosstbal));


	}

}

function longTrade(){
	
	$(".signalShow").html("buy");
	var entry_price = $("#orderEntry").val();
	var take_profit = $("#Takeprofit").val();
	var stop_loss = $("#stopLoss").val();
	var entryTime = $("#time_update").html();
	var price = $("#price_update").html();
	var symbl = $("#symbol_backtest").val();
	var Tradebal = $(".Tradebal").html();
	var LoadTrade = $("#LoadTrade").html();

	
	//alert("Buy - entry price - "+entry_price +"Buy take profit - "+ take_profit+"Buy stop loss - "+stop_loss)

	var tradedtls = "<td>"+symbl+"</td><td class='pos_type buytrd'>Long</td><td>"+Tradebal+"</td><td>"+entry_price+"</td><td class='price_updt'>"+price+"</td><td>"+stop_loss+"</td><td>"+take_profit+"</td><td class='pft-loss'>0%</td>";

	if(LoadTrade == ""){
		//$("#LoadTrade").html("loaded");
		//$(".tradeEntry").html(entry_price)
		$(".tradeTransactx3").html("1")
		$("#orderValues").html(tradedtls)
		$("#orderModal").show();
		$("#tradeModal").hide();
	}else{
		if(confirm("Are you sure you're going LONG")){
			//$(".tradeEntry").html(entry_price)
			$("#tradestatus").html("True");
			$(".tradeTransactx3").html("1")
			$("#orderValues").html(tradedtls)
			$("#orderModal").show();
			$("#tradeModal").hide();
			save_market_data()
			signalModeEMA = $(".TradeModeEMA").html();
			//alert(loadlines)
			if(signalModeEMA == "0"){
				tradeModeEMA()				
			}
			// if(loadlines == "loaded"){
			// 	save_market_data()
			// }
			
		}
	}
	
}

function shortTrade(){

	$(".signalShow").html("sell");
	var entry_price = $("#orderEntry").val();
	var take_profit = $("#Takeprofit").val();
	var stop_loss = $("#stopLoss").val();
	var entryTime = $("#time_update").html();
	var price = $("#price_update").html();
	var symbl = $("#symbol_backtest").val();
	var Tradebal = $(".Tradebal").html();
	var LoadTrade = $("#LoadTrade").html();

	var tradedtls = "<td>"+symbl+"</td><td class='pos_type selltrd'>Long</td><td>"+Tradebal+"</td><td>"+entry_price+"</td><td class='price_updt'>"+price+"</td><td>"+stop_loss+"</td><td>"+take_profit+"</td><td class='pft-loss'>0%</td>";

	if(LoadTrade == ""){
		//$("#LoadTrade").html("loaded");
		//$(".tradeEntry").html(entry_price)
		$(".tradeTransactx3").html("1")
		$("#orderValues").html(tradedtls)
		$("#orderModal").show();
		$("#tradeModal").hide();
	}else{
		if(confirm("Are you sure you're going SHORT")){
			//$(".tradeEntry").html(entry_price)
			$("#tradestatus").html("True");
			$(".tradeTransactx3").html("1")
			$("#orderValues").html(tradedtls)
			$("#orderModal").show();
			$("#tradeModal").hide();
			save_market_data()
			signalModeEMA = $(".TradeModeEMA").html();
			if(signalModeEMA == "0"){
				tradeModeEMA()
			}
			
		}
	}
	
}

function modifyTrade(){
	
	var signalShow = $(".signalShow").html();
	var entry_price = $("#orderEntry").val();
	var take_profit = $("#Takeprofit").val();
	var stop_loss = $("#stopLoss").val();
	var entryTime = $("#time_update").html();
	var price = $("#price_update").html();
	var symbl = $("#symbol_backtest").val();
	var Tradebal = $(".Tradebal").html();
	var LoadTrade = $(".tradeTransactx3").html();

	var bgCol = ""
	if(signalShow == "buy"){bgCol = 'buytrd'}else if(signalShow == "sell"){ bgCol = 'selltrd'}

	//alert(entry_price)

	var tradedtls = "<td>"+symbl+"</td><td class='pos_type "+bgCol+"'>Long</td><td>"+Tradebal+"</td><td>"+entry_price+"</td><td class='price_updt'>"+price+"</td><td>"+stop_loss+"</td><td>"+take_profit+"</td><td class='pft-loss'>0%</td>";

	if(LoadTrade == "0"){
		//$("#LoadTrade").html("loaded");
		//$(".tradeEntry").html(entry_price)
		alert("Trade Cannot be Found")
	}else if(LoadTrade == "1"){
		if(signalShow == "buy"){
			if(confirm("Are you sure you want to modify the BUY Trade")){
				//$(".tradeEntry").html(entry_price)
				$("#tradestatus").html("True");
				$("#orderValues").html(tradedtls)
				$("#orderModal").show();
				$("#tradeModal").hide();
				save_market_data()
			}
		}else if(signalShow == "sell"){
			if(confirm("Are you sure you want to modify the SELL Trade")){
				//$(".tradeEntry").html(entry_price)
				$("#tradestatus").html("True");
				$("#orderValues").html(tradedtls)
				$("#orderModal").show();
				$("#tradeModal").hide();
				save_market_data()
			}
		}
		
	}
	
}

function closeTrade(){

	var signalShow = $(".signalShow").html();
	var entry_price = $("#orderEntry").val();
	var take_profit = $("#Takeprofit").val();
	var stop_loss = $("#stopLoss").val();
	var entryTime = $("#time_update").html();
	var price = $("#price_update").html();
	var symbl = $("#symbol_backtest").val();
	var Tradebal = $(".Tradebal").html();
	var LoadTrade = $(".tradeTransactx3").html();
	
	var LoadTrade = $(".tradeTransactx3").html();
	tradestatus = $("#tradestatus").html();
	//alert(tradestatus)
	var tradedtls = "<td>"+symbl+"</td><td class='pos_type closetrd'>Close</td><td>"+Tradebal+"</td><td>"+entry_price+"</td><td class='price_updt'>"+price+"</td><td>"+stop_loss+"</td><td>"+take_profit+"</td><td class='pft-loss'>0%</td>";

	if(tradestatus == "False" || tradestatus == "Exit"){
		$("#LoadClose").html('loaded');
		$("#LoadLines").html('loaded');
		tradeModeEMA();
		tradeMode();
		$(".tradebtns").prop('disabled', false);
		$(".closetradebtn").html('Close');
		$(".closetradebtn").removeClass("buy")
		$(".closetradebtn").addClass("sell")
		$("#tradestatus").html("True");
	}else if(LoadTrade == "0"){
		//$("#LoadTrade").html("loaded");
		//$(".tradeEntry").html(entry_price)
		//tradeModeEMA();
		alert("Trade Cannot be Found")
	}else if(LoadTrade == "1"){
		if(confirm("Are you sure you want to CLOSE the current trade!!!")){
			$("#tradestatus").html("False");
			$("#orderValues").html(tradedtls)
			$("#LoadClose").html("loaded")
			signalMode = $(".TradeMode").html();
			signalMode_spot = $(".TradeModeEMA").html();
			if(signalMode == "1"){
				tradeMode()
			}
			if(signalMode_spot == "1"){
				tradeModeEMA()
			}
			$(".tradebtns").prop('disabled', true);
			$(".linebtns button").prop('disabled', true);
			$(".closetradebtn").html('Open');
			$(".closetradebtn").removeClass("sell")
			$(".closetradebtn").addClass("buy")
			change_spot_trading();
		}
	}
	

}



function gen_tradeLines(){

	loadlines = $("#LoadLines").html();

	//console.log(money_mngmt+" - "+loadlines)


	if(money_mngmt == "True" && loadlines == "open"){
		avgPrice = Number($("#price_update_prev").html());
		minimumPrice = Number($("#stop_loss_update_prev").html());
		maximumPrice = Number($("#take_profit_update_prev").html());
		atrData = Number($("#atr_update_number_prev").html());
		$("#price_update").html(avgPrice);
		$("#stop_loss_update").html(minimumPrice);
		$("#take_profit_update").html(maximumPrice);
		$("#atr_update_number").html(atrData);
	}else{
		avgPrice = Number($("#price_update").html());
		minimumPrice = Number($("#stop_loss_update").html());
		maximumPrice = Number($("#take_profit_update").html());
		atrData = Number($("#atr_update_number").html());

		// if(atrData < 3){
		// 	gen_tresholdLines()
		// 	return
		// }
	}
	

	//console.log("price: "+avgPrice+"takeprofit: "+maximumPrice+" - stoploss: "+minimumPrice+" atr: "+atrData)

	// var avgPrice = Number($("#price_update_prev").html());
	// var minimumPrice = Number($("#stop_loss_update_prev").html());
	// var maximumPrice = Number($("#take_profit_update_prev").html());

	

	// $("#atr_update").html(atrData1)
	// $("#take_profit_update").html(take_prf)
	// $("#stop_loss_update").html(stop_lss)

	var lineWidth = 3;
	var avgPriceLine = {
		price: avgPrice,
		color: '#fff',
		lineWidth: lineWidth,
		lineStyle: LightweightCharts.LineStyle.Solid,
		axisLabelVisible: true,
		title: 'Entry Order',
		draggable: true,
	};

	
	var minPriceLine = {
		price: minimumPrice,
		color: '#be1238',
		lineWidth: lineWidth,
		lineStyle: LightweightCharts.LineStyle.Solid,
		axisLabelVisible: true,
		title: 'Stop Loss',
		draggable: true,
	};									
	
	var maxPriceLine = {
		price: maximumPrice,
		color: '#5ac75a',
		lineWidth: lineWidth,
		lineStyle: LightweightCharts.LineStyle.Solid,
		axisLabelVisible: true,
		title: 'Take Profit',
		draggable: true,
	}

	// const priceLine = series.createPriceLine({ price: 80.0 });
	// series.removePriceLine(priceLine);

	remove_genTradeline()
	
	priceLine1 = candleSeries.createPriceLine(minPriceLine);
	priceLine2 = candleSeries.createPriceLine(avgPriceLine);
	priceLine3 = candleSeries.createPriceLine(maxPriceLine);	

	if(loadlines == "loaded"){
		openTradebox(avgPrice, maximumPrice, minimumPrice, atrData);
	}

	// if(position == 'buy'){
	// 	longTrade();
	// }else if(position == 'sell'){
	// 	shortTrade();
	// }
	
	//alert("takeprofit: "+maximumPrice+" - stoploss: "+minimumPrice)

	// $("#orderEntry").val(avgPrice);
	// $("#Takeprofit").val(maximumPrice);
	// $("#stopLoss").val(minimumPrice);

	// if(loadlines == "loaded"){
	// 	clean_watchLines()
	// }

	signalMode = $(".TradeMode").html();
	// if(signalMode == "0"){
	// 	tradeMode()
	// }

	$("#LoadLines").html("loaded");
	
	
	//playPause()
	//$("#tradeModal").show();

	chart_sma.subscribeCustomPriceLineDragged(handler2);

}

function remove_genTradeline(){

	var tmfrm = $("#timeframe_backtest").html();

	if(tradeline_check == true){
		tradeline_check = false
	}else{
		// tradeMode()
		candleSeries.removePriceLine(priceLine1);
		candleSeries.removePriceLine(priceLine2);
		candleSeries.removePriceLine(priceLine3);
		
	}
									
	
	
}

function clean_tradeLines(){
									
	if(tradeline_check == false){
		candleSeries.removePriceLine(priceLine1);
		candleSeries.removePriceLine(priceLine2);
		candleSeries.removePriceLine(priceLine3);
	}else{
		tradeline_check = true		
	}
	signalMode = $(".TradeMode").html();
	if(signalMode == "1"){
		tradeMode()
	}
	
	
}

function gen_tresholdLines(){

	//upperlimit_prev

	var atrData = Number($("#atr_update_number").html());
	var avgPrice = Number($("#price_update").html());
	loadwatch = $("#LoadWatch").html();
	watch_mode = $("#threshold").html()

	if(watch_mode == "Active" && loadwatch == ""){
		var upperPrice = $("#upperlimit_prev").html();
		var lowerPrice = $("#lowerlimit_prev").html();
		$("#upperlimit").html(upperPrice);
		$("#lowerlimit").html(lowerPrice);
	}else{
		var upperPrice = parseFloat(Number(avgPrice+atrData*1.5)).toFixed(2)
		var lowerPrice = parseFloat(Number(avgPrice-atrData*1.5)).toFixed(2)
	}


	var minimumPrice = lowerPrice;
	var maximumPrice = upperPrice;
	var uppercolor = "#03f9fb";
	var lowerrcolor = "#a9fc00";

	//alert(markers_base_check[0])

	if(markers_base_check[0] == 'Long'){
		minimumPrice = lowerPrice;
		maximumPrice = upperPrice;
		// uppercolor = "#03f9fb";
		// lowerrcolor = "#a9fc00";
	}else if(markers_base_check[0] == 'Short'){
		minimumPrice = upperPrice;
		maximumPrice = lowerPrice;
		// uppercolor = "#a9fc00";
		// lowerrcolor = "#03f9fb";
	}
	

	// $("#atr_update").html(atrData1)
	// $("#take_profit_update").html(take_prf)
	// $("#stop_loss_update").html(stop_lss)

	var lineWidth = 3;
	var minPriceLine = {
		price: minimumPrice,
		color: lowerrcolor,
		lineWidth: lineWidth,
		lineStyle: LightweightCharts.LineStyle.Solid,
		axisLabelVisible: true,
		title: 'Reverse Trigger',
		draggable: true,
	};									
	
	var maxPriceLine = {
		price: maximumPrice,
		color: uppercolor,
		lineWidth: lineWidth,
		lineStyle: LightweightCharts.LineStyle.Solid,
		axisLabelVisible: true,
		title: 'Continuation Trigger',
		draggable: true,
	}

	// const priceLine = series.createPriceLine({ price: 80.0 });
	// series.removePriceLine(priceLine);

	remove_tresholdLines()
	
	upper_limit = candleSeries.createPriceLine(maxPriceLine);
	lower_limit = candleSeries.createPriceLine(minPriceLine);	

	chart_sma.subscribeCustomPriceLineDragged(handler_treshold);

	var signalShow = $(".signalShow").html();

	$("#threshold").html("Active")
	$("#upperlimit").html(maximumPrice)
	$("#lowerlimit").html(minimumPrice)
	$("#watch_position").html(markers_base_check[0])
	$("#watch_trade").html("do")
	$("#LoadTrade").html("");
	clean_tradeLines()
	signalMode = $(".TradeMode").html();
	signalMode_spot = $(".TradeModeEMA").html();
	if(signalMode == "1"){
		tradeMode()
	}
	if(signalMode_spot == "1"){
		tradeModeEMA()
	}

	//alert(watch_mode)
	//alert(loadwatch)

	if(loadwatch == "loaded" || watch_mode == "Inactive"){
		do_watch_line()
	}
	$("#LoadWatch").html("loaded")
	$(".watch_btn").prop('disabled', true);
	$(".cleanwatch_btn").prop('disabled', false);
	
	
	//alert("upper_limit: "+maximumPrice+" - lower_limit: "+minimumPrice)

	// $("#orderEntry").val(avgPrice);
	// $("#Takeprofit").val(maximumPrice);
	// $("#stopLoss").val(minimumPrice);

}



function remove_tresholdLines(){
									
	if(tresholdline_check == true){
		tresholdline_check = false
	}else{
		$("#threshold").html("Inactive")
		candleSeries.removePriceLine(upper_limit);
		candleSeries.removePriceLine(lower_limit);
		//do_watch_line()
		// signalMode = $(".TradeModeEMA").html();
		// if(signalMode == "0"){
		// 	tradeModeEMA()
		// }
		
	}
	//playPause()
	
	
}

function clean_watchLines(){
									
	if(tresholdline_check == false){
		$("#threshold").html("Inactive")
		candleSeries.removePriceLine(upper_limit);
		candleSeries.removePriceLine(lower_limit);
		$(".watch_btn").prop('disabled', false);
		$(".cleanwatch_btn").prop('disabled', true);
		do_watch_line()
		signalMode = $(".TradeModeEMA").html();
		if(signalMode == "0"){
			tradeModeEMA()
		}
	}else{
		tresholdline_check = true		
	}

	$("#threshold").html("Inactive")
	$("#LoadTrade").html("loaded");
	
}

function handler2(params) {
	//alert("ddhfb 777 dddd");
	const line = params.customPriceLine;

	//console.log(line);	
	
	// var price = Number($("#price_update").html());
	// var stop_lss = Number($("#stop_loss_update").html());
	// var take_prf = Number($("#take_profit_update").html());
	var atrData = Number($("#atr_update_number").html());

	if(line.options().title == "Entry Order"){

		var price_mod = chart_sma.priceScale('right').formatPrice(line.options().price);
		$("#price_update").html(price_mod)
		$("#orderEntry").val(price_mod);
		
	}else if(line.options().title == "Take Profit"){

		var take_prf_mod = chart_sma.priceScale('right').formatPrice(line.options().price);
		$("#take_profit_update").html(take_prf_mod)
		$("#Takeprofit").val(take_prf_mod);
		
	}else if(line.options().title == "Stop Loss"){

		var stop_lss_mod = chart_sma.priceScale('right').formatPrice(line.options().price);
		$("#stop_loss_update").html(stop_lss_mod)
		$("#stopLoss").val(stop_lss_mod);		
	}

	handle_price = Number($("#price_update").html());
	stop_lss = Number($("#stop_loss_update").html());
	take_prf = Number($("#take_profit_update").html());

	//alert("entry price - "+handle_price +" take profit - "+ take_prf+" stop loss - "+stop_lss)
	
	openTradebox(handle_price, take_prf, stop_lss, atrData);


	//alert(`${line.options().title} dragged from ${params.fromPriceString} to ${chart_sma.priceScale('right').formatPrice(line.options().price)}`);
	
}

function handler_treshold(params) {
	//alert("tresddd");
	const line = params.customPriceLine;

	//console.log(line);	
	
	var upper = 0;
	var lower = 0;


	if(line.options().title == "Continuation Trigger"){

		upper = chart_sma.priceScale('right').formatPrice(line.options().price);
		$("#upperlimit").html(upper)
		//playPause()
		//alert("upper: "+upper);
		do_watch_line()
		
	}else if(line.options().title == "Reverse Trigger"){

		lower = chart_sma.priceScale('right').formatPrice(line.options().price);
		$("#lowerlimit").html(lower)
		//playPause()
		//alert("lower: "+lower);
		do_watch_line()
		
	}

	

	//alert("upper - "+upper_mod +" lower - "+ lower_mod)
	
	//openTradebox(price, take_prf, stop_lss, atrData);

	//alert(`${line.options().title} dragged from ${params.fromPriceString} to ${chart_sma.priceScale('right').formatPrice(line.options().price)}`);
	//alert("entry price - "+entry_price +" take profit - "+ take_profit+" stop loss - "+stop_loss)
}


function load_market_data(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
    var dataz = {"timeframe": $("#timeframe_backtest").html()}

	var url_link = "";
	var online_status = $("#online_status").val();
	if(online_status == "True"){
		url_link = $("#server_link").val();
	}

    $.ajax({
        type: "POST",
        url: url_link+"/market-trade-data/"+tmfrm,        
        contentType: "application/json",
        dataType: "json",  
        data: JSON.stringify(dataz),      
        success: function(response){

			if(response['output'] == 'success'){
				$(".notfc").slideDown();
				$(".notfc strong").html("Successfully Loads Market");
				setTimeout(function () {
					$(".notfc").slideUp();
					$(".notfc strong").html("");
				}, 3000);
			}
			//alert(response['atr'])

        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }
    });

} 

function save_market_data(){

	var entry_price = $("#orderEntry").val();
	var take_profit = $("#Takeprofit").val();
	var stop_loss = $("#stopLoss").val();
	var entryTime = $("#time_update").html();
	var price = $("#price_update").html();
	var tmfrm = $("#timeframe_backtest").html();
	var symbl = $("#symbol_backtest").val();
	var atrData = Number($("#atr_update_number").html());
	var signalShow = $(".signalShow").html();
	var tradestatus = $("#tradestatus").html();
	//alert("entry price - "+entry_price +" take profit - "+ take_profit+" stop loss - "+stop_loss)
	//exit()
	//alert(entry_price);
	//alert(take_profit);
    var dataz = {
		"pair": symbl,
		"trade_price": entry_price,
		"take_profit": take_profit,
		"stop_loss": stop_loss,
		"entryTime": entryTime,
		"atr": atrData,
		"position_status": signalShow,
		"tradestatus": tradestatus,
		"position_type": markers_base_check[0],
	}

	var url_link = "";
	var online_status = $("#online_status").val();
	if(online_status == "True"){
		url_link = $("#server_link").val();
	}

    $.ajax({
        type: "POST",
        url: url_link+"/save-trade-data/"+tmfrm,        
        contentType: "application/json",
        dataType: "json",  
        data: JSON.stringify(dataz),      
        success: function(response){
			if(response['output'] == 'success'){
				$(".notfc").slideDown();
				$(".notfc strong").html("Successfully Saved Trade Data");
				setTimeout(function () {
					$(".notfc").slideUp();
					$(".notfc strong").html("");
				}, 3000);
			}
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }
    });

}

function load_transaction(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
    var dataz = {"timeframe": $("#timeframe_backtest").html()}

	var url_link = "";
	var online_status = $("#online_status").val();
	if(online_status == "True"){
		url_link = $("#server_link").val();
	}

    $.ajax({
        type: "POST",
        url: url_link+"/transaction-dataz",        
        contentType: "application/json",
        dataType: "json",  
        data: JSON.stringify(dataz),      
        success: function(response){
			
			//alert(response)
			//console.log(response)
			transactionDetails(response)
			transactionValues(response)

			$(".notfc").slideDown();
			$(".notfc strong").html("Successfully Loads Transactions");
			setTimeout(function () {
				$(".notfc").slideUp();
				$(".notfc strong").html("");
			}, 3000);

        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }
    });

} 

function save_transaction(){

	var entry_price = $("#orderEntry").val();
	var take_profit = $("#Takeprofit").val();
	var stop_loss = $("#stopLoss").val();
	var entryTime = $("#time_update").html();
	var price = $("#price_update").html();
	var tmfrm = $("#timeframe_backtest").html();
	var symbl = $("#symbol_backtest").val();
	var atrData = Number($("#atr_update_number").html());
	var signalShow = $(".signalShow").html();
	var plratio = $(".pft-loss").html();
	//alert(stop_loss);
    var dataz = {
		"pair": symbl,
		"trade_price": entry_price,
		"take_profit": take_profit,
		"stop_loss": stop_loss,
		"entryTime": entryTime,
		"atr": atrData,
		"position_status": signalShow,
		"plratio": plratio,
		"timeframe": tmfrm,
		"position_type": markers_base_check[0],
	}

	var url_link = "";
	var online_status = $("#online_status").val();
	if(online_status == "True"){
		url_link = $("#server_link").val();
	}

    $.ajax({
        type: "POST",
        url: url_link+"/save-transaction",        
        contentType: "application/json",
        dataType: "json",  
        data: JSON.stringify(dataz),      
        success: function(response){

			if(response['output'] == 'success'){
				$(".notfc").slideDown();
				$(".notfc strong").html("Successfully Saves Transaction");
				setTimeout(function () {
					$(".notfc").slideUp();
					$(".notfc strong").html("");
				}, 3000);
			}

        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }
    });

}

function save_money_mgmnt(){

	var trademode = $(".TradeMode").html();
	var tmfrm = $("#timeframe_backtest").html();
	var symbl = $("#symbol_backtest").val();

	//alert(entry_price);
	//alert(take_profit);
    var dataz = {
		"pair": symbl,
		"trademode": trademode,
		"timeframe": tmfrm,
	}

	var url_link = "";
	var online_status = $("#online_status").val();
	if(online_status == "True"){
		url_link = $("#server_link").val();
	}

    $.ajax({
        type: "POST",
        url: url_link+"/linetrade",        
        contentType: "application/json",
        dataType: "json",  
        data: JSON.stringify(dataz),      
        success: function(response){

			if(response['output'] == 'success'){
				$(".notfc").slideDown();
				$(".notfc strong").html("Money Managment Updated");
				setTimeout(function () {
					$(".notfc").slideUp();
					$(".notfc strong").html("");
				}, 3000);
			}

        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }
    });

}

function changecoin(){
	var symbl = $("#symbol_backtest").val();
	var leverage = $("#leverage").val();
	var timeframe = $('#time2').val();
	var time_interval = $('#time_interval').val();
    var dataz = {
		"pair": symbl,
		"leverage": leverage,
		"timeframe": timeframe,
		"time_interval": time_interval
	}

	var url_link = "";
	var online_status = $("#online_status").val();
	if(online_status == "True"){
		url_link = $("#server_link").val();
	}

    $.ajax({
        type: "POST",
        url: url_link+"/changecoin",        
        contentType: "application/json",
        dataType: "json",  
        data: JSON.stringify(dataz),      
        success: function(response){

			// alert(response['output'])
			if(response['output'] == 'success'){
				document.location.reload();
			}
			
			// window.open('/market-bot', '_self')

        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }
    });

}

function changeServerLink(link, title){
    var dataz = {
		"link": link,
		"title": title
	}

	// var url_link = "";
	// var online_status = $("#online_status").val();
	// if(online_status == "True"){
	// 	url_link = $("#server_link").val();
	// }

    $.ajax({
        type: "POST",
        url: "/changeserver",        
        contentType: "application/json",
        dataType: "json",  
        data: JSON.stringify(dataz),      
        success: function(response){

			$("#server_link").val(link);
			$(".market-trade-list a").removeClass('active');
			$(".market-trade-list ."+title).addClass('active');

			// alert(response['output'])
			if(response['output'] == 'success'){
				document.location.reload();
			}
			
			// window.open('/market-bot', '_self')

        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }
    });

}


function change_spot_trading(){

	var trademode = $(".TradeModeEMA").html();
	var tmfrm = $("#timeframe_backtest").html();
	var symbl = $("#symbol_backtest").val();

	//alert(trademode);
	//exit()
	//alert(take_profit);
    var dataz = {
		"pair": symbl,
		"trademode": trademode,
		"timeframe": tmfrm,
	}

	var url_link = "";
	var online_status = $("#online_status").val();
	if(online_status == "True"){
		url_link = $("#server_link").val();
	}

    $.ajax({
        type: "POST",
        url: url_link+"/spottrade",        
        contentType: "application/json",
        dataType: "json",  
        data: JSON.stringify(dataz),      
        success: function(response){

			if(response['output'] == 'success'){
				$(".notfc").slideDown();
				$(".notfc strong").html("Successfully Close Spot Trading");
				setTimeout(function () {
					$(".notfc").slideUp();
					$(".notfc strong").html("");
				}, 3000);
			}

        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }
    });

}

function do_watch_line(){

	var threshold = $("#threshold").html();
	var tmfrm = $("#timeframe_backtest").html();
	var upperlimit = $("#upperlimit").html();
	var lowerlimit = $("#lowerlimit").html();
	var watch_position = $("#watch_position").html();

	//alert(entry_price);
	//alert("bbb "+threshold);
    var dataz = {
		"threshold": threshold,
		"upperlimit": upperlimit,
		"lowerlimit": lowerlimit,
		"watch_position": watch_position,
		"timeframe": tmfrm,
	}

	var url_link = "";
	var online_status = $("#online_status").val();
	if(online_status == "True"){
		url_link = $("#server_link").val();
	}

    $.ajax({
        type: "POST",
        url: url_link+"/watch-line",        
        contentType: "application/json",
        dataType: "json",  
        data: JSON.stringify(dataz),      
        success: function(response){
			if(response['output'] == 'success'){
				$(".notfc").slideDown();
				$(".notfc strong").html("Successfully Saves Watch Lines");
				setTimeout(function () {
					$(".notfc").slideUp();
					$(".notfc strong").html("");
				}, 3000);
			}
			// $("#threshold").html("Active")
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }
    });

}

function do_market_bot(){

	var threshold = $("#threshold").html();
    var dataz = {
		"threshold": threshold
	}

	// fetch('http://eebromotayo2.eu.pythonanywhere.com/market-bot')
	// 		.then((r) => r.json())
	// 		.then((response) => {
	// 		console.log(response)
	// });

}

var entryPrice = $("#orderEntry").val();
var takeProfitx3 = $("#Takeprofit").val();
var stopLoss = $("#stopLoss").val();
var tradeTransact = $(".tradeTransactx3").html();
var profitBox = $("#profitBox").html();
var lossBox = $("#lossBox").html();
var priceUpdate = $("#price_update").html();
var starting_bal = 100;

function calcRealtimeProftLossInit(priceUpdate){

	entry_price = $("#orderEntry").val();
	take_profit = $("#Takeprofit").val();
	stop_loss = $("#stopLoss").val();
	signal = $(".signalShow").html();

	signal = $(".signalShow").html();
	//$("#atrBox").html(atr_crossover_trade);
	
	if(signal == "buy"){

		var pcentProfitbal = parseFloat(take_profit-entry_price).toFixed(4);	
		var pcentLosstbal = parseFloat(entry_price-stop_loss).toFixed(4);
		var pcentProfit = parseFloat((pcentProfitbal/entry_price)*100).toFixed(2)
		var pcentLoss = parseFloat((pcentLosstbal/entry_price)*100).toFixed(2)

		$("#profitBox").html(pcentProfit+"%");
		$("#lossBox").html(pcentLoss+"%");
		
		$("#profitDiffBox").html(pcentProfitbal);
		$("#lossDiffBox").html(pcentLosstbal);

	}else if(signal == "sell"){

		var pcentProfitbal = parseFloat(entry_price-take_profit).toFixed(4);
		var pcentLosstbal = parseFloat(stop_loss-entry_price).toFixed(4);
		var pcentProfit = parseFloat((pcentProfitbal/entry_price)*100).toFixed(2)
		var pcentLoss = parseFloat((pcentLosstbal/entry_price)*100).toFixed(2)

		$("#profitBox").html(pcentProfit+"%");
		$("#lossBox").html(pcentLoss+"%");

		$("#profitDiffBox").html(pcentProfitbal);
		$("#lossDiffBox").html(pcentLosstbal);


	}
}


function calcRealtimeProftLoss(priceUpdate){

	//var price = data3[counter].close
	entryPrice = $("#orderEntry").val();
	takeProfitx3 = $("#Takeprofit").val();
	stopLoss = $("#stopLoss").val();
	tradeTransact = $(".tradeTransactx3").html();
	profitBox = $("#profitBox").html();
	lossBox = $("#lossBox").html();
	signalShoww = $(".signalShow").html();
	

	$(".price_updt").html(priceUpdate);

	if(signalShoww == "sell"){
		if(entryPrice != "" && tradeTransact == "1"){	
			//alert(entryPrice);							
			var amt_buy = entryPrice;
			var amt_sell = priceUpdate;	
			if(amt_sell > amt_buy){	
				amt_buy = stopLoss;	
				var buy_sell_ratio = entryPrice-amt_sell;
				var pcent_ratio = (buy_sell_ratio/amt_sell)*100
				var pcent_ratio_pcent = (buy_sell_ratio/amt_sell)
				var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
				var profit_loss_pcent = parseFloat(pcent_ratio_pcent*100).toFixed(2);
				
				$(".pft-loss").html(lossBox+" || "+profit_loss_pcent+"%")
				$(".pft-loss").removeClass("green");
				$(".pft-loss").addClass("red");
				// $("#stopLoss").html(profit_loss_pcent);

			}else{
				var buy_sell_ratio = amt_buy-amt_sell;
				var pcent_ratio = (buy_sell_ratio/amt_buy)*100
				var pcent_ratio_pcent = (buy_sell_ratio/amt_buy)
				var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
				var profit_loss_pcent = parseFloat(pcent_ratio_pcent*100).toFixed(2);
				$(".pft-loss").html(profitBox+" || "+profit_loss_pcent+"%")
				$(".pft-loss").removeClass("red");
				$(".pft-loss").addClass("green");
				// $("#profitBox").html(profit_loss_pcent);

			}
													
		}

	}else if(signalShoww == "buy"){
		
		if(entryPrice != "" && tradeTransact == "1"){	
			//alert(entryPrice);								
			var amt_buy = entryPrice;
			var amt_sell = priceUpdate;	
			if(amt_sell < amt_buy){	
				amt_buy = stopLoss;
				var buy_sell_ratio = priceUpdate-entryPrice;
				var pcent_ratio = (buy_sell_ratio/stopLoss)*100
				var pcent_ratio_pcent = (buy_sell_ratio/stopLoss)
				var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
				var profit_loss_pcent = parseFloat(pcent_ratio_pcent*100).toFixed(2);
				//console.log(buy_sell_ratio+" - tradeEntry: "+tradeEntry+" - priceUpdate: "+priceUpdate)
				
				$(".pft-loss").html(lossBox+" || "+profit_loss_pcent+"%")
				$(".pft-loss").removeClass("green");
				$(".pft-loss").addClass("red");
				// $("#stopLoss").html(profit_loss_pcent);

			}else{

				var buy_sell_ratio = amt_sell-amt_buy;
				var pcent_ratio = (buy_sell_ratio/amt_sell)*100
				var pcent_ratio_pcent = (buy_sell_ratio/amt_sell)
				var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
				var profit_loss_pcent = parseFloat(pcent_ratio_pcent*100).toFixed(2);												
				$(".pft-loss").html(profitBox+" || "+profit_loss_pcent+"%")
				$(".pft-loss").removeClass("red");
				$(".pft-loss").addClass("green");
				// $("#profitBox").html(profit_loss_pcent);

			}										
			
		}

	}								

}


var tradingpairreal = tradePair.toLowerCase();
var online_status_2 = $("#online_status").val();
	if(online_status_2 == "True"){

		//alert(tradingpairreal+" - "+ timeFrm2 )

		var binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws/"+tradingpairreal+"@kline_"+timeFrm2);

		binanceSocket.onmessage = function (event) {	
			var message = JSON.parse(event.data);

			var candlestick = message.k;

			//console.log(candlestick)
			//alert(candlestick)

			candleSeries.update({
				time: candlestick.t / 1000,
				open: candlestick.o,
				high: candlestick.h,
				low: candlestick.l,
				close: candlestick.c
			})

			//calcRealtimeProftLoss(candlestick.c)


		}
		
	}


// var binanceSocket2 = new WebSocket("wss://stream.binance.com:9443/ws/"+tradingpairreal+"@kline_"+timeFrm2);

// binanceSocket2.onmessage = function (event) {	
// 	var message = JSON.parse(event.data);

// 	var candlestick = message.k;

// 	//console.log(candlestick)

// 	candleSeries_hull.update({
// 		time: candlestick.t / 1000,
// 		open: candlestick.o,
// 		high: candlestick.h,
// 		low: candlestick.l,
// 		close: candlestick.c
// 	})
// }


