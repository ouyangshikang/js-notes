/**
 * 实现一个 new
 * @param constructor 构造函数
 * @param args 构造函数传入的参数
 */
export function customNew<T>(constructor: Function, ...args: any[]): T {
    // 1.创建一个空对象obj，并继承构造函数的原型(obj.__proto__ 指向了构造函数的prototype)。
    const obj = Object.create(constructor.prototype);
    // 2.执行构造函数(将 obj 作为 this，初始化 obj 的 属性,方法)。
    constructor.apply(obj, args);
    // 3. 返回 obj。
    return obj;
}
