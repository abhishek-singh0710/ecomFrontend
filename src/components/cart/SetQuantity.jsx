/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaMinus, FaPlus } from "react-icons/fa";

const btnStyles = "border-[1.2px] border-slate-800 px-3 py-1 rounded hover:bg-gray-200";
const SetQuantity = ( {
    quantity,
    cardCounter,
    handleQtyIncrease,
    handleQtyDecrease
},
) => {
    return (
        <div className="flex gap-8 items-center">
        {cardCounter ? null : <div className="font-semibold">Quantity</div>}
            <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
            <button
                disabled={quantity<=1}
                className={btnStyles}
                onClick={handleQtyDecrease}><FaMinus /></button>

                <div className="text-red-500">{quantity}</div>
            <button
                className={btnStyles}
                onClick={handleQtyIncrease}><FaPlus /></button>
            </div>
        </div>
    )
};

export default SetQuantity;