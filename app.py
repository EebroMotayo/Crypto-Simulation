from flask import Flask, render_template, url_for, request, flash, redirect, jsonify, session
# import coinview.simulate.utils as utility
from coinview.simulate import utils as utility

from datetime import datetime as dt
from ta import add_all_ta_features
from ta.utils import dropna
from ta.volatility import *
from ta.trend import  *
from ta.momentum import *

# import schedule
import pandas as pd
from binance.client import Client
# import requests
from functools import wraps
import urllib.request

# pd.set_option('display.max_rows', None)

import warnings
warnings.filterwarnings('ignore')

import numpy as np
from datetime import datetime
import time
from math import *
# from coinview.historydata.models import *
# from coinview.historydata.forms import *
# from coinview.utils import *


app = Flask(__name__)

API_KEY = 'LkNaYrW2LiGa915piUb76LicE6WukymRTRRhWWkeseJHmQWekiqWBZqibBXGo8d3'
API_SECRET = 'AqzVVCThp4sF6cqEKHP3mdRpBIBq83ibOFwylK3OSTzM1Inz39QI9mkGu0fv2kmm'
TELEGRAM_TOKEN = '5200113689:AAFLRoGo4Bn46Pb3cJYqDfhSQVfY3MZfnfE' # telegram bot token
TELEGRAM_CHANNEL ='1137106976' # channel id


def connect(host='http://google.com'):
    try:
        urllib.request.urlopen(host) #Python 3.x
        return True
    except:
        return False


# @app.route("/")
# def index():
#     return render_template('index.html')

@app.route('/')
def simulation():
    title = 'CoinView'
    # symbols=request.form['symbol']
    # timeframe=request.form['timeframe']
    timeframe1="4h"
    return render_template('frontend/market-simulation.html', title=title, timeframe1=timeframe1) 


@app.route('/simulate')
def simulate():
    title = 'CoinView'
    return render_template('frontend/chartz_simulate.html', title=title)

@app.route('/chartz/simulation', methods=['GET', 'POST'])
def parse_simulation_data():
    
    if request.method == "POST":
        data = request.get_json()
        symbol_pair = data["symbol_pair"]
        timeframe = data["timeframe"]
        processed_candlesticks = chartsimulateinit(symbol_pair, timeframe, 24)

    return processed_candlesticks  


@app.route('/charthistory/<pair>/<timefrm>')
def charthistory(pair, timefrm):
    if connect():
        client = Client(API_KEY, API_SECRET)
        if timefrm == "1d":
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_1DAY, "1 Jan, 2021")
        elif timefrm == '6h':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_6HOUR, "50 days ago UTC")
        elif timefrm == '4h':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_4HOUR, "40 days ago UTC")
        elif timefrm == '1h':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_1HOUR, "30 days ago UTC")
        elif timefrm == '30m':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_30MINUTE, "20 days ago UTC")
        elif timefrm == '15m':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_15MINUTE, "15 days ago UTC")
        elif timefrm == '5m':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_5MINUTE, "10 days ago UTC")
        else:
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_5MINUTE, "10 days ago UTC")

        candlesticks = pd.DataFrame(bars, columns=['time', 'open', 'high', 'low', 'close', 'volume','6', '7', '8', '9', '10', '11'], dtype=float)
        candlesticks = candlesticks.drop(columns=[ '6', '7', '8', '9', '10', '11'])
    else:                                                             
        bars = pd.read_csv('coinview/data_simulation/'+timefrm+'/'+pair+'/data.csv')
        candlesticks = pd.DataFrame(bars, columns=['time', 'open', 'high', 'low', 'close', 'volume']).tail(2000)
    candlesticks[['time', 'open', 'high', 'low', 'close', 'volume']] = candlesticks[['time', 'open', 'high', 'low', 'close', 'volume']].astype(float)    
    processed_candlesticks = []
    candlesticks = candlesticks.to_numpy()

    for data in candlesticks:
        candlestick = { 
            "time": data[0] / 1000, 
            "open": data[1],
            "high": data[2], 
            "low": data[3], 
            "close": data[4]
        }

        processed_candlesticks.append(candlestick)

    return jsonify(processed_candlesticks)

