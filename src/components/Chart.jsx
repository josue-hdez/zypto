import { useState } from "react";
import LineChart from "./LineChart";
import Button from "./Button";
import Icon from "./Icon";
import CandlestickChart from "./CandleStickChart";

const charts = ["line", "candleStick"];

function Chart({
  coinId,
  change,
  timeFrameOptions,
  selectedTimeFrameOption,
  onSelectTimeframeOption,
}) {
  const [selectedChart, setSelectedChart] = useState(charts[0]);

  return (
    <section className="content-block">
      <div className="w-[80%] max-w-[1440px] mx-auto py-3 flex justify-between">
        <div className="flex gap-3">
          <Button
            className="px-3"
            width="w-12"
            disabled={selectedChart === charts[0]}
            onClick={() => setSelectedChart(charts[0])}
          >
            <Icon>
              <path d="M120-160v-520l160 120 200-280 200 160h160v520H120Zm200-120 160-220 280 218v-318H652L496-725 298-447l-98-73v144l120 96Z" />
            </Icon>
          </Button>
          <Button
            className="px-3"
            width="w-12"
            disabled={selectedChart === charts[1]}
            onClick={() => setSelectedChart(charts[1])}
          >
            <Icon>
              <path d="M280-160v-80h-80v-480h80v-80h80v80h80v480h-80v80h-80Zm0-160h80v-320h-80v320Zm320 160v-200h-80v-280h80v-160h80v160h80v280h-80v200h-80Zm0-280h80v-120h-80v120Zm-280-40Zm320-20Z" />
            </Icon>
          </Button>
        </div>
        <div className="flex gap-3">
          {timeFrameOptions.map((timeFrameOption) => (
            <Button
              className="font-medium text-sm uppercase px-3"
              key={timeFrameOption.value}
              width="w-12"
              disabled={timeFrameOption.value === selectedTimeFrameOption.value}
              onClick={() => onSelectTimeframeOption(timeFrameOption)}
            >
              {timeFrameOption.label}
            </Button>
          ))}
        </div>
      </div>
      {selectedChart === charts[0] && (
        <LineChart
          change={change}
          coinId={coinId}
          day={selectedTimeFrameOption.value}
        />
      )}
      {selectedChart === charts[1] && (
        <CandlestickChart coinId={coinId} day={selectedTimeFrameOption.value} />
      )}
    </section>
  );
}

export default Chart;
