'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@/app/lib/supabase/client';

type PersonalInfo = {
  id: number;
  created_at: string;
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  profile_image_url?: string;
};

export default function PersonalInfoAdmin() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    location: '',
    bio: '',
    profile_image_url: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    try {
      setLoading(true);
      const supabase = createBrowserClient();
      
      const { data, error } = await supabase
        .from('personal_info')
        .select('*')
        .single();
        
      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        throw error;
      }
      
      if (data) {
        setPersonalInfo(data);
        setFormData({
          name: data.name || '',
          title: data.title || '',
          email: data.email || '',
          location: data.location || '',
          bio: data.bio || '',
          profile_image_url: data.profile_image_url || ''
        });
      }
    } catch (err: any) {
      console.error('Error fetching personal info:', err);
      setError(err.message || 'Failed to load personal information');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file (JPG, PNG, GIF, etc.)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      setError(null);
    }
  };

  const uploadImageAsBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadImage = async (file: File): Promise<string> => {
    // For now, let's use Base64 storage as a fallback
    // This is simpler and doesn't require storage bucket setup
    try {
      const base64Url = await uploadImageAsBase64(file);
      return base64Url;
    } catch (error) {
      throw new Error('Failed to process image');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      let imageUrl = formData.profile_image_url;
      
      // Upload image if a new file is selected
      if (selectedFile) {
        setUploading(true);
        imageUrl = await uploadImage(selectedFile);
        setUploading(false);
      }
      
      const dataToSave = {
        ...formData,
        profile_image_url: imageUrl
      };
      
      const supabase = createBrowserClient();
      
      if (personalInfo) {
        // Update existing record
        const { error } = await supabase
          .from('personal_info')
          .update(dataToSave)
          .eq('id', personalInfo.id);
          
        if (error) throw error;
        setSuccessMessage('Personal information updated successfully!');
      } else {
        // Create new record
        const { data, error } = await supabase
          .from('personal_info')
          .insert([dataToSave])
          .select()
          .single();
          
        if (error) throw error;
        setPersonalInfo(data);
        setSuccessMessage('Personal information created successfully!');
      }
      
      // Update form data with new image URL
      setFormData(prev => ({ ...prev, profile_image_url: imageUrl }));
      setSelectedFile(null);
      setPreviewUrl(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
      
    } catch (err: any) {
      console.error('Error saving personal info:', err);
      setError(err.message || 'Failed to save personal information');
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading personal information...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Personal Information</h1>
        <div className="text-sm text-gray-500">
          Manage your profile information for the About section
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p className="font-bold">Success</p>
          <p>{successMessage}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-medium mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Professional Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Full Stack Developer"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., San Francisco, CA"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-medium mb-4">Profile Image</h2>
          
          <div>
            <label htmlFor="profile_image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Profile Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label htmlFor="profile_image" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a file</span>
                    <input
                      id="profile_image"
                      name="profile_image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
            
            {/* Current Image Display */}
            {formData.profile_image_url && !previewUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Current Image:</p>
                <div className="flex items-start space-x-4">
                  <img 
                    src={formData.profile_image_url} 
                    alt="Current profile" 
                    className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-lg"
                  />
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, profile_image_url: '' }));
                      }}
                      className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Remove current image
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Preview New Image */}
            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">New Image Preview:</p>
                <div className="flex items-start space-x-4">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-xl border-2 border-blue-200 dark:border-blue-600 shadow-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {selectedFile?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Size: {selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) : 0} MB
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="mt-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Remove selected image
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-medium mb-4">Bio / About Me</h2>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Biography *
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              required
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-vertical"
              placeholder="Write about yourself, your background, interests, and what drives you as a professional..."
            />
            <p className="mt-2 text-sm text-gray-500">
              This will be displayed in the About section of your portfolio. Write in a professional yet personal tone.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: personalInfo?.name || '',
                title: personalInfo?.title || '',
                email: personalInfo?.email || '',
                location: personalInfo?.location || '',
                bio: personalInfo?.bio || '',
                profile_image_url: personalInfo?.profile_image_url || ''
              });
              setError(null);
              setSuccessMessage(null);
            }}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={saving || uploading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition-colors flex items-center space-x-2"
          >
            {uploading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Uploading Image...</span>
              </>
            ) : saving ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <span>{personalInfo ? 'Update Information' : 'Create Profile'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 