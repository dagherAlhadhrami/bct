let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

let price_container = document.getElementById("current-price");
let amount_buy_container = document.getElementById("buy-amount");
let amount_sell_container = document.getElementById("sell-amount");
let delta_container = document.getElementById("delta-amount");



lastPrice = 0.0

let amountBuy = 0.0;
let amountSell = 0.0;

ws.onmessage = (event) => {
  let stockobject = JSON.parse(event.data);
  let price = parseFloat(stockobject.p).toFixed(2)
  price_container.innerText = "$" + price;
  price_container.style.color = price === lastPrice ? 'black' : price > lastPrice ? 'green' : 'red';
  lastPrice = price;

  if (String(stockobject.m) === 'true') {
    amountSell = amountSell + parseFloat(stockobject.q);
  } else if (String(stockobject.m) === 'false') {
    amountBuy = amountBuy + parseFloat(stockobject.q);
  }

  amount_buy_container.innerText = amountBuy.toFixed(5) + ' BTC';
  amount_sell_container.innerText = amountSell.toFixed(5) + ' BTC';
  let differnce = (amountBuy - amountSell).toFixed(5);
  delta_container.innerText = differnce + ' BTC'
  delta_container.style.color = differnce === 0.0 ? 'black' : differnce > 0 ? 'green' : 'red';
}

