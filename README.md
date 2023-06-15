# graph.js


Graph.js is a JavaScript Library that allows you to statically add data displays to your webpages. You can use the following:
  - bar graph
  - Pie chart
  - Line graph
  - Scatter plot
  - Area chart


### Usage
The following are input examples: (JavaScript)</p>
    <i>Bar graph, line graph, pie chart, area chart</i>

  `js
  var data = [10, 20, 30, 40, 50, 30, 50, 12, 35];
    GraphRenderer.BarGraph("canvasID", data);
   `
    <br>
    <br>
    <i>Scatter plot</i>
    <br>
    <br>
    ```js
      var Data = [
      { x: 0, y: 0},
      { x: 10, y: 20 },
      { x: 20, y: 30 },
      { x: 30, y: 40 },
      { x: 40, y: 50 },
      { x: 50, y: 60 }
    ];
    GraphRenderer.ScatterPlot("CanvasID", Data);
    ```
