import os
from flask import current_app, jsonify
import numpy as np
import pandas as pd
from finta import TA
import itertools
import math
import talib as ta
import talib
import vectorbt as vbt
# from coinview.ut_bot_alert2 import ut_bot_alerts



def ema_slow(df):
    processed_candlesticks = []
    last_row_index = len(df.index) - 1
    counter = 8
    ema_period_8 = 8  # defining the ema period to 10
    while counter < last_row_index:

        df['ema_8'] = df['close'].ewm(span=ema_period_8, min_periods=ema_period_8).mean()
        dftime = df["time"][counter] / 1000
        allcandlestick = { 
            "time": dftime, 
            "value": df['ema_8'][counter],
            "close": df["close"][counter]
        }
        processed_candlesticks.append(allcandlestick)
        counter += 1

    return jsonify(processed_candlesticks)   


def ema_fast(df):
    processed_candlesticks = []
    last_row_index = len(df.index) - 1
    counter = 21
    ema_period_21 = 21  # defining the ema period to 10

    while counter < last_row_index:
        df['ema_21'] = df['close'].ewm(span=ema_period_21, min_periods=ema_period_21).mean()

        dftime = df["time"][counter] / 1000
        allcandlestick = { 
            "time": dftime, 
            "value": df['ema_21'][counter],
            "close": df["close"][counter]
        }

        processed_candlesticks.append(allcandlestick)

        counter += 1

    return jsonify(processed_candlesticks)  

def ema_crossover(df):
    df['ema_8'] = df['close'].ewm(span=8, min_periods=8).mean()
    df['ema_21'] = df['close'].ewm(span=21, min_periods=21).mean()

    diff = df['ema_8'] < df['ema_21']
    diff_forward = diff.shift(1)
    crossing = np.where(abs(diff - diff_forward) == 1)[0]
    
    crossover = df.iloc[crossing]

    return crossover


def check_buy_sell_ema_crossover(df, pair, timefrm):

    processed_candlesticks = []
    last_row_index = len(df.index)
    counter = 0

    while counter < last_row_index:
        counter_indx = df.index[counter]
        time_utc = pd.to_datetime(df['time'][counter_indx], unit='ms')

        diff_position = ""

        if df['ema_21'][counter_indx] < df['ema_8'][counter_indx]:
            diff_position = "buy"
            bot_message  = f"Buy Signal on {pair} from {timefrm} Timeframe"

        elif df['ema_8'][counter_indx] < df['ema_21'][counter_indx]:
            diff_position = "sell"
            bot_message  = f"Sell Signal on {pair} from {timefrm} Timeframe"

        allcandlestick = { 
            "time": df["time"][counter_indx]/1000, 
            "time_utc":time_utc,
            "open": df["open"][counter_indx],
            "high": df["high"][counter_indx], 
            "low": df["low"][counter_indx],
            "close": df["close"][counter_indx],
            "volume": df["volume"][counter_indx],
            "position":diff_position
        }

        processed_candlesticks.append(allcandlestick)

        counter += 1

    return jsonify(processed_candlesticks)


def ema_cloud(df):
    processed_candlesticks = []
    last_row_index = len(df.index) - 1
    counter = 120
    ema_period_120 = 120
    while counter < last_row_index:

        df['ema_120'] = df['close'].ewm(span=ema_period_120, min_periods=ema_period_120).mean()
        dftime = df["time"][counter] / 1000
        allcandlestick = { 
            "time": dftime, 
            "value": df['ema_120'][counter],
            "close": df["close"][counter]
        }
        processed_candlesticks.append(allcandlestick)
        counter += 1

    return jsonify(processed_candlesticks)

def ema_cloud_base(df):
    processed_candlesticks = []
    last_row_index = len(df.index) - 1
    counter = 14
    ema_period_14 = 14
    while counter < last_row_index:

        df['ema_14'] = df['close'].ewm(span=ema_period_14, min_periods=ema_period_14).mean()
        dftime = df["time"][counter] / 1000
        allcandlestick = { 
            "time": dftime, 
            "value": df['ema_14'][counter],
            "close": df["close"][counter]
        }
        processed_candlesticks.append(allcandlestick)
        counter += 1

    return jsonify(processed_candlesticks)

