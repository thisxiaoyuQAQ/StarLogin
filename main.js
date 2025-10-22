/// <reference path="easybot-sdk/easybot.d.ts" />

// 全局配置和状态管理
const config = {
    botQQ: "725439308" // 机器人QQ号
};

let context = null;
bus.on("raw_message_event", function (event) {
    context = event.AdapterContext; 
    //logger.info("重定位上下文为: " + event.AdapterName);
})

// 存储玩家验证码信息
const pendingVerifications = new Map(); // key: 玩家QQ, value: {playerName, server, code, timestamp}

// 工具函数模块
function formatTime(date = new Date()) {
    return date.toLocaleString('zh-CN');
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTimestamp() {
    return Date.now();
}

/**
 * 生成6位数字验证码
 * @returns {string} 6位数字验证码
 */
function generateVerificationCode() {
    return String(randomInt(100000, 999999));
}

/**
 * 验证验证码是否有效（10分钟内）
 * @param {string} code 验证码
 * @param {string} storedCode 存储的验证码
 * @param {number} timestamp 验证码生成时间戳
 * @returns {boolean} 是否有效
 */
function isValidCode(code, storedCode, timestamp) {
    const now = getTimestamp();
    const tenMinutesInMs = 10 * 60 * 1000;
    return code === storedCode && (now - timestamp) < tenMinutesInMs;
}

/**
 * 玩家登录服务器事件处理
 */
bus.on("player_login", function (server, playerName, playerUuid) {
    // 生成验证码
    const verificationCode = generateVerificationCode();
    const timestamp = getTimestamp();
    
    // 存储验证码信息
    pendingVerifications.set(playerUuid, {
        playerName: playerName,
        server: server,
        code: verificationCode,
        timestamp: timestamp
    });
    
    console.log(`[StarLogin] 玩家 ${playerName}(${playerUuid}) 登录，生成验证码: ${verificationCode}`);
    
    // 发送QQ私聊消息
    const messageChain = new MessageChain()
        .Text("亲爱的")
        .Text(playerName)
        .Text(" 您进入了服务器! 请发送服务器内显示的验证码来完成登录! 格式为 '#login 验证码' 如果不是您本人登录 请及时联系服主或者管理员!");
    
    
    context.SendDirectMessageAsync(config.botQQ, playerUuid, messageChain).then(() => {
        console.log(`[StarLogin] 已向玩家 ${playerName} 发送登录提示消息`);
    }).catch(error => {
        console.error(`[StarLogin] 发送消息失败: ${error}`);
    });
    
    // 延迟执行游戏内指令，确保玩家完全加载
    setTimeout(() => {
        // 发送标题
        server.SendRunCommandAsync(playerName, `vtitle ${playerName} §a§l${playerName} 请完成验证`, false);
        // 发送私聊
        server.SendRunCommandAsync(playerName, `vtell ${playerName} §a§l请私聊机器人并发送验证码: ${verificationCode}`, false);
        
        console.log(`[StarLogin] 已向玩家 ${playerName} 发送游戏内提示`);
    }, 4000);
});

/**
 * 私聊消息事件处理
 */
bus.on("direct_message_event", function (event) {
    if (event.SenderId == config.botQQ) return; // 忽略自己发送的消息

    const messageText = event.RawMessage.trim();
    const senderQQ = event.SenderId;
    
    // 检查是否是登录指令
    if (messageText.startsWith("#login ")) {
        const code = messageText.substring(7).trim();
        const verificationInfo = pendingVerifications.get(senderQQ);
        
        // 验证验证码
        if (!verificationInfo) {
            const errorChain = new MessageChain().Text("未找到待验证信息，请重新进入服务器获取验证码!");
            event.Context.Reply(errorChain);
            return;
        }
        
        const { playerName, server, code: storedCode, timestamp } = verificationInfo;
        
        if (!isValidCode(code, storedCode, timestamp)) {
            const errorChain = new MessageChain().Text("验证码错误或已过期，请重新获取!");
            event.Context.Reply(errorChain);
            return;
        }
        
        // 验证成功，执行登录完成操作
        server.SendRunCommandAsync(playerName, `endlogin ${playerName}`, false);
        
        // 发送欢迎消息
        const successChain = new MessageChain().Text("欢迎您回家!");
        event.Context.Reply(successChain);
        
        // 游戏内显示欢迎标题
        server.SendRunCommandAsync(playerName, `vtitle ${playerName} "${playerName} 欢迎回家!"`, false);
        
        // 清理验证码信息
        pendingVerifications.delete(senderQQ);
        
        console.log(`[StarLogin] 玩家 ${playerName}(${senderQQ}) 验证成功，登录完成`);
    }
});

// 初始化日志
console.log("[StarLogin] 服务器登录插件已加载");

// 定期清理过期的验证码（每小时执行一次）
setInterval(() => {
    const now = getTimestamp();
    const tenMinutesInMs = 10 * 60 * 1000;
    let cleanedCount = 0;
    
    for (const [playerQQ, info] of pendingVerifications.entries()) {
        if (now - info.timestamp > tenMinutesInMs) {
            pendingVerifications.delete(playerQQ);
            cleanedCount++;
        }
    }
    
    if (cleanedCount > 0) {
        console.log(`[StarLogin] 清理了 ${cleanedCount} 条过期的验证码信息`);
    }
}, 60 * 60 * 1000);