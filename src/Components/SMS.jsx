import React, { useState } from "react";
import toast from "react-hot-toast";

const SMS = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const sendWhatsAppMessage = async () => {
    if (!phoneNumber || !message) {
      toast.error("Please enter both phone number and message");
      return;
    }

    try {
      const response = await fetch("https://api.whatsapp.com/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: `+91${phoneNumber}`,
          text: message,
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully");
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("An error occurred while sending the message");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Send WhatsApp Message
        </h2>
        <input
          type="text"
          placeholder="Enter Phone Number"
          className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <textarea
          placeholder="Enter Message"
          className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendWhatsAppMessage}
          className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default SMS;