def ema_cloud_crossover(df):
    df['ema_14'] = df['close'].ewm(span=30, min_periods=30).mean()
    df['ema_120'] = df['close'].ewm(span=120, min_periods=120).mean()

    diff = df['ema_14'] < df['ema_120']
    diff_forward = diff.shift(1)
    crossing = np.where(abs(diff - diff_forward) == 1)[0]
    
    crossover = df.iloc[crossing]

    return crossover

def ema_cloud_price_crossover(df):
    df['ema_14'] = df['close'].ewm(span=3, min_periods=3).mean()
    df['ema_120'] = df['close'].ewm(span=30, min_periods=30).mean()

    diff = df['ema_14'] < df['ema_120']
    diff_forward = diff.shift(1)
    crossing = np.where(abs(diff - diff_forward) == 1)[0]
    
    crossover = df.iloc[crossing]

    return crossover


def ema_cloud_price_buy_sell_crossover(df):
    df['ema_14'] = df['close'].ewm(span=3, min_periods=3).mean()
    df['ema_120'] = df['close'].ewm(span=120, min_periods=120).mean()

    diff = df['ema_14'] < df['ema_120']
    diff_forward = diff.shift(1)
    crossing = np.where(abs(diff - diff_forward) == 1)[0]
    
    crossover = df.iloc[crossing]

    return crossover


def check_buy_sell_ema_cloud_crossover(df, pair, timefrm):

    processed_candlesticks = []
    last_row_index = len(df.index)
    counter = 0

    while counter < last_row_index:
        counter_indx = df.index[counter]
        time_utc = pd.to_datetime(df['time'][counter_indx], unit='ms')

        diff_position = ""

        if df['ema_120'][counter_indx] < df['ema_14'][counter_indx]:
            diff_position = "buy"
            bot_message  = f"Buy Signal on {pair} from {timefrm} Timeframe"

        elif df['ema_14'][counter_indx] < df['ema_120'][counter_indx]:
            diff_position = "sell"
            bot_message  = f"Sell Signal on {pair} from {timefrm} Timeframe"

        allcandlestick = { 
            "time": df["time"][counter_indx]/1000, 
            "time_utc":time_utc,
            "open": df["open"][counter_indx],
            "high": df["high"][counter_indx], 
            "low": df["low"][counter_indx],
            "close": df["close"][counter_indx],
            "volume": df["volume"][counter_indx],
            "position":diff_position
        }

        processed_candlesticks.append(allcandlestick)

        counter += 1

    return jsonify(processed_candlesticks)


def calculate_tis(df, atr_period):
    #  Calculate ATR
    atr = TA.ATR(df, period=atr_period)
    
    #  Calculate chandelier exits
    chandelier_info = TA.CHANDELIER(df, short_period=atr_period, long_period=atr_period, k=4)
    #  Add to price dataframe
    df = pd.concat([df, atr, chandelier_info], axis=1, ignore_index=False)
    return df

def calculate_signals(df):
    #  Long position
    df['enter_long'] = np.where((df['close'] > df['Short.']) & (df['close'].shift(1) <= df['Short.'].shift(1)), 1, 0)
    df['exit_long'] = np.where((df['close'] < df['Long.']) & (df['close'].shift(1) >= df['Long.'].shift(1)), 1, 0) 
    
    #  Short position
    df['enter_short'] = np.where((df['close'] < df['Long.']) & (df['close'].shift(1) >= df['Long.'].shift(1)), 1, 0)
    df['exit_short'] = np.where((df['close'] > df['Short.']) & (df['close'].shift(1) <= df['Short.'].shift(1)), 1, 0)
    return df


