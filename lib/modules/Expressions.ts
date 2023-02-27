import type { Operators, Operands } from '../types';

type Condition = `${string} ${Operators} ${string}`;
export class Expressions {
    static If(
        condition: Condition,
        trueValue: string,
        falseValue: string
    ): string {
        return `=if(${condition}, ${trueValue}, ${falseValue})`;
    }
}

export const FIELD_HELPERS = {
    CURRENT_FIELD: "@currentField",
    ME: "@me",
    FIELD: (name: string) => `\$[${name}]` as const
} as const;