@app.route('/chartz_runbot_ut_bot_alert_baseline/<pair>/<timefrm>')
def chartz_runbot_ut_bot_alert_baseline(pair, timefrm):
    if connect():
        client = Client(API_KEY, API_SECRET)
        if timefrm == "1d":
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_1DAY, "1 Jan, 2021")
        elif timefrm == '6h':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_6HOUR, "50 days ago UTC")
        elif timefrm == '4h':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_4HOUR, "40 days ago UTC")
        elif timefrm == '1h':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_1HOUR, "30 days ago UTC")
        elif timefrm == '30m':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_30MINUTE, "20 days ago UTC")
        elif timefrm == '15m':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_15MINUTE, "15 days ago UTC")
        elif timefrm == '5m':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_5MINUTE, "10 days ago UTC")
        else:
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_5MINUTE, "10 days ago UTC")
    else:
        bars = pd.read_csv('coinview/data_simulation/'+timefrm+'/'+pair+'/data.csv') 
    df = pd.DataFrame(bars[:-1], columns=['time', 'open', 'high', 'low', 'close', 'volume','6', '7', '8', '9', '10', '11'], dtype=float)
    df = df.drop(columns=[ '6', '7', '8', '9', '10', '11'])
    atr_period = 22
    processed_candlesticks = utility.ut_bot_alert_signal(df, sentvt=3, atr=10)

    # print(processed_candlesticks)

    return processed_candlesticks

@app.route('/chartz_runbot_ut_bot_alert/<pair>/<timefrm>')
def chartz_runbot_ut_bot_alert(pair, timefrm):
    if connect():
        client = Client(API_KEY, API_SECRET)
        if timefrm == "1d":
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_1DAY, "1 Jan, 2021")
        elif timefrm == '6h':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_6HOUR, "50 days ago UTC")
        elif timefrm == '4h':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_4HOUR, "40 days ago UTC")
        elif timefrm == '1h':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_1HOUR, "30 days ago UTC")
        elif timefrm == '30m':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_30MINUTE, "20 days ago UTC")
        elif timefrm == '15m':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_15MINUTE, "15 days ago UTC")
        elif timefrm == '5m':
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_5MINUTE, "10 days ago UTC")
        else:
            bars = client.get_historical_klines(pair, Client.KLINE_INTERVAL_5MINUTE, "10 days ago UTC")
    else:
        bars = pd.read_csv('coinview/data_simulation/'+timefrm+'/'+pair+'/data.csv') 
    df = pd.DataFrame(bars[:-1], columns=['time', 'open', 'high', 'low', 'close', 'volume','6', '7', '8', '9', '10', '11'], dtype=float)
    df = df.drop(columns=[ '6', '7', '8', '9', '10', '11'])
    atr_period = 22
    processed_candlesticks = utility.ut_bot_alert_signal(df, sentvt=2, atr=10)

    # print(processed_candlesticks)

    return processed_candlesticks    


@app.route('/chartsimulateinit/<pair>/<timeframe>/<int:rows>')
def chartsimulateinit(pair, timeframe, rows):
    bars = pd.read_csv('coinview/data_simulation/'+timeframe+'/'+pair+'/data.csv', nrows=rows)
    candlesticks = pd.DataFrame(bars, columns=['time', 'open', 'high', 'low', 'close', 'volume'])
    candlesticks[['time', 'open', 'high', 'low', 'close', 'volume']] = candlesticks[['time', 'open', 'high', 'low', 'close', 'volume']].astype(float)

    processed_candlesticks = []
    candlesticks = candlesticks.to_numpy()
    for data in candlesticks:
        candlestick = { 
            "time": data[0] / 1000, 
            "open": data[1],
            "high": data[2], 
            "low": data[3], 
            "close": data[4]
        }
        processed_candlesticks.append(candlestick)

    return jsonify(processed_candlesticks)


@app.route('/chartsimulatenoise/<pair>/<timeframe>')
def chartsimulatenoise(pair, timeframe):
    bars = pd.read_csv('coinview/data_simulation/'+timeframe+'/'+pair+'/data.csv')
    candlesticks = pd.DataFrame(bars, columns=['time', 'open', 'high', 'low', 'close', 'volume'])
    candlesticks[['time', 'open', 'high', 'low', 'close', 'volume']] = candlesticks[['time', 'open', 'high', 'low', 'close', 'volume']].astype(float)

    processed_candlesticks = []
    candlesticks = candlesticks.to_numpy()
    for data in candlesticks:
        candlestick = { 
            "time": data[0] / 1000, 
            "open": data[1],
            "high": data[2], 
            "low": data[3], 
            "close": data[4]
        }
        processed_candlesticks.append(candlestick)

    return jsonify(processed_candlesticks)


