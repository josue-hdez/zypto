import { useEffect, useState } from "react";
import { graphic } from "echarts";
import ReactECharts from "echarts-for-react";
import { getCoinHistoricalChartDataById } from "../services/api/coinsService";
import { formatNumberToCurrency } from "../utils/formatNumberToCurrency";
import { formatDate } from "../utils/formatDate";

const fontFamily = "Rubik";
const charcoal = "#36454f";
const lightGray = "#eef0f3";
const lightGrayDisabled = "#eef0f359";
const positive = "#098551";
const negative = "#cf202f";
const white = "#ffffff";

function LineChart({ change, coinId, day }) {
  const [coinHistoricalChartData, setCoinHistoricalChartData] = useState(null);

  const color = change === 0 ? charcoal : change > 0 ? positive : negative;
  const gradientColor = graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color,
    },
    {
      offset: 1,
      color: white,
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCoinHistoricalChartDataById(coinId, day);

        setCoinHistoricalChartData(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, [coinId, day]);

  return (
    coinHistoricalChartData && (
      <div className="w-full h-[450px]">
        <ReactECharts
          style={{ width: "100%", height: "100%" }}
          option={{
            xAxis: {
              type: "time",
              boundaryGap: false,
              axisLabel: {
                color: charcoal,
                fontFamily,
              },
            },
            yAxis: {
              position: "right",
              type: "value",
              boundaryGap: false,
              scale: true,
              axisLabel: {
                formatter: (value) => {
                  return formatNumberToCurrency(value, true);
                },
                color: charcoal,
                fontFamily,
              },
            },
            dataZoom: [
              {
                backgroundColor: white,
                dataBackground: {
                  lineStyle: {
                    color: lightGray,
                  },
                  areaStyle: {
                    color: lightGray,
                  },
                },
                selectedDataBackground: {
                  lineStyle: {
                    color,
                  },
                  areaStyle: {
                    color: gradientColor,
                  },
                },
                fillerColor: lightGrayDisabled,
                borderColor: white,
                handleStyle: {
                  color: lightGray,
                  borderColor: lightGray,
                },
                labelFormatter: function (value) {
                  return formatDate(new Date(value), true);
                },
                textStyle: {
                  color: charcoal,
                  fontFamily,
                },
                start: 0,
                end: 100,
                brushSelect: false,
              },
            ],
            tooltip: {
              trigger: "axis",
              axisPointer: {
                lineStyle: {
                  color: charcoal,
                },
              },
              formatter: (params) => {
                return `${formatDate(
                  new Date(params[0].data[0]),
                  true
                )} | <b>${formatNumberToCurrency(params[0].data[1])}</b>`;
              },
              textStyle: {
                color: charcoal,
                fontFamily,
              },
            },
            series: [
              {
                type: "line",
                name: "Coin Price",
                symbol: "none",
                lineStyle: {
                  color,
                },
                areaStyle: {
                  color: gradientColor,
                },
                data: coinHistoricalChartData,
              },
            ],
          }}
        />
      </div>
    )
  );
}

export default LineChart;
