/// <reference path="../easybot.d.ts" />

declare namespace bus {

    /** 
     * 统一封装接口,该接口为EasyBot统一封装接口,所有适配器都需要实现该接口
    */

    /**
     * 群消息事件 
     */
    function on(event: "group_message_event", handler: (data: GroupMessageEvent) => boolean | void): void;
    /**
     * 私聊消息事件
     */
    function on(event: "direct_message_event", handler: (data: DirectMessageEvent) => boolean | void): void;
    /**
     * 群成员加入事件
     */
    function on(event: "group_join_event", handler: (data: GroupJoinEvent) => boolean | void): void;
    /**
     * 群成员退出事件
     */
    function on(event: "group_leave_event", handler: (data: GroupLeaveEvent) => boolean | void): void;
    /**
     * 群成员加群事件
     */
    function on(event: "group_request_event", handler: (data: GroupRequestEvent) => boolean | void): void;

    /**
     * 高级接口封装,EasyBot未实现的接口可以通过监听原生消息实现
     */

    /**
     * 原生消息事件
     * 该事件会在任何适配器收到任何形式数据包时触发,如OnebotWs消息包
     */
    function on(event: "raw_message_event", handler: (data: RawMessageEvent) => boolean | void): void;
}