@app.route('/chartsimulate/<pair>/<timeframe>')
def chartsimulate(pair, timeframe):
    bars = pd.read_csv('coinview/data_simulation/'+timeframe+'/'+pair+'/data.csv')
    candlesticks = pd.DataFrame(bars, columns=['time', 'open', 'high', 'low', 'close', 'volume'])
    candlesticks[['time', 'open', 'high', 'low', 'close', 'volume']] = candlesticks[['time', 'open', 'high', 'low', 'close', 'volume']].astype(float)
    processed_candlesticks = []

    candlesticks = candlesticks.to_numpy()

    for data in candlesticks:
        candlestick = { 
            "time": data[0] / 1000, 
            "open": data[1],
            "high": data[2], 
            "low": data[3], 
            "close": data[4]
        }

        processed_candlesticks.append(candlestick)

    return jsonify(processed_candlesticks)


@app.route('/chartz_runbot_chandelier_sim/<pair>/<timefrm>')
def chartz_runbot_chandelier_sim(pair, timefrm):
    bars = pd.read_csv('coinview/data_simulation/'+timefrm+'/'+pair+'/data.csv') 
    df = pd.DataFrame(bars[:-1], columns=['time', 'open', 'high', 'low', 'close', 'volume'])
    atr_period = 22
    processed_candlesticks = utility.chandelier_signals(df, atr_period)

    # print(processed_candlesticks)

    return processed_candlesticks 

@app.route('/chartz_runbot_ema_fast_sim/<pair>/<timefrm>')
def chartz_runbot_ema_fast_sim(pair, timefrm):
    bars = pd.read_csv('coinview/data_simulation/'+timefrm+'/'+pair+'/data.csv') 
    df = pd.DataFrame(bars[:-1], columns=['time', 'open', 'high', 'low', 'close', 'volume'])
    processed_candlesticks = utility.ema_fast(df)

    return processed_candlesticks 


@app.route('/chartz_runbot_ema_slow_sim/<pair>/<timefrm>')
def chartz_runbot_ema_slow_sim(pair, timefrm):
    bars = pd.read_csv('coinview/data_simulation/'+timefrm+'/'+pair+'/data.csv') 
    df = pd.DataFrame(bars[:-1], columns=['time', 'open', 'high', 'low', 'close', 'volume'])
    processed_candlesticks = utility.ema_slow(df)

    return processed_candlesticks   


@app.route('/chartz_runbot_ema_crossover_sim/<pair>/<timefrm>')
def chartz_runbot_ema_crossover_sim(pair, timefrm):
    # bars = exchange.fetch_ohlcv(pair, timeframe=timefrm, limit=2000)
    bars = pd.read_csv('coinview/data_simulation/'+timefrm+'/'+pair+'/data.csv') 
    df = pd.DataFrame(bars[:-1], columns=['time', 'open', 'high', 'low', 'close', 'volume'])
    # df['time'] = pd.to_datetime(df['time'], unit='ms')
    df[['time', 'open', 'high', 'low', 'close', 'volume']] = df[['time', 'open', 'high', 'low', 'close', 'volume']].astype(float) 

    crossover_data = utility.ema_crossover(df)
    processed_candlesticks = utility.check_buy_sell_ema_crossover(crossover_data, pair, timefrm)
    return processed_candlesticks

@app.route('/sim_runbot_ut_bot_alert/<pair>/<timefrm>')
def sim_runbot_ut_bot_alert(pair, timefrm):
    bars = pd.read_csv('coinview/data_simulation/'+timefrm+'/'+pair+'/data.csv') 
    df = pd.DataFrame(bars, columns=['time', 'open', 'high', 'low', 'close', 'volume'])
    atr_period = 22
    processed_candlesticks = utility.ut_bot_alert_signal(df, sentvt=2, atr=10)
    # print(processed_candlesticks)
    return processed_candlesticks

@app.route('/sim_baseline_runbot_ut_bot_alert/<pair>/<timefrm>')
def sim_baseline_runbot_ut_bot_alert(pair, timefrm):
    bars = pd.read_csv('coinview/data_simulation/'+timefrm+'/'+pair+'/data.csv') 
    df = pd.DataFrame(bars, columns=['time', 'open', 'high', 'low', 'close', 'volume'])
    atr_period = 22
    processed_candlesticks = utility.ut_bot_alert_signal(df, sentvt=3, atr=10)
    # print(processed_candlesticks)
    return processed_candlesticks

@app.route('/sim_runbot_atr_period/<pair>/<timefrm>')
def sim_runbot_atr_period(pair, timefrm):
    bars = pd.read_csv('coinview/data_simulation/'+timefrm+'/'+pair+'/data.csv') 
    df = pd.DataFrame(bars[:-1], columns=['time', 'open', 'high', 'low', 'close', 'volume'])   
    processed_candlesticks = utility.atr_function(df, 24)

    return processed_candlesticks




if __name__ == '__main__':
    app.run(debug=True)