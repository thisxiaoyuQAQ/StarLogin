/// <reference path="index.d.ts" />
/// <reference path="../csharp-std/disposable.d.ts" />

/**
 * 操作码枚举，定义网络通信包类型
 */
declare enum OpCode {
    Hello = 0,
    Identify = 1,
    HeartBeat = 2,
    IdentifySuccess = 3,
    Packet = 4,
    CallBack = 5,
}

/**
 * 基础数据包抽象类
 */
declare abstract class Packet {
    /** 操作码标识 */
    OpCode: OpCode;
}

/**
 * 回调数据包抽象基类
 */
declare abstract class CallBackPacket extends Packet {
    OpCode : OpCode.CallBack;
    /** 回调唯一标识符 */
    CallbackId: string;
}

/**
 * 含回调ID的数据包抽象基类
 */
declare abstract class PacketWithCallBackId extends Packet {
    OpCode : OpCode.Packet;
    /** 回调请求唯一标识 */
    CallbackId: string;
    /** 操作类型标识 */
    Operation: string;
}

/**
 * 仅含回调ID头的操作包
 */
declare class PacketWithCallBackIdOnlyHeader extends PacketWithCallBackId {
    Operation: string;
}

/**
 * 仅含操作码的基础包
 */
declare class PacketOnlyOp {
    OpCode: OpCode;
}

/**
 * 心跳检测包
 */
declare class HeartbeatPacket extends Packet {
    OpCode : OpCode.HeartBeat;
}

/**
 * 身份验证成功响应包
 */
declare class IdentifySuccessPacket extends Packet {
    /** 服务端名称 */
    ServerName: string;
    OpCode : OpCode.IdentifySuccess;
}

/**
 * 初始握手包
 */
declare class HelloPacket extends Packet {
    /** 协议版本号 */
    Version: string;
    /** 系统名称 */
    SystemName: string;
    /** .NET运行时版本 */
    DotnetVersion: string;
    /** 会话ID */
    SessionId: string;
    /** 认证令牌 */
    Token: string;
    /** 心跳间隔(毫秒) */
    Interval: number;
    OpCode : OpCode.Hello;
}

/**
 * 获取服务器信息请求包
 */
declare class GetServerInfoPacket extends PacketWithCallBackId {
    Operation : "GET_SERVER_INFO";
}

/**
 * 玩家登录结果回调包
 */
declare class PlayerLoginResultPacket extends CallBackPacket {
    /** 是否被踢出 */
    Kicked: boolean;
    /** 踢出提示信息 */
    KickMessage: string;
}

/**
 * 消息回复结果包
 */
declare class ReplyMessageResultPacket extends PacketWithCallBackId {
    Operation : "REPLY_MESSAGE";
    /** 错误信息 */
    Error: string | "";
    /** 操作是否成功 */
    Ok: boolean | false;
}

/**
 * 命令执行结果回调包
 */
declare class RunCommandResultPacket extends CallBackPacket {
    /** 命令返回文本 */
    Text: string;
    /** 执行是否成功 */
    Success: boolean;
}

/**
 * 绑定启动结果包
 */
declare class StartBindResultPacket extends CallBackPacket {
    /** 绑定验证码 */
    Code: string;
    /** 绑定时间戳 */
    Time: string;
}

/**
 * 绑定信息查询结果包
 */
declare class GetBindInfoResultPacket extends CallBackPacket {
    /** 玩家名称 */
    Name: string;
    /** 绑定平台 */
    Platform: string;
    /** 绑定账号列表 */
    BindNames: string;
    /** 绑定ID */
    Id: string;
}

/**
 * 新版本信息结果包
 */
declare class GetNewVersionResultPacket extends CallBackPacket {
    /** 版本名称 */
    VersionName: string;
    /** 下载地址 */
    DownloadUrl: string;
    /** 发布时间 */
    PublishTime: string;
    /** 更新日志 */
    UpdateLog: string;
}

/**
 * 玩家信息查询结果包
 */
declare class GetPlayerInfoResultPacket extends CallBackPacket {
    /** 玩家信息列表 */
    List: ArrayLike<PlayerInfo>;
    /** 查询是否成功 */
    Success: boolean;
    /** 状态消息 */
    Message: string | "";
    /** 完整错误信息 */
    FullError: string | null | "";
}

/**
 * 社交账号查询结果包
 */
declare class GetSocialAccountResultPacket extends CallBackPacket {
    /** 账号名称 */
    Name: string;
    /** 绑定时间 */
    Time: string;
    /** 平台UUID */
    Uuid: string;
    /** 所属平台 */
    Platform: string;
}

/**
 * PlaceholderAPI查询结果包
 */
declare class PlaceholderApiQueryResultPacket extends CallBackPacket {
    /** 解析后的文本 */
    Text: string;
    /** 解析是否成功 */
    Success: boolean;
}

/**
 * 身份认证请求包
 */
declare class IdentifyPacket extends Packet {
    /** 认证令牌 */
    Token: string;
    /** 插件版本 */
    PluginVersion: string;
    /** 服务器描述 */
    ServerDescription: string;
    OpCode: OpCode;
}

/**
 * 玩家加入事件包
 */
declare class OnPlayerJoinPacket extends PacketWithCallBackId {
    /** 操作类型标识 */
    Operation: string;
    /** 玩家信息数据 */
    PlayerInfo: PlayerInfo;
}

/**
 * PlaceholderAPI查询请求包
 */
