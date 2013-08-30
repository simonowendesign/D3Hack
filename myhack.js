var pointsToReturn = 1;

var fullDataSet = dataset.data.map(function(x){
  return { date: d3.time.format("%x").parse(x.date), price: x.price, adjustedPrice: x.adjustedPrice};
});

function getDataSlice() {
  var slicedArray = fullDataSet.slice(0,pointsToReturn);
  pointsToReturn++;
  if (pointsToReturn > 148) {
    pointsToReturn = 1;
  }
  return slicedArray;
}

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.price); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(d3.extent(fullDataSet, function(d) { return d.date; }));
y.domain(d3.extent(fullDataSet, function(d) { return d.price; }));

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Price ($)");

function drawGraph(data) {
  
  svg.selectAll("path").data(data).exit().remove()
  
  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .transition()
      .ease("linear")
      .duration(150)
}

setInterval(function() {
   drawGraph(getDataSlice())
 }, 150);
