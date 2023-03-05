import type { JsonSchema } from '../types';

export interface HTMLListSchema extends Omit<
    JsonSchema, 
    'operands' | 'operator' | 'filePreviewProps' | 'inlineEditField' | 
    'defaultHoverField' | 'customCardProps' |  'children' |
    'customRowAction' | 'forEach' | 'debugMode' | '$schema' 
> {
    children: HTMLListSchema[];
};

export class SchemaToHtmlParser {
    constructor(
        /**You can pass a parsed `HTMLListSchema` to the constructor to make the parser faster, 
         *otherwise the `parse` will call `schemaAdapter` to adapt the object.*/
        private parsedSchema?: HTMLListSchema) {
            this.schemaAdapter = this.schemaAdapter.bind(this);
        }

    schemaAdapter(schema: JsonSchema): HTMLListSchema {
        const newSchema = {} as HTMLListSchema;
        const keys: Array<keyof HTMLListSchema> = ['id', 'elmType', 'attributes', 'style', 'txtContent', 'children'];
        for (const key of keys) {
            if (schema[key]) {
                if(key === 'children') {
                    newSchema['children'] = schema?.children?.map(this.schemaAdapter)!;
                }
               //@ts-ignore
                else newSchema[key] = schema[key];
            }
        }
        return newSchema;
    }
    
    parse(schema: JsonSchema): string {
        let html = `<${schema.elmType}`;
        const adaptedSchema = this.parsedSchema ?? this.schemaAdapter(schema);
    
        if (adaptedSchema.attributes)
            for (const [key, value] of Object.entries(adaptedSchema.attributes))
                html += ` ${key}="${value}"`;
    
        if (adaptedSchema.style) {
            html += ` style="`;
            for (const [key, value] of Object.entries(adaptedSchema.style))
                html += `${key}: ${value}; `;
            html += `"`;
        }
    
        if (adaptedSchema.txtContent) 
            html += `>${adaptedSchema.txtContent}</${adaptedSchema.elmType}>`;
    
        if (adaptedSchema.children) {
            html += `>`;
            for (const child of adaptedSchema.children) 
                html += this.parse(child as JsonSchema);
            html += `</${adaptedSchema.elmType}>`;
        }
        else if(!adaptedSchema?.txtContent && !adaptedSchema?.children)
            html +=  `></${adaptedSchema.elmType}>`;
        return html;
    }
}