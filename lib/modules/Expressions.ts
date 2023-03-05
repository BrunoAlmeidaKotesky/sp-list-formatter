import type { Operators, Operands } from '../types';

type Condition = `${string} ${Operators} ${string}`;
type ComparisonOperation = {operator: Operators, operands: [Operands, Operands]};
export class Expressions {
    static If(
        condition: Condition,
        trueValue: string,
        falseValue: string,
        /**Set this to true if your `if` is not at the beginning of the expression (string). */
        removeEq = false
    ): string {
        return `=if(${condition}, ${trueValue}, ${falseValue}`.replace('=', removeEq ? '' : '=');
    }

    static And(...operands: Operands[]): [Operators, Operands] {
        return ["&&", operands];
    }

    static Or(...operands: Operands[]): [Operators, Operands] {
        return ["||", operands];
    }

    static Equals(leftOperand: Operands, rightOperand: Operands): ComparisonOperation {
        return {
            operator: "==",
            operands: [leftOperand, rightOperand]
        };
    }

    static NotEquals(leftOperand: Operands, rightOperand: Operands): ComparisonOperation {
        return {
            operator: "!=",
            operands: [leftOperand, rightOperand]
        };
    }
}

export const FIELD_HELPERS = {
    CURRENT_FIELD: "@currentField",
    ME: "@me",
    FIELD: (name: string) => `\$[${name}]` as const,
    CURRENT_WEB: "@currentWeb",
    NOW: "@now",
    ROW_IDX: "@rowIndex",
    WIN_HEIGHT: "@window.innerHeight",
    WIN_WIDTH: "@window.innerWidth",
    THUMBNAILS: {
        SMALL: "@thumbnails.small",
        MEDIUM: "@thumbnails.medium",
        LARGE: "@thumbnails.large",
        SIZE: (size: number) => `@thumbnails.${size}` as const,
        SIZE_WH: (width: number, height: number) => `@thumbnails.${width}x${height}` as const
    },
    IS_SELECTED: "@isSelected",
    LCID: "@lcid",
    UILCID: "@UIlcid"
} as const;

/*
Proposal state machine for the new expression builder:
function function createStateMachine<States extends string, TagIds extends string>(
    events: {
        for: [States, TagIds, FormatterOptions][],
        transitions: Array<{
            from: States,
            to: States,
            when: {
                operator: Operators,
                operands: Operands
            }
        }>
    }
)*/