export interface ListSchema {
    elmType: string;
    attributes?: Record<string, string>;
    txtContent?: string;
    style?: Record<string, string>;
    children?: ListSchema[];
}

export function convertSchemaToHtml(schema: ListSchema): string {
    let html = `<${schema.elmType}`;

    if (schema.attributes)
        for (const [key, value] of Object.entries(schema.attributes))
            html += ` ${key}="${value}"`;

    if (schema.style) {
        html += ` style="`;
        for (const [key, value] of Object.entries(schema.style))
            html += `${key}: ${value}; `;
        html += `"`;
    }

    if (schema.txtContent)
        html += `>${schema.txtContent}</${schema.elmType}>`;

    if (schema.children) {
        html += `>`;

        for (const child of schema.children)
            html += convertSchemaToHtml(child);
        html += `</${schema.elmType}>`;
    }
    else
        html += `></${schema.elmType}>`;

    return html;
}