
function getSampleNames(){
    var selector = document.getElementById('selDataset');
    var url = "/names";
    Plotly.d3.json(url, function(error, response) {
        if (error) return console.warn(error);
        var data = response;
        data.map(function(sample){
            var option = document.createElement('option')
            option.text = sample
            option.value = sample
            selector.appendChild(option)
        });
    });
};

getSampleNames();

function optionChanged(sample){
    updatebar(sample);
    updateBubble(sample);
    updateMetadata(sample);
};

function updatebar(sample) {
    var sampleURL = `/samples/${sample}`
    Plotly.d3.json(sampleURL,function(error,response){
        if (error) return console.log(error);
        var labels = []
        var values = []
        var hovers = []
        for(i=0; i<10; i++){
            var label = response[0].otu_ids[i];
            labels.push(label);
            var value = response[1].sample_values[i];
            values.push(value);
            var hover = response[2][label - 1];
            hovers.push(hover);
        };
        var trace = {
            x: values,
            y: labels,
            type: "bar",
            orientation: 'h',
            text: hovers,
            hoverinfo: "label+text+value+percent",
            textinfo: "percent"
            };
        
         // 5. Create your trace.

  
  // 6. Create the data array for our plot
        var data = [trace];
        var layout = {
        title: "Belly Button Diversity",
        xaxis: `${value}`,
        yaxis: `${labels}`
        }
  
  // 8. Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", data, layout);
  
    });
};

function updateBubble(sample) {
    var sampleURL = `/samples/${sample}`
    Plotly.d3.json(sampleURL,function(error,response){
        if (error) return console.log(error);
        var otuIDs = response[0].otu_ids;
        var sampleValues = response[1].sample_values
        var otuDescriptions = [];
        for(i=0; i<otuIDs.length; i++) {
            otuDescriptions.push(response[2][otuIDs[i] - 1]);
        };
        var trace = {
            x: otuIDs,
            y: sampleValues,
            mode: 'markers',
            type: 'scatter',
            marker: {
                size: sampleValues,
                color: otuIDs,
                colorscale: "Rainbow"
            },
            text: otuDescriptions,
          };
        var data = [trace]
        Plotly.newPlot("bubble", data)
    });
};

function updateMetadata(sample){
    var sampleURL = `/metadata/${sample}`
    Plotly.d3.json(sampleURL,function(error,response){
        if (error) return console.log(error);
        console.log(response);
        var data = response[0];
        console.log(data)
        var metaList = document.getElementById('sampleMetadata');
        metaList.innerHTML = '';
        var metaItems = [["Sample","SAMPLEID"],["Ethnicity","ETHNICITY"],["Gender","GENDER"],["Age","AGE"],
            ["Weekly Wash Frequency","WFREQ"],["Type (Innie/Outie)","BBTYPE"],["Country","COUNTRY012"],["Dog Owner","DOG"],["Cat Owner","CAT"]];
        console.log(metaList)
        for(i=0; i<metaItems.length; i++){
            var newLi = document.createElement('li');
            newLi.innerHTML = `${metaItems[i][0]}: ${data[metaItems[i][1]]}`;
            metaList.appendChild(newLi);
        };
    });
};


  
