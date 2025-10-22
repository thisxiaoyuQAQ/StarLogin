/// <reference path="../csharp-std/types.d.ts" />

/**
     * 表示 WebSocket 连接状态
     */
declare enum WebSocketState {
    // 连接中
    Connecting,
    // 已打开
    Open,
    // 关闭中
    Closing,
    // 已关闭
    Closed
}

/**
 * 表示 WebSocket 连接
 */
declare class WebSocket {
    // 连接是否存活
    readonly IsAlive: boolean;
    // 连接是否安全（wss）
    readonly IsSecure: boolean;
    // 当前连接状态
    readonly ReadyState: WebSocketState;
    // 等待响应时间
    WaitTime: number;
    // 是否禁用 Nagle 算法
    NoDelay: boolean;

    /**
     * 关闭连接
     * @param code 关闭状态码
     * @param reason 关闭原因
     */
    Close(code?: number | CloseStatusCode, reason?: string): void;

    /**
     * 异步关闭连接
     */
    CloseAsync(): void;

    /**
     * 发送 ping 检测连接
     * @returns 是否收到 pong 响应
     */
    Ping(): boolean;

    /**
     * 发送二进制数据
     * @param data 二进制数据
     */
    Send(data: number[]): void;

    /**
     * 发送文件数据
     * @param file 文件信息对象
     */
    Send(file: FileInfo): void;

    /**
     * 发送文本数据
     * @param data 文本数据
     */
    Send(data: string): void;
}

/**
 * WebSocket上下文接口，包含与WebSocket连接相关的请求信息和连接对象
 * 所有属性均为只读(readonly)，表示在连接建立后上下文信息不可变更
 */
declare interface WebSocketContext {
    /** Cookie集合对象，包含客户端发送的所有Cookie信息 */
    readonly CookieCollection: any;
    /** HTTP请求头集合，包含客户端发送的所有HTTP头信息 */
    readonly Headers: any;
    /** 请求的目标主机名（例如："example.com:8080"） */
    readonly Host: string;
    /** 标识当前连接是否经过身份验证 */
    readonly IsAuthenticated: boolean;
    /** 标识连接是否来自本地地址（如localhost或127.0.0.1） */
    readonly IsLocal: boolean;
    /** 标识连接是否使用安全协议（如wss://） */
    readonly IsSecureConnection: boolean;
    /** 标识当前请求是否为WebSocket升级请求 */
    readonly IsWebSocketRequest: boolean;
    /** 请求来源（根据Origin请求头） */
    readonly Origin: string;
    /** URL查询参数集合对象 */
    readonly QueryString: any;
    /** 客户端请求的URI（统一资源标识符） */
    readonly RequestUri: any; // Instead of Uri, we use any.
    /** WebSocket握手阶段使用的密钥（Sec-WebSocket-Key头） */
    readonly SecWebSocketKey: string;
    /** 客户端支持的子协议列表（Sec-WebSocket-Protocol头） */
    readonly SecWebSocketProtocols: string[];
    /** WebSocket协议版本（Sec-WebSocket-Version头） */
    readonly SecWebSocketVersion: string;
    /** 服务器端终结点信息（包含IP地址和端口） */
    readonly ServerEndPoint: IPEndPoint;
    /** 经过身份验证后的用户信息对象 */
    readonly User: any;
    /** 客户端终结点信息（包含IP地址和端口） */
    readonly UserEndPoint: IPEndPoint;
    /** 已建立的WebSocket连接实例 */
    readonly WebSocket: WebSocket;
}