import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import api from "../api/api";
import { useEffect, useState } from "react";

const ViewOrders = () => {
   
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const existingOrders = await api.get("/order/getAllOrders");
            console.log("fetched orders ", existingOrders);
            setOrders(existingOrders.data);
        }

        fetchData();
    },[]);

    if (!orders || orders.length === 0) {
        return <div className="flex flex-row justify-center items-center">
            <h1 className="font-bold mt-4 text-4xl">No Orders Found</h1>
        </div>;
    }

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-10">
            <div className="flex flex-col items-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                    <MdShoppingCart size={36} className="text-gray-700" />
                    Your Orders
                </h1>
                <p className="text-lg text-gray-600 mt-2">All Your Ordered Items</p>
            </div>

            {orders.map((order) => (
                <div key={order.orderId} className="border border-gray-300 shadow-md shadow-indigo-800/80 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Order ID: {order.orderId}</h2>
                    <p className="text-sm text-gray-500 mb-2">Order Date: {order.orderDate}</p>
                    <p className="text-sm text-gray-500 mb-4">Status: {order.orderStatus}</p>

                    <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 shadow-md shadow-gray-600/60 font-semibold items-center border-b border-gray-300 pb-2">
                        <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">Product</div>
                        <div className="justify-self-center text-lg text-slate-800">Price</div>
                        <div className="justify-self-center text-lg text-slate-800">Quantity</div>
                        <div className="justify-self-center text-lg text-slate-800">Total</div>
                    </div>

                    {order.orderItems.map((item) => (
                        <div key={item.orderItemId} className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 items-center border-b border-gray-200 py-4">
                            <div className="md:col-span-2 justify-self-start flex flex-col gap-2">
                                <h3 className="lg:text-[17px] text-sm font-semibold text-slate-500">{item.product.productName}</h3>
                                <div className="md:w-36 sm:w-24 w-12">
                                    <img alt={item.product.productName} src={item.image} className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md" />
                                </div>
                            </div>
                            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                                {formatPrice(Number(item.product.specialPrice))}
                            </div>
                            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                                {item.quantity}
                            </div>
                            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                                {formatPrice(Number(item.quantity) * Number(item.product.specialPrice))}
                            </div>
                        </div>
                    ))}

                    <div className="border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
                        <div></div>
                        <div className="flex text-sm gap-1 flex-col">
                            <div className="flex justify-between w-full md:text-lg text-sm font-semibold gap-2">
                                <span>Total Amount</span>
                                <span>{formatPrice(order.totalAmount)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex justify-center mt-6">
                <Link className="flex gap-2 items-center text-slate-500 text-lg" to="/products">
                    <MdArrowBack />
                    <span>Continue Shopping</span>
                </Link>
            </div>
        </div>
    );
};

export default ViewOrders;
