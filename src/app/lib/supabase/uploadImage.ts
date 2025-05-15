import { createBrowserClient } from '@/app/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

/**
 * Uploads an image to Supabase Storage
 * @param file The file to upload
 * @param bucket The storage bucket name (defaults to 'project-images')
 * @param existingUrl Optional: existing file URL to replace
 * @returns URL of the uploaded file
 */
export async function uploadProjectImage(
  file: File,
  bucket: string = 'project-images',
  existingUrl?: string | null
): Promise<string> {
  if (!file) throw new Error('No file provided');
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files are allowed');
  }
  
  // Get file extension
  const fileExt = file.name.split('.').pop();
  
  // Create unique filename
  const fileName = `${uuidv4()}.${fileExt}`;
  
  try {
    const supabase = createBrowserClient();
    
    // If replacing an existing file, try to delete it first
    if (existingUrl) {
      try {
        const existingPath = existingUrl.split('/').pop();
        if (existingPath) {
          await supabase.storage
            .from(bucket)
            .remove([existingPath]);
        }
      } catch (err) {
        console.warn('Failed to delete existing file, continuing with upload', err);
      }
    }
    
    // Upload the new file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
      
    if (error) throw error;
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
      
    return publicUrl;
  } catch (error: any) {
    console.error('Error uploading file:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
} 