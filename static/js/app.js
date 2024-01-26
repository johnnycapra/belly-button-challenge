// Create function that will update all charts 
function updateDashboard(currentSample) {
    
    // Get data from belly button URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
        // Find the selected sample in the data
        let sampleData = data.samples.find(sample => sample.id == currentSample);
        // Update Bar Chart
        let barTrace = {
            x: sampleData.sample_values.slice(0, 10).reverse(),
            y: sampleData.otu_ids.slice(0, 10).map(label => `OTU ${label}`).reverse(),
            text: sampleData.otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        };

        let barData = [barTrace];

        let barLayout = {
            title: "Top 10 OTUs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU ID" }
        };

        Plotly.newPlot("bar", barData, barLayout);

        // Update Bubble Chart
        let bubbleTrace = {
            x: sampleData.otu_ids,
            y: sampleData.sample_values,
            mode: 'markers',
            marker: {
                size: sampleData.sample_values,
                color: sampleData.otu_ids,
                colorscale: 'Earth'
            },
            text: sampleData.otu_labels
        };

        let bubbleData = [bubbleTrace];

        let bubbleLayout = {
            title: 'Bubble Chart - Sample Data',
            xaxis: { title: 'OTU ID' },
            yaxis: { title: 'Sample Values' }
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        // Update Metadata Display
        let metadata = document.getElementById("sample-metadata");
        metadata.innerHTML = ""; // Clear previous metadata

        // Find the metadata for the selected sample
        let currentMetadata = data.metadata.find(meta => meta.id == currentSample);

        // Display each key-value pair from the metadata
        Object.entries(currentMetadata).forEach(([key, value]) => {
            metadata.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        });

        // Update Gauge Chart
        updateGaugeChart(currentMetadata.wfreq);
    });


}

// Function to create and update Gauge Chart
function updateGaugeChart(washingFrequency) {

    let gaugeData = [
        {
            type: "indicator",
            mode: "gauge+number",
            value: washingFrequency,
            title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
            gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
                bar: { color: "darkblue" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [0, 1], color: "#F5EFE7" },
                    { range: [1, 2], color: "#F1EDDF" },
                    { range: [2, 3], color: "#E3E2BE" },
                    { range: [3, 4], color: "#DEE5A1" },
                    { range: [4, 5], color: "#CCE283" },
                    { range: [5, 6], color: "#A9C478" },
                    { range: [6, 7], color: "#76B66D" },
                    { range: [7, 8], color: "#74B179" },
                    { range: [8, 9], color: "#6FA973" }
                ],
            }
        }
        
    ];

    let gaugeLayout = { width: 400, height: 300, margin: { t: 0, b: 0 } };

    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
}


// Initialize the dropdown menu options
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
    let dropdownMenu = d3.select("#selDataset");

    data.names.forEach(sample => {
        dropdownMenu.append("option").text(sample).property("value", sample);
    });

    // Initial update with the first sample
    updateDashboard(data.names[0]);
});
