/**
 * 手写实现一个 Promise.race
 * @param iterators 可迭代的对象
 */
function promiseRace(iterators: any[]) {
    return new Promise((resolve, reject) => {
        for (const item of iterators) {
            Promise.resolve(item)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        }
    });
}

// 测试代码
{
    const fn1 = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('fn1');
            }, 2000);
        });
    };

    const fn2 = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('fn2');
            }, 1000);
        });
    };
    promiseRace([fn1(), fn2()]).then((res) => {
        console.log(res);
    });

    // Promise.race([fn1(), fn2()]).then((res) => console.log(res));
}
