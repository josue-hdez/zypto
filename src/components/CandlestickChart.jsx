import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { getCoinOHLCChartDataById } from "../services/api/coinsService";
import { formatNumberToCurrency } from "../utils/formatNumberToCurrency";
import { formatDate } from "../utils/formatDate";
import { getColor } from "../utils/getColor";

const fontFamily = "Rubik";
const charcoal = getColor("charcoal");
const lightGray = getColor("light-gray");
const lightGrayDisabled = getColor("light-gray-disabled");
const positive = getColor("positive");
const negative = getColor("negative");
const white = getColor("white");

function CandlestickChart({ coinId, day }) {
  const [coinOHLCChartData, setCoinOHLCChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCoinOHLCChartDataById(coinId, day);

        setCoinOHLCChartData(
          data.reduce(
            (obj, el) => {
              const [timestamp, open, high, low, close] = el;

              obj.timestamp.push(formatDate(new Date(timestamp), true));
              obj.ohlc.push([open, close, low, high]);

              return obj;
            },
            { timestamp: [], ohlc: [] }
          )
        );
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, [coinId, day]);

  return (
    coinOHLCChartData && (
      <div className="w-full h-[450px]">
        <ReactECharts
          style={{ width: "100%", height: "100%" }}
          option={{
            xAxis: {
              type: "category",
              data: coinOHLCChartData.timestamp,
              boundaryGap: false,
              axisLabel: {
                color: charcoal,
                fontFamily,
              },
            },
            yAxis: {
              position: "right",
              boundaryGap: false,
              scale: true,
              axisLabel: {
                formatter: (value) => {
                  return formatNumberToCurrency(value, true);
                },
                color: charcoal,
                fontFamily,
              },
              splitArea: {
                show: true,
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
                fillerColor: lightGrayDisabled,
                borderColor: white,
                handleStyle: {
                  color: lightGray,
                  borderColor: lightGray,
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
                type: "cross",
                label: {
                  formatter: (params) => {
                    return params.axisDimension === "y"
                      ? formatNumberToCurrency(params.value)
                      : params.value;
                  },
                },
                crossStyle: {
                  color: charcoal,
                },
              },
              formatter: (params) => {
                const {
                  axisValueLabel,
                  data: [_, open, close, high, low],
                } = params[0];

                return `${axisValueLabel}<br /><br />
                Open: <b>${formatNumberToCurrency(open)}</b><br />
                High: <b>${formatNumberToCurrency(high)}</b><br />
                Low: <b>${formatNumberToCurrency(low)}</b><br />
                Close: <b>${formatNumberToCurrency(close)}</b>`;
              },
              textStyle: {
                color: charcoal,
                fontFamily,
              },
            },
            series: [
              {
                type: "candlestick",
                name: "OHLC",
                itemStyle: {
                  color: positive,
                  color0: negative,
                  borderColor: positive,
                  borderColor0: negative,
                },
                data: coinOHLCChartData.ohlc,
              },
            ],
          }}
        />
      </div>
    )
  );
}

export default CandlestickChart;
