/**
 * 表示 WebSocket 行为基类
 */
declare abstract class WebSocketBehavior {
    // 获取会话的唯一ID
    readonly ID: string | null;
    // 获取会话开始时间
    readonly StartTime: Date;
    // 设置接收 ping 时是否触发消息事件
    EmitOnPing: boolean;
    // 设置是否忽略扩展头
    IgnoreExtensions: boolean;
    // 设置或获取协议
    Protocol: string;
    // 向客户端发送二进制数据
    Send(data: number[]): void;
    // 以文本格式发送数据
    Send(data: string): void;
    // 异步发送数据
    SendAsync(data: number[], completed: (success: boolean) => void): void;
    // 异步发送文本数据
    SendAsync(data: string, completed: (success: boolean) => void): void;
}