def execute_strategy(df):
    close_prices = df['close'].to_numpy()
    enter_long = df['enter_long'].to_numpy()
    exit_long = df['exit_long'].to_numpy()
    enter_short = df['enter_short'].to_numpy()
    exit_short = df['exit_short'].to_numpy()
    
    last_long_entry_price = 0
    last_short_entry_price = 0
    long_entry_prices = []
    long_exit_prices = []
    short_entry_prices = []
    short_exit_prices = []
    hold_long = 0
    hold_short = 0

    processed_candlesticks = []

    for i in range(len(close_prices)):
        current_price = close_prices[i]
        
        #  Enter long 
        if hold_long == 0 and enter_long[i] == 1:
            last_long_entry_price = current_price
            long_entry_prices.append(current_price)
            long_exit_prices.append(np.nan)
            hold_long = 1
            time_utc = pd.to_datetime(df['time'][i], unit='ms')
            allcandlestick = { 
                "time": df["time"][i]/1000, 
                "time_utc": time_utc, 
                "position": 'buy', 
                "close": str(last_long_entry_price),
                
            }
            processed_candlesticks.append(allcandlestick)
        #  Exit long
        elif hold_long == 1 and exit_long[i] == 1:
            long_entry_prices.append(np.nan)
            long_exit_prices.append(current_price)
            hold_long = 0
            time_utc = pd.to_datetime(df['time'][i], unit='ms')
            allcandlestick = { 
                "time": df["time"][i]/1000, 
                "time_utc": time_utc, 
                "position": 'exit buy', 
                "close": str(current_price),
                
            }
            processed_candlesticks.append(allcandlestick)
        else:
            #  Neither entry nor exit
            long_entry_prices.append(np.nan)
            long_exit_prices.append(np.nan)
        #  Enter Short 
        if hold_short == 0 and enter_short[i] == 1:
            last_short_entry_price = current_price
            short_entry_prices.append(current_price)
            short_exit_prices.append(np.nan)
            hold_short = 1
            time_utc = pd.to_datetime(df['time'][i], unit='ms')
            allcandlestick = { 
                "time": df["time"][i]/1000, 
                "time_utc": time_utc, 
                "position": 'sell', 
                "close": str(last_short_entry_price),  
            }
            processed_candlesticks.append(allcandlestick)
        #  Exit short
        elif hold_short == 1 and exit_short[i] == 1:
            short_entry_prices.append(np.nan)
            short_exit_prices.append(current_price)
            hold_short = 0
            time_utc = pd.to_datetime(df['time'][i], unit='ms')
            allcandlestick = { 
                "time": df["time"][i]/1000, 
                "time_utc": time_utc, 
                "position": 'exit sell', 
                "close": str(current_price),  
            }
            processed_candlesticks.append(allcandlestick)
        else:
            #  Neither entry nor exit
            short_entry_prices.append(np.nan)
            short_exit_prices.append(np.nan)
    # return long_entry_prices, long_exit_prices, short_entry_prices, short_exit_prices
    return jsonify(processed_candlesticks)   


