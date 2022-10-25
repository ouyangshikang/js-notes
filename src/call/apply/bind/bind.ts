/**
 * 自定义一个 bind 函数
 * @param bindThis 传入的 this
 * @param bindArgs 传入的各个参数
 */

// @ts-ignore
Function.prototype.myBind = function (bindThis: any, ...bindArgs: any[]) {
    const ctx = this;

    return function (...args: any[]) {
        // 拼接参数
        const newArgs = bindArgs.concat(args);

        return ctx.apply(bindThis, newArgs);
    };
};
