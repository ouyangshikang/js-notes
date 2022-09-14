/**
 * 实现深拷贝方法
 * 考虑 Map, Set 数据类型处理
 * 循环引用处理
 * @param obj {Object} 要深拷贝的对象
 * @param map {WeakMap} 避免循环引用
 */

export function deepClone(obj: any, map = new WeakMap()) {
    if (typeof obj !== 'object' || obj == null) {
        return obj;
    }

    // 避免循环引用
    const objFromMap = map.get(obj);
    if (objFromMap) return objFromMap;

    let result: any = {};
    map.set(obj, result);

    // Map 类型
    if (obj instanceof Map) {
        result = new Map();
        obj.forEach((value, key) => {
            const v = deepClone(value, map);
            const k = deepClone(key, map);
            result.set(k, v);
        });
    }

    // Set 类型
    if (obj instanceof Set) {
        result = new Set();
        obj.forEach((value) => {
            const v = deepClone(value, map);
            result.add(v);
        });
    }

    // Array 类型
    if (Array.isArray(obj)) {
        result = obj.map((value) => deepClone(value, map));
    }

    // Object 类型
    for (const key of Object.keys(obj)) {
        result[key] = deepClone(obj[key], map);
    }

    return result;
}
