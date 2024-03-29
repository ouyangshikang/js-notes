/**
 * 防抖函数
 * @param fn 执行的回调函数
 * @param delay 延迟时间
 */
function debounce(fn: () => void, delay: number = 200) {
    let timer: any = null;

    // this 是个假的参数，它出现在参数列表的最前面(参考 ts 中 this 的使用)
    return function (this: void, ...args: any) {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay);
    };
}
