'use client';

import { useState, useEffect } from 'react';
import { FaSave, FaSpinner, FaCheckCircle, FaExclamationCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaLinkedin, FaInstagram, FaTwitter, FaGithub, FaFacebook } from 'react-icons/fa';

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
  platform: string;
  url: string;
  icon: any;
  color: string;
  placeholder: string;
};

const socialPlatforms: SocialLink[] = [
  {
    platform: 'whatsapp',
    url: '',
    icon: FaWhatsapp,
    color: 'text-green-600',
    placeholder: 'https://wa.me/1234567890'
  },
  {
    platform: 'linkedin',
    url: '',
    icon: FaLinkedin,
    color: 'text-blue-600',
    placeholder: 'https://linkedin.com/in/yourprofile'
  },
  {
    platform: 'instagram',
    url: '',
    icon: FaInstagram,
    color: 'text-pink-600',
    placeholder: 'https://instagram.com/yourusername'
  },
  {
    platform: 'twitter',
    url: '',
    icon: FaTwitter,
    color: 'text-blue-400',
    placeholder: 'https://twitter.com/yourusername'
  },
  {
    platform: 'github',
    url: '',
    icon: FaGithub,
    color: 'text-gray-800 dark:text-gray-200',
    placeholder: 'https://github.com/yourusername'
  },
  {
    platform: 'facebook',
    url: '',
    icon: FaFacebook,
    color: 'text-blue-700',
    placeholder: 'https://facebook.com/yourprofile'
  }
];

export default function ContactInfoAdmin() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(socialPlatforms);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    email: '',
    phone: '',
    location: '',
    monday_friday: '',
    saturday: '',
    sunday: ''
  });

  useEffect(() => {
    fetchContactInfo();
    fetchSocialLinks();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contact-info');
      
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setContactInfo(data);
          setFormData({
            title: data.title || '',
            description: data.description || '',
            email: data.email || '',
            phone: data.phone || '',
            location: data.location || '',
            monday_friday: data.office_hours?.monday_friday || '9:00 AM - 6:00 PM',
            saturday: data.office_hours?.saturday || '10:00 AM - 4:00 PM',
            sunday: data.office_hours?.sunday || 'Closed'
          });
        }
      }
    } catch (err: any) {
      console.error('Error fetching contact info:', err);
      setError(err.message || 'Failed to load contact information');
    } finally {
      setLoading(false);
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch('/api/social-links');
      if (response.ok) {
        const data = await response.json();
        
        // Merge existing social links with platform templates
        const updatedSocialLinks = socialPlatforms.map(platform => {
          const existingLink = data.find((link: any) => link.platform.toLowerCase() === platform.platform);
          return {
            ...platform,
            url: existingLink?.url || ''
          };
        });
        
        setSocialLinks(updatedSocialLinks);
      }
    } catch (err) {
      console.error('Error fetching social links:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear messages when user starts typing
    if (error) setError(null);
    if (successMessage) setSuccessMessage(null);
  };

  const handleSocialLinkChange = (platform: string, url: string) => {
    setSocialLinks(prev => prev.map(link => 
      link.platform === platform ? { ...link, url } : link
    ));
    
    // Clear messages when user starts typing
    if (error) setError(null);
    if (successMessage) setSuccessMessage(null);
  };

  const saveSocialLinks = async () => {
    try {
      // Save each social link that has a URL
      for (const link of socialLinks) {
        if (link.url.trim()) {
          const response = await fetch('/api/social-links', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              platform: link.platform,
              url: link.url.trim()
            }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error saving ${link.platform}:`, errorData);
            // Continue with other links even if one fails
          }
        }
      }
    } catch (err) {
      console.error('Error saving social links:', err);
      throw new Error('Failed to save social links');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      // Save contact info
      const submitData = {
        title: formData.title,
        description: formData.description,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        office_hours: {
          monday_friday: formData.monday_friday,
          saturday: formData.saturday,
          sunday: formData.sunday
        }
      };
      
      const response = await fetch('/api/contact-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save contact information');
      }
      
      setContactInfo(data);
      
      // Save social links
      await saveSocialLinks();
      
      setSuccessMessage('Contact information and social links updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Error saving contact info:', err);
      setError(err.message || 'Failed to save contact information');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage the contact information and social media links displayed on your contact page
        </p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Status Messages */}
          {successMessage && (
            <div className="p-4 rounded-lg flex items-center space-x-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
              <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{successMessage}</p>
            </div>
          )}
          
          {error && (
            <div className="p-4 rounded-lg flex items-center space-x-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
              <FaExclamationCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Page Content Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Page Content
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Page Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Get In Touch"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Page Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Have a question or want to work together? Feel free to reach out."
                />
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Contact Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <FaEnvelope className="inline w-4 h-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="your-email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <FaPhone className="inline w-4 h-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="+1 (234) 567-890"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <FaMapMarkerAlt className="inline w-4 h-4 mr-2" />
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Your City, Country"
                />
              </div>
            </div>
          </div>

          {/* Social Media Links Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Social Media Links
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <div key={social.platform}>
                    <label htmlFor={social.platform} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <IconComponent className={`inline w-4 h-4 mr-2 ${social.color}`} />
                      {social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                    </label>
                    <input
                      type="url"
                      id={social.platform}
                      value={social.url}
                      onChange={(e) => handleSocialLinkChange(social.platform, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={social.placeholder}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Office Hours Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Office Hours
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="monday_friday" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Monday - Friday
                </label>
                <input
                  type="text"
                  id="monday_friday"
                  name="monday_friday"
                  value={formData.monday_friday}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="9:00 AM - 6:00 PM"
                />
              </div>

              <div>
                <label htmlFor="saturday" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Saturday
                </label>
                <input
                  type="text"
                  id="saturday"
                  name="saturday"
                  value={formData.saturday}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="10:00 AM - 4:00 PM"
                />
              </div>

              <div>
                <label htmlFor="sunday" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sunday
                </label>
                <input
                  type="text"
                  id="sunday"
                  name="sunday"
                  value={formData.sunday}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Closed"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaSave className="w-4 h-4" />
                  <span>Save All Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 