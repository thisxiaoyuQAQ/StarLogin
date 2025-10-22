
/// <reference path="index.d.ts" />
/**
 * 适配器上下文接口，提供与即时通讯平台交互的核心功能
 * 此接口为通用接口，任何适配器都实现了此方法
 */
declare interface IAdapterContext {
    /**
     * 发送群组消息
     * @param selfId 机器人账号ID
     * @param peerId 目标群组ID
     * @param chain 消息链对象
     * @param token 可选取消令牌
     * @returns 返回消息ID的Promise
     */
    SendGroupMessageAsync(selfId: string, peerId: string, chain: MessageChain, token?: any): Promise<string>;

    /**
     * 发送私聊消息
     * @param selfId 机器人账号ID
     * @param peerId 目标用户ID
     * @param chain 消息链对象
     * @param token 可选取消令牌
     * @returns 返回消息ID的Promise
     */
    SendDirectMessageAsync(selfId: string, peerId: string, chain: MessageChain, token?: any): Promise<string>;

    /**
     * 获取用户资料
     * @param selfId 机器人账号ID
     * @param userId 目标用户ID
     * @param token 可选取消令牌
     * @returns 返回用户资料的Promise
     */
    GetUserProfileAsync(selfId: string, userId: string, token?: any): Promise<UserProfile>;

    /**
     * 获取群成员信息
     * @param groupId 目标群组ID
     * @param userId 目标成员ID
     * @param token 可选取消令牌
     * @returns 返回成员信息的Promise
     */
    GetGroupMemberInfo(groupId: string, userId: string, token?: any): Promise<MemberInfo>;

    /**
     * 设置群成员昵称
     * @param slefId 机器人账号ID（注意参数名拼写）
     * @param userId 目标成员ID
     * @param groupId 目标群组ID
     * @param nickName 新昵称
     * @param token 可选取消令牌
     * @returns 无返回值的Promise
     */
    SetNickName(slefId: string, userId: string, groupId: string, nickName: string, token?: any): Promise<void>;

    /**
     * 获取群名称
     * @param groupId 目标群组ID
     * @param noCache 是否禁用缓存
     * @param any 可选取消令牌
     * @returns 返回群名称的Promise
     */
    GetGroupName(groupId: string, noCache?: boolean, any?: any): Promise<string>;

    /**
     * 处理群组加群请求
     * @param flag 请求标识符
     * @param isInvite 是否为邀请请求
     * @param approve 是否批准请求
     * @param reason 拒绝理由（可选）
     * @returns 无返回值的Promise
     */
    SetGroupAddRequest(flag: string, isInvite: boolean, approve: boolean, reason?: string): Promise<void>;

    /**
     * 踢出群成员
     * @param groupId 目标群组ID
     * @param userId 目标成员ID
     * @param rejectAddRequest 是否拒绝再次加群请求（可选）
     * @returns 无返回值的Promise
     */
    KickMember(groupId: string, userId: string, rejectAddRequest?: boolean): Promise<void>;

    /**
     * 撤回消息
     * @param messageId 目标消息ID
     * @returns 无返回值的Promise
     */
    DeleteMessage(messageId: string): Promise<void>;

    /**
     * 禁言群成员
     * @param groupId 目标群组ID
     * @param userId 目标成员ID
     * @param duration 禁言时长（秒）
     * @returns 无返回值的Promise
     */
    SetMute(groupId: string, userId: string, duration: number): Promise<void>;

    /**
     * 获取群成员列表
     * @param groupId 目标群组ID
     * @param token 可选取消令牌
     * @returns 返回成员信息列表的Promise
     */
    GetGroupMemberList(groupId: string, token?: any): Promise<ArrayLike<MemberInfo>>;

    /**
     * 发送原生数据包
     * @param data 原生数据包
     */
    SendRaw(data: string): Promise<void>;
}

/**
 * 消息上下文接口，提供回复消息功能
 */