declare class PlaceholderApiQueryPacket extends PacketWithCallBackId {
    /** 玩家名称 */
    PlayerName: string;
    /** 待解析文本 */
    Text: string;
    /** 操作类型标识 */
    Operation: string;
}

/**
 * 玩家解绑通知包
 */
declare class PlayerUnBindNotifyPacket extends PacketWithCallBackId {
    /** 玩家名称 */
    PlayerName: string;
    /** 踢出提示信息 */
    KickMessage: string;
    /** 操作类型标识 */
    Operation: string;
}

/**
 * 消息回复请求包
 */
declare class ReplyMessagePacket extends PacketOnlyOp {
    /** 消息ID */
    MessageId: string;
    /** 回复内容 */
    Message: string;
    /** 玩家原始信息 */
    PlayerInfo: PlayerInfoWithRaw;
}

/**
 * 玩家举报数据包
 */
declare class ReportPlayerPacket extends PacketWithCallBackId {
    /** 操作类型标识 */
    Operation: string;
    /** 玩家名称 */
    PlayerName: string;
    /** 玩家UUID */
    PlayerUuid: string;
    /** 玩家IP地址 */
    PlayerIp: string;
}

/**
 * 执行命令请求包
 */
declare class RunCommandPacket extends PacketWithCallBackId {
    /** 目标玩家 */
    PlayerName: string;
    /** 待执行命令 */
    Command: string;
    /** 是否启用PAPI解析 */
    EnablePapi: boolean;
    /** 操作类型标识 */
    Operation: string;
}

/**
 * 聊天消息发送包
 */
declare class SendToChatPacket extends PacketWithCallBackId {
    /** 操作类型标识 */
    Operation: string;
    /** 消息文本 */
    Text: string;
    /** 扩展数据 */
    Extra: object[] | null;
}

/**
 * 服务器状态报告包
 */
declare class ServerStatePacket extends PacketOnlyOp {
    /** 认证令牌 */
    Token: string;
    /** 在线玩家列表 */
    Players: string;
}

/**
 * 绑定启动请求包
 */
declare class StartBindPacket extends PacketWithCallBackId {
    /** 操作类型标识 */
    Operation: string;
    /** 玩家名称 */
    PlayerName: string;
}

/**
 * 消息同步包
 */
declare class SyncMessagePacket extends PacketWithCallBackId {
    /** 操作类型标识 */
    Operation: string;
    /** 玩家信息 */
    Player: PlayerInfoWithRaw;
    /** 消息内容 */
    Message: string;
    /** 是否使用命令 */
    UseCommand: boolean;
}

/**
 * 死亡消息同步包
 */
declare class SyncDeathMessagePacket extends PacketWithCallBackId {
    /** 操作类型标识 */
    Operation: string;
    /** 玩家信息 */
    Player: PlayerInfoWithRaw;
    /** 原始死亡消息 */
    Raw: string;
    /** 击杀者信息 */
    Killer: string;
}

/**
 * 进出消息同步包
 */
declare class SyncEnterExitMessagePacket extends PacketWithCallBackId {
    /** 操作类型标识 */
    Operation: string;
    /** 玩家信息 */
    Player: PlayerInfoWithRaw;
    /** 是否为进入消息 */
    IsEnter: boolean;
}

/**
 * 同步设置更新包
 */
declare class UpdateSyncSettingsPacket extends PacketWithCallBackId {
    /** 同步模式 */
    SyncMode: number;
    /** 经济同步开关 */
    SyncMoney: number;
    Operation : "SYNC_SETTINGS_UPDATED";
}

/**
 * 绑定成功通知包
 */
declare class BindSuccessNotifyPacket extends PacketWithCallBackId {
    /** 玩家名称 */
    PlayerName: string;
    /** 账号ID */
    AccountId: string;
    /** 账号名称 */
    AccountName: string;
    /** 操作类型标识 */
    Operation: string;
}

/**
 * 数据记录包
 */
declare class DataRecordPacket extends PacketOnlyOp {
    /** 记录数据 */
    Data: string;
    /** 记录名称 */
    Name: string;
    /** 认证令牌 */
    Token: string;
    /** 服务器状态类型 */
    Type: any;
}

/**
 * 绑定信息查询包
 */
declare class GetBindInfoPacket extends PacketWithCallBackId {
    /** 操作类型标识 */
    Operation: string;
    /** 玩家名称 */
    PlayerName: string;
}

/**
 * 玩家列表请求包
 */
declare class GetPlayerListPacket extends PacketWithCallBackId {
    Operation : "PLAYER_LIST";
}

/**
 * 表示桥接客户端信息
 */
declare class ClientInfo {
    // 缓存的服务器名称
    CachedServerName: string;
    // 缓存的服务器描述
    CachedServerDescription: string;
    // 缓存的插件版本
    CachedPluginVersion: string;
    // 缓存的服务器令牌
    CachedServerToken: string;
}
/**
 * 表示 WebSocket 会话
 */
declare class Session implements IDisposable {
    // 会话的唯一标识符
    SessionId: any;
    // WebSocket 连接对象
    Connection: WebSocket;
    // 客户端信息
    Info: ClientInfo | null;

    /**
     * 销毁会话并释放资源
     */
    Dispose(): void;
}

declare interface PlayerInfo {
    PlayerName: string;
    PlayerUuid: string;
    PlayerIp: string;
    SkinUrl: string;
    Bedrock: boolean;
}

declare interface PlayerInfoWithRaw extends PlayerInfo {
    PlayerNameRaw: string;
}