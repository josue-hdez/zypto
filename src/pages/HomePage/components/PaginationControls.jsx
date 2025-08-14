import { formatNumber } from "../../../utils/formatNumber";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";

function PaginationControls({ currentPage, totalPages, dispatch }) {
  return (
    <div className="flex justify-center items-center gap-3">
      <Button
        disabled={currentPage === 1}
        onClick={() => dispatch({ type: "currentPage/prev" })}
      >
        <Icon size="sm" color="white">
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
        </Icon>
      </Button>

      <span>
        Page {formatNumber(currentPage)} of {formatNumber(totalPages)}
      </span>

      <Button
        disabled={currentPage === totalPages}
        onClick={() =>
          dispatch({ type: "currentPage/next", payload: totalPages })
        }
      >
        <Icon size="sm" color="white">
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </Icon>
      </Button>
    </div>
  );
}

export default PaginationControls;
