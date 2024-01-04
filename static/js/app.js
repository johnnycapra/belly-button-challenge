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

    });

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
