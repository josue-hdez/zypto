import { useEffect, useReducer } from "react";
import { getCryptoGlobalMarketData } from "../services/api/globalService";
import { getCoinsListWithMarketData } from "../services/api/coinsService";
import { formatNumberToCurrency } from "../utils/formatNumberToCurrency";
import PercentageChangeIndicator from "./PercentageChangeIndicator";
import Icon from "./Icon";
import PaginationControls from "./PaginationControls";
import Dropdown from "./Dropdown";
import TableRowLoader from "./TableRowLoader";

const columns = [
  { label: "Coin", key: "name" },
  { label: "Price", key: "current_price" },
  { label: "Change", key: "price_change_percentage_24h" },
  { label: "Volume", key: "total_volume" },
  { label: "Market Cap", key: "market_cap" },
];

const itemsPerPageOptions = [
  { label: "25 rows", value: 25 },
  { label: "50 rows", value: 50 },
  { label: "100 rows", value: 100 },
];

const initialState = {
  status: "loading",
  coinsListWithMarketData: [],
  sortConfig: {
    key: "market_cap",
    direction: "desc",
  },
  selectedItemsPerPageOption: itemsPerPageOptions[0],
  currentPage: 1,
  totalCoins: 0,
};

function reducer(state, action) {
  let direction = "desc";

  switch (action.type) {
    case "coinsListWithMarketData/loaded":
      return {
        ...state,
        status: "loaded",
        coinsListWithMarketData: action.payload[0],
        sortConfig: {
          key: "market_cap",
          direction: "desc",
        },
        totalCoins: action.payload[1],
      };
    case "sortConfig/updated":
      if (
        action.payload === state.sortConfig.key &&
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
    case "itemsPerPageOption/updated":
      return {
        ...state,
        status: "loading",
        selectedItemsPerPageOption: action.payload,
      };
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
      throw new Error("Unknown action");
  }
}

function CryptoTable() {
  const [
    {
      status,
      coinsListWithMarketData,
      sortConfig,
      selectedItemsPerPageOption,
      currentPage,
      totalCoins,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const totalPages = Math.ceil(totalCoins / selectedItemsPerPageOption.value);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCoinsListWithMarketData(
          selectedItemsPerPageOption.value,
          currentPage
        );

        const { active_cryptocurrencies: totalCoins } =
          await getCryptoGlobalMarketData();

        dispatch({
          type: "coinsListWithMarketData/loaded",
          payload: [data, totalCoins],
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, [selectedItemsPerPageOption.value, currentPage]);

  return (
    <section className="content-block space-y-3">
      <div className="container overflow-x-scroll scrollbar-none">
        <table className="w-full min-w-[920px]">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  className={`${
                    column.key === sortConfig.key ? "font-bold" : "font-medium"
                  } text-end first:text-start p-3 cursor-pointer`}
                  key={column.key}
                  onClick={() =>
                    dispatch({
                      type: "sortConfig/updated",
                      payload: column.key,
                    })
                  }
                >
                  <Icon
                    color={
                      column.key === sortConfig.key ? "charcoal" : "transparent"
                    }
                  >
                    {sortConfig.direction === "desc" ? (
                      <path d="M480-360 280-560h400L480-360Z" />
                    ) : (
                      <path d="m280-400 200-200 200 200H280Z" />
                    )}
                  </Icon>

                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {status === "loading" &&
              [1, 2, 3, 4, 5].map((id) => <TableRowLoader key={id} />)}
            {status === "loaded" &&
              coinsListWithMarketData.map((coin) => (
                <tr key={coin.id} className="hover:bg-light-gray">
                  <td className="text-start max-w-[275px] p-3 flex items-center gap-1.5 cursor-pointer">
                    <img
                      className="size-8 rounded-full"
                      src={coin.image}
                      alt={`${coin.name} logo`}
                    />
                    <div>
                      <h3 className="font-medium">{coin.name}</h3>
                      <span className="uppercase">{coin.symbol}</span>
                    </div>
                  </td>
                  <td className="text-end p-3">
                    {formatNumberToCurrency(coin.current_price)}
                  </td>
                  <td className="text-end p-3">
                    <PercentageChangeIndicator
                      change={coin.price_change_percentage_24h}
                    />
                  </td>
                  <td className="text-end p-3">
                    {formatNumberToCurrency(coin.total_volume)}
                  </td>
                  <td className="text-end p-3">
                    {formatNumberToCurrency(coin.market_cap)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="container flex justify-center items-center relative">
        <PaginationControls
          itemsPerPage={selectedItemsPerPageOption.value}
          currentPage={currentPage}
          totalCoins={totalCoins}
          totalPages={totalPages}
          onPrev={() => dispatch({ type: "currentPage/prev" })}
          onNext={() =>
            dispatch({ type: "currentPage/next", payload: totalPages })
          }
        />
        <Dropdown
          options={itemsPerPageOptions}
          selectedOption={selectedItemsPerPageOption}
          onChange={(selectedOption) =>
            dispatch({
              type: "itemsPerPageOption/updated",
              payload: selectedOption,
            })
          }
        />
      </div>
    </section>
  );
}

export default CryptoTable;
