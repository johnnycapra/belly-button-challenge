# belly-button-challenge
# Instructions

## Overview

Complete the following steps to create an interactive dashboard using the D3 library for data visualization. The goal is to display various charts and information based on the data from `samples.json`. Once completed, deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repository. Ensure that your repository has regular commits and a thorough README.md file.

## Steps

1. **Read Data Using D3:**
   - Use the D3 library to read the data from `samples.json` located at [this URL](https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json).

2. **Create Horizontal Bar Chart:**
   - Create a horizontal bar chart.
   - Implement a dropdown menu to display the top 10 Operational Taxonomic Units (OTUs) found in the selected individual.
   - Use `sample_values` as the values for the bar chart.
   - Utilize `otu_ids` as the labels for the bar chart.
   - Apply `otu_labels` as hover text for the chart.

3. **Create Bubble Chart:**
   - Create a bubble chart to display each sample.
   - Use `otu_ids` for the x values.
   - Use `sample_values` for the y values.
   - Use `sample_values` for the marker size.
   - Use `otu_ids` for the marker colors.
   - Use `otu_labels` for the text values.

4. **Display Sample Metadata:**
   - Display an individual's demographic information, also known as sample metadata.
   - Display each key-value pair from the metadata JSON object somewhere on the page.

5. **Update Plots on Selection:**
   - Ensure that all plots and displayed information are updated dynamically when a new sample is selected.

6. **Create Layout:**
   - You are encouraged to create a layout for your dashboard. Customize it according to your preferences.

7. **Example Dashboard:**
   - An example dashboard is provided to serve as a reference.

8. **Deploy to Hosting Service:**
   - Deploy your app to a free static page hosting service, such as GitHub Pages.

9. **Submission:**
   - Submit the links to your deployment and your GitHub repository.
   - Ensure your repository has regular commits and a comprehensive README.md file. Include instructions on how to run your application and any additional details about the project.