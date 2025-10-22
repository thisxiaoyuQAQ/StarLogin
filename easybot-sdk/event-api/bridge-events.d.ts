/// <reference path="../easybot.d.ts" />

/**
 * 事件总线命名空间，提供WebSocket桥接服务器的事件监听功能
 */
declare namespace bus {

    /**
     * 注册桥接服务器上线事件监听器
     * @param event 事件类型："bridge_server_online"
     * @param handler 事件处理函数，当桥接服务器上线时触发
     * @param handler.server 已上线的桥接服务器实例
     * @param handler.ip 桥接服务器的IP地址
     */
    function on(event: "bridge_server_online", handler: (server: Bridge, ip: string) => void): void;

    /**
     * 注册桥接服务器离线事件监听器
     * @param event 事件类型："bridge_server_offline"
     * @param handler 事件处理函数，当桥接服务器离线时触发
     * @param handler.server 已离线的桥接服务器实例
     * @param handler.closeCode WebSocket关闭状态码
     * @param handler.reason 连接关闭原因描述
     * @param handler.ip 桥接服务器的IP地址
     */
    function on(event: "bridge_server_offline", handler: (server: Bridge, closeCode: number, reason: string, ip: string) => void): void;

    /**
     * 注册无效连接事件监听器
     * @param event 事件类型："bridge_server_invalid_connection"
     * @param handler 事件处理函数，当检测到无效连接时触发
     * @param handler.server 关联的桥接服务器实例
     * @param handler.context 发生异常的WebSocket连接对象
     * @param handler.type 无效连接类型标识 (INVALID_TOKEN=错误的TOKEN, INVALID_PACKET=数据包格式错误, NOAUTH=未通过认证, AUTH_TIMEOUT=认证超时, HEARTBEAT_TIMEOUT=心跳超时)
     * @param handler.ip 客户端的IP地址
     */
    function on(event: "bridge_server_invalid_connection", handler: (server: Bridge, context: WebSocketContext, type: "INVALID_TOKEN" | "INVALID_PACKET" | "NOAUTH" | "AUTH_TIMEOUT" | "HEARTBEAT_TIMEOUT", ip: string) => void): void;

    /**
     * 注册桥接服务器连接建立事件监听器
     * @param event 事件类型："bridge_server_connected"
     * @param handler 事件处理函数，当客户端成功连接时触发
     * @param handler.ip 客户端的IP地址
     */
    function on(event: "bridge_server_connected", handler: (ip: string) => void): void;

    /**
     * 注册桥接服务器连接断开事件监听器
     * @param event 事件类型："bridge_server_disconnected"
     * @param handler 事件处理函数，当客户端连接断开时触发
     * @param handler.server 关联的桥接服务器实例
     * @param handler.ip 客户端的IP地址
     * @param handler.closeCode WebSocket关闭状态码
     * @param handler.reason 连接断开原因描述
     */
    function on(event: "bridge_server_disconnected", handler: (server: Bridge, ip: string, closeCode: number, reason: string) => void): void;

    /**
     * 注册原始数据包接收事件监听器
     * @param event 事件类型："bridge_server_raw_packet"
     * @param handler 事件处理函数，当收到原始数据包时触发
     * @param handler.server 关联的桥接服务器实例
     * @param handler.data 接收到的原始数据字符串
     * @param handler.context 来源WebSocket连接对象
     * @param handler.ip 客户端的IP地址
     * @param handler.authed 标识连接是否已通过认证
     */
    function on(event: "bridge_server_raw_packet", handler: (server: Bridge, data: string, context: WebSocketContext, ip: string, authed: boolean) => void): void;
}