def chandelier_signals(df, atr_period):
    # df = df.tail(400)
    df.reset_index(inplace=True)
    df = calculate_tis(df, atr_period)
    df = calculate_signals(df)
    # processed_candlesticks = execute_strategy(df)

    processed_candlesticks = []
    counter = atr_period
    last_row_index = len(df.index) - 1
    buy_status = False
    sell_status = False
    buy_exit_status = False
    sell_exit_status = False
    position_status = ""
    while counter < last_row_index:
        if df['enter_long'][counter] == 1:
            if(buy_status == True):
                position_status = "exit long"
                buy_status = False
            else:
                position_status = "enter long"
                buy_status = True
            # df['time'] = pd.to_datetime(df['time'], unit='ms')
            time_utc = pd.to_datetime(df['time'][counter], unit='ms')
            allcandlestick = { 
                # "time": time_utc, 
                "position": 'buy', 
                "close": df["close"][counter],
                "enter_long": str(df['enter_long'][counter]),
                "exit_long": str(df['exit_long'][counter]),
                "enter_short": str(df['enter_short'][counter]),
                "exit_short": str(df['exit_short'][counter]),
                "time": df["time"][counter]/1000, 
                "time_utc": time_utc, 
                "position_status": position_status, 
                 
            }
            processed_candlesticks.append(allcandlestick)
            # print(df)
        elif df['enter_short'][counter] == 1:
            
            if(sell_status == True):
                position_status = "exit short"
                sell_status = False
            else:
                position_status = "enter short"
                sell_status = True
            # df['time'] = pd.to_datetime(df['time'], unit='ms')
            time_utc = pd.to_datetime(df['time'][counter], unit='ms')
            allcandlestick = { 
                # "time": time_utc, 
                "position": 'sell', 
                "close": df["close"][counter],
                "enter_long": str(df['enter_long'][counter]),
                "exit_long": str(df['exit_long'][counter]),
                "enter_short": str(df['enter_short'][counter]),
                "exit_short": str(df['exit_short'][counter]),
                "time": df["time"][counter]/1000, 
                "time_utc": time_utc, 
                "position_status": position_status,
            }
            processed_candlesticks.append(allcandlestick)

        counter += 1

    return jsonify(processed_candlesticks)   
    # return processed_candlesticks


def avg_true_range(df): 
  ind = range(0,len(df))
  indexlist = list(ind)
  df.index = indexlist

  for index, row in df.iterrows():
    if index != 0:
      tr1 = row["high"] - row["low"]
      tr2 = abs(row["high"] - df.iloc[index-1]["close"])
      tr3 = abs(row["low"] - df.iloc[index-1]["close"])

      true_range = max(tr1, tr2, tr3)
      df.at[index,"True Range"] = true_range

  df["Avg TR"] = df["True Range"].rolling(min_periods=2, window=14, center=False).mean()
  return df

def atr_function(df, period):
    atr_period = period
    processed_candlesticks = []
    last_row_index = len(df.index) - 1
    counter = period
    while counter < last_row_index:
        counter_indx = df.index[counter]
        time_utc = pd.to_datetime(df['time'][counter_indx], unit='ms')
        df['range'] = df['high'] - df['low']
        df['atr_14'] = df['range'].rolling(atr_period).mean()
        dftime = df["time"][counter] / 1000
        allcandlestick = { 
            "time": dftime, 
            "time_utc":time_utc,
            "value": df['atr_14'][counter],
            "close": df["close"][counter]
        }
        processed_candlesticks.append(allcandlestick)
        counter += 1

    return jsonify(processed_candlesticks) 


def chandelier_exit(df): # default period is 22

  

  df_tr = avg_true_range(df)

  rolling_high = df_tr["high"][-22:].max()
  rolling_low = df_tr["low"][-22:].max()

  chandelier_long = rolling_high - df_tr["Avg TR"] * 4
  chandelier_short = rolling_low - df_tr["Avg TR"] * 4

  df['Long.'] = chandelier_long
  df['Short.'] = chandelier_short

  # print(str(chandelier_long)+" - "+str(chandelier_short))
  # print(df)

def calculate_signals22(df):
    df = df.tail(400)
    chandelier_exit(df)
    #  Long position
    df['enter_long'] = np.where((df['close'] > df['Short.']) & (df['close'].shift(1) <= df['Short.'].shift(1)), 1, 0)
    df['exit_long'] = np.where((df['close'] < df['Long.']) & (df['close'].shift(1) >= df['Long.'].shift(1)), 1, 0) 
    
    #  Short position
    df['enter_short'] = np.where((df['close'] < df['Long.']) & (df['close'].shift(1) >= df['Long.'].shift(1)), 1, 0)
    df['exit_short'] = np.where((df['close'] > df['Short.']) & (df['close'].shift(1) <= df['Short.'].shift(1)), 1, 0)
    return df


