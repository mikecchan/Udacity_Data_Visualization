You may view this Project here: https://mikecchan.github.io/Udacity_Data_Visualization/

####Summary - in no more than 4 sentences, briefly introduce your data visualization and add any context that can help readers understand it. 

 My data: PISA 2012, measures the academic performance of each student for many different countries.  Students are also surveyed and other circumstances are also measured such as how wealthy their family, what possessions they own, and condition of the country economically and culturally.  In my project, I will be mapping out some of the countries with the best average academic performance and also countries with the poorest academic performance. Furthermore, I will explore why certain countries perform well or poorly based on other data like what the students have been surveyed.


####Design - explain any design choices you made including changes to the visualization after collecting feedback.

 I chose to fill each country a specific color of green based on country's academic performance.  The lower the average PISA score (that is the average number between the average math, reading, and science scores collected), the lighter shade of green the country will be filled.  Likewise, the higher the country's average PISA score, the darker shade of green they will receive.
 I picked green because it is also the color of money or sign of wealth.  I like to say the smarter a country is, the darker the color green they will receive.  It's like equating education with money.
 Last, countries with no PISA data will have no color fill ( or white).
 
 Likewise with my line plots, I highlighted lines in red to indicate no findings (maybe too much noise or the line appears horizontally flat).
 I highlighted lines in blue if there is sort of pattern like the increasing or decreasing as data goes towards poorer performing countries.

####Feedback - include all feedback you received from others on your visualization from the first sketch to the final visualization

##### from lrcnok0929
 
<pre>
A very comprehensive visualization, great work!

What questions do you have about the data?
For the first visualization, it take me some times to get what is the meaning of top 25% is it the Total average or math average is top 25%? I think adding some text can make it more clearer, it would also be nice if there is filter I can check on each field "Math,Reading,Science" instead of only checking total average, that way I can see is there some country are good at something.

For visualization that related to score, I don't have a sense what the score mean to me, what is a 0.2 disciplinary climate of the classroom mean?

for line graph, it would be nicer if postive and negative number have differenet color, i think it will make it better looking and easier to read also. But this is only suggestion, as I understand this is only a project, you have done a lot of visualization that beyond the standard already.

for the options of visualization, I will love it more if the option bar is on the top of the page rather than the bottom, I think it will be better if it is a 4*2 bar than a 2*4 ,as it it a bit too wide to read in the screen.(At least in my case)

What relationships do you notice?
Obviously rich country have better performence

What do you think is the main takeaway from this visualization?
rich country have better education and better performence

Is there something you don’t understand in the graphic?
Why do you use line graph for x-axis which is country( categorical variables)?
</pre>

##### from long_644533560210786
<pre>
I used the same data set and your post gave me another view of analyzing. That's amazing.

I noticed that you plotted the whole map showing the top and bottom countries with different colors. Then you analyzed the 6 possible factors that might affect the performance by plotting 6 line charts. Finally you got the conclusion by observing the relationships.

Here are several questions. 
1. What does yaxis of each line chart mean?I don't understand those numbers.

I think ESCS and wealth are correlated, so maybe you can combine them or simply delete one?

it seems that teacher's help don't have significant effects on the average scores. Maybe you could try more factors, like student's intentions, behaviors and others(from subjective side)?

Correlation is not causality. For example, regarding "teachers Providing Extra Help When Needed", I would think it is the effect of scores but not the cause for scores. It seems that more students in worse performing countries disagree with the statement. That is to say, because their scores are low, they need more teacher's help and tend to agree with that. Students from high ranking countries might lack chances to seek for extra help from teachers since they have been that good. Another example, climate might not be the factor to influence students' performance. It is because most developed countries are above equator.

The main takeaway from this visualization is that wealth is highly likely to be the valid factor and that is a nice explanation. If you take more factors into consideration, like student's subjectivity and how hard they study, it will be even better.

I would appreciate if you could comment on mine!
http://bl.ocks.org/wujiyan/aa9b19491c6150e6c40bffe36a19588b1

Thanks.
</pre>

##### from @t0mkaka
<pre>
Great job using so many types of plots in putting forward your findings. 
Here are a few of my suggestions to further improve your plot.

for main page visualization

Great job making use of plots to differentiate how each region is performing. It is very easy to look and at one glance I can point out the regions. There is just one problem of no legend here. Even though you give the details about the color in the text below but as they A picture is worth a thousand words . That will improve the map visualization drastically.

The statistics on hover is great. Good job.

for other visualization.

When I looked at your line charts I was a bit sceptical as line charts are normally used to show series data and I thought with so many countries this will be random. But when I looked at axis I found that the countries are sorted from high to low performance and this is great. You took a data and used it to your power. Hence line chart will be perfect for this type of data.

There is just one problem on axis for the climate chart of the units. I can't understand what climate = 0.5 means. Some description or unit on axis will be helpful.

Other than that great job on hiding the lines on box click in Encouragement and other plots. Looks like you now have your hand set on the technicals.

Great job.
</pre>
 


####Resources - list any sources you consulted to create your visualization

1) http://bl.ocks.org/BMPMS/raw/32cfa44714206cf7c79bb5d1e60657bc/
  
  This project belonged to a Udacian student and I looked through to help me figure out how to map out the countries on my svg canvas and to iterate through them and fill up colors of certain countries.

2) https://vida.io/gists/FLFFovRPbu2t5QwQC

  I used this resource to help me figure out how to display each countries' information when hovering over them.

3) http://dimplejs.org/examples_viewer.html?id=lines_horizontal

  I used this to help me display the line graphs of each of the 6 surveys I picked.

4) http://dimplejs.org/advanced_examples_viewer.html?id=advanced_interactive_legends

  I used this resource to help me figure out how I can hide/show each categorized line on my graphs.
  
5) http://bl.ocks.org/rkirsling/raw/33a9e350516da54a5d4f/

  I used this to help me copy the code to implement the legend.