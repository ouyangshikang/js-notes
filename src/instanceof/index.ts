/**
 * 实现一个 instanceof
 * @param target 目标对象
 * @param constructor 构造函数(function 或者 class)
 */
export function myInstanceof(target: any, constructor: any) {
    if (target == null) return false;

    if (!['object', 'function'].includes(typeof target)) {
        // 值类型
        return false;
    }

    let targetPrototype = target.__proto__;
    while (targetPrototype) {
        if (targetPrototype === constructor.prototype) {
            return true;
        }
        // 继续向上查找原型链
        targetPrototype = targetPrototype.__proto__;
    }
    return false;
}
