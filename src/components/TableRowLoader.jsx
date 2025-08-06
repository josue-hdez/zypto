import Loader from "./Loader";

function TableRowLoader() {
  return (
    <tr>
      <td className="p-3 flex justify-center items-center gap-1">
        <Loader size={"size-8"} />
        <div className="w-4/5 space-y-1">
          <Loader size={"w-1/2 h-3"} />
          <Loader size={"w-1/4 h-3"} />
        </div>
      </td>
      <td>
        <div className="p-3 flex flex-row-reverse">
          <Loader size={"w-1/4 h-3"} />
        </div>
      </td>
      <td>
        <div className="p-3 flex flex-row-reverse">
          <Loader size={"w-1/4 h-3"} />
        </div>
      </td>
      <td>
        <div className="p-3 flex flex-row-reverse">
          <Loader size={"w-1/4 h-3"} />
        </div>
      </td>
      <td>
        <div className="p-3 flex flex-row-reverse">
          <Loader size={"w-1/4 h-3"} />
        </div>
      </td>
    </tr>
  );
}

export default TableRowLoader;
