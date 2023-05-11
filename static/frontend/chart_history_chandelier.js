$("document").ready(function(){

	//alert("kfjfj")
	//load_data();
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

var tradePair = "BTCUSDT";
var timeFrm = '1d';
//var timeFrm2 = document.getElementById('time2').innerHTML;



var intervals = ['SMA CrossOver', 'Baseline', 'Confirmation', '2nd Confirmation-Volume'];

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

var chartwidth = document.getElementById("chart0").clientWidth;

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

	var chartData = document.getElementById('chartData').innerHTML;
	var chartData0 = document.getElementById('chart0Data').innerHTML;
	var chart2Data = document.getElementById('chart2Data').innerHTML;
	var chart3Data = document.getElementById('chart3Data').innerHTML;
	var chart4Data = document.getElementById('chart4Data').innerHTML;

	if(interval == "SMA CrossOver"){

		//alert("rsfs")

		document.getElementById('chart0').style.display = "block";
		document.getElementById('chart').style.display = "none";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart3').style.display = "none";
		document.getElementById('chart4').style.display = "none";

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

			/// Chart Data
			fetch('http://127.0.0.1:5000/charthistory/'+tradePair+'/1d')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)	
				//alert(tradePair)	
				candleSeries.setData(response);
	
			});

			fetch('http://127.0.0.1:5000/chartz_runbot_ema_slow/'+tradePair+'/1d')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				lineSeries_ema_slow.setData(response);
				
			});

			fetch('http://127.0.0.1:5000/chartz_runbot_ema_fast/'+tradePair+'/1d')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)

				// lineSeries.setData(response);
				lineSeries_ema_fast.setData(response);
				
			});
			
		}	

	}else if(interval == "Baseline"){

		document.getElementById('chart0').style.display = "none";
		document.getElementById('chart').style.display = "block";
		document.getElementById('chart2').style.display = "none";
		document.getElementById('chart3').style.display = "none";
		document.getElementById('chart4').style.display = "none";

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

			fetch('http://127.0.0.1:5000/charthistory/'+tradePair+'/4h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)		
				candleSeries.setData(response);
	
			});


		}

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

			fetch('http://127.0.0.1:5000/charthistory/'+tradePair+'/1h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)		
				candleSeries_hull.setData(response);
	
			});


		}

	}else if(interval == "2nd Confirmation-Volume"){

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

			fetch('http://127.0.0.1:5000/charthistory/'+tradePair+'/1h')
			.then((r) => r.json())
			.then((response) => {
				//console.log(response)		
				candleSeries_hull.setData(response);
	
			});


		}
	}

}

syncToInterval(intervals[0]);


function load_data(){

	//var symbl = $("#symbol_backtest").val();
	//var tmfrm = $("#timeframe_backtest").val();
	//var date_backtest = $("#date_backtest").val();
	
	var symbl ="BTCUSDT";
	var tmfrm = "1d";
	var date_backtest = 1577404800;
    var comment_json = {
                        "symbol_pair": "BTCUSDT",
						"timeframe": "1d"
                        }

    $.ajax({
        type: "POST",
        url: "/chartz_chandelier/pair",        
        contentType: "application/json",
        dataType: "json",  
        data: JSON.stringify(comment_json),      
        success: function(response){

			//load_chart_backtest(symbl, tmfrm, date_backtest);
           
			//$("#tradepair_backtest").html(symbl)
			//$("#time_backtest").html(" - "+tmfrm)
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

					amt_buy = datesForMarkers[i].close;
					amt_buy_time = datesForMarkers[i].time_utc;

				}else if(datesForMarkers[i].position == "sell" && datesForMarkers[i].time > date_backtest){

					amt_sell = datesForMarkers[i].close;
					amt_sell_time = datesForMarkers[i].time_utc;

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

	var chartwidth = document.getElementById("chart0").clientWidth;
	

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

			candleSeries.setData(data);

		});

		
	
	fetch('http://127.0.0.1:5000/chartz_runbot_ema_slow/'+tradePair+'/'+timeFrame)
	.then((r) => r.json())
	.then((response) => {

		lineSeries_ema_slow.setData(response);
		
	});


	fetch('http://127.0.0.1:5000/chartz_runbot_ema_fast/'+tradePair+'/'+timeFrame)
	.then((r) => r.json())
	.then((response) => {

		lineSeries_ema_fast.setData(response);
		
	});

	fetch('http://127.0.0.1:5000/chartz_runbot_ema_baseline/'+tradePair+'/'+timeFrame)
	.then((r) => r.json())
	.then((response) => {

		lineSeries_ema_basline.setData(response);
		
	});

	

	fetch('http://127.0.0.1:5000/chartz_runbot_chandelier/'+tradePair+'/'+timeFrame)
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

		





