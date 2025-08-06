import Button from "./Button";
import Icon from "./Icon";

function PaginationControls({
  itemsPerPage,
  currentPage,
  totalCoins,
  totalPages,
  onPrev,
  onNext,
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div className="flex justify-center items-center gap-3">
        <Button disabled={currentPage === 1} onClick={onPrev}>
          <Icon color="charcoal">
            <path d="M560-280 360-480l200-200v400Z" />
          </Icon>
        </Button>

        <span className="text-sm">
          {`Page ${currentPage.toLocaleString(
            "en-US"
          )} of ${totalPages.toLocaleString("en-US")}`}
        </span>

        <Button disabled={currentPage === totalPages} onClick={onNext}>
          <Icon color="charcoal">
            <path d="M400-280v-400l200 200-200 200Z" />
          </Icon>
        </Button>
      </div>
      <span className="text-xs">
        {`${itemsPerPage * currentPage - itemsPerPage + 1}-${
          itemsPerPage * currentPage
        } of ${totalCoins.toLocaleString("en-US")} coins`}
      </span>
    </div>
  );
}

export default PaginationControls;
