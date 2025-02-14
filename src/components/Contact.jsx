import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

export const Contact = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center"
        style={{backgroundImage: "url('https://images.pexels.com/photos/1087727/pexels-photo-1087727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}}>

        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">

            <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
            <p className="text-gray-600 text-center mb-4">We Would Love To Hear From You.
            Please fill out the form below or contact us.</p>

            <form className="space-y-4">

                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500" 
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500" 
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        rows="4"
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500" 
                    />
                </div>

                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                    Send Message
                </button>

            </form>

            <div className="mt-8 text-center">
                <h2 className="text-lg font-semibold">Contact Information</h2>
                <div className="flex flex-col items-center space-y-2 mt-4">
                    <div className="flex items-center">
                        <FaPhone className="text-blue-500 mr-2" size={18}/>
                        <span className="teay-600">+48 658 456 7932</span>
                    </div>

                    <div className="flex items-center">
                        <FaEnvelope className="text-blue-500 mr-2" size={18}/>
                        <span className="teay-600">info@mail.com</span>
                    </div>

                    <div className="flex items-center">
                        <FaMapMarkedAlt className="text-blue-500 mr-2" size={18}/>
                        <span className="teay-600">120 Main, Oregon, USA</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
};

export default Contact;