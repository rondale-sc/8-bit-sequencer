const DEFAULT_INTERVAL = 100;
let interval;
let intervalId;

function tick(interval=DEFAULT_INTERVAL) {
  return setInterval(() => {
    postMessage({event: 'tick'});
  }, interval);
}

self.onmessage = function({data: { event, interval }}) {
  if (event === "start") {
    console.log('starting interval');
    intervalId = tick();
  } else if (event === 'interval') {
    console.log('setting interval');
    interval = interval;
    console.log("interval="+interval);
    if (intervalId) {
      clearInterval(intervalId);
      timerID=tick(interval);
    }
  } else if (event === 'stop') {
    console.log("stoping");
    clearInterval(intervalId);
    intervalId=null;
  }
}
