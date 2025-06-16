"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaSpinner, FaCheckCircle, FaExclamationCircle, FaWhatsapp, FaLinkedin, FaInstagram, FaTwitter, FaGithub, FaFacebook } from "react-icons/fa";
import emailjs from '@emailjs/browser';

type ContactInfo = {
  id: number;
  title: string;
  description: string;
  email: string;
  phone: string | null;
  location: string | null;
  office_hours: any;
};

type SocialLink = {
  id: number;
  platform: string;
  url: string;
};

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'whatsapp': return FaWhatsapp;
    case 'linkedin': return FaLinkedin;
    case 'instagram': return FaInstagram;
    case 'twitter': return FaTwitter;
    case 'github': return FaGithub;
    case 'facebook': return FaFacebook;
    default: return FaEnvelope;
  }
};

const getSocialColor = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'whatsapp': return 'text-green-600 dark:text-green-400';
    case 'linkedin': return 'text-blue-600 dark:text-blue-400';
    case 'instagram': return 'text-pink-600 dark:text-pink-400';
    case 'twitter': return 'text-blue-400 dark:text-blue-300';
    case 'github': return 'text-gray-800 dark:text-gray-200';
    case 'facebook': return 'text-blue-700 dark:text-blue-400';
    default: return 'text-teal-600 dark:text-teal-400';
  }
};

export default function ContactSection() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    fetchContactInfo();
    fetchSocialLinks();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('/api/contact-info');
      if (response.ok) {
        const data = await response.json();
        setContactInfo(data);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch('/api/social-links');
      if (response.ok) {
        const data = await response.json();
        setSocialLinks(data);
      }
    } catch (error) {
      console.error('Error fetching social links:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
    
    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const sendEmailNotification = async (formData: { name: string; email: string; message: string }) => {
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        submission_date: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
    } catch (error) {
      console.error('Failed to send email notification:', error);
      // Don't throw error - we don't want email failure to break the form submission
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      // Save to database (existing functionality)
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Send email notification (new functionality)
        await sendEmailNotification(formState);
        
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.'
        });
        setFormState({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Default values while loading or if no data
  const displayTitle = contactInfo?.title || 'Get In Touch';
  const displayDescription = contactInfo?.description || 'Have a question or want to work together? Feel free to reach out.';

  return (
    <section id="contact" className="py-12 bg-teal-50 dark:bg-teal-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {displayTitle}
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
            {displayDescription}
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
                {/* Status Message */}
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg flex items-center space-x-3 ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                    }`}
                  >
                    {submitStatus.type === 'success' ? (
                      <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <FaExclamationCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <p className="text-sm">{submitStatus.message}</p>
                  </motion.div>
                )}
                
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium shadow-sm transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Send Message</span>
                    )}
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
              {/* Contact Details */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Contact Information
                </h3>
                
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <FaSpinner className="w-6 h-6 animate-spin text-teal-600" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {contactInfo?.email && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300">
                            <FaEnvelope className="w-5 h-5" />
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                          <a 
                            href={`mailto:${contactInfo.email}`} 
                            className="text-base text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                          >
                            {contactInfo.email}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {contactInfo?.phone && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300">
                            <FaPhone className="w-5 h-5" />
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                          <a 
                            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} 
                            className="text-base text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                          >
                            {contactInfo.phone}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {contactInfo?.location && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300">
                            <FaMapMarkerAlt className="w-5 h-5" />
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                          <p className="text-base text-gray-900 dark:text-white">
                            {contactInfo.location}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Social Media Links */}
              {socialLinks.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Connect With Me
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social) => {
                      const IconComponent = getSocialIcon(social.platform);
                      const colorClass = getSocialColor(social.platform);
                      
                      return (
                        <a
                          key={social.id}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-teal-300 dark:hover:border-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-200 group"
                        >
                          <IconComponent className={`w-5 h-5 ${colorClass} group-hover:scale-110 transition-transform`} />
                          <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors capitalize">
                            {social.platform}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Office Hours */}
              {contactInfo?.office_hours && (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Office Hours
                  </h3>
                  <div className="space-y-2">
                    {contactInfo.office_hours.monday_friday && (
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Monday - Friday:</span> {contactInfo.office_hours.monday_friday}
                      </p>
                    )}
                    {contactInfo.office_hours.saturday && (
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Saturday:</span> {contactInfo.office_hours.saturday}
                      </p>
                    )}
                    {contactInfo.office_hours.sunday && (
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Sunday:</span> {contactInfo.office_hours.sunday}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
