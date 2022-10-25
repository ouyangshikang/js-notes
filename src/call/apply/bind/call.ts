/**
 * 自定义 call 函数
 */
// @ts-ignore
Function.prototype.myCall = function (thisArg: any, ...args: any[]) {
    // thisArg 为空时, 默认绑定 window 对象
    if (thisArg === null || thisArg === undefined) {
        thisArg = globalThis;
    }
    // thisArg 是值类型的时候，转换为对应的包装对象类型
    if (typeof thisArg !== 'object') {
        thisArg = new Object(thisArg);
    }

    // 避免出现属性名称的覆盖
    const fn = Symbol();
    // this 是当前函数
    thisArg[fn] = this;
    // 执行当前函数
    const result = thisArg[fn](...args);
    // 删除声明的 fn
    delete thisArg[fn];

    return result;
};
