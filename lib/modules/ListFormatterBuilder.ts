import { SCHEMA } from "./constants";
import type { ElementTypes } from './constants';
import type { FormatterOptions, InitialState, ChildrenState, JsonSchema } from '../types';

export class ListFormatterBuilder {
    public result: Record<string, any> = { $schema: SCHEMA };
    public removeId = true;

    /**The type narrowing inference it's not working properly, the only methods that you can use is `addElement` and `addChildren`
     * which is the same as `ChildrenState` interface.
    */
    static init(elmType: ElementTypes, config?: Omit<FormatterOptions, 'elmType'>): ListFormatterBuilder {
        const builder = new ListFormatterBuilder();
        builder.result.elmType = elmType;
        ListFormatterBuilder.#configFields(builder.result, config as FormatterOptions);
        return builder as unknown as ListFormatterBuilder & InitialState;
    }

    static #configFields(obj: Record<string, any>, config: FormatterOptions) {
        if(!config) return;
        Object.entries(config).forEach(([key, value]) => {
            obj[key] = value;
        });
    }

    public findNodeById(id: string, modifyCb?: (foundNode: JsonSchema) => void): Record<string, any> {
        let result: Record<string, any> = this.result;
        const search = (node: Record<string, any>) => {
            if(node?.id === id) {
                result = node;
                if(result && modifyCb) 
                    modifyCb(result as JsonSchema);
                return
            }
            if(node?.children) {
                node?.children?.forEach((child: Record<string, any>) => {
                    search(child);
                });
            }
        }
         search(this.result);
        return result;
    }

    addElement(
        config: FormatterOptions,
        callback?: (builder: ChildrenState) => ChildrenState
    ): ChildrenState {
        if (!this.result.children && !this.result?.txtContent)
            this.result.children = [];
        const element: Record<string, any> = { elmType: config.elmType };
        ListFormatterBuilder.#configFields(element, config);
        if (callback) {
            const childBuilder = callback(new ListFormatterBuilder() as unknown as ChildrenState);
            //@ts-ignore
            if(!element.txtContent) {
                this.removeId = false;
                element.children = childBuilder.build().children;
            }
        }
        this.result.children.push(element);
        return this as unknown as ChildrenState;
    }

    addChildren(
        callback: (builder: ChildrenState) => ChildrenState
    ): this {
        if (!this.result.children && !this.result?.txtContent)
            this.result.children = [];
        const childBuilder = callback(new ListFormatterBuilder() as unknown as ChildrenState);
        //@ts-ignore
        if(!this.result?.txtContent) {
            this.removeId = false;
            this.result.children.push(...childBuilder.build().children);
        }
        return this;
    }

    #deleteIds(result: Record<string, any>) {
        if(result.id) delete result.id;
        if(result.children) {
            result.children.forEach((child: Record<string, any>) => {
                this.#deleteIds(child);
            });
        }
    }

    build(): JsonSchema {
        if(this.removeId) this.#deleteIds(this.result);
        return this.result as JsonSchema;
    }
}