/* eslint-disable react/prop-types */
import { DNA } from "react-loader-spinner";

const Loader = ({ loadingText }) => {
    return (
        <div className="flex justify-center items-center w-full h-[200px]">
            <div className="flex flex-col items-center gap-1">
                <DNA 
                visible={true} 
                height="80" 
                width="80" 
                ariaLabel="dna-loading" 
                wrapperStyle={{}} 
                wrapperClass="dna-wrapper"/>

                <p className="text-slate-800">{loadingText ? loadingText : "Please Wait..."}</p>
            </div>
        </div>
    )
};

export default Loader;