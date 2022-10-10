/**
 * 异步并发控制
 * @param promiseCreators 异步函数数组
 * @param concurrentCount 并发数量
 * @returns
 */
function pLimit(promiseCreators: Array<() => Promise<any>>, concurrentCount: number) {
    return new Promise((resolve, reject) => {
        const pLength = promiseCreators.length;
        let completeCount = 0;
        let currentIndex = 0;

        function addTask() {
            if (currentIndex < pLength) {
                const p = promiseCreators[currentIndex]();
                currentIndex++;
                p.then(() => {
                    completeCount++;
                    if (completeCount === pLength) {
                        resolve(undefined);
                        return;
                    }

                    addTask();
                }).catch(reject);
            }
        }

        // 控制并发数量
        const firstRunCount = Math.min(concurrentCount, pLength);
        for (let i = 0; i < firstRunCount; i++) {
            addTask();
        }
    });
}

// 测试代码
const fn = (id: number) => {
    return () =>
        new Promise((resolve) => {
            console.log(`start request ${id}`);
            const timeout = Math.random() * 10;
            setTimeout(() => {
                console.log(`end request ${id}`);
                resolve(id);
            }, timeout);
        });
};
const promises = [fn(1), fn(2), fn(3), fn(4), fn(5), fn(6), fn(7), fn(8)];

pLimit(promises, 3);
