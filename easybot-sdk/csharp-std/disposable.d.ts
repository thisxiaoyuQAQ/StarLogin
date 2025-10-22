/**
 * 提供一种机制来释放未托管资源。
 */
declare interface IDisposable {
    /**
     * 释放、释放或重置非托管资源
     */
    Dispose(): void;
}