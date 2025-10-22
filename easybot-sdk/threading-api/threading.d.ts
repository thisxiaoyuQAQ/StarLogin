/**
 * 线程API，提供给JavaScript环境使用的定时器功能
 */
declare namespace threading {
    /**
     * 创建一个定时器，在指定的延迟后执行回调函数
     * @param callback 回调函数
     * @param delay 延迟时间（毫秒）
     * @returns 定时器ID
     */
    function setTimeout(callback: () => void, delay: number): number;

    /**
     * 创建一个间隔定时器，每隔指定的时间执行回调函数
     * @param callback 回调函数
     * @param interval 间隔时间（毫秒）
     * @returns 定时器ID
     */
    function setInterval(callback: () => void, interval: number): number;

    /**
     * 清除定时器
     * @param timerId 定时器ID
     * @returns 是否成功清除
     */
    function clearTimeout(timerId: number): boolean;

    /**
     * 清除间隔定时器
     * @param timerId 定时器ID
     * @returns 是否成功清除
     */
    function clearInterval(timerId: number): boolean;
}

/**
 * 创建一个定时器，在指定的延迟后执行回调函数
 * @param callback 回调函数
 * @param delay 延迟时间（毫秒），默认为0
 * @returns 定时器ID
 */
declare function setTimeout(callback: Function, delay?: number, ...args: any[]): number;

/**
 * 创建一个间隔定时器，每隔指定的时间执行回调函数
 * @param callback 回调函数
 * @param interval 间隔时间（毫秒），默认为0
 * @returns 定时器ID
 */
declare function setInterval(callback: Function, interval?: number, ...args: any[]): number;

/**
 * 清除定时器
 * @param timerId 定时器ID
 */
declare function clearTimeout(timerId: number): void;

/**
 * 清除间隔定时器
 * @param timerId 定时器ID
 */
declare function clearInterval(timerId: number): void;