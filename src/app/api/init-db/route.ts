import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST() {
  try {
    // This is a helper endpoint to verify tables exist
    // You still need to run the SQL schema in Supabase dashboard
    
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('id')
      .limit(1);
    
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id')
      .limit(1);
    
    const { data: experiences, error: experiencesError } = await supabase
      .from('experiences')
      .select('id')
      .limit(1);

    if (messagesError || projectsError || experiencesError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tables not found. Please run the SQL schema in Supabase dashboard.',
          details: {
            messages: messagesError?.message,
            projects: projectsError?.message,
            experiences: experiencesError?.message,
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'All tables exist and are accessible',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
