import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, fetchPrevAddresses } from "../store/actions";
import { useNavigate } from "react-router-dom";

const Address = () => {
    console.log("Auth Token= ", JSON.parse(localStorage.getItem("auth")));
    const [formData, setFormData] = useState({
        street: "",
        buildingName: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
    });

    const [selectedAddress, setSelectedAddress] = useState("");

    // const [prevAddresses, setPrevAddresses] = useState("");
    const existingAddresses = useSelector((state) => state.addresses.addresses);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchPrevAddresses());
    },[dispatch]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

 

    const handleAddressChange = (e) => {
        const selectedId = e.target.value;
        console.log("selectedId ", selectedId);
        setSelectedAddress(selectedId); // State updates asynchronously
    
        const selected = existingAddresses.find(address => address.addressId === parseInt(selectedId));
        console.log("selected ", selected);
        if (selected) {
            setFormData({
                street: selected.street,
                buildingName: selected.buildingName,
                city: selected.city,
                state: selected.state,
                country: selected.country,
                pincode: selected.pincode
            });
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh
        console.log("Form Data Submitted:", formData);
        dispatch(addAddress(formData));
        navigate("/order");
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.pexels.com/photos/1087727/pexels-photo-1087727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
            }}
        >
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-4xl font-bold text-center mb-6">Add An Address</h1>
                <p className="text-gray-600 text-center mb-4">
                    We Would Love To Hear From You. Please fill out the form below or contact us.
                </p>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Choose Existing Address</label>
                    <select
                        value={selectedAddress}
                        onChange={handleAddressChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select an existing address</option>
                        {existingAddresses.map(address => (
                            <option key={address.id} value={address.addressId}>
                                {address.street}, {address.city}, {address.state}, {address.country} - {address.pincode}
                            </option>
                        ))}
                    </select>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Street</label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Building Name</label>
                        <input
                            type="text"
                            name="buildingName"
                            value={formData.buildingName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Add Address
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Address;