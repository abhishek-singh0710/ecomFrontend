/* eslint-disable no-unused-vars */
// import { Button, FormControlLabel, RadioGroup, Radio } from "@mui/material";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { placeOrder } from "../store/actions";
// import toast from "react-hot-toast";

// const Order = () => {
//   const [paymentType, setPaymentType] = useState("");

//   const handleChange = (event) => {
//     setPaymentType(event.target.value);
//   };

//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("paymentType", paymentType);
//     dispatch(placeOrder(paymentType, toast));
//   };

//   return (
//     <div className="flex flex-col justify-center items-center relative top-10">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Use MUI's RadioGroup with correct event handling */}
//         <RadioGroup value={paymentType} onChange={handleChange}>
//           <div className="space-y-2">
//             <FormControlLabel control={<Radio />} value="card" label="Card" />
//             <FormControlLabel control={<Radio />} value="upi" label="UPI" />
//             <FormControlLabel control={<Radio />} value="debitCard" label="Debit Card" />
//             <FormControlLabel control={<Radio />} value="creditCard" label="Credit Card" />
//             <FormControlLabel control={<Radio />} value="netBanking" label="Net Banking" />
//           </div>
//         </RadioGroup>

//         <Button type="submit" className="w-full" variant="contained">
//           Proceed to Payment
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default Order;


import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../store/actions";
import toast from "react-hot-toast";
import { useRazorpay } from "react-razorpay";
import Razorpay from 'react-razorpay/dist/razorpay';
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const payAmount = useSelector((state) => state.carts.totalPrice);

  console.log("totalAmount=",payAmount);

  const username = JSON.stringify(localStorage.getItem("auth").username);

  const createOrder = async () => {
    return await api.get("/payment/"+payAmount);
  }

  const razorpay = useRazorpay();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("From Handle Payment");
    console.log("payAmount=",payAmount);

    try {
      // Instead Of Adding The Items To The Cart In The Backend In The Addresses File Do It Here
      const order = await createOrder();
      console.log("orderid received=",order);

      const options = {
        key: "rzp_test_YutuKFM5I3W8ZI",
        amount: order.data.amount,
        currency: order.data.currency,
        name: username,
        description: "Test Transaction",
        image: "",
        order_id: order.data.orderId,
        handler: function(response) {
          console.log("payment successful ", response);
          dispatch(placeOrder("CARD", toast));

        },
        prefill: {
          name: username,
          email: email,
          contact: contact,
        },
        notes: {
          address: "ABC, Delhi",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpl = new Razorpay(options);

      rzpl.on("payment.failed", function(response) {
        toast.error("Payment Failed, Please Try Again Later!");
      });

      console.log("rzpl ", rzpl);
      rzpl.open();
  } catch(error) {
    toast.error("Payment Failed, Please Try Again Later!");
  } finally {
    navigate("/");
  }
    // console.log("rzpl after payment ", rzpl);
    // dispatch(placeOrder("CARD", toast));
  };

  return (
    <div className="flex flex-col justify-center items-center relative top-10">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Contact Number"
          variant="outlined"
          fullWidth
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <Button type="submit" className="w-full" variant="contained">
          Pay Now
        </Button>
      </form>
    </div>
  );
};

export default Order;
