/**
 * 手写实现一个 Promise.allSettled
 * @param iterators 可迭代的对象
 */
function promiseAllSettled(iterators: any[]) {
    return new Promise((resolve, reject) => {
        if (!iterators || iterators.length === 0) {
            resolve([]);
        }

        // 结果数组
        let result: any[] = [];
        // 计数器，判断所有任务是否完成
        let count = 0;

        const complete = () => {
            count++;
            if (count === iterators.length) {
                resolve(result);
            }
        };

        for (let i = 0; i < iterators.length; i++) {
            const current = iterators[i];
            if (current instanceof Promise) {
                // promise 对象
                current.then(
                    (res) => {
                        result[i] = { status: 'fulfilled', value: res };
                        complete();
                    },
                    (err) => {
                        result[i] = { status: 'rejected', value: err };
                        complete();
                    }
                );
            } else {
                // 普通值
                result[i] = { status: 'fulfilled', value: current };
                complete();
            }
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

    Promise.allSettled([]).then((res) => console.log(res));
    Promise.allSettled(['a', 'b', fn1(), fn2(), 'c']).then((res) => console.log(res));
    promiseAllSettled([]).then((res) => console.log(res));
    promiseAllSettled(['a', 'b', fn1(), fn2(), 'c']).then((res) => console.log(res));
}
