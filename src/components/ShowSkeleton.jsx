import { Skeleton } from "@mui/material";
import Loader from "./shared/Loader";

const ShowSkeleton = () => {
    return (
        <div className="py-10">
            <Loader loadingText={"Products Loading"} />
            <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6 mt-6">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                        <Skeleton variant="rectangular" width={250} height={300} sx={{ bgcolor: 'grey.600' }} />
                        <Skeleton variant="text" width={200} height={20} sx={{ bgcolor: 'grey.600' }} />
                        <Skeleton variant="text" width={150} height={20} sx={{ bgcolor: 'grey.600' }} />
                        <Skeleton variant="rounded" width={100} height={30} sx={{ bgcolor: 'grey.600' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowSkeleton;