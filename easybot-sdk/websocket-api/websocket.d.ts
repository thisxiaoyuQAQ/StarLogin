/**
 * WebSocket API，提供给JavaScript环境使用的WebSocket客户端和服务器功能
 */
declare namespace ws {
    /**
     * 创建WebSocket客户端
     * @param url WebSocket服务器地址
     * @param id 客户端ID，如果为空则自动生成
     * @returns 客户端ID
     */
    function CreateClient(url: string, id?: string): string;

    /**
     * 连接WebSocket服务器
     * @param id 客户端ID
     * @returns 是否连接成功
     */
    function ConnectAsync(id: string): Promise<boolean>;

    /**
     * 断开WebSocket连接
     * @param id 客户端ID
     * @returns 是否断开成功
     */
    function DisconnectAsync(id: string): Promise<boolean>;

    /**
     * 发送文本消息
     * @param id 客户端ID
     * @param message 消息内容
     * @returns 是否发送成功
     */
    function SendTextAsync(id: string, message: string): Promise<boolean>;

    /**
     * 发送二进制消息
     * @param id 客户端ID
     * @param data 二进制数据
     * @returns 是否发送成功
     */
    function SendBinaryAsync(id: string, data: Uint8Array): Promise<boolean>;

    /**
     * 设置消息接收回调
     * @param id 客户端ID
     * @param callback 回调函数
     * @returns 是否设置成功
     */
    function SetMessageCallback(id: string, callback: (message: string, data: Uint8Array | null) => void): boolean;

    /**
     * 设置连接状态变化回调
     * @param id 客户端ID
     * @param callback 回调函数
     * @returns 是否设置成功
     */
    function SetStateCallback(id: string, callback: (state: number) => void): boolean;

    /**
     * 获取客户端状态
     * @param id 客户端ID
     * @returns 客户端状态
     */
    function GetClientState(id: string): number;

    /**
     * 销毁客户端
     * @param id 客户端ID
     * @returns 是否销毁成功
     */
    function DestroyClientAsync(id: string): Promise<boolean>;

    /**
     * 获取所有客户端ID
     * @returns 客户端ID列表
     */
    function GetClientIds(): string[];

    /**
     * 创建WebSocket服务器
     * @param port 监听端口
     * @param id 服务器ID，如果为空则自动生成
     * @param host 监听地址，默认为localhost。如果需要监听所有网络接口（如"+"或"*"），则需要管理员权限
     * @param path 监听路径，默认为"/"
     * @returns 服务器ID
     */
    function CreateServer(port: number, id?: string, host?: string, path?: string): string;

    /**
     * 启动WebSocket服务器
     * @param id 服务器ID
     * @returns 是否启动成功
     */
    function StartServerAsync(id: string): Promise<boolean>;

    /**
     * 停止WebSocket服务器
     * @param id 服务器ID
     * @returns 是否停止成功
     */
    function StopServerAsync(id: string): Promise<boolean>;

    /**
     * 向指定客户端发送文本消息
     * @param serverId 服务器ID
     * @param clientId 客户端ID
     * @param message 消息内容
     * @returns 是否发送成功
     */
    function SendToClientAsync(serverId: string, clientId: string, message: string): Promise<boolean>;

    /**
     * 向指定客户端发送二进制消息
     * @param serverId 服务器ID
     * @param clientId 客户端ID
     * @param data 二进制数据
     * @returns 是否发送成功
     */
    function SendBinaryToClientAsync(serverId: string, clientId: string, data: Uint8Array): Promise<boolean>;

    /**
     * 广播文本消息给所有客户端
     * @param serverId 服务器ID
     * @param message 消息内容
     * @returns 是否发送成功
     */
    function BroadcastAsync(serverId: string, message: string): Promise<boolean>;

    /**
     * 广播二进制消息给所有客户端
     * @param serverId 服务器ID
     * @param data 二进制数据
     * @returns 是否发送成功
     */
    function BroadcastBinaryAsync(serverId: string, data: Uint8Array): Promise<boolean>;

    /**
     * 设置客户端连接回调
     * @param serverId 服务器ID
     * @param callback 回调函数
     * @returns 是否设置成功
     */
    function SetConnectionCallback(serverId: string, callback: (clientId: string) => void): boolean;

    /**
     * 设置客户端断开连接回调
     * @param serverId 服务器ID
     * @param callback 回调函数
     * @returns 是否设置成功
     */
    function SetDisconnectionCallback(serverId: string, callback: (clientId: string, status: number | null, description: string | null) => void): boolean;

    /**
     * 设置消息接收回调
     * @param serverId 服务器ID
     * @param callback 回调函数
     * @returns 是否设置成功
     */
    function SetServerMessageCallback(serverId: string, callback: (clientId: string, message: string, data: Uint8Array | null) => void): boolean;

    /**
     * 获取服务器状态
     * @param serverId 服务器ID
     * @returns 服务器是否运行中
     */
    function IsServerRunning(serverId: string): boolean;

    /**
     * 获取服务器的客户端列表
     * @param serverId 服务器ID
     * @returns 客户端ID列表
     */
    function GetServerClients(serverId: string): string[];

    /**
     * 销毁服务器
     * @param serverId 服务器ID
     * @returns 是否销毁成功
     */
    function DestroyServerAsync(serverId: string): Promise<boolean>;

    /**
     * 获取所有服务器ID
     * @returns 服务器ID列表
     */
    function GetServerIds(): string[];
}
