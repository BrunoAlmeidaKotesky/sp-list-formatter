import { SCHEMA } from "../constants";
import type { ElementTypes } from '../constants';
import type { FormatterOptions, InitialState, ChildrenState, JsonSchema } from '../types';

export class ListFormatterBuilder {
    public result: Record<string, any> = { $schema: SCHEMA };

    static init(elmType: ElementTypes, config?: Omit<FormatterOptions, 'elmType'>): ListFormatterBuilder {
        const builder = new ListFormatterBuilder();
        builder.result.elmType = elmType;
        ListFormatterBuilder.configFields(builder.result, config as FormatterOptions);
        return builder as unknown as ListFormatterBuilder & InitialState<ListFormatterBuilder>;
    }

    private static configFields(obj: Record<string, any>, config: FormatterOptions) {
        if(!config) return;
        Object.entries(config).forEach(([key, value]) => {
            obj[key] = value;
        });
    }

    addElement(
        config: FormatterOptions,
        callback?: (builder: ChildrenState<ListFormatterBuilder>) => ChildrenState<ListFormatterBuilder>
    ): ChildrenState<ListFormatterBuilder> {
        if (!this.result.children) {
            this.result.children = [];
        }
        const element: Record<string, any> = { elmType: config.elmType };
        ListFormatterBuilder.configFields(element, config);
        if (callback) {
            const childBuilder = callback(new ListFormatterBuilder() as unknown as ChildrenState<ListFormatterBuilder>);
            //@ts-ignore
            element.children = childBuilder.build().children;
        }
        this.result.children.push(element);
        return this as unknown as ChildrenState<ListFormatterBuilder>;
    }

    addChildren(
        callback: (builder: ChildrenState<ListFormatterBuilder>) => ChildrenState<ListFormatterBuilder>
    ): this {
        if (!this.result.children) {
            this.result.children = [];
        }
        const childBuilder = callback(new ListFormatterBuilder() as unknown as ChildrenState<ListFormatterBuilder>);
        //@ts-ignore
        this.result.children.push(...childBuilder.build().children);
        return this;
    }

    addText(text: string): this {
        this.result.txtContent = text;
        if(this.result.children) {
            delete this.result.children;
            console.warn('Text content was added to an element that already had children. The children will be removed.');
        }
        return this;
    }

    build(): JsonSchema {
        return this.result as JsonSchema;
    }
}