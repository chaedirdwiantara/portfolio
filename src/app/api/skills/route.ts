import { NextRequest, NextResponse } from 'next/server';
import { createBrowserClient } from '@/app/lib/supabase/client';

export async function GET() {
  try {
    const supabase = createBrowserClient();
    
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error fetching skills:', error);
      return NextResponse.json(
        { error: 'Failed to fetch skills' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
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
    const { category, name, level } = body;
    
    // Validate required fields
    if (!category || !name || !level) {
      return NextResponse.json(
        { error: 'Category, name, and level are required' },
        { status: 400 }
      );
    }
    
    // Validate level range
    if (level < 1 || level > 5) {
      return NextResponse.json(
        { error: 'Level must be between 1 and 5' },
        { status: 400 }
      );
    }
    
    const supabase = createBrowserClient();
    
    const { data, error } = await supabase
      .from('skills')
      .insert({
        category: category.trim(),
        name: name.trim(),
        level: parseInt(level)
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating skill:', error);
      return NextResponse.json(
        { error: 'Failed to create skill' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 