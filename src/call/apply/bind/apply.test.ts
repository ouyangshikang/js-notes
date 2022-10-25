import './apply';

function fn(this: any) {
    return this;
}

describe('自定义 apply 函数', () => {
    it('绑定 this - 对象/空', () => {
        // @ts-ignore
        const res = fn.myApply({ x: 100 });
        expect(res).toEqual({ x: 100 });
    });

    it('绑定 this - 基本数据类型', () => {
        // @ts-ignore
        const res = fn.myApply(33);
        expect(+res).toBe(33);

        // @ts-ignore
        const res2 = fn.myApply('string');
        expect(res2.toString()).toBe('string');

        // @ts-ignore
        const res2 = fn.myApply(null);
        expect(res2).toEqual(globalThis);
    });

    it('绑定参数', () => {
        function add(a: number, b: number) {
            return a + b;
        }

        // @ts-ignore
        const res = add.myApply(null, [2, 3]);
        expect(res).toBe(5);
    });
});
