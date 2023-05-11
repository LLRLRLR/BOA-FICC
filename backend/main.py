# import pandas as pd
# import json
# import re

# json_file_path_events = '/home/coga/Desktop/BOA/FICC-code_to_connect/FICC-code_to_connect_final_data_set/events.json'
# with open(json_file_path_events, 'r') as j:
#     content_events = json.loads(j.read())


# json_file_path_input = '/home/coga/Desktop/BOA/FICC-code_to_connect/FICC-code_to_connect_final_data_set/input.json'
# with open(json_file_path_input, 'r') as c:
#     content_input = json.loads(c.read())


# def variance_netposition_rate(event_id: int, tenor: str, content_events, ccy: str):
#     m, b, divisor_ratio, net_position, rate, spread = None, None, None, 0, None, None
#     content_filtered = content_events[:event_id]
#     for i in range(len(content_filtered)):
#         if content_filtered[i].get('EventType') == 'ConfigEvent':
#             m = content_filtered[i]['m']
#             b = content_filtered[i]['b']
#             divisor_ratio = content_filtered[i]['DivisorRatio']
#             spread = content_filtered[i]['Spread']

#         elif (content_filtered[i].get('Tenor') == tenor) and (content_filtered[i].get('EventType') == 'TradeEvent') and (content_filtered[i].get('Ccy') == ccy):
#             if content_filtered[i].get('BuySell') == 'buy':
#                 net_position += content_filtered[i]['Quantity']
#             elif content_filtered[i].get('BuySell') == 'sell':
#                 net_position -= content_filtered[i]['Quantity']

#         elif content_filtered[i].get('EventType') == 'FXMidEvent':
#             rate = content_filtered[i]['rate']

#     return net_position, m, b, divisor_ratio, rate, spread


# def skew_func(m: float, tenor: int, b: float, divisor_ratio: int, net_position: int) -> float:
#     x = tenor*30
#     variance = m * x + b
#     skew = net_position/divisor_ratio * variance
#     return skew


# def bid_func(new_mid: float, spread: int) -> float:
#     bid = new_mid - (0.5*spread/10000)
#     return round(bid, 4)


# def ask_func(new_mid: float, spread: int) -> float:
#     ask = new_mid + (0.5*spread/10000)
#     return round(ask, 4)


# def check_variance(bid, ask, rate):
#     if (bid < rate * 0.9) or (bid > rate * 1.1):
#         return 'NON-TRADABLE'
#     elif (ask < rate * 0.9) or (ask > rate * 1.1):
#         return 'NON-TRADABLE'
#     return 'TRADABLE'


# def preprocess(content_input: json, content_events: json):
#     for j in range(len(content_input)):
#         tenor_string = content_input[j]['Tenor']
#         tenor = int(tenor_string[:-1])
#         ccy = content_input[j]['Ccy']
#         event_id = content_input[j]['EventId']

#         net_position, m, b, divisor_ratio, rate, spread = variance_netposition_rate(
#             event_id, tenor_string, content_events, ccy)
#         if net_position is None or rate is None or spread is None:
#             bid = ask = 'NA'  # Initialize to default value
#             quote_status = 'EXCEPTION'  # Initialize to default value
#             skew, new_mid = 0, 0
#         else:
#             skew = skew_func(m, tenor, b, divisor_ratio, net_position)
#             new_mid = rate - skew
#             bid = bid_func(new_mid, spread)
#             ask = ask_func(new_mid, spread)
#             quote_status = check_variance(bid, ask, rate)

#         data = {
#             "EventId": int(event_id),
#             "Ccy": ccy,
#             "Tenor": tenor_string,
#             "Position": net_position,
#             "Bid": bid,
#             "Ask": ask,
#             "QuoteStatus": quote_status
#         }


# preprocess(content_input, content_events)


from flask import Flask, request, jsonify
import pandas as pd
import json
import re

app = Flask(__name__)

content_events = []
content_input = []


@app.route('/load_json', methods=['POST'])
def load_json():
    global content_events, content_input
    json_data = request.get_json()
    content_events = json_data['events']
    content_input = json_data['input']
    return jsonify({'message': 'JSON data loaded successfully.'}), 200


@app.route('/process', methods=['GET'])
def preprocess():
    data = []
    for j in range(len(content_input)):
        tenor_string = content_input[j]['Tenor']
        tenor = int(tenor_string[:-1])
        ccy = content_input[j]['Ccy']
        event_id = content_input[j]['EventId']

        net_position, m, b, divisor_ratio, rate, spread = variance_netposition_rate(
            event_id, tenor_string, content_events, ccy)
        if net_position is None or rate is None or spread is None:
            bid = ask = 'NA'  # Initialize to default value
            quote_status = 'EXCEPTION'  # Initialize to default value
            skew, new_mid = 0, 0
        else:
            skew = skew_func(m, tenor, b, divisor_ratio, net_position)
            new_mid = rate - skew
            bid = bid_func(new_mid, spread)
            ask = ask_func(new_mid, spread)
            quote_status = check_variance(bid, ask, rate)

        data.append({
            "EventId": int(event_id),
            "Ccy": ccy,
            "Tenor": tenor_string,
            "Position": net_position,
            "Bid": bid,
            "Ask": ask,
            "QuoteStatus": quote_status
        })
    print('Data to be returned from /process: ', data)
    return jsonify(data), 200


def variance_netposition_rate(event_id: int, tenor: str, content_events, ccy: str):
    m, b, divisor_ratio, net_position, rate, spread = None, None, None, 0, None, None
    content_filtered = content_events[:event_id]
    for i in range(len(content_filtered)):
        if content_filtered[i].get('EventType') == 'ConfigEvent':
            m = content_filtered[i]['m']
            b = content_filtered[i]['b']
            divisor_ratio = content_filtered[i]['DivisorRatio']
            spread = content_filtered[i]['Spread']

        elif (content_filtered[i].get('Tenor') == tenor) and (content_filtered[i].get('EventType') == 'TradeEvent') and (content_filtered[i].get('Ccy') == ccy):
            if content_filtered[i].get('BuySell') == 'buy':
                net_position += content_filtered[i]['Quantity']
            elif content_filtered[i].get('BuySell') == 'sell':
                net_position -= content_filtered[i]['Quantity']

        elif content_filtered[i].get('EventType') == 'FXMidEvent':
            rate = content_filtered[i]['rate']

    return net_position, m, b, divisor_ratio, rate, spread


def skew_func(m: float, tenor: int, b: float, divisor_ratio: int, net_position: int) -> float:
    x = tenor*30
    variance = m * x + b
    skew = net_position/divisor_ratio * variance
    return skew


def bid_func(new_mid: float, spread: int) -> float:
    bid = new_mid - (0.5*spread/10000)
    return round(bid, 4)


def ask_func(new_mid: float, spread: int) -> float:
    ask = new_mid + (0.5*spread/10000)
    return round(ask, 4)


def check_variance(bid, ask, rate):
    if (bid < rate * 0.9) or (bid > rate * 1.1):
        return 'NON-TRADABLE'
    elif (ask < rate * 0.9) or (ask > rate * 1.1):
        return 'NON-TRADABLE'
    return 'TRADABLE'


if __name__ == '__main__':
    app.run(debug=True)
