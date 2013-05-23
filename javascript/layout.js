var overButton = false;
var mouseDown = 0, mouseOverA = 0;

var mapExtents = [
	new esri.geometry.Extent(-10854681.128558887,4207974.977930898,-10853916.758275932,4208484.359064775, new esri.SpatialReference({ wkid:102100 })),
	new esri.geometry.Extent(-10853266.446371136,4208890.430777595,-10852502.07608818,4209399.811911472, new esri.SpatialReference({ wkid:102100 })), 
	 new esri.geometry.Extent(-10852979.354780743,4208819.210058172,-10852597.169639433,4209073.900624997, new esri.SpatialReference({ wkid:102100 })), 
	 new esri.geometry.Extent(-10856330.064647274,4207377.486476848,-10855565.694364319,4207886.867610725, new esri.SpatialReference({ wkid:102100 })),
	 new esri.geometry.Extent(-10859339.810599975,4205574.263920392,-10847109.886074364,4213055.538063793, new esri.SpatialReference({ wkid:102100 }))];

var extentTitles = [ 
	"Plaza Towers Elementary", 
	"Moore Medical Center", 
	"Bowling Alley", 
	"Briarwood Elementary",
	"Overview"
	];

var extentText = [
	"Plaza Towers Elementary School was one of two schools in the path of the tornado. Seven children died at Plaza Towers, which was flattened by the storm.",
	"Although the Moore Medical center was badly damaged in the tornado, none of the staff or patients at the facility were killed or injured.",
	"The roof of the Moore AMF Bowling Lanes was torn off by the storm. Photographers documented bowling pins standing in place despite the destruction.",
	"No deaths occurred at Briarwood, the second school destroyed by the tornado. Neither school had a reinforced storm shelter.",
	"The tornado that struck Moore, Oklahoma had peak winds of over 200 miles per hour. It was in contact with the ground for 50 minutes and traveled about 17 miles.<br /><br /><p style='font-family:Arial, Helvetica, sans-serif; font-size:10px'><strong>Sources:</strong> Left, <a style='color:#333; text-decoration:underline; font-weight:normal;' onMouseOver='overA()' onMouseOut='outA()' href='http://www.btls.us/' target='_blank'>Bearing Tree Land Surveying</a>; Right, Esri's <a style='color:#333; text-decoration:underline; font-weight:normal;' onMouseOver='overA()' onMouseOut='outA()' href='http://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9' target='_blank'>World Imagery</a> basemap</p>"];

var mapIndex = 0;


function overA(){
	mouseOverA = 1;
}

function outA(){
	mouseOverA = 0;
}

//Jquery Layout
$(window).resize(function(e) {
    $("#sliderdiv").css('height','100%');
});

$(document).ready(function(e) {
	$("#mapTitle").html(extentTitles[0]);
	$("#mapText").html(extentText[0]);
	$(document).mousedown(function(e) {
        mouseDown = 1;
    });
	$('#sliderdiv').mousedown(function(e) {
       mouseDown = 1;
    });
	$(document,"#sliderdiv").mouseup(function(e) {
        mouseDown = 0;
    });
	$("#map").mousemove(function(e) {
		if (iPad == false){
			if (mouseDown == 0 && mouseOverA == 0){
				if (e.pageX < 200){
					$("#prevImg").show();
				}
				else if (e.pageX > (($(document).width())-200) && mouseOverA == 0){
					$("#nextImg").show();
				}
				else{
					$("#prevImg").hide();
					$("#nextImg").hide();
				}
			}
		}
    });
	$("#map").mouseout(function(e) {
        $("#prevImg").hide();
       	$("#nextImg").hide();
    });
});

function setUpLocations(){
	for (i=0;i<mapExtents.length;i++){
		$("#links").append("<div id='nav"+(i)+"' class='links'><p class='navText'>"+(i+1)+"</p></div>");
	}
	$("#nav0").addClass('selected');
	$(".links").click(function(e) {
        $(".links").removeClass('selected');
		$(this).addClass('selected');
		mapIndex = $(this).attr('id').slice(3);
		map.setExtent(mapExtents[mapIndex]);
		$("#mapTitle").html(extentTitles[mapIndex]);
		$("#mapText").html(extentText[mapIndex]);
    });
    if(_embed){
      $(".links").css({
        "margin-left": 0,
        "margin-bottom": "20px"
      });
    }
}

function nextExtent(){
	++mapIndex;
	if (mapIndex == mapExtents.length){
		mapIndex = 0;
	}
	$(".links").removeClass('selected');
	$("#nav"+mapIndex).addClass('selected');
	map.setExtent(mapExtents[mapIndex]);
	$("#mapTitle").html(extentTitles[mapIndex]);
	$("#mapText").html(extentText[mapIndex]);
}

function prevExtent(){
	--mapIndex;
	if (mapIndex == -1){
		mapIndex = (mapExtents.length - 1);
	}
	$(".links").removeClass('selected');
	$("#nav"+mapIndex).addClass('selected');
	map.setExtent(mapExtents[mapIndex]);
	$("#mapTitle").html(extentTitles[mapIndex]);
	$("#mapText").html(extentText[mapIndex]);
}