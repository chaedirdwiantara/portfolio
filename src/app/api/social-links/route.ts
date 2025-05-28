import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/app/lib/supabase/client';

export async function GET() {
  try {
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .order('platform');
    
    if (error) {
      console.error('Error fetching social links:', error);
      return NextResponse.json(
        { error: 'Failed to fetch social links' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, url } = body;
    
    if (!platform || !url) {
      return NextResponse.json(
        { error: 'Platform and URL are required' },
        { status: 400 }
      );
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Please provide a valid URL' },
        { status: 400 }
      );
    }
    
    const supabase = createServerClient();
    
    // Check if this platform already exists
    const { data: existing } = await supabase
      .from('social_links')
      .select('id')
      .eq('platform', platform.toLowerCase())
      .single();
    
    let result;
    if (existing) {
      // Update existing record
      result = await supabase
        .from('social_links')
        .update({
          url: url.trim(),
          platform: platform.toLowerCase()
        })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      // Create new record
      result = await supabase
        .from('social_links')
        .insert({
          platform: platform.toLowerCase(),
          url: url.trim()
        })
        .select()
        .single();
    }
    
    if (result.error) {
      console.error('Error saving social link:', result.error);
      return NextResponse.json(
        { error: 'Failed to save social link' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 