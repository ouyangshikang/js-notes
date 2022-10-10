/**
 * 异步并发控制(利用 Promise.race 和 Promise.allSettled | Promise.all)
 * @param promiseTasks 异步任务数组
 * @param concurrentCount 并发数量
 * @returns
 */
async function pLimit2(promiseTasks: Array<() => Promise<any>>, concurrentCount: number) {
    const pLength = promiseTasks.length;
    // 正在执行的异步任务
    const executingTasks: Promise<any>[] = [];

    // 当异步任务数量 > 并发数量，才需要控制并发
    if (pLength > concurrentCount) {
        for (const p of promiseTasks) {
            const task = p();
            executingTasks.push(task);
            task.then(() => executingTasks.splice(executingTasks.indexOf(task), 1));

            if (executingTasks.length >= concurrentCount) {
                // 等待较快的任务完成, 再执行下一次循环
                await Promise.race(executingTasks);
            }
        }
    }

    return Promise.allSettled(promiseTasks);
}

// 测试代码
const asyncFn = (id: number) => {
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
const promisesFn = [
    asyncFn(1),
    asyncFn(2),
    asyncFn(3),
    asyncFn(4),
    asyncFn(5),
    asyncFn(6),
    asyncFn(7),
    asyncFn(8),
];

pLimit2(promisesFn, 3);
