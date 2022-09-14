import { deepClone } from './index';

// 测试数据参考
// const obj = {
//     // 值类型数据
//     name: 'wang',
//     age: 22,
//     nul: null,
//     und: undefined,
//     concat: {
//         tel: '1568552256',
//         qq: '54666651',
//     },
//     // Array
//     skill: ['java', 'c++', 'nodejs'],
//     // Symbol
//     sym: Symbol('b'),
//     // Set
//     set: new Set([1, 2, 3]),
//     // Map
//     map: new Map([
//         ['x', 1],
//         ['y', 2],
//     ]),
//     // 函数
//     fn: () => {},
// };

describe('深拷贝', () => {
    it('值类型', () => {
        expect(deepClone(22)).toBe(22);
        expect(deepClone('wang')).toBe('wang');
        expect(deepClone(null)).toBe(null);
        expect(deepClone(undefined)).toBe(undefined);
    });

    it('数组和对象', () => {
        const obj = {
            concat: {
                tel: '1568552256',
                qq: '54666651',
            },
            skill: ['java', 'c++', 'nodejs'],
        };
        const newObj = deepClone(obj);
        obj.concat.tel = '119';

        expect(newObj.concat.tel).toBe('1568552256');
        expect(newObj.skill).toEqual(['java', 'c++', 'nodejs']);
    });

    it('Map', () => {
        const map = new Map([
            ['x', 1],
            ['y', 2],
        ]);
        const newMap = deepClone(map);

        expect(newMap.size).toBe(2);
    });

    it('Set', () => {
        const set = new Set([1, 2, 3]);
        const newSet = deepClone(set);

        expect(newSet.size).toBe(3);
    });

    it('循环引用', () => {
        const obj: any = { a: 1 };
        obj.self = obj;

        const newObj = deepClone(obj);
        expect(newObj.self).toBe(newObj);
    });
});
