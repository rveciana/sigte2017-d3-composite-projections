
function startExampleOne() {
  d3.json("resultsOne.json", function(error, data) {

    var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

    var svg = d3.select("#exampleOnePlaceholder").append("svg")
    .attr("width", 960)
    .attr("height", 500);

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d, i){return i*40;})
      .attr("width", 35)
      .attr("height", function(d){return d.result;})
      .attr("fill", function(d, i){return colorScale(i);});

  });

}


function startExampleTwo() {
  d3.json("resultsTwo.json", function(error, data) {

    var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

    var svg = d3.select("#exampleTwoPlaceholder").append("svg")
    .attr("width", 960)
    .attr("height", 500);

    draw(data[0]);

    d3.select("#exampleTwoForm").selectAll("input").on("change", function(){
        draw(data[this.value]);
    });




    function draw(data){
      var selection = svg.selectAll("g")
        .data(data.results, function(d) {return d.name;});

      //ENTER
      var teamEnter = selection
        .enter()
        .append("g")
        .attr("transform", function(d, i){return "translate("+i*40+", 0)";});

      teamEnter.append("rect")
        .attr("width", 35)
        .attr("height", function(d){return 2*d.result;})
        .attr("fill", function(d, i){return colorScale(i);});

      teamEnter.append("svg:image")
         .attr('x', 0)
         .attr('y', function(d){return  5 + 2*d.result;})
         .attr('width', 35)
         .attr('height', 35)
         .attr("xlink:href", function(d){return d.logo});

     //UPDATE
     var teamUpdate = selection
       .transition()
       .duration(1500)
       .attr("transform", function(d, i){return "translate("+i*40+", 0)";});

       teamUpdate.select("rect")
         .attr("height", function(d){return 2*d.result;});

       teamUpdate.select("image")
         .attr('y', function(d){return  5 + 2*d.result;});

      //EXIT
      selection
        .exit()
        .attr("opacity", 1)
        .transition()
        .duration(1500)
        .attr("opacity", 0)
        .remove();

     }

  });
}

function startExampleThree() {
  var width = 900;
  var height = 500;
  var maxRadius = height*0.1;
  var padding = 1.5;

  var svg = d3.select("#exampleThreePlaceholder").append("svg")
      .attr("width", width)
      .attr("height", height);

  d3.json("resultsThree.json", function(error, data) {


   var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

   var nodes = data.map(function(d, i){
     d['color'] = colorScale(i);
     d['radius'] =10*Math.sqrt(d.result/Math.PI);
     d['cx'] = i*30;
     d['cy'] = 200 + 200*(i%2) ;
     return d;
   });

  var circles = svg.selectAll("circle")
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', function(d){return d.radius;})
    .attr('cx', function(d){return d.cx;})
    .attr('cy', function(d){return d.cy;})
    .attr('fill',function(d){return d.color;})
    .attr('stroke', 'black')
    .attr('stroke-width', 1);

    circles
      .append("title")
      .text(function(d){return d.name;});

    circles
    .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));




      var simulation = d3.forceSimulation(nodes)
          .velocityDecay(0.4)
          .force("collide", d3.forceCollide(function(d){return d.radius+2;}))
          .force("x", d3.forceX(width/2))
          .force("y", d3.forceY(height/2))
          .force("manyBody",d3.forceManyBody().strength(function(d){return d.radius+3;}))

          .on("tick", ticked);

      function ticked() {

          circles
              .attr('cx', function(d){return Math.min(Math.max(d.vx + d.x, d.radius/2), width-d.radius/2);})
              .attr('cy', function(d){return Math.min(Math.max(d.vy + d.y, d.radius/2), height-d.radius/2);});
      }

      function dragstarted(d) {
         d.fx = d.x;
         d.fy = d.y;
       }

       function dragged(d) {
         d.fx = d3.event.x;
         d.fy = d3.event.y;
       }

       function dragended(d) {
         d.fx = null;
         d.fy = null;
       }

  });

}

