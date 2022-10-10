/**
 * 手写实现一个 Promise.all
 * @param iterators 可迭代的对象
 */
function promiseAll(iterators: any[]) {
    return new Promise((resolve, reject) => {
        if (!iterators || iterators.length === 0) {
            resolve([]);
        }

        // 结果数组
        let result: any[] = [];
        // 计数器，判断所有任务是否完成
        let count = 0;

        const addResult = (key: any, value: any) => {
            result[key] = value;
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
                        addResult(i, res);
                    },
                    (err) => {
                        reject(err);
                    }
                );
            } else {
                // 普通值
                addResult(i, current);
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
    promiseAll([]).then((res) => console.log(res));
    promiseAll(['a', 'b', fn1(), fn2(), 'c']).then((res) => {
        console.log(res);
    });

    // Promise.all([]).then((res) => console.log(res));
    // Promise.all(['a', 'b', fn1(), fn2(), 'c']).then((res) => console.log(res));
}
