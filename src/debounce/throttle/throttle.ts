/**
 * 节流函数
 * @param fn 执行的回调函数
 * @param delay 延迟时间
 */
function throttle(fn: () => void, delay: number = 100) {
    let timer: any = null;

    return function (this: void, ...args: any) {
        if (timer) return;

        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay);
    };
}
