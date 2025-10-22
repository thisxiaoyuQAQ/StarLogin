/// <reference path="index.d.ts" />

/**
 * 服务器连接管理
 */
declare namespace sessions {
    /**
     * 某服务器是否在线
     * @param session 服务器连接
     */
    function IsAlive(session: Session): boolean;
    /**
     * 让一个已经连接到EasyBot的服务器断开连接(主动)
     * @param session 
     */
    function Remove(session: Session): void;
    /**
     * 获取一个服务器的桥接对象
     * @param session 桥接对象
     */
    function GetBridge(session: Session): Bridge;
    /**
     * 获取一个服务器的桥接对象(通过服务器身份令牌)
     * @param token 服务器的token
     */
    function GetBridge(token: string): Bridge;
    /**
     * 获取所有已连接的服务器
     */
    function GetSessions(): ArrayLike<Session>;
    /**
     * 获取所有已连接的服务器的桥接对象
     */
    function GetBridges(): ArrayLike<Bridge>;

    /**
     * 通过服务器的身份令牌判断服务器是否在线
     * @param token 服务器的token(身份令牌)
     */
    function ServerExists(token: string): boolean;
}