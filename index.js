/* 
		In my analysis function, for each of the pages being loaded up, I am trying to pull up the relevant csv data
		to put on the new page relevant data and text.
	*/
	
	function analysis(page){
        
    	if(page=="PERSEV"){
 	       	header = "How Well Are Students Persevering in School For Each Country?";
 	       	csv_sheet = "CSV/pisa2012_PERSEV.csv";
 	       	y_axis = "PERSEV";
 	       	y_descript = "Average Students' Perseverance Weighted Score";
 	       	color = "blue";
	    }
        
 	   else if(page=="STUDREL"){
  	      	header = "How Well is the Relationship Between Students and Teachers For Each Country?";
  	      	csv_sheet = "CSV/pisa2012_STUDREL.csv";
  	      	y_axis = "STUDREL";
		  	y_descript = "Average Student to Teacher Relationship Weighted Score";
		  	color = "blue";
    	}
    	
	   else if(page=="BELONG"){
			header = "How Well do Students Feel They Belong in School For Each Country?";
			csv_sheet = "CSV/pisa2012_BELONG.csv";
   		 	y_axis = "BELONG";
   		 	y_descript = "Average Students' Feeling of Belongingness (in Weighted Score)";
   		 	color = "red";
  		}
  		
		else if(page=="D"){
	        header = "How Are Students' Behavior in the Classrooms in Each Country?";
  		    csv_sheet = "CSV/pisa2012_DC.csv";
  		    y_axis = "Climate";
  		    y_descript = "Average Students' Maturity of The Classroom";
  		    color = "blue";
    	}
    	
    	else if(page=="ESCS"){
        	header = "How is The Overall Status (Economically, Socially, and Culturally) of Each Country Different ?";
        	csv_sheet = "CSV/pisa2012_ESCS.csv";
        	y_axis = "ESCS";
        	y_descript = "Countries' Overall Status (Scaled from Poor to Stable)";
        	color = "blue";
    	}
            
        
    	if (page != "Con"){  
        	display_analysis(page, header, csv_sheet, y_axis, y_descript, color)
    	}
    	else if (page == "Con"){
        	d3.select("h2").text("Conclusion");
        	myComments(page, d3);
    	}
    	
	}

	/*
		In the display_analysis function, I am displaying the line plots using dimple.js; of the relevant information the user chose
	*/
      
	function display_analysis(page, header, csv_sheet, y_axis, y_descript, color){
      
        d3.select("h2").text(header);
                    
        var svg = dimple.newSvg("#canvas-svg2", 800, 500);
        d3.csv(csv_sheet, function (data) {
            var myChart = new dimple.chart(svg, data);
            myChart.setBounds(60, 20, 700, 350);
            var x = myChart.addCategoryAxis("x", "Countries");
            x.addOrderRule("Ranking");
            x.title = "<-- Best Performing Countries -------- to -------- Worse Performing Countries -->";
            var y = myChart.addMeasureAxis("y", y_axis);
            y.title = y_descript;
            y.tickFormat = ',.3f';
            var s = myChart.addSeries(null, dimple.plot.line);
            s.lineMarkers = true;
            d3.select("h5").text(null);

            svg.append("text")
            	.attr("x",100)
            	.attr('y',15)
            	.style("font-size", "12px")
            	.text("Please hover over a plot to view Country's Data");

            myChart.assignColor("All", color);
            myChart.draw();
            myComments(page, d3);
        });
	}

	/*
		This myComments() function displays my thoughts on each page
	*/
	
	function myComments(page, d3){
        if(page=="PERSEV"){
            d3.select("p").text("My thoughts: Probable But With Questions. " + 
            " From the Chart, it appears the Students' academic perseverance increases as the trend goes towards lower performing countries. " +
             "I suppose the reason that poorer performing countries have more persevering students is because " +
             "they will tend to struggle so therefore they will persevere more. ");
        }
        else if(page=="STUDREL"){
            d3.select("p").text("My thoughts: Probable But With Questions. " + 
            " From the Chart, it appears the Students' relationship between them and the teacher increases as the trend goes towards lower performing countries. " +
             "I suppose the reason is because poorer performing countries have students struggle most of the time and will thus " +
             "seek more support from teachers. " +
             "I would expect better performing countries would have a higher student/teacher relationship");
        }
        else if(page=="BELONG"){
            d3.select("p").text("My thoughts: Inconclusive. " +  
            "It doesn't seem the average performance for each country is based upon how students feel " +  
            "they belong in school.");
        }
        else if(page=="D"){
            d3.select("p").text("My thoughts: Probable.  As the countries' average performance " + 
            "decreases, the more unbehaved the students will tend to be. " +  
            "There is however, one outlier exception at Kazakhstan. ");  
        }
        else if(page=="ESCS"){
            d3.select("p").text("My thoughts: Probable.  The worst off a countries' economic, " +  
            "social, or cultural status; the more lower the countries' average " +  
            "performance will be.  There are a couple of outliers however at " +
            "Vietnam and Qatar. ");  
        }
        else if(page=="Con"){
            d3.select("#canvas-svg2").append("p").text("From my five potential reasons why certain " +  
            "countries' average PISA performance scores vary, I will say that the " +  
            "students' behaviors, and economic/social/cultural status " +  
            "are main indicators of how students perform.  Probably the reason is that " +
            "being in poverty, there's lack of access to good quality education," +
            "internet/computers/telecommunications, inability to hire good teachers, " +
            "transportation, etc.  And poverty is also the likely contributor to students unbehaving " +
            "and thus leading to difficulties to obtain a good education.");     
        }
	};

