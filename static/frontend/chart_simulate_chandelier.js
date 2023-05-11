$("document").ready(function(){

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
	$("#time2").html(timeframe1);

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

var intervals = ['Simulation', 'Noise'];
var candleSeries = null;
var candleSeries_hull = null;
var candleSeries_hull_4hr = null;
var candleSeries_hull_1hr = null;

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

//#endregion

//#region Chart Line Series Properties

//#region Interval Synchronization Instance

var lineSeries_ema_slow11 = chart_sma.addLineSeries({
	color: '#fff',
	lineWidth: 2,
});

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

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
	var timeFrm2 = document.getElementById('time2').innerHTML;

	if(interval == "Simulation"){

		document.getElementById('chart0').style.display = "block";
		document.getElementById('chart').style.display = "none";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart3').style.display = "none";
		document.getElementById('chart4').style.display = "none";
		//alert(chartData0)
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

			

			// Chart Data
			fetch('http://127.0.0.1:5000/charthistory/'+symbl+'/'+tmfrm)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)		
				candleSeries.setData(response);
	
			});

			// #region Chandellier
			// fetch('http://127.0.0.1:5000/chartz_runbot_chandelier/'+symbl+'/'+tmfrm)
			// .then((r) => r.json())
			// .then((response) => {

			// 	//console.log(response_hull)

			// // candleSeries.setData(response);

			// var datesForMarkers_cross = response
			// var markers = [];

			// 	for (var i = 2; i < datesForMarkers_cross.length; i++) {


			// 		if(datesForMarkers_cross[i].position == "buy"){
			// 			if(datesForMarkers_cross[i].position_status == "enter long"){
				
			// 				markers.push({
			// 					time: datesForMarkers_cross[i].time,
			// 					position: 'belowBar',
			// 					color: '#2196F3',
			// 					shape: 'arrowUp',
			// 					text: 'CrossOver @ ' + datesForMarkers_cross[i].close
			// 				});
																
			// 				//candleSeries.setMarkers(markers);
				
			// 			}else if(datesForMarkers_cross[i].position_status == "exit long"){
			// 				markers.push({
			// 					time: datesForMarkers_cross[i].time,
			// 					position: 'aboveBar',
			// 					color: '#9bfb83',
			// 					shape: 'circle',
			// 					text: datesForMarkers_cross[i].close+' - Exit Long'
			// 				});
						
			// 				//candleSeries.setMarkers(markers);
							
			// 			}
						
				
			// 		}else if(datesForMarkers_cross[i].position == "sell"){
				
			// 			if(datesForMarkers_cross[i].position_status == "enter short"){
				
			// 				markers.push({
			// 					time: datesForMarkers_cross[i].time,
			// 					position: 'aboveBar',
			// 					color: '#e91e63',
			// 					shape: 'arrowDown',
			// 					text: 'CrossOver @ ' + datesForMarkers_cross[i].close+' - Sell'
			// 				});	
							
			// 				//candleSeries.setMarkers(markers);
				
			// 			}else if(datesForMarkers_cross[i].position_status == "exit short"){
			// 				markers.push({
			// 					time: datesForMarkers_cross[i].time,
			// 					position: 'belowBar',
			// 					color: '#f57c69',
			// 					shape: 'circle',
			// 					text: datesForMarkers_cross[i].close+' - Exit Short'
			// 				});
				
			// 				//candleSeries.setMarkers(markers);
						
			// 			}
						
				
			// 		}			

					
			// 	}

			// 	candleSeries.setMarkers(markers);

					
			// });

			// #endregion


			fetch('http://127.0.0.1:5000/chartz_runbot_ema_slow/'+symbl+'/'+tmfrm)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)
				//alert(symbl)
				// lineSeries.setData(response);
				lineSeries_ema_slow.setData(response);
				
			});

			fetch('http://127.0.0.1:5000/chartz_runbot_ema_fast/'+symbl+'/'+tmfrm)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				lineSeries_ema_fast.setData(response);
				
			});

		}

		


	}else if(interval == "Noise"){

		document.getElementById('chart0').style.display = "none";
		document.getElementById('chart').style.display = "block";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart3').style.display = "none";
		document.getElementById('chart4').style.display = "none";

		if(chartData == "Open"){

			document.getElementById('chartData').innerHTML = "Loaded";

			candleSeries_hull = chart.addCandlestickSeries({
				upColor: '#00ff00',
				downColor: '#ff0000', 
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			});

			fetch('http://127.0.0.1:5000/charthistory/'+symbl+'/'+timeFrm2)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)		
				candleSeries_hull.setData(response);
	
			});

			fetch('http://127.0.0.1:5000/chartz_runbot_ema_slow/'+symbl+'/'+tmfrm)
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)
				//alert(symbl)
				// lineSeries.setData(response);
				lineSeries.setData(response);
				
			});

		}
	
	}

	
}

syncToInterval(intervals[0]);

//#endregion


//#region LineSeries
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
var timeFrm2 = document.getElementById('time2').innerHTML;

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
//#endregion

//#region Simulation Data Loading
var init_data = "gg";

