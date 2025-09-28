import * as cheerio from 'cheerio';
import { JSDOM } from 'jsdom';
import { IFormField } from '../models/Form';

export interface ExtractionResult {
  fields: IFormField[];
  confidence: number;
  processingTime: number;
}

export class FormExtractorService {
  static async extractFromHtml(htmlContent: string): Promise<ExtractionResult> {
    const startTime = Date.now();
    
    try {
      const $ = cheerio.load(htmlContent);
      const fields: IFormField[] = [];
      
      // Extract form elements
      $('form').each((formIndex, formElement) => {
        $(formElement).find('input, select, textarea').each((index, element) => {
          const $element = $(element);
          const tagName = element.tagName.toLowerCase();
          
          const field: IFormField = {
            name: $element.attr('name') || `field_${index}`,
            type: this.mapInputType($element.attr('type') || tagName),
            label: this.extractLabel($, $element) || $element.attr('placeholder') || `Field ${index + 1}`,
            required: $element.attr('required') !== undefined,
            placeholder: $element.attr('placeholder'),
            value: $element.attr('value') || $element.text(),
            attributes: this.extractAttributes($element)
          };

          // Extract options for select elements
          if (tagName === 'select') {
            field.options = [];
            $element.find('option').each((optIndex, option) => {
              const optionText = $(option).text().trim();
              if (optionText) {
                field.options!.push(optionText);
              }
            });
          }

          fields.push(field);
        });
      });

      const processingTime = Date.now() - startTime;
      const confidence = this.calculateConfidence(fields, $);

      return {
        fields,
        confidence,
        processingTime
      };
    } catch (error) {
      throw new Error(`Form extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private static mapInputType(type: string): IFormField['type'] {
    const typeMap: Record<string, IFormField['type']> = {
      'text': 'text',
      'email': 'email',
      'number': 'number',
      'password': 'text',
      'tel': 'text',
      'url': 'text',
      'search': 'text',
      'checkbox': 'checkbox',
      'radio': 'radio',
      'file': 'file',
      'select': 'select',
      'textarea': 'textarea'
    };

    return typeMap[type] || 'text';
  }

  private static extractLabel($: cheerio.CheerioAPI, $element: cheerio.Cheerio<cheerio.Element>): string | undefined {
    // Try to find associated label
    const id = $element.attr('id');
    if (id) {
      const label = $(`label[for="${id}"]`).text().trim();
      if (label) return label;
    }

    // Try to find parent label
    const parentLabel = $element.closest('label').text().trim();
    if (parentLabel) return parentLabel;

    // Try to find preceding label
    const prevLabel = $element.prev('label').text().trim();
    if (prevLabel) return prevLabel;

    return undefined;
  }

  private static extractAttributes($element: cheerio.Cheerio<cheerio.Element>): Record<string, string> {
    const attributes: Record<string, string> = {};
    const relevantAttrs = ['class', 'id', 'data-*', 'aria-*'];
    
    const attribs = $element.get(0)?.attribs || {};
    Object.keys(attribs).forEach(key => {
      if (relevantAttrs.some(attr => attr.includes('*') ? key.startsWith(attr.replace('*', '')) : key === attr)) {
        attributes[key] = attribs[key];
      }
    });

    return attributes;
  }

  private static calculateConfidence(fields: IFormField[], $: cheerio.CheerioAPI): number {
    if (fields.length === 0) return 0;

    let score = 0;
    const maxScore = fields.length * 3;

    fields.forEach(field => {
      // Has proper name
      if (field.name && !field.name.startsWith('field_')) score += 1;
      
      // Has label  
      if (field.label && !field.label.startsWith('Field ')) score += 1;
      
      // Has proper type mapping
      if (field.type !== 'text' || field.name.includes('email') || field.name.includes('number')) score += 1;
    });

    // Bonus for well-structured HTML
    if ($('form').length > 0) score += fields.length * 0.2;
    if ($('label').length > 0) score += fields.length * 0.1;

    return Math.min(score / maxScore, 1);
  }
}