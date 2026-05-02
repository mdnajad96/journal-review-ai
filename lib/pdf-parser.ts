/**
 * PDF and Document Parser
 * Handles extraction of text from PDFs and parsing of Endnote exports
 */

interface ParseResult {
  success: boolean;
  data?: string;
  error?: string;
}

interface BibtexEntry {
  type: string;
  key: string;
  fields: Record<string, string>;
}

/**
 * Extract text from PDF (client-side processing)
 * Note: For production, use pdf-parse library on backend
 * @param file - PDF File object
 * @returns Extracted text
 */
export async function extractPdfText(file: File): Promise<ParseResult> {
  try {
    if (file.type !== 'application/pdf') {
      throw new Error('File must be a PDF');
    }

    // This is a placeholder - in production use pdf-parse or pdfjs
    // For now, return a message that processing will happen on backend
    return {
      success: true,
      data: `PDF file "${file.name}" received for processing. Backend will extract text.`,
    };
  } catch (error) {
    console.error('Error in extractPdfText:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Parse BibTeX format (from Endnote export)
 * @param bibtexContent - BibTeX formatted string
 * @returns Array of parsed entries
 */
export function parseBibTeX(bibtexContent: string): BibtexEntry[] {
  const entries: BibtexEntry[] = [];

  // Regex to match BibTeX entries: @type{key, fields}
  const entryRegex = /@(\w+)\s*\{\s*([^,]+)\s*,([^}]+)\}/g;
  let match;

  while ((match = entryRegex.exec(bibtexContent)) !== null) {
    const type = match[1];
    const key = match[2].trim();
    const fieldsStr = match[3];

    // Parse fields
    const fields: Record<string, string> = {};
    const fieldRegex = /(\w+)\s*=\s*[{\"](.*?)["}]/g;
    let fieldMatch;

    while ((fieldMatch = fieldRegex.exec(fieldsStr)) !== null) {
      const fieldName = fieldMatch[1].toLowerCase();
      const fieldValue = fieldMatch[2].trim();
      fields[fieldName] = fieldValue;
    }

    entries.push({ type, key, fields });
  }

  return entries;
}

/**
 * Parse Endnote XML export
 * @param xmlContent - XML formatted string from Endnote
 * @returns Array of parsed entries
 */
export function parseEndnoteXML(xmlContent: string): BibtexEntry[] {
  const entries: BibtexEntry[] = [];

  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');

    const parserError = xmlDoc.getElementsByTagName('parsererror');
    if (parserError.length > 0) {
      throw new Error('Invalid XML format');
    }

    // Parse Records/Reference tags
    const records = xmlDoc.getElementsByTagName('Record');

    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const fields: Record<string, string> = {};

      // Extract common fields from Endnote XML
      const fieldElements = record.getElementsByTagName('Field');
      for (let j = 0; j < fieldElements.length; j++) {
        const field = fieldElements[j];
        const name = field.getAttribute('name') || '';
        const value = field.textContent || '';
        fields[name.toLowerCase()] = value;
      }

      entries.push({
        type: 'article',
        key: fields.accession || `ref_${i}`,
        fields,
      });
    }
  } catch (error) {
    console.error('Error parsing Endnote XML:', error);
  }

  return entries;
}

/**
 * Convert parsed entries to readable format
 * @param entries - Array of parsed BibTeX/Endnote entries
 * @returns Formatted string
 */
export function formatEntries(entries: BibtexEntry[]): string {
  return entries
    .map((entry) => {
      const title = entry.fields.title || entry.fields.Title || 'Unknown Title';
      const authors = entry.fields.author || entry.fields.Author || 'Unknown Authors';
      const year = entry.fields.year || entry.fields.Year || 'Unknown Year';
      return `${title}\nBy: ${authors} (${year})`;
    })
    .join('\n\n---\n\n');
}
