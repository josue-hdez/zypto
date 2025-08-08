import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router";
// import { getCryptoGlobalMarketData } from "../services/api/globalService";
import { getCoinsListWithMarketData } from "../services/api/coinsService";
import { formatNumberToCurrency } from "../utils/formatNumberToCurrency";
import PercentageChangeIndicator from "./PercentageChangeIndicator";
import Icon from "./Icon";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Loader from "./Loader";

const columns = [
  { label: "Coin", key: "name" },
  { label: "Price", key: "current_price" },
  { label: "Change", key: "price_change_percentage_24h" },
  { label: "Volume", key: "total_volume" },
  { label: "Market Cap", key: "market_cap" },
];

const dropdownOptions = [
  { label: "25 rows", value: 25 },
  { label: "50 rows", value: 50 },
  { label: "100 rows", value: 100 },
];

const initialState = {
  status: "loading", // loading | loaded | error
  coinsListWithMarketData: [],
  sortConfig: {
    key: "market_cap",
    direction: "desc",
  },
  selectedDropdownOption: dropdownOptions[0],
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
        coinsListWithMarketData: action.payload.data,
        sortConfig: {
          key: "market_cap",
          direction: "desc",
        },
        totalCoins: action.payload.totalCoins,
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
    case "dropdownOption/updated":
      return {
        ...state,
        status: "loading",
        selectedDropdownOption: action.payload,
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

function CoinsTable() {
  const [
    {
      status,
      coinsListWithMarketData,
      sortConfig,
      selectedDropdownOption,
      currentPage,
      totalCoins,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  const totalPages = Math.ceil(totalCoins / selectedDropdownOption.value);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCoinsListWithMarketData(
          selectedDropdownOption.value,
          currentPage
        );

        // const { active_cryptocurrencies: totalCoins } =
        //   await getCryptoGlobalMarketData();

        const totalCoins = 10000;

        dispatch({
          type: "coinsListWithMarketData/loaded",
          payload: { data, totalCoins },
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, [selectedDropdownOption.value, currentPage]);

  return (
    <section className="content-block space-y-3">
      <div className="container overflow-scroll scrollbar-none">
        <table className="w-full min-w-[920px]">
          <TableHead
            sortConfig={sortConfig}
            onSortTable={(columnKey) =>
              dispatch({
                type: "sortConfig/updated",
                payload: columnKey,
              })
            }
          />
          <TableBody
            status={status}
            coinsListWithMarketData={coinsListWithMarketData}
            onNavigate={navigate}
          />
        </table>
      </div>
      <div className="container relative">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="flex items-center gap-3">
            <Button
              disabled={currentPage === 1}
              onClick={() => dispatch({ type: "currentPage/prev" })}
            >
              <Icon color="charcoal">
                <path d="M560-280 360-480l200-200v400Z" />
              </Icon>
            </Button>

            <span className="text-sm">
              {`Page ${currentPage.toLocaleString(
                "en-US"
              )} of ${totalPages.toLocaleString("en-US")}`}
            </span>

            <Button
              disabled={currentPage === totalPages}
              onClick={() =>
                dispatch({ type: "currentPage/next", payload: totalPages })
              }
            >
              <Icon color="charcoal">
                <path d="M400-280v-400l200 200-200 200Z" />
              </Icon>
            </Button>
          </div>
          <span className="text-xs">
            {`${
              selectedDropdownOption.value * currentPage -
              selectedDropdownOption.value +
              1
            }-${
              selectedDropdownOption.value * currentPage
            } of ${totalCoins.toLocaleString("en-US")} coins`}
          </span>
        </div>
        <Dropdown
          options={dropdownOptions}
          selectedOption={selectedDropdownOption}
          onChange={(selectedOption) =>
            dispatch({
              type: "dropdownOption/updated",
              payload: selectedOption,
            })
          }
        />
      </div>
    </section>
  );
}

function TableHead({ sortConfig, onSortTable }) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className={`${
              column.key === sortConfig.key ? "font-bold" : "font-medium"
            } text-end first:text-start p-3 cursor-pointer`}
            key={column.key}
            onClick={() => onSortTable(column.key)}
          >
            <Icon
              color={column.key === sortConfig.key ? "charcoal" : "transparent"}
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
  );
}

function TableBody({ status, coinsListWithMarketData, onNavigate }) {
  return (
    <tbody>
      {status === "loading" &&
        [1, 2, 3, 4, 5].map((key) => <TableRowLoader key={key} />)}
      {status === "loaded" &&
        coinsListWithMarketData.map((coin) => (
          <tr
            className="hover:bg-light-gray cursor-pointer"
            key={coin.id}
            onClick={() => onNavigate("/" + coin.id)}
          >
            <td className="text-start max-w-[275px] p-3 flex items-center gap-3">
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
  );
}

function TableRowLoader() {
  return (
    <tr>
      <td className="p-3 flex justify-center items-center gap-1">
        <Loader width="w-8" height="h-8" />
        <div className="w-4/5 space-y-1">
          <Loader width="w-1/2" height="h-3" />
          <Loader width="w-1/4" height="h-3" />
        </div>
      </td>
      <td>
        <div className="p-3 flex flex-row-reverse">
          <Loader width="w-1/4" height="h-3" />
        </div>
      </td>
      <td>
        <div className="p-3 flex flex-row-reverse">
          <Loader width="w-1/4" height="h-3" />
        </div>
      </td>
      <td>
        <div className="p-3 flex flex-row-reverse">
          <Loader width="w-1/4" height="h-3" />
        </div>
      </td>
      <td>
        <div className="p-3 flex flex-row-reverse">
          <Loader width="w-1/4" height="h-3" />
        </div>
      </td>
    </tr>
  );
}

export default CoinsTable;
