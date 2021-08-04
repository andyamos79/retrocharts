import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";

import HighchartsMore from "highcharts/highcharts-more";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  HighchartsMore(Highcharts);
}

import styled from 'styled-components';

const ChartOuterWrapper = styled.div`
  z-index: 1;
  top: 100px;
  background: #ffffffaa;
  position: fixed;
  border-radius: 20px;
  padding: 15px;
  height: 80%;
`;

function getCategories(values) {
  const result = Object.fromEntries(
    Object.keys(values[0]).map((key) => [key, values.map((o) => o[key])])
  );
  return result.category;
}

function getData(values) {
  return [
    [760, 801, 848, 895, 1321],
    [733, 853, 939, 980, 1321],
    [714, 762, 817, 870, 1321],
    [724, 802, 806, 871, 1321],
  ];
}

const options = {
  chart: {
    type: "boxplot",
    styledMode: true,
  },
  title: { text: "Retro Chart" },
  legend: { enabled: false },
  xAxis: {
    title: {
      text: "Category",
    },
  },
  yAxis: {
    title: {
      text: "value",
    },
  },
  series: [
    {
      name: new Date().toDateString(),
      tooltip: {
        headerFormat: "<em>Category {point.key}</em><br/>",
      },
    },
  ],
};

function genConfig(values) {
  const generatedOptions = { ...options };
  console.log(values);
  generatedOptions.xAxis.categories = getCategories(values);
  generatedOptions.series[0].data = getData(values);

  return generatedOptions;
}

export default function AllUserDataChart(props) {
  const { values } = props;
  return (
    <ChartOuterWrapper>
      <HighchartsReact
        highcharts={Highcharts}
        options={genConfig(values)}
        containerProps={{
          style: {
            zIndex: 1,
            position: "relative",
            width: "100%",
            height: "100%"
          },
        }}
      />
    </ChartOuterWrapper>
  );
}
