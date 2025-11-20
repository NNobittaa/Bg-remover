import React, { useContext } from "react";
import { useEffect } from "react";
// import 'dotenv/config'
import { assets, plans } from "../Assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
const BuyCredit = () => {
  const { loadCreditsData } = useContext(AppContext);

  const backendurl = import.meta.env.VITE_BACKEND_URL;

  // console.log(backendurl)

  const navigate = useNavigate();

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const { getToken } = useAuth();

  const initPay = async (order) => {
    console.log(order);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled");
        },
      },
      handler: async (response) => {
        console.log(response);
        // await loadCreditsData();
        const token = await getToken();
        try {
          const { data } = await axios.post(
            backendurl + "/api/user/verify-razor",
            response,
            { headers: { token } }
          );
          if (data.success) {
            loadCreditsData();
            navigate("/");
            toast.success("Credits Added");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
      // Failure handler
      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled");
        },
        confirm_close: true,
      },
    };
    if (isMobile) {
      options.config = {
        display: {
          blocks: {
            banks: {
              name: "Pay via UPI or Cards",
              instruments: [
                { method: "upi" },
                { method: "card" },
                { method: "wallet" },
                { method: "netbanking" },
              ],
            },
          },
          sequence: ["block.banks"],
          preferences: {
            show_default_blocks: true,
          },
        },
      };
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
    console.log("RAZORPAY KEY:", import.meta.env.VITE_RAZORPAY_KEY_ID);
  };

  // console.log(key)
  const paymentRazorpay = async (planId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendurl + "/api/user/pay-razor",
        { planId },
        { headers: { token } }
      );
      console.log(backendurl + "/api/user/pay-razor");
      console.log(data);
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log();
      toast.error(error.message);
    }
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onerror = () => {
      toast.error("Razorpay SDK failed to load. Check your connection!");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen text-center mt-10">
      <button className="border px-5 py-1 rounded-full border-gray-500">
        Our Plans
      </button>
      <h1 className=" text-center bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-400 mt-4 mx-8">
        <p className="font-bold text-2xl md:3xl lg:4xl ">
          Choose the plan that's right for you
        </p>
      </h1>
      <div className=" flex gap-8 justify-center items-center text-left mt-10 max-md:flex-col">
        {plans.map((item, index) => (
          <div
            className="border px-8 rounded-2xl md:w-1/6 bg-white drop-shadow-sm py-12 text-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer"
            key={index}
          >
            <img src={assets.logo_icon} alt="" />
            <p className="mt-3 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span>/
              {item.credits} credits
            </p>
            <button
              onClick={() => paymentRazorpay(item.id)}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5"
            >
              Purchase
            </button>
          </div>
        ))}
        {isMobile && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800 text-center">
              📱 Payment will open in a mobile-friendly popup
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyCredit;
