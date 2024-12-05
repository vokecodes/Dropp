import Skeleton from "react-loading-skeleton";

export const DashboardItemSkeletonLoader = () => (
    <div className="bg-[#F8F8F8] border border-[#E1E1E1] rounded-xl p-4">
      <div className="flex gap-2 align-items-center">
        <Skeleton width={100} height={20} />
        <Skeleton circle width={30} height={30} />
      </div>
      <Skeleton width={150} height={40} style={{ marginTop: "10px" }} />
      <Skeleton width={100} height={20} style={{ marginTop: "10px" }} />
    </div>
  );