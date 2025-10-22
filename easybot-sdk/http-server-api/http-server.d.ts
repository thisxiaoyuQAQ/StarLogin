/**
 * HTTP请求处理函数
 */
declare type HttpRequestHandler = (request: RequestMessage, response: ResponseMessage) => void | ResponseMessage;

// 确保RequestMessage和ResponseMessage类型在此文件中可用
// 如果它们在network.d.ts中定义，这里需要重新声明或引用
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

/**
 * HTTP服务器API
 */
declare interface HttpServerApi {
    /**
     * 创建HTTP服务器
     * @param port 监听端口
     * @param id 服务器ID，如果为空则自动生成
     * @param host 监听地址，默认为localhost
     * @returns 服务器ID
     */
    CreateServer(port: number, id?: string, host?: string): string;
    
    /**
     * 启动HTTP服务器
     * @param id 服务器ID
     * @returns 是否启动成功的Promise
     */
    StartServerAsync(id: string): Promise<boolean>;
    
    /**
     * 停止HTTP服务器
     * @param id 服务器ID
     * @returns 是否停止成功的Promise
     */
    StopServerAsync(id: string): Promise<boolean>;
    
    /**
     * 注册GET请求路由
     * @param serverId 服务器ID
     * @param path 路径
     * @param handler 处理函数
     * @returns 是否注册成功
     */
    OnGet(serverId: string, path: string, handler: HttpRequestHandler): boolean;
    
    /**
     * 注册POST请求路由
     * @param serverId 服务器ID
     * @param path 路径
     * @param handler 处理函数
     * @returns 是否注册成功
     */
    OnPost(serverId: string, path: string, handler: HttpRequestHandler): boolean;
    
    /**
     * 注册PUT请求路由
     * @param serverId 服务器ID
     * @param path 路径
     * @param handler 处理函数
     * @returns 是否注册成功
     */
    OnPut(serverId: string, path: string, handler: HttpRequestHandler): boolean;
    
    /**
     * 注册DELETE请求路由
     * @param serverId 服务器ID
     * @param path 路径
     * @param handler 处理函数
     * @returns 是否注册成功
     */
    OnDelete(serverId: string, path: string, handler: HttpRequestHandler): boolean;
    
    /**
     * 注册任意HTTP方法的路由
     * @param serverId 服务器ID
     * @param method HTTP方法
     * @param path 路径
     * @param handler 处理函数
     * @returns 是否注册成功
     */
    OnRequest(serverId: string, method: string, path: string, handler: HttpRequestHandler): boolean;
    
    /**
     * 取消注册路由
     * @param serverId 服务器ID
     * @param method HTTP方法
     * @param path 路径
     * @returns 是否取消成功
     */
    OffRequest(serverId: string, method: string, path: string): boolean;
    
    /**
     * 获取服务器状态
     * @param serverId 服务器ID
     * @returns 服务器是否运行中
     */
    IsServerRunning(serverId: string): boolean;
    
    /**
     * 获取服务器地址
     * @param serverId 服务器ID
     * @returns 服务器地址
     */
    GetServerAddress(serverId: string): string;
    
    /**
     * 销毁服务器
     * @param serverId 服务器ID
     * @returns 是否销毁成功的Promise
     */
    DestroyServerAsync(serverId: string): Promise<boolean>;
    
    /**
     * 获取所有服务器ID
     * @returns 服务器ID列表
     */
    GetServerIds(): string[];
}

declare const httpServer: HttpServerApi;