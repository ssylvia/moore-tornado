var overButton = false;
var mouseDown = 0, mouseOverA = 0;

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