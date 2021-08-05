import { useEffect, useState } from "react";

import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";

import HighchartsMore from "highcharts/highcharts-more";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  HighchartsMore(Highcharts);
}

import styled from "styled-components";

const ChartOuterWrapper = styled.div`
  z-index: 1;
  background: #ffffffaa;
  position: absolute;
  border-radius: 20px;
  margin: 5px;
  padding: 15px;
  height: -webkit-fill-available;
  width: 100%;
`;

function getCategories(values) {
  if (!values || !values.length) return {};
  const result = Object.fromEntries(
    Object.keys(values[0]).map((key) => [key, values.map((o) => o[key])])
  );
  return [...new Set(result.category)];
}

function processData(entries) {
  const output = {};
  entries.map((entry) => {
    if (output[entry.category]) {
      output[entry.category].push(entry.value);
    } else {
      output[entry.category] = [entry.value];
    }
  });
  const seriesData = Object.entries(output).map(([k, v]) => v);
  console.log("series: ", seriesData);
  return seriesData;
}

function processForScatter(entries) {
  const categories = ["technology", "other", "people", "process"];
  console.log("ENTRIES: ",  entries);
  const counters = [];
  const values = new Array(categories.length).fill(0);
  console.log("Values: ", values)
  entries.map((entry) => {
    const { category, value } = entry;
    if (!counters[category]) {
      counters[category] = [];
    }
    if (counters[category][value]) {
      counters[category][value] += 1;
    } else {
      counters[category][value] = 1;
    }
    console.log("counters: ", counters)
    console.log("Index: ", categories.indexOf(category));
    values[categories.indexOf(category)] = [
      category, 
      counters[category].map((counter, i) => {
        return [i, counter];
      })];
  });
  return values;
}

const options = {
  chart: {
    type: "bubble",
    zoomType: "xy"
  },
  title: { text: "Retro Chart" },
  legend: { enabled: false },
  xAxis: { title: { text: "Category" } },
  yAxis: { title: { text: "Value" } },
  plotOptions: {
    boxplot: {
      boxDashStyle: "Dash",
      fillColor: "#F0F0E0",
      lineWidth: 2,
      medianColor: "#0C5DA5",
      medianDashStyle: "ShortDot",
      medianWidth: 3,
      stemColor: "#A63400",
      stemDashStyle: "dot",
      stemWidth: 1,
      whiskerColor: "#3D9200",
      whiskerLength: "20%",
      whiskerWidth: 3,
    },
  },
  series: [
    {
      name: new Date().toDateString(),
      tooltip: { headerFormat: "<b>Category {point.key}</b><br/>" },
    },
  ],
};

function genConfig(values) {
  if (!values || !values.length) return options;

  const generatedOptions = { ...options };
  generatedOptions.xAxis.categories = getCategories(values);
  generatedOptions.series[0].data = processForScatter(values);
  console.log(generatedOptions);
  return generatedOptions;
}

const chartOptions = {
  style: {
    zIndex: 1,
    position: "relative",
    width: "100%",
    height: "100%",
  },
};

export default function AllUserDataChart(props) {
  const { values } = props;
  const [chartData, setChartData] = useState(genConfig(values));

  useEffect(() => {
    setChartData(genConfig(values));
  }, [values]);

  return (
    <ChartOuterWrapper>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartData}
        containerProps={chartOptions}
      />
    </ChartOuterWrapper>
  );
}