def heikin_ashi(df):
    """
    Calculate the Heikin-Ashi candles for a given dataframe of OHLCV data.
    Returns a new dataframe with the Heikin-Ashi candle data, as well as a new
    column indicating buy and sell signals based on Heikin-Ashi candle patterns.
    """
    ha_close = (df['open'] + df['high'] + df['low'] + df['close']) / 4
    ha_open = pd.Series(np.nan, index=df.index)
    ha_high = pd.Series(np.nan, index=df.index)
    ha_low = pd.Series(np.nan, index=df.index)
    buy_signal = pd.Series(np.nan, index=df.index)
    sell_signal = pd.Series(np.nan, index=df.index)
    for i in range(0, len(df)):
        if i == 0:
            ha_open.iloc[i] = df['open'].iloc[i]
        else:
            ha_open.iloc[i] = (ha_open.iloc[i-1] + ha_close.iloc[i-1]) / 2
        ha_high.iloc[i] = np.max([df['high'].iloc[i], ha_open.iloc[i], ha_close.iloc[i]])
        ha_low.iloc[i] = np.min([df['low'].iloc[i], ha_open.iloc[i], ha_close.iloc[i]])
        if i > 1:
            if ha_close.iloc[i-2] < ha_open.iloc[i-2] and ha_close.iloc[i-1] > ha_open.iloc[i-1] and ha_close.iloc[i] > ha_open.iloc[i]:
                # buy_signal.iloc[i] = ha_close.iloc[i]
                buy_signal.iloc[i] = "buy"
            elif ha_close.iloc[i-2] > ha_open.iloc[i-2] and ha_close.iloc[i-1] < ha_open.iloc[i-1] and ha_close.iloc[i] < ha_open.iloc[i]:
                # sell_signal.iloc[i] = ha_close.iloc[i]
                sell_signal.iloc[i] = "sell"
    ha_df = pd.DataFrame({'open': ha_open, 'high': ha_high, 'low': ha_low, 'close': ha_close, 'buy_signal': buy_signal, 'sell_signal': sell_signal, 'time':df['time'], 'volume':df['volume']})
    # ha_df = ha_df[~ha_df['buy_signal'].isnull()]
    # ha_df = ha_df[~ha_df['sell_signal'].isnull()]
    return ha_df


def heikin_ashi_signal(dff):
    df = heikin_ashi(dff)
    processed_candlesticks = []
    last_row_index = len(df.index)
    counter = 0

    # df = df[~df['buy_signal'].isnull()]
    # df = df[~df['sell_signal'].isnull()]

    while counter < last_row_index:
        

        counter_indx = df.index[counter]
        time_utc = pd.to_datetime(dff['time'][counter_indx], unit='ms')
        # if df['buy_signal'][counter_indx].isnull() or df['sell_signal'][counter_indx].isnull():
        #     counter += 1
        #     continue

        diff_position = ""

        if df['buy_signal'][counter_indx] == "buy":
            diff_position = "buy"

        elif df['sell_signal'][counter_indx]== "sell":
            diff_position = "sell"

        allcandlestick = { 
            "time": df["time"][counter_indx]/1000, 
            "time_utc":time_utc,
            "open": df["open"][counter_indx],
            "high": df["high"][counter_indx], 
            "low": df["low"][counter_indx],
            "close": df["close"][counter_indx],
            "volume": df["volume"][counter_indx],
            "position":diff_position
        }

        if df['buy_signal'][counter_indx] == "buy" or df['sell_signal'][counter_indx] == "sell":
            processed_candlesticks.append(allcandlestick)
        # if type(df['buy_signal'][counter_indx]) == int or type(df['buy_signal'][counter_indx]):
        #     processed_candlesticks.append(allcandlestick)
        
        # if type(df['sell_signal'][counter_indx]) == int or type(df['sell_signal'][counter_indx]):
        #     processed_candlesticks.append(allcandlestick)
        # processed_candlesticks.append(allcandlestick)

        counter += 1

    return jsonify(processed_candlesticks)


