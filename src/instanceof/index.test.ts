import { customInstanceof } from './index';

describe('customInstanceof', () => {
    it('null undefined', () => {
        const res1 = customInstanceof(null, Object);
        expect(res1).toBe(false);

        const res2 = customInstanceof(undefined, Object);
        expect(res2).toBe(false);
    });

    it('值类型', () => {
        const res1 = customInstanceof(100, Number);
        expect(res1).toBe(false);

        const res2 = customInstanceof('a', String);
        expect(res2).toBe(false);
    });

    it('引用类型', () => {
        const res1 = customInstanceof([], Array);
        expect(res1).toBe(true);

        const res2 = customInstanceof({}, Object);
        expect(res2).toBe(true);

        const res3 = customInstanceof({}, Array);
        expect(res3).toBe(false);
    });

    it('函数', () => {
        const fn = () => {};
        const res = customInstanceof(fn, Function);
        expect(res).toBe(true);
    });

    it('自定义', () => {
        class Foo {}
        const f = new Foo();
        const res1 = customInstanceof(f, Foo);
        expect(res1).toBe(true);

        const res2 = customInstanceof(f, Object);
        expect(res2).toBe(true);
    });
});
