class EventEmitter {
    constructor() {
        // map，用于存储事件名与回调
        this.eventHandlers = {};
    }

    emit(eventName, ...args) {
        if (this.eventHandlers[eventName]) {
            // 做一次浅拷贝，避免通过 once 安装的监听器在移除的过程中出现顺序问题
            const handlers = this.eventHandlers[eventName].slice();

            for (let handler of handlers) {
                handler(...args);
            }
        }
    }

    off(eventName, cb) {
        const callbacks = this.eventHandlers[eventName];
        const index = callbacks.indexof(cb);

        if (index !== -1) {
            callbacks.splice(index, 1);
        }
    }

    on(eventName, cb) {
        if (!this.eventHandlers[eventName]) {
            // 初始化一个监听函数队列
            this.eventHandlers[eventName] = [];
        }

        this.eventHandlers[eventName].push(cb);
    }

    once(eventName, cb) {
        // 对回调函数进行包装，执行完毕自动被移除
        const wrapper = (...args) => {
            cb(...args);
            this.off(eventName, wrapper);
        };

        this.on(eventName, wrapper);
    }
}