/*
	This draw() function draws the map of the world and will color fill each of the countries.
*/

	function draw(geo_data) {
    	var countries = [];
        var mathsranks = {};
        var readingranks = {};
        var scienceranks = {};
        var totalranks = {};    
        var svg = d3.select("#canvas-svg")
            .append("svg")
            .append('g')
            .attr('class', "countries-choropleth")
            .style('fill',"#66FFFF");
         
         /* 
         The "map" variable...
         	1. Takes the json data and "draws" the map of the world
         	2. Adds a feature to the svg to allow users to hover the mouse over the relevant countries to
         		display certain information.
         */
         var projection = d3.geo.mercator()
            .scale(140)
            .translate([400, 300]);
                               
         var path = d3.geo.path().projection(projection);
         
         var map = svg.selectAll('path')
            .data(geo_data.features)
            .enter()
            .append('path')
            .attr('d', path)
            .style('stroke', 'black')
            .style('stroke-width', 0.5)
            .on("mousemove",hoverPopUp)
            .on("mouseout",hoverOut);
            
         /*
         This d3 function gets data of the countries' average scores I calculated and put them in a list to use
         */            
         
         d3.csv("pisa2012_country_avgs.csv", function(d) {
			d['country'] = +d['CNT'];
            d['total'] = +d['total'];
            d['math'] = +d['math'];
            d['reading'] = +d['reading'];
            d['science'] = +d['science'];
            d['ranking'] = +d['ranking'];
            return d;
        	}, plot_points);
                
        create_legend(svg);
        
		/*
		This "create_legend" function creates the legend of the countries that are...
		
		1. Top performing 25%
		2. In Between
		3. Bottom performing 25%
		
		and identifies the relevant countries in a certain color.
		*/
		
        function create_legend(svg){

        	var legendWidth  = 450,
      			legendHeight = 100;

        	var legend = svg.append('g')
        		.attr('class', 'legend')
        		.attr('transform', 'translate( 270 , 400 )');

        	legend.append('rect')
        		.attr('class', 'legend-bg')
        		.attr('width', legendWidth)
        		.attr('height', legendHeight);

        	 legend.append('rect')
    			.attr('class', 'top')
    			.style('fill', "#003300")
   				.attr('width',  75)
  				.attr('height', 20)
  				.attr('x', 10)
  				.attr('y', 10);

  			legend.append('text')
    			.attr('x', 115)
    			.attr('y', 25)
    			.text('Highest Performing Ranked Country (China)');

  			legend.append('rect')
    			.attr('class', 'middle')
    			.style('fill', "#CCFF99")
    			.attr('width',  75)
    			.attr('height', 20)
    			.attr('x', 10)
    			.attr('y', 40);

  			legend.append('text')
    			.attr('x', 115)
    			.attr('y', 55)
    			.text('Lowest Performing Ranked Country (Peru)');

    		legend.append('rect')
    			.attr('class', 'bottom')
    			.style('fill', 'white')
                .style('stroke', 'black')
                .style('stroke-width', 0.5)
    			.attr('width',  75)
    			.attr('height', 20)
    			.attr('x', 10)
    			.attr('y', 70);

  			legend.append('text')
    			.attr('x', 115)
    			.attr('y', 85)
    			.text('Country With No PISA Data Available');
        }
       
       /*
       	The plot_points function pushes the data from the csv files... and into a list.
       	And then runs the world_map_page function to identify the countries of a certain 'ranking' number
       	and returns a certain color for that particular country to be in that color.
       	
       	Also displays other information such as title.
       */   
             
       function plot_points(data) {
         
    		var colour = 'white';
         
         	data.forEach(function(d) {
             	countries.push(d['CNT']);
             	mathsranks[d['CNT']] = d['math'];
             	readingranks[d['CNT']] = d['reading'];
             	scienceranks[d['CNT']] = d['science'];
             	totalranks[d['CNT']] = d['total'];
        	});
         
         	world_map_page(data)
         
    		function world_map_page(data){
        		d3.select('svg').style('border-color', 'black');
        		d3.select("h1").text("2012 PISA PERFORMING COUNTRIES");
        		d3.select("h4").text(null);
        		svg.selectAll('path').style('fill', fill_color);
        	}
        	
        	function fill_color(d){
                var color_of_cnt = {};
         		var cindex = countries.indexOf(d.properties.name);         
            		if( cindex !== -1) {
                        return d3.interpolateRgb("#003300", "#CCFF99")(data[cindex]['ranking']/60);
                    }

                    else{
            		  return 'white';
                    }
            }
    	}
    
    /*
    The hoverPopUp() function displays the countries' relevant information when user hovers mouse over.
    And also color fills the textbox as it pops up.
    And last this function calls the hoverOut() function to remove the information.
    */
    
		function hoverPopUp(d){
            
        	var cnt = d.properties.name;
            
        	var html = "";
        
        	if (fill_color(d) !== 'white'){
          		html += "<div class=\"tooltip_kv\">";
            	html += "<span class=\"tooltip_key\">";
            	html += cnt;
            	html += "</span>";
            	html += "<span class=\"tooltip_value\">";
            	html += "</br>";
            	html += "Math Average: ";
            	html += mathsranks[cnt];
            	html += "";
            	html += "</br>";
            	html += "Science Average: ";
            	html += scienceranks[cnt];
            	html += "";
            	html += "</br>";
            	html += "Reading Average: ";
            	html += readingranks[cnt];
            	html += "";
            	html += "</br>";
            	html += "Total Average: ";
            	html += totalranks[cnt];
            	html += "";
            	html += "</span>";
            	html += "</div>";
        	}
        	
        	else{
            	html += "<div class=\"tooltip_kv\">";
            	html += "<span class=\"tooltip_key\">";
            	html += cnt;
            	html += "</span>";
            	html += "<span class=\"tooltip_value\">";
            	html += "</br>";
            	html += "Math Average: ";
            	html += "N/A";
            	html += "";
            	html += "</br>";
            	html += "Science Average: ";
            	html += "N/A";
            	html += "";
            	html += "</br>";
            	html += "Reading Average: ";
            	html += "N/A";
            	html += "";
            	html += "</br>";
            	html += "Total Average: ";
            	html += "N/A";
            	html += "";
            	html += "</span>";
            	html += "</div>";
        	}
            
        	$("#tooltip-container").html(html);
        
        	$(this).attr("fill-opacity", "0.8");
        
        	$("#tooltip-container").show();     
            
        	var coordinates = d3.mouse(this);
            
        	var map_width = $(".countries-choropleth")[0].getBoundingClientRect().width;
            
        	if (d3.event.layerX < map_width / 2) {
            	d3.select("#tooltip-container")
            		.style("top", (d3.event.layerY + 15) + "px")
            		.style("left", (d3.event.layerX + 15) + "px");
        	} 
        	else {
            	var tooltip_width = $("#tooltip-container").width();
            
            	d3.select("#tooltip-container")
            		.style("top", (d3.event.layerY + 15) + "px")
            		.style("left", (d3.event.layerX - tooltip_width - 30) + "px");
        	}
            
        	function fill_color(d){
            	var cindex = countries.indexOf(d.properties.name);      
            	if( cindex == -1) {
            		return 'white';
            	}
        	}
    	}
    	
	function hoverOut(){
            $(this).attr("fill-opacity", "1.0");
            $("#tooltip-container").hide();
        }
        
}

</script>


<body talign="center";>

    <script type="text/javascript">
    
    	/* 
    		On initial page load, the update_page() function gets called and pulls up the 
    		json data to be used on the draw() function.
    	*/
        
        document.getElementById("canvas-svg").visible = true;
        
        onload = update_page("World");
        
        function update_page(page) {
        
        	if (page!== "World"){
            	$( "#canvas-svg2" ).empty();
            }
            
            d3.select("p").text(null);
            
            if(page=="World"){
                d3.json("world_countriesNew.json", draw);
            }
            
            else{
                analysis(page);
            }
            
         }
         