
function startExampleEight() {

var width = 960,
    height = 500;

  var flags = [{},
              {'name': 'Johor', 'img': "img/malaysia/Flag_of_Johor.svg"},
              {'name': 'Kedah', 'img': "img/malaysia/Flag_of_Kedah.svg"},
              {'name': 'Kelantan', 'img': "img/malaysia/Flag_of_Kelantan.svg"},
              {'name': 'Kuala Lumpur', 'img': "img/malaysia/Flag_of_Kuala_Lumpur%2C_Malaysia.svg"},
              {'name': 'Labuan', 'img': "img/malaysia/Flag_of_the_Federal_Territories_of_Malaysia.svg"},
              {'name': 'Melaka', 'img': "img/malaysia/Flag_of_Malacca.svg"},
              {'name': 'Negeri Sembilan', 'img': "img/malaysia/Flag_of_Negeri_Sembilan.svg"},
              {'name': 'Pahang', 'img': "img/malaysia/Flag_of_Pahang.svg"},
              {'name': 'Perak', 'img': "img/malaysia/Flag_of_Perak.svg"},
              {'name': 'Perlis', 'img': "img/malaysia/Flag_of_Perlis.svg"},
              {'name': 'Pulau Pinang', 'img': "img/malaysia/Flag_of_Penang_%28Malaysia%29.svg"},
              {'name': 'Putrajaya', 'img': "img/malaysia/Flag_of_Putrajaya.svg"},
              {'name': 'Sabah', 'img': "img/malaysia/Flag_of_Sabah.svg"},
              {'name': 'Sarawak', 'img': "img/malaysia/Flag_of_Sarawak.svg"},
              {'name': 'Selangor', 'img': "img/malaysia/Flag_of_Selangor.svg"},
              {'name': 'Terengganu', 'img': "img/malaysia/Flag_of_Terengganu.svg"},
            ]

var projection = d3.geoMercatorMalaysia();
var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("#exampleEightPlaceholder").append("svg")
    .attr("width", width)
    .attr("height", height);

    var t = d3.transition();
d3.json("malaysia.json", function(error, malaysia) {
  var states = topojson.feature(malaysia, malaysia.objects.states);
  var land = topojson.feature(malaysia, malaysia.objects.land);
  svg.selectAll(".land")
      .data(land.features)
      .enter()
      .append("path")
      .attr("class", "land")
      .attr("d", path)
      .style("fill", "#aca")
      .style("stroke", "#000")
      .style("stroke-width", "1px");

  var statesEnter = svg.selectAll(".state")
    .data(states.features)
    .enter();

  statesEnter.append("clipPath")
    .attr("class","mask")
    .attr("id",function(d){return "clip"+d.properties.id;})
    .append("path")
    .attr("d",path);

  statesEnter.append("image")
      .attr("xlink:href",function(d){return flags[d.properties.id].img;})
      .attr("x", function(d){return path.bounds(d)[0][0];})
      .attr("y", function(d){return path.bounds(d)[0][1];})
      .attr("width", function(d){var bounds = path.bounds(d); return bounds[1][0] - bounds[0][0];})
      .attr("height", function(d){var bounds = path.bounds(d); return bounds[1][1] - bounds[0][1];})
      .attr("preserveAspectRatio","none")
      .attr("clip-path", function(d){return "url(#clip"+d.properties.id+")";});

  statesEnter.append("path")
    .attr("class", "states")
    .attr("d", path)
    .style("stroke", "#000")
    .style("fill", "none")
    .style("stroke-width", "1px")
    ;
  svg
    .append("path")
      .style("fill","none")
      .style("stroke","#000")
      .attr("d", projection.getCompositionBorders());

});

}

function stopExampleEight() {
  d3.select("#exampleEightPlaceholder").selectAll("*").remove();
}
