/**
 * Database Service - Supabase Integration
 * Handles data persistence for papers, users, and analysis
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface Paper {
  id: string;
  userId: string;
  title: string;
  authors: string[];
  abstract: string;
  summary: string;
  keyFindings: string[];
  fileUrl: string;
  source: 'upload' | 'arxiv' | 'crossref';
  createdAt: string;
  updatedAt: string;
}

export interface Analysis {
  id: string;
  paperId: string;
  type: 'summary' | 'keyFindings' | 'proposal' | 'review';
  content: string;
  createdAt: string;
}

/**
 * Initialize database tables (run once during setup)
 */
export async function initializeDatabase() {
  try {
    // Tables will be created via Supabase dashboard
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

/**
 * Save paper to database
 */
export async function savePaper(paper: Omit<Paper, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data, error } = await supabase
    .from('papers')
    .insert([{
      ...paper,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }])
    .select();

  if (error) throw error;
  return data?.[0];
}

/**
 * Get user's papers
 */
export async function getUserPapers(userId: string) {
  const { data, error } = await supabase
    .from('papers')
    .select('*')
    .eq('userId', userId)
    .order('createdAt', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Save analysis result
 */
export async function saveAnalysis(analysis: Omit<Analysis, 'id' | 'createdAt'>) {
  const { data, error } = await supabase
    .from('analyses')
    .insert([{
      ...analysis,
      createdAt: new Date().toISOString(),
    }])
    .select();

  if (error) throw error;
  return data?.[0];
}

/**
 * Get paper analyses
 */
export async function getPaperAnalyses(paperId: string) {
  const { data, error } = await supabase
    .from('analyses')
    .select('*')
    .eq('paperId', paperId)
    .order('createdAt', { ascending: false });

  if (error) throw error;
  return data;
}