def linreg_candles(df, signal_length=7, sma_signal=True, lin_reg=True, linreg_length=11):
    # Calculate the linear regression values for the OHLC data
    bopen = ta.LINEARREG(df['open'], linreg_length) if lin_reg else df['open']
    bhigh = ta.LINEARREG(df['high'], linreg_length) if lin_reg else df['high']
    blow = ta.LINEARREG(df['low'], linreg_length) if lin_reg else df['low']
    bclose = ta.LINEARREG(df['close'], linreg_length) if lin_reg else df['close']

    # Determine bullish/bearish candles based on open vs. close
    r = bopen < bclose

    # Calculate the signal line
    signal = ta.SMA(bclose, signal_length) if sma_signal else ta.EMA(bclose, signal_length)

    # Create a pandas DataFrame to hold the signals
    signals = pd.DataFrame(index=df.index)

    # Add the buy/sell signals to the DataFrame
    signals['buy_signal'] = (r) & (df['close'] > signal)
    signals['sell_signal'] = (~r) & (df['close'] < signal)

    df_signals = pd.DataFrame({'open': df['open'], 'high': df['high'], 'low': df['low'], 'close': df['close'], 'buy_signal': signals['buy_signal'], 'sell_signal': signals['sell_signal'], 'time':df['time'], 'volume':df['volume']})

    return df_signals

def linreg_candles_signal(dff):
    df = linreg_candles(dff)
    processed_candlesticks = []
    last_row_index = len(df.index)
    counter = 0

    # df = df[~df['buy_signal'].isnull()]
    # df = df[~df['sell_signal'].isnull()]

    markers_check_noise = ['null']

    while counter < last_row_index:
        
        counter_indx = df.index[counter]
        time_utc = pd.to_datetime(dff['time'][counter_indx], unit='ms')
        # if df['buy_signal'][counter_indx].isnull() or df['sell_signal'][counter_indx].isnull():
        #     counter += 1
        #     continue
        # friends = ["Kevin", "Karen", "Jim", "Sam", "John", "Mike"]
        # signalll = ["buy"]
        # numbers = [2, 4, 8, 10, 16, 20] 


        # signalll.pop()
        # signalll.insert(1, "sell")
        # print(signalll)
        # exit()

        diff_position = ""
        
        if df['buy_signal'][counter_indx] == True and df['sell_signal'][counter_indx]== False and markers_check_noise[0] != 'buy':
            diff_position = "buy"
            markers_check_noise.pop()
            markers_check_noise.insert(0, "buy")
        
        elif df['sell_signal'][counter_indx]== True and df['buy_signal'][counter_indx] == False and markers_check_noise[0] != 'sell':
            diff_position = "sell"
            markers_check_noise.pop()
            markers_check_noise.insert(0, "sell")

        allcandlestick = { 
            "time": df["time"][counter_indx]/1000, 
            "time_utc":time_utc,
            "open": df["open"][counter_indx],
            "high": df["high"][counter_indx], 
            "low": df["low"][counter_indx],
            "close": df["close"][counter_indx],
            "volume": df["volume"][counter_indx],
            "position":diff_position
        }


        if df['buy_signal'][counter_indx] == True and df['sell_signal'][counter_indx]== False and diff_position != '':
            processed_candlesticks.append(allcandlestick)
        
        elif df['sell_signal'][counter_indx]== True and df['buy_signal'][counter_indx] == False and diff_position != '':
            processed_candlesticks.append(allcandlestick)

        counter += 1

    return jsonify(processed_candlesticks)


