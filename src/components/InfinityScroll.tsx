import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "./LoadingSpinner";

const InfinityScroll = ({ children, data, getMore, hasMore, page }) => {
  return (
    <InfiniteScroll
      dataLength={data?.length} // This is important to track the length of your data array
      next={getMore} // Function to call when reaching the end of the list
      hasMore={hasMore} // Flag to indicate if there are more items to load
      loader={
        <p className="mt-5 text-center font_medium">Loading...</p>
        // <div className="flex justify-center mt-1">
        //   <LoadingSpinner color="#06c167" />
        // </div>
      } // Loader component while fetching more data
      endMessage={
        <p className="mt-5 text-center font_medium">Yay, you've seen it all.</p>
      } // Message when all items have been loaded
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfinityScroll;