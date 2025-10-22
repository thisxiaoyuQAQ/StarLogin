/// <reference path="../easybot.d.ts" />

declare namespace bus {
    /**
     * 玩家登录服务器事件
     * @param event 事件名
     * @param handler 事件触发时的回调函数
     *                 - server: 服务器会话
     *                 - playerName: 玩家游戏名
     *                 - playerUuid: 玩家唯一标识符
     * @param priority
     * @returns
     *   - 当回调函数返回 `void` 或 `undefined` 时：**不拦截登录**，玩家正常登录。
     *   - 当返回非空的 `PlayerLoginResultPacket` 对象时：**拦截登录**，系统将使用该数据包作为登录响应，EasyBot不会处理后续事件。
     *     - 若数据包中的 `kicked` 字段为 `true`：玩家会被踢出服务器。
     *     - 若 `kicked` 为 `false`：玩家**不会**被踢出，但仍会拦截EasyBot后续操作(如为该未绑定的玩家生成验证码)。
     */
    function on(event: "player_login", handler: (server: Bridge, playerName: string, playerUuid: string) => void | PlayerLoginResultPacket | undefined): void;

    /**
     * 玩家数据更新事件（服务器上报玩家信息）
     * @param event 事件名
     * @param handler 事件触发时的回调函数
     *                 - server: 服务器会话
     *                 - playerName: 玩家游戏名
     *                 - playerUuid: 玩家唯一标识符
     *                 - playerIp: 玩家IP地址
     * @remarks
     *   - 此事件仅用于通知，**无法阻止**EasyBot更新内部玩家数据
     *   - 返回值会被系统忽略（即便返回非空值也不会影响流程）
     */
    function on(event: "report_player", handler: (server: Bridge, playerName: string, playerUuid: string, playerIp: string) => void): void;

    /**
     * 玩家消息同步事件
     * @param event 事件名
     * @param handler 事件触发时的回调函数
     *                 - server: 服务器会话
     *                 - packet: 消息数据包（包含消息内容、发送者等信息）
     * @returns 
     *   - 当返回 `void` 或 `undefined` 时：允许EasyBot继续处理消息同步逻辑
     *   - 当返回 `true` 时：**拦截消息同步**，EasyBot将跳过内部处理流程
     */
    function on(event: "player_message", handler: (server: Bridge, packet: SyncMessagePacket) => void | boolean | undefined): void;

    /**
     * 玩家死亡事件同步
     * @param event 事件名
     * @param handler 事件触发时的回调函数
     *                 - server: 服务器会话
     *                 - packet: 死亡消息数据包（包含死亡详情、玩家信息等）
     * @returns 
     *   - 当返回 `void` 或 `undefined` 时：允许EasyBot继续处理死亡事件同步
     *   - 当返回 `true` 时：**拦截死亡事件同步**，EasyBot将跳过内部处理流程
     */
    function on(event: "player_death", handler: (server: Bridge, packet: SyncDeathMessagePacket) => void | boolean | undefined): void;

    /**
     * 玩家加入/退出事件同步
     * @param event 事件名
     * @param handler 事件触发时的回调函数
     *                 - server: 服务器会话
     *                 - packet: 进出事件数据包（包含玩家状态、时间戳等信息）
     * @returns 
     *   - 当返回 `void` 或 `undefined` 时：允许EasyBot继续处理进出事件同步
     *   - 当返回 `true` 时：**拦截进出事件同步**，EasyBot将跳过内部处理流程
     */
    function on(event: "player_join_or_exit", handler: (server: Bridge, packet: SyncEnterExitMessagePacket) => void | boolean | undefined): void;
}
