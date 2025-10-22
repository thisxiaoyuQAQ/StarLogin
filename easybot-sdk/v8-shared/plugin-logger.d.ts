declare namespace logger {
    /**
     * 记录信息级别日志（原始 Info 方法被映射为 info）
     * @param message 日志消息
     */
    function info(message: string): void;
    
    /**
     * 记录带格式化参数的信息级别日志
     * @param message 格式化字符串（如 "User {0} logged in"）
     * @param args 格式化参数
     */
    function info(message: string, ...args: any[]): void;

    /**
     * 记录警告级别日志（原始 Warn 方法被映射为 warning）
     * @param message 日志消息
     */
    function warning(message: string): void;
    
    /**
     * 记录带格式化参数的警告级别日志
     * @param message 格式化字符串
     * @param args 格式化参数
     */
    function warning(message: string, ...args: any[]): void;

    /**
     * 记录错误级别日志（保持 error 名称不变）
     * @param message 日志消息
     */
    function error(message: string): void;
    
    /**
     * 记录带格式化参数的错误级别日志
     * @param message 格式化字符串
     * @param args 格式化参数
     */
    function error(message: string, ...args: any[]): void;
}
