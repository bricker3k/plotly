function updateMetadata(sample){
    
    d3.json("samples.json").then((data)=>{
        var Metadata = data.metadata
        console.log(Metadata);
        var data = Metadata.filter (sampleobject =>sampleobject.id == sample);
        var metaList = data[0];
        var panel = d3.select("#sample-metadata");
        panel.html(' ');
        Object.entries (metaList).forEach(([key, value] )=>{
            panel.append ("h5").text(`${key.toUpperCase()}: ${value}`);

            
        });
    });
};

function createchart(sample){
    
    d3.json("samples.json").then((data)=>{
        var datasample = data.samples;
        console.log(datasample);
        var data = datasample.filter (sampleobject =>sampleobject.id == sample);
        var result = data[0];
        var otu_id = result.otu_ids;
        var samplevalue = result.sample_values;
        var otu_labels = result.otu_labels;
        var bubblelayout = {
            title: "Belly Button Diversity" 
        };
        var bubbledata = [{
            x: otu_id, 
            y: samplevalue,
            text:otu_labels,
            mode:"markers",
            marker:{
                size:samplevalue,
                color: otu_id,
                colorscale: "Earth"

            }
        }];
        Plotly.newPlot("bubble", bubbledata, bubblelayout);
        var barlayout = {
            title: 
        }
        var bardata = [{

        }]
        text as ot otu_labelstype barlayout
        .slice(0,10)
    });

}

function getSampleNames(){
    var selector =d3.select("#selDataset");
    d3.json("samples.json").then((data)=>{
        var names = data.names;
        names.forEach((sample)=>{
            selector.append("option")
            .text (sample)
            .property("value", sample);
        });
        var newsample = names[0];
        updateMetadata(newsample);
        createchart(newsample);
    });
}; 

function optionChanged(sample){
    createchart(sample)
    updateMetadata(sample);
};

getSampleNames();


        