def ut_bot_alerts(pd_data, sensitivity=2, atr_period=10):
    # Compute ATR And nLoss variable
    # pd_data["xATR"] = talib.ATR(pd_data["high"], pd_data["low"], pd_data["close"], timeperiod=atr_period)
    pd_data["xATR"] = TA.ATR(pd_data, period=atr_period)
    pd_data["nLoss"] = sensitivity * pd_data["xATR"]
    
    #Drop all rows that have nan, X first depending on the ATR preiod for the moving average
    pd_data = pd_data.dropna()
    pd_data = pd_data.reset_index()

    # print(pd_data)

    # Function to compute ATRTrailingStop
    def xATRTrailingStop_func(close, prev_close, prev_atr, nloss):
        if close > prev_atr and prev_close > prev_atr:
            return max(prev_atr, close - nloss)
        elif close < prev_atr and prev_close < prev_atr:
            return min(prev_atr, close + nloss)
        elif close > prev_atr:
            return close - nloss
        else:
            return close + nloss
    
    # Filling ATRTrailingStop Variable
    pd_data["ATRTrailingStop"] = [0.0] + [np.nan for i in range(len(pd_data) - 1)]
    
    for i in range(1, len(pd_data)):
        pd_data.loc[i, "ATRTrailingStop"] = xATRTrailingStop_func(
            pd_data.loc[i, "close"],
            pd_data.loc[i - 1, "close"],
            pd_data.loc[i - 1, "ATRTrailingStop"],
            pd_data.loc[i, "nLoss"],
        )


    # print(pd_data["ATRTrailingStop"])

    # Calculating signals
    ema = vbt.MA.run(pd_data["close"], 1, short_name='EMA', ewm=True)
    # ema = pd_data['close'].ewm(span=1, min_periods=1).mean()
    
    pd_data["Above"] = ema.ma_crossed_above(pd_data["ATRTrailingStop"])
    pd_data["Below"] = ema.ma_crossed_below(pd_data["ATRTrailingStop"])
    
    pd_data["buy_signal"] = (pd_data["close"] > pd_data["ATRTrailingStop"]) & (pd_data["Above"]==True)
    pd_data["sell_signal"] = (pd_data["close"] < pd_data["ATRTrailingStop"]) & (pd_data["Below"]==True)

    return pd_data

def ut_bot_alert_signal(dff, sentvt=2, atr=10):
    df = ut_bot_alerts(dff, sensitivity=sentvt, atr_period=atr)
    processed_candlesticks = []
    last_row_index = len(df.index)
    counter = 0

    # df = df[~df['buy_signal'].isnull()]
    # df = df[~df['sell_signal'].isnull()]

    markers_check_noise = ['null']

    while counter < last_row_index:
        
        counter_indx = df.index[counter]
        time_utc = pd.to_datetime(dff['time'][counter_indx], unit='ms')
        # if df['buy_signal'][counter_indx].isnull() or df['sell_signal'][counter_indx].isnull():
        #     counter += 1
        #     continue
        # friends = ["Kevin", "Karen", "Jim", "Sam", "John", "Mike"]
        # signalll = ["buy"]
        # numbers = [2, 4, 8, 10, 16, 20] 


        # signalll.pop()
        # signalll.insert(1, "sell")
        # print(signalll)
        # exit()

        diff_position = ""
        
        if df['buy_signal'][counter_indx] == True and df['sell_signal'][counter_indx]== False and markers_check_noise[0] != 'buy':
            diff_position = "buy"
            markers_check_noise.pop()
            markers_check_noise.insert(0, "buy")
        
        elif df['sell_signal'][counter_indx]== True and df['buy_signal'][counter_indx] == False and markers_check_noise[0] != 'sell':
            diff_position = "sell"
            markers_check_noise.pop()
            markers_check_noise.insert(0, "sell")

        allcandlestick = { 
            "time": df["time"][counter_indx]/1000, 
            "time_utc":time_utc,
            "open": df["open"][counter_indx],
            "high": df["high"][counter_indx], 
            "low": df["low"][counter_indx],
            "close": df["close"][counter_indx],
            "volume": df["volume"][counter_indx],
            "position":diff_position
        }


        if df['buy_signal'][counter_indx] == True and df['sell_signal'][counter_indx]== False and diff_position != '':
            processed_candlesticks.append(allcandlestick)
        
        elif df['sell_signal'][counter_indx]== True and df['buy_signal'][counter_indx] == False and diff_position != '':
            processed_candlesticks.append(allcandlestick)

        counter += 1

    return jsonify(processed_candlesticks)

