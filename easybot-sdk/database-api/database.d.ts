/**
 * 数据库API命名空间，提供数据库操作接口
 * 封装了EF Core操作，每次操作都会创建新的ServiceScope
 */
declare namespace db {
    /**
     * 服务器状态类型枚举
     */
    
    enum ServerStateType {
        /** 未知状态 */
        Unknown,
        /** 玩家加入 */
        Join,
        /** 玩家离开 */
        Leave,
        /** 玩家聊天 */
        Chat,
        /** 玩家死亡 */
        Death,
        /** 玩家成就 */
        Achievement
    }

    /**
     * 服务器信息
     */
    interface ServerInfo {
        /** 服务器ID */
        Id: number;
        /** 服务器名称 */
        Name: string;
        /** 服务器Token */
        Token: string;
        /** 创建时间 */
        CreatedTime: Date;
        /** 玩家列表 */
        Players: Player[];
    }

    /**
     * 玩家信息
     */
    interface Player {
        /** 玩家ID */
        Id: number;
        /** 玩家名称 */
        Name: string;
        /** 玩家UUID */
        Uuid: string | null;
        /** 玩家IP */
        Ip: string | null;
        /** 玩家IP字符串 */
        IpString: string | null;
        /** 创建时间 */
        CreatedTime: Date;
        /** 最后更新时间 */
        LastUpdatedTime: Date;
        /** 所在服务器列表 */
        Servers: ServerInfo[];
        /** 关联的社交账号 */
        SocialAccount: SocialAccount | null;
    }

    /**
     * 社交账号信息
     */
    interface SocialAccount {
        /** 社交账号ID */
        Id: number;
        /** 平台名称 */
        Platform: string;
        /** 平台用户UUID */
        Uuid: string;
        /** 用户名称 */
        Name: string | null;
        /** 头像URL */
        AvatarUrl: string | null;
        /** 创建时间 */
        CreatedTime: Date;
        /** 最后更新时间 */
        LastUpdatedTime: Date;
        /** 关联的玩家列表 */
        Users: Player[];
    }

    /**
     * 服务器状态
     */
    interface ServerState {
        /** 状态ID */
        Id: number;
        /** 服务器Token */
        Token: string;
        /** 玩家信息JSON */
        Players: string;
        /** 记录时间 */
        Time: Date;
    }

    /**
     * 玩家记录
     */
    interface PlayerRecord {
        /** 记录ID */
        Id: number;
        /** 玩家名称 */
        Name: string;
        /** 服务器Token */
        Token: string;
        /** 记录类型 */
        Type: ServerStateType;
        /** 记录数据 */
        Data: string;
        /** 记录时间 */
        Time: Date;
    }

    /**
     * 服务器组
     */
    interface ServerGroup {
        /** 组ID */
        Id: number;
        /** 组名称 */
        Name: string;
        /** 服务器Token列表 */
        ServerTokens: string[];
    }

    /**
     * 群组信息
     */
    interface Group {
        /** 群组ID */
        Id: number;
        /** 平台名称 */
        Platform: string;
        /** 群组ID */
        GroupId: string;
        /** 群组名称 */
        Name: string;
        /** 是否启用 */
        Enabled: boolean;
        /** 成员数量 */
        MemberCount: number;
        /** 最大成员数量 */
        MaxMemberCount: number;
        /** 群头像 */
        GroupAvatar: string | null;
    }

    /**
     * 获取所有服务器信息
     * @returns 服务器信息数组
     */
    function GetServers(): ServerInfo[];

    /**
     * 根据Token获取服务器信息
     * @param token 服务器Token
     * @returns 服务器信息，不存在则返回null
     */
    function GetServer(token: string): ServerInfo | null;

    /**
     * 根据名称获取服务器信息
     * @param name 服务器名称
     * @returns 服务器信息，不存在则返回null
     */
    function GetServerByName(name: string): ServerInfo | null;

    /**
     * 创建新服务器
     * @param name 服务器名称
     * @param token 服务器Token
     * @returns 创建的服务器信息
     */
    function CreateServer(name: string, token: string): ServerInfo;

    /**
     * 删除服务器
     * @param token 服务器Token
     * @returns 是否删除成功
     */
    function DeleteServer(token: string): boolean;

    /**
     * 获取所有玩家
     * @returns 玩家数组
     */
    function GetPlayers(): Player[];

    /**
     * 根据名称获取玩家
     * @param name 玩家名称
     * @returns 玩家信息，不存在则返回null
     */
    function GetPlayerByName(name: string): Player | null;

    /**
     * 根据UUID获取玩家
     * @param uuid 玩家UUID
     * @returns 玩家信息，不存在则返回null
     */
    function GetPlayerByUuid(uuid: string): Player | null;

    /**
     * 获取服务器中的所有玩家
     * @param serverToken 服务器Token
     * @returns 玩家数组
     */
    function GetServerPlayers(serverToken: string): Player[];

    /**
     * 创建新玩家
     * @param name 玩家名称
     * @param uuid 玩家UUID，可选
     * @param ip 玩家IP，可选
     * @returns 创建的玩家信息
     */
    function CreatePlayer(name: string, uuid?: string, ip?: string): Player;

    /**
     * 更新玩家信息
     * @param playerId 玩家ID
     * @param name 玩家名称，可选
     * @param uuid 玩家UUID，可选
     * @param ip 玩家IP，可选
     * @returns 是否更新成功
     */
    function UpdatePlayer(playerId: number, name?: string, uuid?: string, ip?: string): boolean;

    /**
     * 删除玩家
     * @param playerId 玩家ID
     * @returns 是否删除成功
     */
    function DeletePlayer(playerId: number): boolean;

