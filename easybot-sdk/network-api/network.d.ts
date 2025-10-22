/**
 * 表示HTTP头部集合的接口
 */
declare interface HeaderCollection {
    /**
     * 使用索引器获取或设置头部值
     */
    [key: string]: string;

    /**
     * 设置头部值
     * @param key 头部名称
     * @param value 头部值
     */
    Set(key: string, value: string): void;

    /**
     * 获取头部值
     * @param key 头部名称
     * @returns 头部值，如果不存在则返回空字符串
     */
    Get(key: string): string;

    /**
     * 检查是否包含指定头部
     * @param key 头部名称
     * @returns 是否包含
     */
    Contains(key: string): boolean;

    /**
     * 移除指定头部
     * @param key 头部名称
     * @returns 是否成功移除
     */
    Remove(key: string): boolean;

    /**
     * 清空所有头部
     */
    Clear(): void;

    /**
     * 获取所有头部名称
     * @returns 头部名称集合
     */
    GetKeys(): string[];

    /**
     * 获取所有头部值
     * @returns 头部值集合
     */
    GetValues(): string[];
}

/**
 * 表示HTTP请求消息的结构
 */
declare interface RequestMessage {
    url: string;            // 请求的目标URL
    method: string | "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "TRACE" | "CONNECT";  // HTTP请求方法
    headers: HeaderCollection;           // HTTP请求头部信息
    body?: string;           // HTTP请求体内容
}

/**
 * 表示HTTP响应消息的结构
 */
declare interface ResponseMessage {
    status: number;        // HTTP响应状态码
    headers: HeaderCollection;           // HTTP响应头部信息
    body: string;           // HTTP响应体内容
    data?: any;         // Http返回内容的Json反序列化对象
}

declare namespace network {
    /**
     * 发送自定义HTTP请求
     * @param message 包含完整请求参数的对象
     * @returns 包含响应信息的Promise对象
     */
    function request(message: RequestMessage): Promise<ResponseMessage>;

    /**
     * 发送GET请求
     * @param url 请求的目标URL
     * @returns 包含响应信息的Promise对象
     */
    function get(url: string): Promise<ResponseMessage>;

    /**
     * 发送POST请求
     * @param url 请求的目标URL
     * @param body 要发送的请求体数据
     * @returns 包含响应信息的Promise对象
     */
    function post(url: string, body: any): Promise<ResponseMessage>;

    /**
     * 发送PUT请求
     * @param url 请求的目标URL
     * @param body 要发送的请求体数据
     * @returns 包含响应信息的Promise对象
     */
    function put(url: string, body: any): Promise<ResponseMessage>;

    /**
     * 发送DELETE请求
     * @param url 请求的目标URL
     * @returns 包含响应信息的Promise对象
     */
    function del(url: string): Promise<ResponseMessage>;

    /**
     * 发送HEAD请求
     * @param url 请求的目标URL
     * @returns 包含响应信息的Promise对象
     */
    function head(url: string): Promise<ResponseMessage>;

    /**
     * 发送OPTIONS请求
     * @param url 请求的目标URL
     * @returns 包含响应信息的Promise对象
     */
    function options(url: string): Promise<ResponseMessage>;
}