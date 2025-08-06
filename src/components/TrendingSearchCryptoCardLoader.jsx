import Loader from "./Loader";

function TrendingSearchCryptoCardLoader() {
  return (
    <div className="m-w-52 h-40 py-3 px-6 rounded-3xl bg-light-gray-disabled flex flex-col justify-center gap-3">
      <Loader size={"size-8 rounded-full"} />
      <Loader size={"w-1/5 h-3"} />
      <Loader size={"w-1/2 h-3"} />
      <Loader size={"w-1/4 h-3"} />
    </div>
  );
}

export default TrendingSearchCryptoCardLoader;
