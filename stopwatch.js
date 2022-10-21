export { Stopwatch };

function Stopwatch() {
  let startTime,
    endTime,
    duration = 0;
  let running = false;

  this.start = function () {
    if (running) {
      throw new Error("already running");
    }
    running = true;
    console.log("sw start")
    startTime = new Date();
  };

  this.stop = function () {
    if (!running) {
      throw new Error("not running");
    }
    running = false;
    endTime = new Date();
    const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    duration += seconds;
  };

  this.reset = function () {
    let startTime,
      endTime,
      duration = 0;
    let running = false;
  };

  Object.defineProperty(this, "duration", {
    get: function () {
      return duration;
    },
  });
}