/// <reference path="index.d.ts" />
/// <reference path="../websocket-sharp/index.d.ts" />

/**
 * 表示 EasyBot 桥接实现
 */
declare class Bridge extends WebSocketBehavior {
    // 获取会话对象
    readonly Session: Session;

    /**
     * 更新同步设置
     */
    UpdateSyncSetting(): void;

    /**
     * 发送消息并等待回调
     * @param packet 带回调ID的数据包
     * @returns 回调结果的Promise
     */
    SendAndWaitForCallbackAsync<T extends object>(packet: PacketWithCallBackId): Promise<T>;

    /**
     * 通知玩家解除绑定
     * @param playerName 玩家名称
     * @param kickMessage 踢出消息
     */
    NotifyPlayerUnBind(playerName: string, kickMessage: string): void;

    /**
     * 通知玩家绑定成功
     * @param playerName 玩家名称
     * @param accountId 账户ID
     * @param accountName 账户名称
     */
    NotifyPlayerBindSuccess(playerName: string, accountId: string, accountName: string): void;

    /**
     * 查询 Placeholder API
     * @param playerName 玩家名称
     * @param text 查询文本
     * @returns 查询结果的数据包
     */
    SendPlaceholderApiQueryAsync(playerName: string, text: string): Promise<PlaceholderApiQueryResultPacket>;

    /**
     * 获取玩家列表
     * @returns 玩家信息结果的数据包
     */
    GetPlayerListAsync(): Promise<GetPlayerInfoResultPacket>;

    /**
     * 运行命令
     * @param playerName 玩家名称
     * @param command 命令文本
     * @param enablePapi 是否启用 PAPI
     * @returns 命令执行结果的数据包
     */
    SendRunCommandAsync(playerName: string, command: string, enablePapi: boolean): Promise<RunCommandResultPacket>;

    /**
     * 向聊天发送带额外信息的消息
     * @param text 消息文本
     * @param extra 额外信息对象列表
     */
    SendMessageWithExtra(text: string, extra: any[]): void;

    /**
     * 向所有玩家发送消息
     * @param text 消息文本
     */
    SendMessageToAllPlayer(text: string): void;

    /**
     * 获取服务器连接信息
     * @returns 服务器连接信息
     */
    GetServerInfo(): Promise<ServerConnectionInfo>;
}

/**
 * 描述与服务器连接相关的元数据信息
 */
interface ServerConnectionInfo {
    /** 服务器显示名称（通常为配置文件中的名称） */
    ServerName: string;
    
    /** 服务器核心版本号（例如：Paper 1.19.2） */
    ServerVersion: string;
    
    /** 客户端插件要求的协议版本 */
    PluginVersion: string;
    
    /** 指示服务器是否支持PAPI(PlaceholderAPI)变量替换功能 */
    IsPapiSupported: boolean;
    
    /** 标识服务器是否支持自定义命令扩展 */
    IsCommandSupported: boolean;
    
    /** 标记服务器是否安装了GeyserMC跨平台桥接插件 */
    HasGeyser: boolean;
    
    /** 表示服务器是否处于正版验证模式（true=仅正版账号可进入） */
    IsOnlineMode: boolean;
}