import { ElementTypes, Attributes, Styles, SCHEMA } from "../constants";

type AttributesConfig = Array<Partial<Record<Attributes, string>>>;
type StylesConfig = Array<Partial<Record<Styles, string>>>;
type FormatterOptions = {
    tag: ElementTypes,
    attrs?: AttributesConfig;
    style?: StylesConfig;
};


interface InitialState {
    addChildren: (builder: ListFormatterBuilder) => ChildrenState;
}

/*interface ElementState {
    addElement(
        config: FormatterOptions,
        callback?: (builder: ChildrenState) => ChildrenState
    ): this
    addChildren: (builder: ListFormatterBuilder) => ChildrenState;
}*/

interface ChildrenState {
    addElement(
        config: FormatterOptions,
        callback?: (builder: ChildrenState) => ChildrenState
    ): this
    addChildren: (builder: ListFormatterBuilder) => ChildrenState;
    build: () => Record<string, any>;
}

export class ListFormatterBuilder {
    private result: Record<string, any> = {$schema: SCHEMA};

    static init(elmType: string): ListFormatterBuilder {
        const builder = new ListFormatterBuilder();
        builder.result.elmType = elmType;
        return builder as unknown as ListFormatterBuilder & InitialState;
    }

    addElement(
        config: FormatterOptions,
        callback?: (builder: ChildrenState) => ChildrenState
    ): ChildrenState {
        if (!this.result.children) {
            this.result.children = [];
        }
        const element: Record<string, any> = { elmType: config.tag };
        if(config?.style)
            element.style = Object.assign({}, ...config?.style);
        if(config?.attrs)
            element.attributes = Object.assign({}, ...config?.attrs);
        if (callback) {
            const childBuilder = callback(new ListFormatterBuilder() as unknown as ChildrenState);
            //@ts-ignore
            element.children = childBuilder.build().children;
        }
        this.result.children.push(element);
        return this as unknown as ChildrenState;
    }

    addChildren(
        callback: (builder: ChildrenState) => ChildrenState
    ): this {
        if (!this.result.children) {
            this.result.children = [];
        }
        const childBuilder = callback(new ListFormatterBuilder() as unknown as ChildrenState);
        //@ts-ignore
        this.result.children.push(...childBuilder.build().children);
        return this;
    }

    build(): Record<string, any> {
        return this.result;
    }
}