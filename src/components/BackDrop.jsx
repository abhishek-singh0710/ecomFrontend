/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const BackDrop = ({ data }) => {

    return (
        <div className={`z-20 transition-all duration-200 opacity-50 w-screen h-screen bg-slate-500 fixed ${data ? "top-16" : "top-0"} left-0`}>

        </div>
    )
};

export default BackDrop;