function startExampleFour() {
  var width = 960;
  var height = 500;
  var radius = 240;

  d3.json("resultsFour.json", function(error, data) {

    var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

    var svg = d3.select("#exampleFourPlaceholder").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");

    var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius/4);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.result; })
        .startAngle(-1*Math.PI/2)
        .endAngle(Math.PI/2);

    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) { return colorScale(i); });

    g.append("rect")
      .attr("height", 15)
      .attr("width", 15)
      .attr("x", radius)
      .attr("y", function(d, i) {return -radius + i * 18;})
      .style("fill", function(d, i) { return colorScale(i); });

    g.append("text")
       .attr("class", "label")
       .attr("dy", ".9em")
       .attr("x", radius + 20)
       .attr("y", function(d, i) { return -radius + i * 18;})
       .attr("font-size", "12px")
       .text( function(d) { return d.data.name; })
  });

}

function startExampleFive() {
  var width = 960;
  var height = 500;
  var svg = d3.select("#exampleFivePlaceholder").append("svg")
  .attr("width", width)
  .attr("height", height);

  var projection = d3.geoConicConformal()
                  .rotate([5, -38.6])
                  .parallels([0,60])
                  .scale(2700);

  var path = d3.geoPath()
      .projection(projection);

  var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

  d3.json("resultsFive.json", function(error, data) {
    d3.json("ccaa.json", function(error, ccaa) {

      svg.selectAll(".ccaa")
        .data(ccaa.features)
        .enter()
        .append("path")
        .attr("class", "region")
        .attr("d", path)
        .style("fill", function(d, i){return colorScale(i);})
        .style("stroke", "#000")
        .style("fill-opacity", 0.15);


      svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr('r', function(d){ return Math.sqrt(d.result);})
        .attr('cx', function(d){return projection(d.coords)[0];})
        .attr('cy', function(d){return projection(d.coords)[1];})
        .attr('fill',function(d, i){return colorScale(i);})
        .attr('stroke', 'black')
        .attr('stroke-width', 1);


  });
  });
}

function startExampleSix() {

  var width = 960;
  var height = 500;
  var svg = d3.select("#exampleSixPlaceholder").append("svg")
  .attr("width", width)
  .attr("height", height);

  var projection = d3.geoConicConformalSpain();

  var path = d3.geoPath()
      .projection(projection);

  var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

  d3.json("resultsFive.json", function(error, data) {
    d3.json("ccaa.json", function(error, ccaa) {

      svg.selectAll(".ccaa")
        .data(ccaa.features)
        .enter()
        .append("path")
        .attr("class", "region")
        .attr("d", path)
        .style("fill", function(d, i){return colorScale(i);})
        .style("stroke", "#000")
        .style("fill-opacity", 0.15);

      svg
        .append("path")
        .style("fill","none")
        .style("stroke","#000")
        .attr("d", projection.getCompositionBorders());

      svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr('r', function(d){ return Math.sqrt(d.result);})
        .attr('cx', function(d){return projection(d.coords)[0];})
        .attr('cy', function(d){return projection(d.coords)[1];})
        .attr('fill',function(d, i){return colorScale(i);})
        .attr('stroke', 'black')
        .attr('stroke-width', 1);


  });
  });

}


function stopExampleOne() {
  d3.select("#exampleOnePlaceholder").selectAll("*").remove();
}

function stopExampleTwo() {
  d3.select("#exampleTwoPlaceholder").selectAll("*").remove();
}

function stopExampleThree() {
  d3.select("#exampleThreePlaceholder").selectAll("*").remove();
}

function stopExampleFour() {
  d3.select("#exampleFourPlaceholder").selectAll("*").remove();
}

function stopExampleFive() {
  d3.select("#exampleFivePlaceholder").selectAll("*").remove();
}

function stopExampleSix() {
  d3.select("#exampleSixPlaceholder").selectAll("*").remove();
}
