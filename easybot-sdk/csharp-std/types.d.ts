/**
 * C#标准库的一些不完整封装，没封装不代表不可以调用 自己去查文档
 * https://learn.microsoft.com/zh-cn/dotnet/api/system?view=net-8.0
 */


interface IPAddress {
    ToString(): string;
}
interface SocketAddress {
    ToString(): string;
}
/**
 * 表示网络终结点，包含IP地址和端口信息
 */
interface IPEndPoint {
    /**
     * 允许的最大端口号
     */
    MaxPort: number;

    /**
     * 允许的最小端口号
     */
    MinPort: number;

    /**
     * 关联的IP地址对象
     */
    Address: IPAddress;

    /**
     * 只读属性，表示地址族类型
     * (如InterNetwork对应IPv4, InterNetworkV6对应IPv6)
     */
    readonly AddressFamily: any;

    /**
     * 当前终结点使用的端口号
     */
    Port: number;

    /**
     * 通过Socket地址创建对象
     * @param socketAddress - 包含地址信息的SocketAddress对象
     * @returns 创建结果或派生对象
     */
    Create(socketAddress: SocketAddress): any;

    /**
     * 比较当前对象与指定对象是否相等
     * @param comparand - 要比较的对象（可为null）
     * @returns 相等返回true，否则false
     */
    Equals(comparand: any | null): boolean;

    /**
     * 获取对象的哈希值
     * @returns 基于地址和端口计算的哈希码
     */
    GetHashCode(): number;

    /**
     * 将字符串解析为IP终结点对象
     * @param s - 格式为"IP:端口"的字符串或字符数组
     * @returns 解析后的IPEndPoint对象
     */
    Parse(s: ReadonlyArray<char> | string): IPEndPoint;

    /**
     * 序列化为Socket地址对象
     * @returns 包含序列化数据的SocketAddress对象
     */
    Serialize(): SocketAddress;

    /**
     * 转换为标准字符串表示形式
     * @returns 格式为"IP:端口"的字符串
     */
    ToString(): string;

    /**
     * 尝试解析字符串为IP终结点对象
     * @param s - 要解析的字符串或字符数组
     * @param result - 输出参数，接收解析结果（失败时为null）
     * @returns 解析成功返回true，失败返回false
     */
    TryParse(s: ReadonlyArray<char> | string, result: IPEndPoint | null): boolean;
}