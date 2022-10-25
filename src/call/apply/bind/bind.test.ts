import './bind';

describe('自定义 bind 函数', () => {
    it('绑定this', () => {
        function fn(this: any) {
            return this;
        }
        // @ts-ignore
        const testFn = fn.myBind({ x: 'test' });
        expect(testFn()).toEqual({ x: 'test' });
    });

    it('绑定参数', () => {
        function fn(a: number, b: number, c: number) {
            return a + b + c;
        }
        // @ts-ignore
        const testFn = fn.myBind(null, 1, 2);
        expect(testFn(3)).toBe(6);
    });
});