    /**
     * 获取所有社交账号
     * @returns 社交账号数组
     */
    function GetSocialAccounts(): SocialAccount[];

    /**
     * 根据平台和UUID获取社交账号
     * @param platform 平台名称
     * @param uuid 平台用户UUID
     * @returns 社交账号信息，不存在则返回null
     */
    function GetSocialAccount(platform: string, uuid: string): SocialAccount | null;

    /**
     * 创建社交账号
     * @param platform 平台名称
     * @param uuid 平台用户UUID
     * @param name 用户名称，可选
     * @param avatarUrl 头像URL，可选
     * @returns 创建的社交账号信息
     */
    function CreateSocialAccount(platform: string, uuid: string, name?: string, avatarUrl?: string): SocialAccount;

    /**
     * 更新社交账号信息
     * @param accountId 社交账号ID
     * @param name 用户名称，可选
     * @param avatarUrl 头像URL，可选
     * @returns 是否更新成功
     */
    function UpdateSocialAccount(accountId: number, name?: string, avatarUrl?: string): boolean;

    /**
     * 删除社交账号
     * @param accountId 社交账号ID
     * @returns 是否删除成功
     */
    function DeleteSocialAccount(accountId: number): boolean;

    /**
     * 绑定玩家和社交账号
     * @param playerId 玩家ID
     * @param socialAccountId 社交账号ID
     * @returns 是否绑定成功
     */
    function BindPlayerToSocialAccount(playerId: number, socialAccountId: number): boolean;

    /**
     * 解绑玩家和社交账号
     * @param playerId 玩家ID
     * @returns 是否解绑成功
     */
    function UnbindPlayerFromSocialAccount(playerId: number): boolean;

    /**
     * 绑定玩家到服务器
     * @param playerId 玩家ID
     * @param serverToken 服务器Token
     * @returns 是否绑定成功
     */
    function AddPlayerToServer(playerId: number, serverToken: string): boolean;

    /**
     * 从服务器移除玩家
     * @param playerId 玩家ID
     * @param serverToken 服务器Token
     * @returns 是否移除成功
     */
    function RemovePlayerFromServer(playerId: number, serverToken: string): boolean;

    /**
     * 获取服务器状态
     * @param serverToken 服务器Token
     * @param limit 限制数量，默认10
     * @returns 服务器状态数组
     */
    function GetServerStates(serverToken: string, limit?: number): ServerState[];

    /**
     * 添加服务器状态
     * @param serverToken 服务器Token
     * @param players 玩家信息JSON
     * @returns 创建的服务器状态
     */
    function AddServerState(serverToken: string, players: string): ServerState;

    /**
     * 获取玩家记录
     * @param playerName 玩家名称
     * @param serverToken 服务器Token，可选
     * @param limit 限制数量，默认10
     * @returns 玩家记录数组
     */
    function GetPlayerRecords(playerName: string, serverToken?: string, limit?: number): PlayerRecord[];

    /**
     * 添加玩家记录
     * @param playerName 玩家名称
     * @param serverToken 服务器Token
     * @param type 记录类型
     * @param data 记录数据
     * @returns 创建的玩家记录
     */
    function AddPlayerRecord(playerName: string, serverToken: string, type: ServerStateType, data: string): PlayerRecord;

    /**
     * 获取所有服务器组
     * @returns 服务器组数组
     */
    function GetServerGroups(): ServerGroup[];

    /**
     * 根据名称获取服务器组
     * @param name 服务器组名称
     * @returns 服务器组信息，不存在则返回null
     */
    function GetServerGroupByName(name: string): ServerGroup | null;

    /**
     * 创建服务器组
     * @param name 服务器组名称
     * @param serverTokens 服务器Token数组
     * @returns 创建的服务器组
     */
    function CreateServerGroup(name: string, serverTokens: string[]): ServerGroup;

    /**
     * 更新服务器组
     * @param groupId 服务器组ID
     * @param name 服务器组名称，可选
     * @param serverTokens 服务器Token数组，可选
     * @returns 是否更新成功
     */
    function UpdateServerGroup(groupId: number, name?: string, serverTokens?: string[]): boolean;

    /**
     * 删除服务器组
     * @param groupId 服务器组ID
     * @returns 是否删除成功
     */
    function DeleteServerGroup(groupId: number): boolean;

    /**
     * 获取所有群组
     * @returns 群组数组
     */
    function GetGroups(): Group[];

    /**
     * 根据平台和群ID获取群组
     * @param platform 平台名称
     * @param groupId 群组ID
     * @returns 群组信息，不存在则返回null
     */
    function GetGroup(platform: string, groupId: string): Group | null;

    /**
     * 创建群组
     * @param platform 平台名称
     * @param groupId 群组ID
     * @param name 群组名称
     * @param enabled 是否启用，默认true
     * @returns 创建的群组
     */
    function CreateGroup(platform: string, groupId: string, name: string, enabled?: boolean): Group;

    /**
     * 更新群组信息
     * @param platform 平台名称
     * @param groupId 群组ID
     * @param name 群组名称，可选
     * @param enabled 是否启用，可选
     * @param memberCount 成员数量，可选
     * @param maxMemberCount 最大成员数量，可选
     * @param groupAvatar 群头像，可选
     * @returns 是否更新成功
     */
    function UpdateGroup(platform: string, groupId: string, name?: string, enabled?: boolean, memberCount?: number, maxMemberCount?: number, groupAvatar?: string): boolean;

    /**
     * 删除群组
     * @param platform 平台名称
     * @param groupId 群组ID
     * @returns 是否删除成功
     */
    function DeleteGroup(platform: string, groupId: string): boolean;
}