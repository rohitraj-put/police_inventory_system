import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const MalkhanaHelp = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Malkhana?",
      answer:
        "Malkhana is a secure place where seized or case property is stored until legal proceedings are completed.",
    },
    {
      question: "How can I retrieve my seized property?",
      answer:
        "You need to obtain a court order and submit it to the Malkhana in charge for verification and release.",
    },
    {
      question: "What documents are required to claim a seized vehicle?",
      answer:
        "You'll need the vehicle registration certificate, a valid court order, and an ID proof to initiate the process.",
    },
    {
      question: "Who can access Malkhana records?",
      answer:
        "Only authorized personnel and individuals with valid legal permissions can access Malkhana records.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full  bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Malkhana Help Center
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Find answers to common questions and get assistance.
        </p>

        {/* FAQs Section */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-2">
              <button
                className="w-full text-left font-semibold text-lg py-2 flex justify-between items-center cursor-pointer focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
                <span>
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {openIndex === index && (
                <p className="text-gray-600 mt-2 ">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-3">
            Need Further Assistance?
          </h3>
          <p className="text-gray-600">
            You can contact the Malkhana office through the following channels:
          </p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-gray-700" />
              <span className="text-gray-700">+91-1234567890</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-gray-700" />
              <span className="text-gray-700">support@malkhanahelp.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-gray-700" />
              <span className="text-gray-700">
                Office Hours: Mon-Fri, 9 AM - 5 PM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MalkhanaHelp;