function load_simulation_data(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
	var date_backtest = $("#date_backtest").html();

    var comment_json = {
                        "symbol_pair": $("#symbol_backtest").val(),
						"timeframe": $("#timeframe_backtest").html()
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
//#endregion


//#region Indicators Initial Loading

function load_atr(){

	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
	var date_backtest = $("#date_backtest").html();

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

function playPrice2(){


	//#region User Interface Initial Values
	var symbl = $("#symbol_backtest").val();
	var tmfrm = $("#timeframe_backtest").html();
	var date_backtest = $("#date_backtest").html();
	var entryTime = $("#time_update").html();
	var entryTime_x3 = $("#time_update").html();
	var priceUpdate = $("#price_update").html();
	var entryPrice = $("#orderEntry").val();
	var takeProfitx3 = $("#Takeprofit").val();
	var Stoploss = $("#stopLoss").val();
	var signalShoww = $(".signalShow").html();
	var tradeEntry = $(".tradeEntry").html();
	var tradeEntryx3 = $("#orderEntry").val();
	var tradeTransact = $(".tradeTransact").html();
	var Tradebal = $(".Tradebal").html();
	var Tradebalx3 = $(".Tradebalx3").html();
	var Tradebalx10 = $(".Tradebalx10").html();
	//alert("fast_emaoutput")
	//alert(crossover_emaoutput)
	//#endregion




	$("#playControl").show();
	$("#simulateBtn").hide();
	$(".restartBtn").show();




	$("#chart0").html("")
	$("#chart").html("")

	//#region Created Chart Instance
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
	//#endregion

	//#region Chart Line Series
	var lineSeries = chart.addLineSeries({
		color: '#e91e63',
		  lineWidth: 2,
	});
	
	var lineSeries2 = chart.addLineSeries({
		color: '#22d130',
		  lineWidth: 2,
	});
	
	var lineSeries_ema_slow = chart_sma.addLineSeries({
		color: '#1558ed',
		lineWidth: 2,
	});	
	
	var lineSeries_ema_fast = chart_sma.addLineSeries({
		color: '#22d130',
		lineWidth: 2,
	});
	//#endregion

	document.getElementById('chart0').style.display = "block";
	document.getElementById('chart').style.display = "none";
	document.getElementById('chart2').style.display = "none";
	document.getElementById('chart3').style.display = "none";
	document.getElementById('chart4').style.display = "none";
	document.getElementById('chart0Data').innerHTML = "Loaded";

	document.getElementById('chartData').innerHTML = "Loaded";

	//#region Chart Properties Loaded
	var candleSeries = null;
	var candleSeries_noise = null;

	candleSeries = chart_sma.addCandlestickSeries({
		upColor: '#00ff00',
		downColor: '#ff0000', 
		borderDownColor: 'rgba(255, 144, 0, 1)',
		borderUpColor: 'rgba(255, 144, 0, 1)',
		wickDownColor: 'rgba(255, 144, 0, 1)',
		wickUpColor: 'rgba(255, 144, 0, 1)',
	});

	candleSeries_noise = chart.addCandlestickSeries({
		upColor: '#00ff00',
		downColor: '#ff0000', 
		borderDownColor: 'rgba(255, 144, 0, 1)',
		borderUpColor: 'rgba(255, 144, 0, 1)',
		wickDownColor: 'rgba(255, 144, 0, 1)',
		wickUpColor: 'rgba(255, 144, 0, 1)',
	});
	//#endregion

	//#region Timeframe starting point
	var noise_tmfrm = "4h";
	var startpoint = 1;
	var noise_startpoint = 1;
	var noise_loop = 6;

	if(tmfrm == "1d"){
		noise_tmfrm = "4h";
		noise_loop = 6;
	}else if(tmfrm == "4h"){
		noise_tmfrm = "1h";
		noise_loop = 4;
	}else if(tmfrm == "1h"){
		noise_tmfrm = "15m";
		noise_loop = 4;
	}else if(tmfrm == "15m"){
		noise_tmfrm = "15m";
		noise_loop = 4;
	}	
	//#endregion

	//#region Indicators Loaded
	//alert(tmfrm+" - "+noise_tmfrm+" -- "+noise_loop+" --- "+noise_startpoint)
	atr_output = load_atr();
	fast_emaoutput = load_fastEMA();
	slow_emaoutput = load_slowEMA();
	//crossover_emaoutput = load_crossoverEMA();
	crossover_emaoutput = load_chandelier();
	fastNoise_emaoutput = load_fastNoiseEMA();
	slowNoise_emaoutput = load_slowNoiseEMA();
	crossoverNoise_emaoutput = load_crossoverNoiseEMA();
	chandelier = load_chandelier();

	//#endregion

	var data3_noise = [];
	fetch('http://127.0.0.1:5000/chartsimulatenoise/'+symbl+'/'+noise_tmfrm)
	.then((r) => r.json())
	.then((noise_response) => {
		for(i = 0; i < noise_response.length; i++){
			data3_noise[i] = noise_response[i]
		}
		fetch('http://127.0.0.1:5000/chartsimulateinit/'+symbl+'/'+tmfrm+"/"+startpoint)
			.then((r) => r.json())
			.then((data) => {	

				var data3 = [];							
				fetch('http://127.0.0.1:5000/chartsimulate/'+symbl+'/'+tmfrm)
					.then((r) => r.json())
					.then((response) => {
						for(i = 0; i < response.length; i++){
							data3[i] = response[i]
						}

						//#region Data Loading
						candleSeries.setData(data);
						//#endregion

						//#region Set First Bar
						var lastClose = data[data.length - 1].close;
						var lastIndex = data.length - 1;
						var lastnoiseClose = noise_response[noise_response.length - 1].close;
						var lastnoiseIndex = noise_response.length - 1;
						//alert(lastIndex+" - "+lastClose);
						
						var targetIndex = lastIndex + 105 + Math.round(Math.random() + 30);
						var targetPrice = getRandomPrice();						
						var currentIndex = lastIndex + 1;
						// var currentBusinessDay = { day: 14, month: 12, year: 2019 };
						var currentBusinessDay = data[lastIndex].time;
						var currentBusinessNoiseDay = noise_response[lastnoiseIndex].time;
						var ticksInCurrentBar = 0;
						var currentBar = {
							open: data[lastIndex].open,
							high: data[lastIndex].high,
							low: data[lastIndex].low,
							close: data[lastIndex].close,
							time: currentBusinessDay,
						};

						var currentNoiseBar = {
							open: noise_response[lastnoiseIndex].open,
							high: noise_response[lastnoiseIndex].high,
							low: noise_response[lastnoiseIndex].low,
							close: noise_response[lastnoiseIndex].close,
							time: currentBusinessNoiseDay,
						};

						//#endregion
						
						//#region Tick to Bar Merger Functions
						function mergeTickToBar(price) {
							if (currentNoiseBar.open === null) {
								currentNoiseBar.open = price;
								currentNoiseBar.high = price;
								currentNoiseBar.low = price;
								currentNoiseBar.close = price;
							} else {
								currentNoiseBar.open = currentNoiseBar.open;
								currentNoiseBar.close = currentNoiseBar.close;
								currentNoiseBar.high = currentNoiseBar.high;
								currentNoiseBar.low = currentNoiseBar.low;
							}
							candleSeries_noise.update(currentNoiseBar);
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
						//#endregion

						//#region Reset Functions
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
						

						function resetAll() {
							//$(".resetPlay").html("0")
							candleSeries.setData(data);
							candleSeries_noise.setData("");
							lineSeries_ema_slow.setData("");
							lineSeries_ema_fast.setData("");
							lineSeries.setData("");
							lineSeries2.setData("");
							lastClose = data[data.length - 1].close;
							lastIndex = data.length - 1;
							lastnoiseClose = data[data.length - 1].close;
							lastnoiseIndex = data.length - 1;
						
							currentBusinessDay = data[lastIndex].time;
							currentBusinessNoiseDay = noise_response[lastnoiseIndex].time;
							ticksInCurrentBar = 0;
							//return;
						}
						//#endregion						
						

						//#region Initial Price Playing Variables
						var counter = startpoint;
						var counter_noise = noise_startpoint;
						var counter_ema = 0;
						var counterNoise_ema = 0;
						var counter_crossover = 0;
						var counterNoise_crossover = 1;
						var counterLine = 30;
						var counterAtr = 35;
						var counterPricecheck = 35;
						var markers = [];
						var markersNoise = [];
						var markers_check = [];

						var init_starting_bal = Tradebal;
						var starting_bal = Tradebal;

						var init_starting_balx3 = Tradebalx3;
						var starting_balx3 = Tradebalx3;

						var init_starting_balx10 = Tradebalx10;
						var starting_balx10 = Tradebalx10;

						var entry_price = 0;
						var take_profit = 0;
						var stop_loss = 0;

						var profit_loss_bal = [];
						var trade_details = [];

						var profit_loss_balx10 = [];
						var trade_detailsx10 = [];

						var profit_loss_balx3 = [];
						var trade_detailsx3 = [];

						var amt_buy;
						var amt_sell;
						var amt_buy_time;
						var amt_sell_time;

						var amt_buy_x3;
						var amt_sell_x3;
						var amt_buy_time_x3;
						var amt_sell_time_x3;
						//#endregion


						var timer = new IntervalTimer(function () {

							if(slowNoise_emaoutput != ""){

								//#region Reset Button Condition
								var resetPlay = $(".resetPlay").html()
								if(resetPlay == "1"){								
									resetAll();
									counter = startpoint;
									counter_noise = noise_startpoint;
									//alert(counter+" - "+counter_noise)
									counter_ema = 0;
									counterNoise_ema = 0;
									counter_crossover = 0;
									counterNoise_crossover = 0;
									markers = [];
									markersNoise = [];
									markers_check = [];

									init_starting_bal = 100;
									starting_bal = 100;
									profit_loss_bal = [];
									trade_details = [];
									$(".resetPlay").html("0")		
								}
								//#endregion


								//#region Restart Button Condition
								$(".restartBtn").html("Restart");
								var pausePlay = $(".pausePlay").html()
								var resumePlay = $(".resumePlay").html()
								if(pausePlay == "1"){
									//alert(pausePlay+" - "+resumePlay)
									//console.log("333 "+crossover_emaoutput[counter_crossover].position);
									//console.log(crossover_emaoutput[counter_crossover].time+" - "+data3[counter].time);

									timer.pause();
									window.setInterval(function () {
										resumePlay = $(".resumePlay").html()
										//resetPlay = $(".resetPlay").html()
										if(resumePlay == "1"){
											//alert(pausePlay+" - "+resumePlay)
											timer.resume();
											$(".resumePlay").html("0");
											$(".pausePlay").html("0")
										}
												
									}, 100);

								}
								//#endregion


								//#region Tick to Bar (Noise) Condition
								var basePrice = data3[counter].close;
								var noisedPrice = noise_response[counter_noise].close; // hourly data							
								if(tmfrm == "15m"){
									mergeTickToBarNoise(basePrice);
								}else{
									mergeTickToBarNoise(noisedPrice);
								}
								//#endregion


								//#region ATR Update 
								var atr_crossover_trade1 = Math.floor(atr_output[counterAtr].value);
								var price1 = $("#price_update").html();
								var avrAtr1 = parseFloat((atr_crossover_trade1/price1)*100).toFixed(2)
								var atrData1 = atr_crossover_trade1+" - x"+avrAtr1;
								//$("#atr_update").html(atrData1+" - "+atr_output[counterAtr].time_utc)
								if(avrAtr1 >= 3.5 ){

									$("#atr_update").addClass("longBtn");
									$("#atr_update").removeClass("shortBtn");
									
								}else if(avrAtr1 < 3){

									$("#atr_update").addClass("shortBtn");
									$("#atr_update").removeClass("longBtn");
								}

								$("#atr_update").html(atrData1)													
								$("#price_update").html(noisedPrice)
								//#endregion
							
								
								//#region Each Bar Completion Tick
								if (++ticksInCurrentBar === noise_loop) {
									// move to next bar
									var datesForMarkers = data3.slice(0, counter)
									var currentDayUpdate = timeConverter(data3[counter].time);
									$("#time_update_realtime").html(currentDayUpdate)
								

									//#region Trade Execution Lines
									if(counter == counterLine){
										var lastDataIndex = data3.slice(0, counter).length - 1;
										var lengthIndex = lastDataIndex	
		
										var minimumPrice = data3[lengthIndex].close;
										var maximumPrice = minimumPrice;
										for(var i = 0; i < data3.slice(0, counter).length; i++) {
											var price = data3[i].close;
											if (price > maximumPrice) {
												maximumPrice = price;
											}
											if (price < minimumPrice) {
												minimumPrice = price;
											}
										}
		
										var avgPrice = (maximumPrice + minimumPrice) / 2;
										var avgPriceLine = {
											price: avgPrice,
											color: '#fff',
											lineWidth: lineWidth,
											lineStyle: LightweightCharts.LineStyle.Solid,
											axisLabelVisible: true,
											title: 'Entry Order',
											draggable: true,
										};
		
										var lineWidth = 3;
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
		
										candleSeries.createPriceLine(minPriceLine);
										candleSeries.createPriceLine(avgPriceLine);
										candleSeries.createPriceLine(maxPriceLine);

										entry_price = avgPrice;
										take_profit = maximumPrice;
										stop_loss = minimumPrice;								

										$("#orderEntry").val(entry_price);
										$("#Takeprofit").val(take_profit);
										$("#stopLoss").val(stop_loss);

										function handler(params) {
											const line = params.customPriceLine;

											var atr_crossover_trade = 1
											var atrData = "";
											var price = $("#price_update").html();
											if(counter > 7){
												atr_crossover_trade = Math.floor(atr_output[counterAtr].value);
												var avrAtr = parseFloat((atr_crossover_trade/price)*100).toFixed(2)
												atrData = atr_crossover_trade+" - x"+avrAtr;
											}										

											if(line.options().title == "Entry Order"){

												entry_price = chart_sma.priceScale('right').formatPrice(line.options().price);
												//alert(timeConverter(data3[counter].time))
												$("#time_updatex3").html(timeConverter(data3[counter].time));
												
											}else if(line.options().title == "Take Profit"){

												take_profit = chart_sma.priceScale('right').formatPrice(line.options().price);
												
											}else if(line.options().title == "Stop Loss"){

												stop_loss = chart_sma.priceScale('right').formatPrice(line.options().price);
												
											}
											

											openTradebox(entry_price, take_profit, stop_loss, atrData);

											//alert(`${line.options().title} dragged from ${params.fromPriceString} to ${chart_sma.priceScale('right').formatPrice(line.options().price)}`);
											//alert("entry price - "+entry_price +" take profit - "+ take_profit+" stop loss - "+stop_loss)
										}
										
										chart_sma.subscribeCustomPriceLineDragged(handler);
									}
									//#endregion


									//#region Trade Signal Execution Trigger
									//alert("cross: "+crossover_emaoutput[counter_crossover].time+" - data: "+data3[counter].time)
									//var tradeTransactMode = $(".tradeTransactMode").html();
									if(crossover_emaoutput[counter_crossover].time == data3[counter].time){
										//console.log(counter_crossover+"| --- "+crossover_emaoutput[counter_crossover].time+" - "+data3[counter].time);
										//alert("---"+crossover_emaoutput[counter_crossover].position);


										var atr_crossover = Math.floor(atr_output[counterAtr].value);
										//alert(crossover_emaoutput[counter_crossover].position);
										currentDay = timeConverter(data3[counter].time);
										currentDay2 = crossover_emaoutput[counter_crossover].time_utc;
										var tradeTransact = $(".tradeTransact").html();
										var TradeModeEMA = $(".TradeModeEMA").html();
										if(crossover_emaoutput[counter_crossover].position == "buy" && markers_check[0] != 'buy'){
											
											markers.push({
												time: currentDay,
												position: 'belowBar',
												color: '#2196F3',
												shape: 'arrowUp',
												text: 'CrossOver @ ' + data3[counter].close+' - Buy - ['+atr_crossover+']'
											});

											markers_check.pop()
											markers_check.push('buy')

											amt_buy = data3[counter].close;
											amt_buy_time = currentDay2;
											$(".signalShow").html("buy")
											$("#inputradioControl").removeClass("shortBtn")
											$("#inputradioControl").addClass("longBtn")
											$("#longSignal").html("Buy Signal")
											$("#longSignal").removeClass()
											$("#longSignal").addClass("buy")

										
											if(tradeTransact == "0" && TradeModeEMA == "1"){
	
												$(".tradeEntry").html(data3[counter].close);
												$(".tradeTransact").html("1");
												$(".tradeTransactMode").html("1");
												$("#time_update").html(crossover_emaoutput[counter_crossover].time_utc)
	
											}else if(TradeModeEMA == "1"){
	
												$(".tradeExit").html(data3[counter].close);
												//$(".tradeTransact").html("0");
												$(".tradeTransactMode").html("1");
												//alert("price - "+data3[counter].close)
												transctBaseline("Short", data3[counter].close);
	
											}
											
											
											//shortTransc(data3[counter].close, amt_sell)										
											candleSeries.setMarkers(markers);
											// $("#orderEntry").val(entry_price);
											// $("#Takeprofit").val(take_profit);
											// $("#stopLoss").val(stop_loss);
											// $("#tradeModal").show();

											openTradebox(entry_price, take_profit, stop_loss, atr_crossover);
											playPause();

											
											

										}else if(crossover_emaoutput[counter_crossover].position == "sell"  && markers_check[0] != 'sell'){

											markers.push({
												time: currentDay,
												position: 'aboveBar',
												color: '#e91e63',
												shape: 'arrowDown',
												text: 'CrossOver @ ' + data3[counter].close+' - Sell - ['+atr_crossover+']'
											});	

											markers_check.pop()
											markers_check.push('sell')
	
											amt_sell = data3[counter].close;
											amt_sell_time = currentDay2;
	
											//$(".signalShow").html("sell");
											//$("#inputradioControl").removeClass("longBtn")
											//$("#inputradioControl").addClass("shortBtn")
											//$("#longSignal").html("Sell Signal")
	
											
	
											if(tradeTransact == "0" && TradeModeEMA == "1"){
	
												//alert(data3[counter].close+" - Entry")
		
												$(".tradeEntry").html(data3[counter].close);
												$(".tradeTransact").html("1");
												$(".tradeTransactMode").html("1");
												$("#time_update").html(crossover_emaoutput[counter_crossover].time_utc)
	
											}else if(TradeModeEMA == "1"){
	
												//alert(data3[counter].close+" - Profit")
	
												$(".tradeExit").html(data3[counter].close);
												//$(".tradeTransact").html("0");
												$(".tradeTransactMode").html("1");
												//alert("price - "+data3[counter].close)
												transctBaseline("Long", data3[counter].close);
	
											}
											
											//longTransc(data3[counter].close, amt_buy)
											candleSeries.setMarkers(markers);
											openTradebox(entry_price, take_profit, stop_loss, atr_crossover);
											playPause();

											
											

										}

										counter_crossover++;
										//console.log("counter - "+counter_crossover+" -- "+counter);
										
										
										//playPause();
									}
									//#endregion

									//#region Transaction Process (Function)
									function transctBaseline(status, price){

										//var price = data3[counter].close
										var tradeEntry = $(".tradeEntry").html();	
										var takeProfit = price;							
										//alert(tradeEntry+" - "+price);

										if(tradeEntry == "" || price == ""){

											return;
										}
									
										amt_buy = tradeEntry;
										entryTime = $("#time_update").html()
										amt_sell_time = crossover_emaoutput[counter_crossover].time_utc;
										amt_sell = price;
										amt_buy_time = entryTime;
										if(typeof(amt_sell) === "undefined"){
											amt_sell = amt_buy;
											//alert("Sell == Buy: "+amt_buy)
										}	
										
										
										var buy_sell_ratio;
										var pcent_ratio_pcent;
									
										if(status == "Short"){

											buy_sell_ratio = amt_buy-amt_sell
											pcent_ratio_pcent = (buy_sell_ratio/amt_buy)
		
										}else if(status == "Long"){
		
											buy_sell_ratio = amt_sell-amt_buy
											pcent_ratio_pcent = (buy_sell_ratio/amt_sell)
										}
										//console.log("tradeEntry: "+tradeEntry+" price: "+price+" status: "+status+" buy_sell_ratio: "+buy_sell_ratio)
										//alert(buy_sell_ratio);
										var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
										var profit_loss_pcent = Math.floor(pcent_ratio_pcent*100);
										//alert(amt_sell +" - "+ amt_buy+" - "+buy_sell_ratio+" -- "+profit_loss)
										
										balc = calcProft(buy_sell_ratio, starting_bal, profit_loss);
										starting_bal = balc;

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
										});

										calcDetails(trade_details);
										$(".Tradebal").html(balc);
										//$("#orderModal").hide();
										//alert(price)
										$(".tradeEntry").html(price);
										$("#time_update").html(crossover_emaoutput[counter_crossover].time_utc);
										playPause();
									
									}
									//#endregion


									if(counter_ema > 21){

										lineSeries_ema_slow.setData(slow_emaoutput.slice(0, counter_ema+13));
										lineSeries_ema_fast.setData(fast_emaoutput.slice(0, counter_ema));
									}


									//#region Bar Completion Update Datas
									currentIndex++;
									currentBusinessDay = nextBusinessDay(currentBusinessDay);
									currentBusinessNoiseDay = nextBusinessDay(currentBusinessNoiseDay);								
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
									counter++;
									counterAtr++;
									if(counter > 21){
										counter_ema++;
									}
									//#endregion																							
								}
								//#endregion

								//#region Noise Bar Completion Update Datas
								currentNoiseBar = {
									open: data3_noise[counter_noise].open,
									high: data3_noise[counter_noise].high,
									low: data3_noise[counter_noise].low,
									close: data3_noise[counter_noise].close,
									// open: null,
									// high: null,
									// low: null,
									// close: null,
									time: data3_noise[counter_noise].time,
								};
								//#endregion

								//#region Calculate Profit/Loss (Function)
								function calcProftLoss(){

									//var price = data3[counter].close
									entryPrice = $("#orderEntry").val();
									takeProfitx3 = $("#Takeprofit").val();
									stopLoss = $("#stopLoss").val();
									tradeTransact = $(".tradeTransactx3").html();
									profitBox = $("#profitBox").html();
									lossBox = $("#lossBox").html();
									signalShoww = $(".signalShow").html();

									if(signalShoww == "sell"){
										if(entryPrice != "" && tradeTransact == "1"){	
											//alert(entryPrice);							
											amt_buy = entryPrice;
											amt_sell = noisedPrice;	
											if(amt_sell > amt_buy){	
												amt_buy = stopLoss;	
												var buy_sell_ratio = entryPrice-amt_sell;
												var pcent_ratio = (buy_sell_ratio/amt_sell)*100
												var pcent_ratio_pcent = (buy_sell_ratio/amt_sell)
												var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
												var profit_loss_pcent = Math.floor(pcent_ratio_pcent*100);
												$(".pft-loss").html(lossBox+" || "+profit_loss_pcent+"%")
												$(".pft-loss").removeClass("green");
												$(".pft-loss").addClass("red");
		
											}else{
												var buy_sell_ratio = amt_buy-amt_sell;
												var pcent_ratio = (buy_sell_ratio/amt_buy)*100
												var pcent_ratio_pcent = (buy_sell_ratio/amt_buy)
												var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
												var profit_loss_pcent = Math.floor(pcent_ratio_pcent*100);
												$(".pft-loss").html(profitBox+" || "+profit_loss_pcent+"%")
												$(".pft-loss").removeClass("red");
												$(".pft-loss").addClass("green");

											}
																					
										}

									}else if(signalShoww == "buy"){
										
										if(entryPrice != "" && tradeTransact == "1"){	
											//alert(entryPrice);								
											amt_buy = entryPrice;
											amt_sell = noisedPrice;	
											if(amt_sell < amt_buy){	
												amt_buy = stopLoss;
												var buy_sell_ratio = noisedPrice-entryPrice;
												var pcent_ratio = (buy_sell_ratio/stopLoss)*100
												var pcent_ratio_pcent = (buy_sell_ratio/stopLoss)
												var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
												var profit_loss_pcent = Math.floor(pcent_ratio_pcent*100);
												//console.log(buy_sell_ratio+" - tradeEntry: "+tradeEntry+" - noisedPrice: "+noisedPrice)
												
												$(".pft-loss").html(lossBox+" || "+profit_loss_pcent+"%")
												$(".pft-loss").removeClass("green");
												$(".pft-loss").addClass("red");
		
											}else{

												var buy_sell_ratio = amt_sell-amt_buy;
												var pcent_ratio = (buy_sell_ratio/amt_sell)*100
												var pcent_ratio_pcent = (buy_sell_ratio/amt_sell)
												var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
												var profit_loss_pcent = Math.floor(pcent_ratio_pcent*100);												
												$(".pft-loss").html(profitBox+" || "+profit_loss_pcent+"%")
												$(".pft-loss").removeClass("red");
												$(".pft-loss").addClass("green");
		
											}										
											
										}

									}								

								}
								//#endregion

								calcProftLoss();


								//#region Short Trade Transaction (Function)
								function shortTransc(status){
									//var price = data3[counter].close
									tradeEntryx3 = $("#orderEntry").val();
									takeProfitx3 = $("#Takeprofit").val();
									stopLoss = $("#stopLoss").val();
									tradeTransactx3 = $(".tradeTransactx3").html();
									//var entryP = tradeEntry;
									if(status == "Loss"){

										takeProfitx3 = stopLoss;
									}

									//alert(tradeTransactx3)

									if(tradeEntryx3 != "" && tradeTransactx3 == "1"){

										amt_sell_x3 = tradeEntryx3;
										entryTime_x3 = $("#time_updatex3").html()
										amt_sell_time_x3 = entryTime_x3;
										amt_buy_x3 = takeProfitx3;
										amt_buy_time_x3 = crossover_emaoutput[counter_crossover].time_utc;
										if(typeof(amt_sell_x3) === "undefined"){
											amt_sell_x3 = amt_buy_x3;
											//alert("Sell == Buy: "+amt_buy);
										}								

										var buy_sell_ratio = amt_sell_x3-amt_buy_x3;
										var pcent_ratio = (buy_sell_ratio/amt_buy_x3)*100
										var pcent_ratio_pcent = (buy_sell_ratio/amt_buy_x3)
										var profit_loss = Math.floor(starting_balx3*pcent_ratio_pcent)*3;
										var profit_loss_pcent = Math.floor(pcent_ratio_pcent*100)*3;
										//alert(amt_sell +" - "+ amt_buy+" - "+buy_sell_ratio+" -- "+profit_loss)
										
										balc = calcProft(buy_sell_ratio, starting_balx3, profit_loss);
										starting_balx3 = balc;

										profit_loss_balx3.push(profit_loss)
										trade_detailsx3.push({
											start_balance: init_starting_balx3,
											amount_buy:amt_buy_x3,
											amount_sell:amt_sell_x3,
											time_buy:amt_buy_time_x3,
											time_sell:amt_sell_time_x3,
											remaining_balance: balc,
											pcent_profit_loss:profit_loss,
											trade_outcome: profit_loss_pcent
										})

										calcDetailsx3(trade_detailsx3);
										$(".Tradebalx3").html(balc);
										$("#orderModal").hide();
										playPause();
										
									}

									
								}
								//#endregion

								//#region Long Trade Transaction (Function)
								function longTransc(status){
									//var price = data3[counter].close
									tradeEntryx3 = $("#orderEntry").val();
									tradeTransactx3 = $(".tradeTransactx3").html();
									takeProfitx3 = $("#Takeprofit").val();
									stopLoss = $("#stopLoss").val();
									//var entryP = tradeEntry;

									if(status == "Loss"){

										takeProfitx3 = stopLoss;
									}

									//alert("Long "+tradeTransactx3)

									if(tradeEntryx3 != "" && tradeTransactx3 == "1"){
										amt_buy_x3 = tradeEntryx3;
										entryTime_x3 = $("#time_updatex3").html()
										amt_buy_time_x3 = entryTime_x3;
										amt_sell_x3 = takeProfitx3;
										amt_sell_time_x3 = crossover_emaoutput[counter_crossover].time_utc;

										if(typeof(amt_buy_x3) === "undefined"){
											amt_buy_x3 = amt_sell_x3;

											//alert("Buy == Sell: "+amt_buy)
										}

										var buy_sell_ratio = amt_sell_x3-amt_buy_x3;
										var pcent_ratio = (buy_sell_ratio/amt_buy_x3)*100
										var pcent_ratio_pcent = (buy_sell_ratio/amt_buy_x3)
										var profit_loss = Math.floor(starting_balx3*pcent_ratio_pcent)*3;
										var profit_loss_pcent = Math.floor(pcent_ratio_pcent*100)*3;									
										//alert(buy_sell_ratio +" - "+ starting_bal+" - "+profit_loss)
										balc = calcProft(buy_sell_ratio, starting_balx3, profit_loss);
										starting_balx3 = balc;

										profit_loss_balx3.push(profit_loss)
										trade_detailsx3.push({
											start_balance: init_starting_balx3,
											amount_buy:amt_buy_x3,
											amount_sell:amt_sell_x3,
											time_buy:amt_buy_time_x3,
											time_sell:amt_sell_time_x3,
											remaining_balance: balc,
											pcent_profit_loss:profit_loss,
											trade_outcome: profit_loss_pcent
										})

										calcDetailsx3(trade_detailsx3);
										$(".Tradebalx3").html(balc);
										$("#orderModal").hide();
										playPause();

									}

									
								}
								//#endregion

								//#region Noise Trade Transaction (Function)
								function TranscNoise(status, price){
									//var price = data3[counter].close
									var tradeEntry = $(".tradeEntry").html();	
									var takeProfit = price							
									var stopLoss = $("#stopLoss").val();
									var tradeTransactMode = $(".tradeTransactMode").html();

									//alert(tradeEntry+" - "+take_profit+" - "+status);

									if(tradeEntry == "" || take_profit == ""){

										return;
									}

									amt_buy = tradeEntry;
									entryTime = $("#time_update_realtime").html()
									amt_sell_time = entryTime+status;
									amt_sell = takeProfit;
									amt_buy_time = $("#time_update").html()+status;
									if(typeof(amt_sell) === "undefined"){
										amt_sell = amt_buy;
										//alert("Sell == Buy: "+amt_buy)
									}

									var buy_sell_ratio;
									var pcent_ratio_pcent;
									
									if(status == "Short"){

										buy_sell_ratio = amt_buy-amt_sell
										pcent_ratio_pcent = (buy_sell_ratio/amt_buy)

									}else if(status == "Long"){

										buy_sell_ratio = amt_sell-amt_buy
										pcent_ratio_pcent = (buy_sell_ratio/amt_sell)
									}
									//alert(buy_sell_ratio);								
									var profit_loss = Math.floor(starting_balx10*pcent_ratio_pcent)*10;
									var profit_loss_pcent = Math.floor(pcent_ratio_pcent*100)*10;
									//alert(amt_sell +" - "+ amt_buy+" - "+buy_sell_ratio+" -- "+profit_loss)
									
									balc = calcProft(buy_sell_ratio, starting_balx10, profit_loss);
									starting_balx10 = balc;

									profit_loss_balx10.push(profit_loss)
									trade_detailsx10.push({
										start_balance: init_starting_balx10,
										amount_buy:amt_buy,
										amount_sell:amt_sell,
										time_buy:amt_buy_time,
										time_sell:amt_sell_time,
										remaining_balance: balc,
										pcent_profit_loss:profit_loss,
										trade_outcome: profit_loss_pcent
									})

									calcDetailsx10(trade_detailsx10);
									$(".Tradebalx10").html(balc);
									//$("#orderModal").hide();
									playPause();

									
								}
								//#endregion
								

								//#region Trade Line Transaction Instance
								if(counter > counterPricecheck){
									signalShoww = $(".signalShow").html();
									entryPrice = $("#orderEntry").val();
									takeProfitx3 = $("#Takeprofit").val();
									Stoploss = $("#stopLoss").val();
									var signalMode = $(".TradeMode").html();
									if(signalShoww == "buy" && signalMode == "1"){

										//alert("jjj "+crossover_emaoutput[counter_crossover].position_status)
										if(noise_response[counter_noise].low <= stop_loss){

											longTransc("Loss");
											$(".tradeTransactx3").html("0");
											//playPause();
											
											
										}

										if(noise_response[counter_noise].high >= take_profit  ){

											longTransc("Profit");
											$(".tradeTransactx3").html("0");
											//playPause();
										}
										
									}else if(signalShoww == "sell"  && signalMode == "1"){
									
										//alert("kkk "+crossover_emaoutput[counter_crossover].position_status)
										if(noise_response[counter_noise].high >= stop_loss){
											shortTransc("Loss");
											$(".tradeTransactx3").html("0");
											if(crossover_emaoutput[counter_crossover].position_status == "exit long" || crossover_emaoutput[counter_crossover].position_status == "exit short"){
												//playPause();
											}
											
										}
	
										if(noise_response[counter_noise].low <= take_profit){
	
											shortTransc("Profit");
											$(".tradeTransactx3").html("0");
											if(crossover_emaoutput[counter_crossover].position_status == "exit long" || crossover_emaoutput[counter_crossover].position_status == "exit short"){
												//playPause();
											}
										}								
										
									}
								}
								//#endregion


								//#region Noise Trade Execution Instance
								if(crossoverNoise_emaoutput[counterNoise_crossover].time == data3_noise[counter_noise].time){

									//alert(crossover_emaoutput[counter_crossover].position);

									currentDay_noise = timeConverter(data3_noise[counter_noise+3].time);
									currentDay2_noise = crossoverNoise_emaoutput[counterNoise_crossover].time_utc;
									var baselineSignal = $(".signalShow").html();
									//alert(baselineSignal)
									var tradeTransactMode = $(".tradeTransactMode").html();
									var TradeModeEMA = $(".TradeModeEMA").html();
									if(crossoverNoise_emaoutput[counterNoise_crossover].position == "buy"){
									
										markersNoise.push({
											time: currentDay_noise,
											position: 'belowBar',
											color: '#2196F3',
											shape: 'arrowUp',
											text: 'CrossOver @ ' + data3_noise[counter_noise].close+' - Buy'
										});

										if(baselineSignal != ""){

											// if(baselineSignal == "buy" && tradeTransactMode == "0"){

											// 	//alert(data3_noise[counter_noise].close+"- Entry")

											// 	$(".tradeEntry").html(data3_noise[counter_noise].close);
											// 	$(".tradeTransactMode").html("1");

											// }else if(baselineSignal == "sell" && tradeTransactMode == "1" && tradeTransact == "1"){

											// 	//alert(data3_noise[counter_noise].close+"- Profit")

											// 	$(".tradeExit").html(data3_noise[counter_noise].close);
											// 	$(".tradeTransactMode").html("0");
											// 	TranscNoise("Short");

											// }

											if(baselineSignal == "sell" && tradeTransact == "1" && tradeTransactMode == "1"){

												//alert(data3_noise[counter_noise].close+"- Exit Short")

												if(TradeModeEMA == "1" && avrAtr1 >= 3.5){

													$(".tradeExit").html(data3_noise[counter_noise].close);
													$(".tradeTransactMode").html("0");
													TranscNoise("Short", data3_noise[counter_noise].close);
												}
											
											}
										}

										// else if(baselineSignal == "buy" && tradeTransactMode == "1"){

										// 	$("#Takeprofit").val(data3_noise[counter_noise].close);
										// 	$(".tradeTransactMode").html("0");
										// 	TranscNoise("Long");

										// }else if(baselineSignal == "sell" && tradeTransactMode == "1"){

										// 	$("#Takeprofit").val(data3_noise[counter_noise].close);
										// 	$(".tradeTransactMode").html("0");
										// 	TranscNoise("Long");

										// }else if(baselineSignal == "sell" && tradeTransactMode == "0"){

										// 	$("#orderEntry").val(data3_noise[counter_noise].close);
										// 	$(".tradeTransactMode").html("1");

										// }

									// 	
									// 	amt_buy_time = currentDay2_noise;
										
									// 	candleSeries_noise.setMarkers(markersNoise);

									

									}else if(crossoverNoise_emaoutput[counterNoise_crossover].position == "sell"){

										markersNoise.push({
											time: currentDay_noise,
											position: 'aboveBar',
											color: '#e91e63',
											shape: 'arrowDown',
											text: 'CrossOver @ ' + data3_noise[counter_noise].close+' - Sell'
										});	
										
										if(baselineSignal != ""){

											// if(baselineSignal == "buy" && tradeTransactMode == "1"){

											// 	//alert(data3_noise[counter_noise].close+"- profit")

											// 	$(".tradeExit").html(data3_noise[counter_noise].close);
											// 	$(".tradeTransactMode").html("0");
											// 	TranscNoise("Long");
		
											//  }else if(baselineSignal == "sell" && tradeTransactMode == "0"){

											// 	//alert(data3_noise[counter_noise].close+"- Entry")
		
											// 	$(".tradeEntry").html(data3_noise[counter_noise].close);
											// 	$(".tradeTransactMode").html("1");
		
											// }

											if(baselineSignal == "buy" && tradeTransact == "1" && tradeTransactMode == "1"){

												//alert(data3_noise[counter_noise].close+"- Exit Long")

												if(TradeModeEMA == "1" && avrAtr1 >= 3.5){
													$(".tradeExit").html(data3_noise[counter_noise].close);
													$(".tradeTransactMode").html("0");
													TranscNoise("Long", data3_noise[counter_noise].close);
												}

												

											}
											
										}
															
									}
									//#endregion

									//alert(currentDay2_noise+" - "+currentDay_noise)

									candleSeries_noise.setMarkers(markersNoise);
									counterNoise_crossover++;
									//playPause();
								}

								if(counterNoise_ema > 21){
									lineSeries.setData(slowNoise_emaoutput.slice(0, counterNoise_ema+14));
									lineSeries2.setData(fastNoise_emaoutput.slice(0, counterNoise_ema));
								}

								mergeTickToBar(noisedPrice);
								counter_noise++;

								if(counter_noise > 21){
									counterNoise_ema++;
								}

						}
					}, 200);					

			});
		})

	});

	$("#tradepair_backtest").html(symbl)
	$("#time_backtest").html(" - "+tmfrm)

	// window.setTimeout(function () {
	// 	timer.pause();
	// 	window.setTimeout(function () {
	// 		timer.resume();
	// 	}, 20000);
	// }, 2000);
	

}

function tradeMode(){
	var signalMode = $(".TradeMode").html();
	if(signalMode == "1"){
		$(".TradeMode").html("0")
		$(".tradeModeBtn").html("Open Trade");
		$(".tradeModeBtn2").html("Open Trade");
		$(".tradeModeBtn2").addClass("longBtn");
		$(".tradeModeBtn2").removeClass("shortBtn");

	}else if(signalMode == "0"){
		$(".TradeMode").html("1")
		$(".tradeModeBtn").html("Close Trade");
		$(".tradeModeBtn2").html("Close Trade");
		$(".tradeModeBtn2").addClass("shortBtn");
		$(".tradeModeBtn2").removeClass("longBtn");

	}
	
}

function tradeModeEMA(){
	var signalMode = $(".TradeModeEMA").html();
	if(signalMode == "1"){
		$(".TradeModeEMA").html("0")
		$(".tradeModeBtn3").html("Open Trade (EMA)");
		$(".tradeModeBtn3").addClass("longBtn");
		$(".tradeModeBtn3").removeClass("shortBtn");

	}else if(signalMode == "0"){
		$(".TradeModeEMA").html("1")
		$(".tradeModeBtn3").html("Close Trade (EMA)");
		$(".tradeModeBtn3").addClass("shortBtn");
		$(".tradeModeBtn3").removeClass("longBtn");

	} 

	
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

	var signal = $(".signalShow").html();
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

	var tradedtls = "<td>"+symbl+"</td><td>Long</td><td>"+Tradebal+"</td><td>"+entry_price+"</td><td>"+stop_loss+"</td><td>"+take_profit+"</td><td class='pft-loss'>0%</td>";

	if(confirm("Are you sure you're going LONG")){
		//$(".tradeEntry").html(entry_price)
		$(".tradeTransactx3").html("1")
		$("#orderValues").html(tradedtls)
		$("#orderModal").show();
		$("#tradeModal").hide();
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

	var tradedtls = "<td>"+symbl+"</td><td>Short</td><td>"+Tradebal+"</td><td>"+entry_price+"</td><td>"+stop_loss+"</td><td>"+take_profit+"</td><td class='pft-loss'>0%</td><td class='tradeModeBtn' onclick='tradeMode()'>Close Trade</td>";

	if(confirm("Are you sure you're going SHORT")){
		//$(".tradeEntry").html(entry_price)
		$(".tradeTransactx3").html("1")
		$("#orderValues").html(tradedtls)
		$("#orderModal").show();
		$("#tradeModal").hide();
	}
	
}

// var timer = new IntervalTimer(function () {
// 	alert("Done!");
// }, 5000);

// window.setTimeout(function () {
// 	timer.pause();
// 	window.setTimeout(function () {
// 		timer.resume();
// 	}, 20000);
// }, 2000);

// if(counter_ema > 21){

// 	var last_ema_short = slow_emaoutput[counter_ema-2].value
// 	var last_ema_long = fast_emaoutput[counter_ema-2].value

// 	var ema_short = slow_emaoutput[counter_ema-1].value
// 	var ema_long = fast_emaoutput[counter_ema-1].value

	

// 	currentDay = timeConverter(fast_emaoutput[counter_ema].time);

// 	if(ema_short > ema_long && last_ema_short < last_ema_long){

// 		// alert("Short EMA Crossover Long EMA at "+data3[counter].close+ " Time: "+currentDay);
// 		//alert("Sell at "+data3[counter].close+ " Time: "+currentDay);

// 		markers.push({
// 			time: currentDay,
// 			position: 'aboveBar',
// 			color: '#e91e63',
// 			shape: 'arrowDown',
// 			text: 'CrossOver @ ' + data3[counter].close+' - Sell'
// 		});

		

// 		var amt_sell = data3[counter].close;
// 		var amt_sell_time = currentDay;

// 		if(typeof(amt_buy) === "undefined"){

// 			amt_buy = amt_sell;

// 		}

// 		var buy_sell_ratio = amt_sell-amt_buy;
// 		var pcent_ratio = (buy_sell_ratio/amt_buy)*100
// 		var pcent_ratio_pcent = (buy_sell_ratio/amt_buy)
// 		var profit_loss = Math.floor(starting_bal*pcent_ratio_pcent);
// 		var profit_loss_pcent = Math.floor(pcent_ratio_pcent*100);
		
// 		balc = calcProft(buy_sell_ratio, starting_bal, profit_loss);

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

// 		calcDetails(trade_details);
// 		candleSeries.setMarkers(markers);

// 	}else if(ema_long > ema_short && last_ema_long < last_ema_short){

// 		//alert("Buy at "+data3[counter].close+ " Time: "+currentDay);

// 		markers.push({
// 			time: currentDay,
// 			position: 'belowBar',
// 			color: '#2196F3',
// 			shape: 'arrowUp',
// 			text: 'CrossOver @ ' + data3[counter].close+' - Buy'
// 		});

// 		amt_buy = data3[counter].close;
// 		amt_buy_time = currentDay;

		
// 		candleSeries.setMarkers(markers);

// 	}									

// }

// const ws = new WebSocket('wss://stream.binance.com:9443/ws');
// const msg = {
//   method: 'SUBSCRIBE',
//   params: ['btcusdt@depth'],
//   id: 1,
// };

// ws.onopen = () => {
//   ws.send(JSON.stringify(msg));
//   console.log(msg)
// };

var tradingpairreal = tradePair.toLowerCase();
//alert(tradingpairreal+" - "+ timeFrm )

var binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws/"+tradingpairreal+"@kline_"+timeFrm);

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


}

var binanceSocket2 = new WebSocket("wss://stream.binance.com:9443/ws/"+tradingpairreal+"@kline_"+timeFrm2);

binanceSocket2.onmessage = function (event) {	
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


