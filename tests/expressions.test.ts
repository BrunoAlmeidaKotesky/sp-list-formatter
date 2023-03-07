import {Expressions} from '../lib';

const {And, Equals, If, InlineIf, NotEquals, Or} = Expressions;

it('Should generate a simple inline if statement', () => {
    const expression = InlineIf('1 == 1', 'true', 'false');
    expect(expression).toBe("=if(1 == 1, 'true', 'false'");
});

it('Should use Equals, And Or and NotEquals', () => {
    const expression = And(
        Equals('1', '1'),
        Equals('2', '2'),
        Or(
            Equals('1', '1'),
            Equals('2', '2'),
            NotEquals('3', '3')
        ),
    )
    console.log(expression);
    expect(expression).toEqual({});
});