declare interface IMessageContext {
    /**
     * 回复当前消息
     * @param chain 消息链对象
     * @returns 无返回值的Promise
     */
    Reply(chain: MessageChain): Promise<void>;
}

/**
 * 基础事件类，包含适配器相关信息
 */
declare class EasyEvent {
    /** 事件是否已被取消,如果设置为True EasyBot内部的处理器将不响应此次事件 */
    IsCanceled: boolean;
    /** 适配器名称(onebot11) */
    AdapterName: string;
    /** 适配器平台名称(qq) */
    AdapterPlatform: string;
    /** 适配器操作上下文 */
    AdapterContext: IAdapterContext;
}

/**
 * 私聊消息事件
 */
declare class DirectMessageEvent extends EasyEvent {
    /** 发送者用户ID */
    SenderId: string;
    /** 机器人账号ID */
    SelfId: string;
    /** 消息链对象 */
    Chain: MessageChain;
    /** 原始消息文本 */
    RawMessage: string;
    /** 发送者显示名称 */
    SenderName: string;
    /** 消息唯一标识 */
    MessageId: number;
    /** 发送者昵称（可选） */
    SenderNickName?: string;
    /** 消息操作上下文 */
    Context: IMessageContext;
}

/**
 * 用户加入群组事件
 */
declare class GroupJoinEvent extends EasyEvent {
    /** 机器人账号ID */
    SelfId: string;
    /** 加群者ID */
    Id: string;
    /** 群组ID */
    PeerId: string;
    /** 消息操作上下文 */
    Context: IMessageContext;
    /** 操作者用户ID（如邀请人） */
    OperatorId: string;
}

/**
 * 用户离开群组事件
 */
declare class GroupLeaveEvent extends EasyEvent {
    /** 机器人账号ID */
    SelfId: string;
    /** 离开人ID */
    Id: string;
    /** 群组ID */
    PeerId: string;
    /** 消息操作上下文 */
    Context: IMessageContext;
    /** 操作者用户ID（如踢出者） */
    OperatorId: string;
}

/**
 * 群组消息事件
 */
declare class GroupMessageEvent extends EasyEvent {
    /** 机器人账号ID */
    SelfId: string;
    /** 发送者用户ID */
    SenderId: string;
    /** 群组ID */
    PeerId: string;
    /** 消息链对象 */
    Chain: MessageChain;
    /** 原始消息文本 */
    RawMessage: string;
    /** 消息唯一标识 */
    MessageId: string;
    /** 发送者群内角色（可选） */
    SenderRole?: string;
    /** 发送者显示名称 */
    SenderName: string;
    /** 发送者群昵称（可选） */
    SenderNickName?: string;
    /** 消息操作上下文 */
    Context: IMessageContext;
}

/**
 * 群组请求事件（加群/邀请）
 */
declare class GroupRequestEvent extends EasyEvent {
    /** 机器人账号ID */
    SelfId: string;
    /** 申请用户ID */
    UserId: string;
    /** 目标群组ID */
    GroupId: string;
    /** 邀请人ID（当为邀请事件时存在） */
    InvitorId: string;
    /** 申请备注/验证信息 */
    Comment: string;
    /** 请求唯一标识符 */
    Flag: string;
    /** 是否为加群请求（true=加群请求，false=邀请请求） */
    IsJoinRequest: boolean;
}


/**
 * 原生消息事件
 */
declare class RawMessageEvent extends EasyEvent {
    /**
     * 消息数据
     */
    Data: string;
}

/**
 * 机器人就绪事件
 */
declare class BotReadyEvent extends EasyEvent {
    /**
     * 机器人信息
     */
    Profile: RobotProfile;
}

/**
 * 机器人掉线事件
 */

declare class BotOfflineEvent extends EasyEvent {
    /**
     * 机器人信息
     */
    Profile: RobotProfile;
    /**
     * 掉线原因
     */
    Reason: string;
    /**
     * 错误码(如果有)
     */
    Code: number;
}