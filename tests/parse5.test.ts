import { parse } from 'parse5';

it('Should parse the most basic html str', () => {
    const result = parse('<body><div>hello world</div></body>', {
        scriptingEnabled: false
    });
    const firstNode = result.childNodes[0];
    if (firstNode.nodeName === 'html' && firstNode.childNodes[1].nodeName === 'body') {
        const div = firstNode.childNodes[1].childNodes[0];
        

        console.log(div);
        expect(div.nodeName).toBe('div');
        expect(firstNode.childNodes).not.toBe(undefined);
        expect(firstNode.childNodes).not.toBe('');
    }
});