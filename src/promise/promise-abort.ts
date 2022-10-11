/**
 * 利用 Promise.race 实现 Promise.abort 方法
 */
function promiseAbort(p: Promise<any>) {
    let abort = (e?: any) => {};

    let newP = new Promise((resolve, reject) => {
        abort = (e) => reject(e);
    });

    const result = Promise.race([p, newP]);

    return Object.assign(result, { abort });
}

// 测试代码
{
    const fn = new Promise((resolve) => {
        setTimeout(() => {
            resolve('fn');
        }, 2000);
    });

    const p = promiseAbort(fn);

    p.then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });

    p.abort('user abort');
}
