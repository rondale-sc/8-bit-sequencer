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
    interval = interval;
    console.log("interval="+interval);
    console.log(`clearing=${intervalId}`);
    if (intervalId) {
      clearInterval(intervalId);
      intervalId=tick(interval);
    }
  } else if (event === 'stop') {
    console.log("stoping");
    clearInterval(intervalId);
    intervalId=null;
  }
}
