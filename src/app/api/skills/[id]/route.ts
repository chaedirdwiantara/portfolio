import { NextRequest, NextResponse } from 'next/server';
import { createBrowserClient } from '@/app/lib/supabase/client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const skillId = parseInt(resolvedParams.id);
    
    if (isNaN(skillId)) {
      return NextResponse.json(
        { error: 'Invalid skill ID' },
        { status: 400 }
      );
    }
    
    const supabase = createBrowserClient();
    
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('id', skillId)
      .single();
    
    if (error) {
      console.error('Error fetching skill:', error);
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const skillId = parseInt(resolvedParams.id);
    
    if (isNaN(skillId)) {
      return NextResponse.json(
        { error: 'Invalid skill ID' },
        { status: 400 }
      );
    }
    
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
      .update({
        category: category.trim(),
        name: name.trim(),
        level: parseInt(level)
      })
      .eq('id', skillId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating skill:', error);
      return NextResponse.json(
        { error: 'Failed to update skill' },
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const skillId = parseInt(resolvedParams.id);
    
    if (isNaN(skillId)) {
      return NextResponse.json(
        { error: 'Invalid skill ID' },
        { status: 400 }
      );
    }
    
    const supabase = createBrowserClient();
    
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', skillId);
    
    if (error) {
      console.error('Error deleting skill:', error);
      return NextResponse.json(
        { error: 'Failed to delete skill' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 