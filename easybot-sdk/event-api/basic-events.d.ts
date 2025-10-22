/// <reference path="../easybot.d.ts" />

declare namespace bus {
    /**
     * 插件被启用
     */
    function on(event: "enable", handler: () => void): void;
    /**
     * 插件被禁用
     */
    function on(event: "disable", handler: () => void): void;
}