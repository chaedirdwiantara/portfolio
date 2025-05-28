import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/app/lib/supabase/client';

export async function GET() {
  try {
    const supabase = createServerClient();
    
    // Get the first (most recent) contact info record
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (error) {
      console.error('Error fetching contact info:', error);
      return NextResponse.json(
        { error: 'Failed to fetch contact info' },
        { status: 500 }
      );
    }
    
    // Return the first record or null if no records exist
    return NextResponse.json(data && data.length > 0 ? data[0] : null);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, email, phone, location, office_hours } = body;
    
    console.log('Received data:', { title, description, email, phone, location, office_hours });
    
    if (!title || !description || !email) {
      return NextResponse.json(
        { error: 'Title, description, and email are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    const supabase = createServerClient();
    
    // Try to delete all existing records first (this will help us avoid the update issue)
    await supabase
      .from('contact_info')
      .delete()
      .neq('id', 0); // This will delete all records
    
    // Insert new record
    const { data, error } = await supabase
      .from('contact_info')
      .insert({
        title: title.trim(),
        description: description.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        location: location?.trim() || null,
        office_hours
      })
      .select()
      .single();
    
    console.log('Insert result:', { data, error });
    
    if (error) {
      console.error('Error saving contact info:', error);
      
      // If it's an RLS error, let's try to provide a helpful message
      if (error.message.includes('row-level security')) {
        return NextResponse.json(
          { error: 'Database security policy prevents this operation. Please check your Supabase RLS settings.' },
          { status: 403 }
        );
      }
      
      return NextResponse.json(
        { error: `Failed to save contact info: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error in PUT /api/contact-info:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
} 