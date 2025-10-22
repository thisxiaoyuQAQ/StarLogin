/**
 * LiteDB API命名空间，提供高性能键值对存储接口 (用于插件数据持久化)
 * 每个插件拥有独立的数据库文件，文件名为插件ID.ldb
 */
declare namespace litedb {
    /**
     * 获取数据库路径
     * @returns 数据库文件路径
     */
    function GetDbPath(): string;

    /**
     * 设置键值对
     * @param collection 集合名称
     * @param key 键
     * @param value 值
     * @returns 是否成功
     */
    function Set(collection: string, key: string, value: any): boolean;

    /**
     * 获取键值对
     * @param collection 集合名称
     * @param key 键
     * @returns 值，如果不存在则返回null
     */
    function Get(collection: string, key: string): any;

    /**
     * 获取键值对（带默认值）
     * @param collection 集合名称
     * @param key 键
     * @param defaultValue 默认值，如果不存在则返回此值
     * @returns 值，如果不存在则返回默认值
     */
    function GetValue(collection: string, key: string, defaultValue?: any): any;

    /**
     * 获取字符串值
     * @param collection 集合名称
     * @param key 键
     * @param defaultValue 默认值，如果不存在则返回此值
     * @returns 字符串值，如果不存在则返回默认值
     */
    function GetString(collection: string, key: string, defaultValue?: string): string;

    /**
     * 获取数字值
     * @param collection 集合名称
     * @param key 键
     * @param defaultValue 默认值，如果不存在则返回此值
     * @returns 数字值，如果不存在则返回默认值
     */
    function GetNumber(collection: string, key: string, defaultValue?: number): number;

    /**
     * 获取布尔值
     * @param collection 集合名称
     * @param key 键
     * @param defaultValue 默认值，如果不存在则返回此值
     * @returns 布尔值，如果不存在则返回默认值
     */
    function GetBoolean(collection: string, key: string, defaultValue?: boolean): boolean;

    /**
     * 获取日期时间值
     * @param collection 集合名称
     * @param key 键
     * @returns 日期时间值，如果不存在则返回当前时间
     */
    function GetDateTime(collection: string, key: string): Date;

    /**
     * 删除键值对
     * @param collection 集合名称
     * @param key 键
     * @returns 是否成功
     */
    function Delete(collection: string, key: string): boolean;

    /**
     * 检查键是否存在
     * @param collection 集合名称
     * @param key 键
     * @returns 是否存在
     */
    function Exists(collection: string, key: string): boolean;

    /**
     * 获取集合中所有键
     * @param collection 集合名称
     * @returns 键列表
     */
    function GetKeys(collection: string): string[];

    /**
     * 获取集合中的键值对数量
     * @param collection 集合名称
     * @returns 键值对数量
     */
    function Count(collection: string): number;

    /**
     * 清空集合
     * @param collection 集合名称
     * @returns 是否成功
     */
    function Clear(collection: string): boolean;

    /**
     * 递增数值
     * @param collection 集合名称
     * @param key 键
     * @param increment 增量，默认为1
     * @returns 递增后的值
     */
    function Increment(collection: string, key: string, increment?: number): number;

    /**
     * 获取所有集合名称
     * @returns 集合名称列表
     */
    function GetCollections(): string[];

    /**
     * 删除集合
     * @param collection 集合名称
     * @returns 是否成功
     */
    function DropCollection(collection: string): boolean;

    /**
     * 重命名集合
     * @param oldName 旧名称
     * @param newName 新名称
     * @returns 是否成功
     */
    function RenameCollection(oldName: string, newName: string): boolean;

    /**
     * 备份数据库
     * @param backupPath 备份文件路径
     * @returns 是否成功
     */
    function Backup(backupPath: string): boolean;

    /**
     * 压缩数据库
     * @returns 是否成功
     */
    function Shrink(): boolean;

    /**
     * 获取数据库文件大小（字节）
     * @returns 文件大小
     */
    function GetFileSize(): number;

    /**
     * 导出集合为JSON
     * @param collection 集合名称
     * @returns JSON字符串
     */
    function ExportToJson(collection: string): string;

    /**
     * 从JSON导入集合
     * @param collection 集合名称
     * @param json JSON字符串
     * @returns 导入的键值对数量
     */
    function ImportFromJson(collection: string, json: string): number;

    /**
     * 查询满足条件的键值对
     * @param collection 集合名称
     * @param query 查询条件，例如 "$.value.age > 18"
     * @returns 匹配的键列表
     */
    function Query(collection: string, query: string): string[];

    /**
     * 批量设置键值对
     * @param collection 集合名称
     * @param data 键值对字典
     * @returns 成功设置的键值对数量
     */
    function BatchSet(collection: string, data: Record<string, any>): number;

    /**
     * 批量获取键值对
     * @param collection 集合名称
     * @param keys 键列表
     * @returns 键值对字典
     */
    function BatchGet(collection: string, keys: string[]): Record<string, any>;

    /**
     * 批量删除键值对
     * @param collection 集合名称
     * @param keys 键列表
     * @returns 成功删除的键值对数量
     */
    function BatchDelete(collection: string, keys: string[]): number;
}