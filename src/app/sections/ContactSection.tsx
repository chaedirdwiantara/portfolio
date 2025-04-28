"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formState);
    // Reset form
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-teal-50 dark:bg-teal-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-teal-600 dark:bg-teal-400 mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Have a question or want to work together? Feel free to reach out.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Send Me a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium shadow-sm transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300">
                        <FaEnvelope className="w-5 h-5" />
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                      <a href="mailto:hello@example.com" className="text-base text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400">
                        hello@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300">
                        <FaPhone className="w-5 h-5" />
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                      <a href="tel:+1234567890" className="text-base text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300">
                        <FaMapMarkerAlt className="w-5 h-5" />
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-base text-gray-900 dark:text-white">
                        New York City, NY
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Office Hours
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Saturday:</span> 10:00 AM - 4:00 PM
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Sunday:</span> Closed
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
