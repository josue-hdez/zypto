import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router";
import { getCoinsListWithMarketData } from "../../../services/api/coinsAPI";
import { formatNumber } from "../../../utils/formatNumber";
import ChangePercentageIndicator from "../../../components/ChangePercentageIndicator";
import Icon from "../../../components/Icon";
import PaginationControls from "./PaginationControls";
import Dropdown from "../../../components/Dropdown";

const TOTAL_COINS = 10000;

const COLUMNS = [
  { key: "name", label: "Coin" },
  { key: "current_price", label: "Price" },
  { key: "price_change_percentage_1h_in_currency", label: "1h" },
  { key: "price_change_percentage_24h_in_currency", label: "24h" },
  { key: "price_change_percentage_7d_in_currency", label: "7d" },
  { key: "market_cap", label: "Market Cap" },
  { key: "total_volume", label: "Volume" },
];

const initialState = {
  status: "loading", // loading, loaded, error
  coinsListWithMarketData: [],
  sortConfig: null,
  itemsPerPage: 25,
  currentPage: 1,
};

function reducer(state, action) {
  let direction = "desc";

  switch (action.type) {
    case "coinsListWithMarketData/loaded":
      return {
        ...state,
        status: "loaded",
        coinsListWithMarketData: action.payload,
        sortConfig: {
          key: "market_cap",
          direction: "desc",
        },
      };
    case "sortConfig/updated":
      if (
        state.sortConfig.key === action.payload &&
        state.sortConfig.direction === "desc"
      ) {
        direction = "asc";
      }

      return {
        ...state,
        coinsListWithMarketData: [...state.coinsListWithMarketData].sort(
          (a, b) => {
            if (a[action.payload] < b[action.payload])
              return direction === "desc" ? 1 : -1;
            if (a[action.payload] > b[action.payload])
              return direction === "desc" ? -1 : 1;
            return 0;
          }
        ),
        sortConfig: { key: action.payload, direction },
      };
    case "itemsPerPage/updated":
      return { ...state, status: "loading", itemsPerPage: action.payload };
    case "currentPage/prev":
      return {
        ...state,
        status: "loading",
        currentPage: Math.max(state.currentPage - 1, 1),
      };
    case "currentPage/next":
      return {
        ...state,
        status: "loading",
        currentPage: Math.min(state.currentPage + 1, action.payload),
      };

    default:
      throw new Error("Unknow action type");
  }
}

function CoinsTable() {
  const [
    { coinsListWithMarketData, sortConfig, itemsPerPage, currentPage },
    dispatch,
  ] = useReducer(reducer, initialState);

  const totalPages = Math.ceil(TOTAL_COINS / itemsPerPage);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await getCoinsListWithMarketData(
          itemsPerPage,
          currentPage
        );
        dispatch({ type: "coinsListWithMarketData/loaded", payload: data });
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [itemsPerPage, currentPage]);

  return (
    <section className="border-bottom">
      <div className="container space-y-3">
        <div className="xs:flex items-baseline gap-1">
          <h2 className="text-xl lg:text-3xl">Coins Prices by Market Cap</h2>
          <span>{formatNumber(TOTAL_COINS)} coins</span>
        </div>
        <div className="overflow-x-scroll scrollbar-none">
          <table className="w-full min-w-[920px] border-b border-light-steel">
            <thead>
              <tr className="border-y border-light-steel">
                {COLUMNS.map(({ key, label }) => (
                  <th
                    key={key}
                    className={`${
                      key === sortConfig?.key ? "font-bold" : "font-medium"
                    } text-end first:text-start first:w-66 xl:first:w-96 py-3 px-1 first:pl-3 last:pr-3 cursor-pointer`}
                    onClick={() =>
                      dispatch({ type: "sortConfig/updated", payload: key })
                    }
                  >
                    <Icon
                      size="sm"
                      color={
                        key === sortConfig?.key ? "charcoal" : "transparent"
                      }
                    >
                      {sortConfig?.direction === "desc" ? (
                        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                      ) : (
                        <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                      )}
                    </Icon>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coinsListWithMarketData.map((coin) => (
                <tr
                  key={coin.id}
                  className="hover:bg-light-steel cursor-pointer"
                  onClick={() => navigate("/" + coin.id)}
                >
                  <td className="w-66 xl:w-96 py-1.5 pl-3 pr-1 flex items-center gap-1">
                    <img
                      className="size-7 rounded-full"
                      src={coin.image}
                      alt={`${coin.name} logo`}
                    />
                    <div>
                      <h3 className="font-medium text-base truncate w-54 xl:w-84">
                        {coin.name}
                      </h3>
                      <span className="uppercase">{coin.symbol}</span>
                    </div>
                  </td>
                  <td className="text-end py-1.5 px-1">
                    {formatNumber(coin.current_price, "currency")}
                  </td>
                  <td className="text-end py-1.5 px-1">
                    <ChangePercentageIndicator
                      change={coin.price_change_percentage_1h_in_currency}
                      iconSize="sm"
                    />
                  </td>
                  <td className="text-end py-1.5 px-1">
                    <ChangePercentageIndicator
                      change={coin.price_change_percentage_24h_in_currency}
                      iconSize="sm"
                    />
                  </td>
                  <td className="text-end py-1.5 px-1">
                    <ChangePercentageIndicator
                      change={coin.price_change_percentage_7d_in_currency}
                      iconSize="sm"
                    />
                  </td>
                  <td className="text-end py-1.5 px-1">
                    {formatNumber(coin.market_cap, "currency", true)}
                  </td>
                  <td className="text-end py-1.5 pr-3 pl-1">
                    {formatNumber(coin.total_volume, "currency", true)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="relative">
          <span className="hidden sm:inline absolute top-1/2 left-0 -translate-y-1/2">{`${formatNumber(
            itemsPerPage * currentPage - itemsPerPage + 1
          )}-${formatNumber(itemsPerPage * currentPage)} of ${formatNumber(
            TOTAL_COINS
          )} coins`}</span>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            dispatch={dispatch}
          />
          <Dropdown
            options={[25, 50, 100]}
            label="Rows"
            value={itemsPerPage}
            onChange={(selectedOption) =>
              dispatch({
                type: "itemsPerPage/updated",
                payload: selectedOption,
              })
            }
          />
        </div>
      </div>
    </section>
  );
}

export default CoinsTable;
