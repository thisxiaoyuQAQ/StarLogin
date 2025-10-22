/// <reference types="../csharp-std/list.d.ts" />
/// <reference path="index.d.ts" />

/**
 * 表示消息链中的抽象片段基类
 */
declare abstract class Segment {
    /**
     * 将片段转换为字符串表示形式
     * @returns 片段的字符串表示
     */
    abstract AsString(): string;
}

/**
 * 表示@用户类型的消息片段  
 */
declare class AtSegment extends Segment {
    /** 被@的用户ID */
    Id: string;
    
    /**
     * 生成@用户的字符串表示
     * @returns 格式为"@用户ID"的字符串
     */
    AsString(): string;
}

/**
 * 表示表情类型的消息片段
 */
declare class FaceSegment extends Segment {
    /** 表情的唯一标识符 */
    id: string;  // Note lowercase 'id' to match JsonPropertyName
    
    /**
     * 生成表情的字符串表示
     * @returns 格式为"[表情ID]"的字符串
     */
    AsString(): string;
}

/**
 * 表示图片类型的消息片段
 */
declare class ImageSegment extends Segment {
    /** 图片资源的URI地址 */
    Uri: string;
    
    /**
     * 生成图片的字符串表示
     * @returns 格式为"[图片]"的字符串
     */
    AsString(): string;
}

/**
 * 实现消息链的容器类，支持多种消息片段类型
 * 提供类似列表的操作接口和流式构建方法
 */
declare class MessageChain implements IList<Segment> {
    /** 内部存储消息片段的数组 */
    private _segments: Segment[];
    
    /** 初始化空消息链 */
    constructor();
    
    // === IList接口实现 ===
    
    /** 获取消息链中片段的数量 */
    get Count(): number;
    
    /** 指示消息链是否为只读（始终返回false） */
    get IsReadOnly(): boolean;
    
    /** 获取消息链的枚举器 */
    GetEnumerator(): IEnumerator<Segment>;
    
    // === 索引访问器 ===
    
    /**
     * 获取指定索引处的消息片段
     * @param index 目标索引位置
     * @returns 对应位置的消息片段
     */
    get(index: number): Segment;
    
    /**
     * 设置指定索引处的消息片段
     * @param index 目标索引位置
     * @param value 要设置的消息片段
     */
    set(index: number, value: Segment): void;
    
    // === 集合操作方法 ===
    
    /**
     * 向消息链末尾添加片段
     * @param item 要添加的消息片段
     */
    Add(item: Segment): void;
    
    /** 清空消息链中的所有片段 */
    Clear(): void;
    
    /**
     * 检查消息链是否包含指定片段
     * @param item 要查找的消息片段
     * @returns 如果包含则返回true，否则返回false
     */
    Contains(item: Segment): boolean;
    
    /**
     * 将消息链内容复制到目标数组
     * @param array 目标数组
     * @param arrayIndex 数组起始索引
     */
    CopyTo(array: Segment[], arrayIndex: number): void;
    
    /**
     * 查找指定片段在消息链中的索引
     * @param item 要查找的消息片段
     * @returns 片段索引，未找到则返回-1
     */
    IndexOf(item: Segment): number;
    
    /**
     * 在指定位置插入消息片段
     * @param index 插入位置的索引
     * @param item 要插入的消息片段
     */
    Insert(index: number, item: Segment): void;
    
    /**
     * 移除指定的消息片段
     * @param item 要移除的消息片段
     * @returns 成功移除返回true，否则返回false
     */
    Remove(item: Segment): boolean;
    
    /**
     * 移除指定索引处的消息片段
     * @param index 要移除的片段索引
     */
    RemoveAt(index: number): void;
    
    // === 流式构建方法 ===
    
    /**
     * 添加文本片段（支持多个参数）
     * @param text 要添加的文本内容
     * @returns 当前消息链实例（支持链式调用）
     */
    Text(...text: string[]): MessageChain;
    
    /**
     * 添加换行符片段
     * @returns 当前消息链实例（支持链式调用）
     */
    NextLine(): MessageChain;
    
    /**
     * 添加@用户片段
     * @param id 目标用户ID
     * @returns 当前消息链实例（支持链式调用）
     */
    At(id: string): MessageChain;
    
    /**
     * 添加图片片段
     * @param uri 图片资源URI
     * @returns 当前消息链实例（支持链式调用）
     */
    Image(uri: string): MessageChain;
    
    /**
     * 添加表情片段
     * @param id 表情ID
     * @returns 当前消息链实例（支持链式调用）
     */
    Face(id: number): MessageChain;
    
    /**
     * 添加回复引用片段
     * @param messageId 被回复的消息ID
     * @returns 当前消息链实例（支持链式调用）
     */
    Reply(messageId: string): MessageChain;
    
    // === 输出方法 ===
    
    /**
     * 将整个消息链转换为字符串
     * @returns 所有片段拼接后的完整字符串
     */
    AsString(): string;
}

/**
 * 表示回复引用类型的消息片段
 */
declare class ReplySegment extends Segment {
    /** 被引用消息的ID */
    Id: string;
    
    /**
     * 生成回复引用的字符串表示
     * @returns 格式为"[回复消息ID]"的字符串
     */
    AsString(): string;
}

/**
 * 表示纯文本类型的消息片段
 */
declare class TextSegment extends Segment {
    /** 文本内容 */
    Text: string;
    
    /**
     * 返回原始文本内容
     * @returns 未修改的文本字符串
     */
    AsString(): string;
}

/**
 * 表示无法识别的消息片段类型
 */
declare class UnsupportedSegment extends Segment {
    /** 原始片段类型标识 */
    Type: string;
    
    /** 原始片段数据 */
    Data: string;
    
    /**
     * 生成未支持类型的字符串表示
     * @returns 格式为"[未知类型]"的字符串
     */
    AsString(): string;
}