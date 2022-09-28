import { customNew } from './index';

describe('custom new', () => {
    it('new', () => {
        class Person {
            // 属性
            name: string;
            age: number;

            constructor(name: string, age: number) {
                this.name = name;
                this.age = age;
            }

            getName() {
                return this.name;
            }
        }
        const p = customNew<Person>(Person, '白陀', 25);
        expect(p.name).toBe('白陀');
        expect(p.getName()).toBe('白陀');
        expect(p.age).toBe(25);
    });
});
