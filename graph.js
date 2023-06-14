var GraphRenderer = (function() {
  function getMax(data) {
    return Math.max(...data);
}

  function calcY(dataPoint, maxValue, canvasHeight) {
    var yRatio = dataPoint / maxValue;
    return canvasHeight - (yRatio * canvasHeight);
  }

  function BarGraph(canvasId, data) {
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext("2d");

  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var maxValue = getMax(data);
  var barWidth = canvasWidth / data.length;

  for (var i = 0; i < data.length; i++) {
    var barHeight = calcY(data[i], maxValue, canvasHeight);

    context.fillStyle = "#" + Math.floor(Math.random() * 16777215).toString(16);
    context.fillRect(
      i * barWidth,
      canvasHeight - barHeight,
      barWidth,
      barHeight
    );

    context.strokeStyle = "black";
    context.strokeRect(
      i * barWidth,
      canvasHeight - barHeight,
      barWidth,
      barHeight
    );
  }
}

  function LineGraph(canvasId, data, color="#ff0000") {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d");

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var maxValue = getMax(data);
    var xInterval = canvasWidth / (data.length - 1);

    context.moveTo(0, canvasHeight);
    context.beginPath();

    for (var i = 0; i < data.length; i++) {
      var yCoordinate = calcY(data[i], maxValue, canvasHeight);
      var xCoordinate = i * xInterval;

      context.lineTo(xCoordinate, canvasHeight - yCoordinate);
    }

    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
  }

  function PieChart(canvasId, data) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d");

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var totalValue = data.reduce(function(acc, value) {
      return acc + value;
    }, 0);

    var startAngle = 0;

    for (var i = 0; i < data.length; i++) {
      var sliceAngle = (data[i] / totalValue) * 2 * Math.PI;

      context.beginPath();
      context.moveTo(canvasWidth / 2, canvasHeight / 2);
      context.arc(
        canvasWidth / 2,
        canvasHeight / 2,
        Math.min(canvasWidth, canvasHeight) / 2,
        startAngle,
        startAngle + sliceAngle
      );
      context.closePath();

      var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      context.fillStyle = randomColor;
      context.fill();

      startAngle += sliceAngle;
    }
  }
  function ScatterPlot(canvasId, data) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d");

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var maxValueX = getMax(data.map(function(point) {
      return point.x;
    }));
    var maxValueY = getMax(data.map(function(point) {
      return point.y;
    }));

    for (var i = 0; i < data.length; i++) {
      var point = data[i];
      var xCoordinate = (point.x / maxValueX) * canvasWidth;
      var yCoordinate = canvasHeight - (point.y / maxValueY) * canvasHeight;

      context.fillStyle = "green";
      context.beginPath();
      context.arc(xCoordinate, yCoordinate, 5, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
    }
  }

  function AreaChart(canvasId, data) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d");

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var maxValue = getMax(data);
    var xInterval = canvasWidth / (data.length - 1);

    context.beginPath();
    context.moveTo(0, canvasHeight);

    for (var i = 0; i < data.length; i++) {
      var yCoordinate = calcY(data[i], maxValue, canvasHeight);
      var xCoordinate = i * xInterval;

      context.lineTo(xCoordinate, canvasHeight - yCoordinate);
    }

    context.lineTo((data.length - 1) * xInterval, canvasHeight);
    context.closePath();

    var gradient = context.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, "rgba(255, 0, 0, 0.3)");
    gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    context.fillStyle = gradient;
    context.fill();
  }


  return {
    BarGraph: BarGraph,
    LineGraph: LineGraph,
    PieChart: PieChart,
    AreaChart: AreaChart,
    ScatterPlot: ScatterPlot
  };
})();
