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
const pendingVerifications = new Map(); // key: 玩家名(小写), value: {playerName, server, code, timestamp, playerUuid}

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
    const playerKey = playerName.toLowerCase();
    const currentTime = getTimestamp();

    // 检查是否已有待验证的信息
    const existingVerification = pendingVerifications.get(playerKey);

    // 防抖：如果30秒内已经生成过验证码，复用现有验证码
    if (existingVerification) {
        const timeDiff = currentTime - existingVerification.timestamp;
        const thirtySeconds = 30 * 1000;

        if (timeDiff < thirtySeconds) {
            // 保存验证码到局部变量（安全！）
            const reuseCode = existingVerification.code;
            const reuseBoundQQ = existingVerification.boundQQ;

            console.log(`[StarLogin] 玩家 ${playerName} 重复登录（${Math.floor(timeDiff/1000)}秒内），复用验证码: ${reuseCode}`);

            // 创建新对象替换，而不是直接修改引用（安全！）
            pendingVerifications.set(playerKey, {
                playerName: playerName,
                playerUuid: playerUuid,
                server: server,  // 使用最新的server对象
                code: reuseCode,  // 复用验证码
                timestamp: currentTime,  // 刷新时间戳
                boundQQ: reuseBoundQQ  // 保持原有的QQ绑定
            });

            // 只发送游戏内提示，不重新发送QQ消息（避免刷屏）
            setTimeout(() => {
                // 使用局部变量，不依赖对象引用（安全！）
                server.SendRunCommandAsync(playerName, `vtitle ${playerName} §a§l${playerName} 请完成验证`, false);
                server.SendRunCommandAsync(playerName, `vtell ${playerName} §e§l请使用之前的验证码: ${reuseCode}`, false);
                console.log(`[StarLogin] 已向玩家 ${playerName} 发送游戏内提示（复用验证码）`);
            }, 4000);

            return; // 直接返回，不重新生成验证码
        } else {
            // 超过30秒，清理旧的验证码
            console.log(`[StarLogin] 清理玩家 ${playerName} 的过期验证码`);
            pendingVerifications.delete(playerKey);
        }
    }

    // 生成新验证码
    const verificationCode = generateVerificationCode();
    const timestamp = getTimestamp();

    // 尝试从数据库获取玩家绑定的QQ号
    let boundQQ = null;
    try {
        const player = db.GetPlayerByName(playerName);
        if (player && player.SocialAccount) {
            boundQQ = player.SocialAccount.Uuid;
            const platform = player.SocialAccount.Platform;

            console.log(`[StarLogin] 玩家 ${playerName} 绑定的QQ: ${boundQQ}, 平台: ${platform}`);

            // 如果是QQ平台且context可用，发送QQ私聊消息
            if (platform === "qq" && context && boundQQ) {
                const messageChain = new MessageChain()
                    .Text(`亲爱的 ${playerName}\n`)
                    .Text("您进入了服务器！\n")
                    .Text(`请发送验证码来完成登录：\n`)
                    .Text(`#login ${verificationCode}\n`)
                    .Text("如果不是您本人登录，请及时联系服主或管理员！");

                context.SendDirectMessageAsync(config.botQQ, boundQQ, messageChain).then(() => {
                    console.log(`[StarLogin] 已向玩家 ${playerName}(QQ:${boundQQ}) 发送登录提示消息`);
                }).catch(error => {
                    console.error(`[StarLogin] 发送QQ消息失败: ${error}`);
                });
            }
        } else {
            console.log(`[StarLogin] 玩家 ${playerName} 未绑定社交账号`);
        }
    } catch (error) {
        console.error(`[StarLogin] 查询玩家绑定信息失败: ${error}`);
    }

    // 存储验证码信息（包含绑定的QQ号）
    pendingVerifications.set(playerKey, {
        playerName: playerName,
        playerUuid: playerUuid,
        server: server,
        code: verificationCode,
        timestamp: timestamp,
        boundQQ: boundQQ  // 存储绑定的QQ号
    });

    console.log(`[StarLogin] 玩家 ${playerName}(${playerUuid}) 登录，生成验证码: ${verificationCode}`);

    // 延迟执行游戏内指令，确保玩家完全加载
    setTimeout(() => {
        // 发送标题
        server.SendRunCommandAsync(playerName, `vtitle ${playerName} §a§l${playerName} 请完成验证`, false);
        // 发送验证码提示
        server.SendRunCommandAsync(playerName, `vtell ${playerName} §a§l请私聊机器人(${config.botQQ})并发送: #login ${verificationCode}`, false);

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

    // 处理登录指令: #login 验证码
    if (messageText.startsWith("#login ")) {
        const code = messageText.substring(7).trim();

        if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
            const errorChain = new MessageChain()
                .Text("验证码格式错误！\n")
                .Text("正确格式: #login 验证码\n")
                .Text("例如: #login 123456");
            event.Context.Reply(errorChain);
            return;
        }

        // 遍历所有待验证信息，查找匹配的验证码和QQ号
        let foundVerification = null;
        let foundPlayerKey = null;

        for (const [playerKey, info] of pendingVerifications.entries()) {
            // 检查验证码是否匹配
            if (info.code === code) {
                // 如果有绑定的QQ号，检查是否匹配
                if (info.boundQQ) {
                    if (info.boundQQ === senderQQ) {
                        foundVerification = info;
                        foundPlayerKey = playerKey;
                        break;
                    }
                } else {
                    // 如果没有绑定QQ号，任何人都可以验证
                    foundVerification = info;
                    foundPlayerKey = playerKey;
                    break;
                }
            }
        }

        if (!foundVerification) {
            const errorChain = new MessageChain()
                .Text("验证码错误或您无权验证此玩家！\n")
                .Text("请确认:\n")
                .Text("1. 验证码是否正确\n")
                .Text("2. 是否使用绑定的QQ号\n")
                .Text("3. 验证码是否已过期（10分钟）");
            event.Context.Reply(errorChain);
            return;
        }

        const { playerName: realPlayerName, server, code: storedCode, timestamp, boundQQ } = foundVerification;

        // 检查验证码是否过期
        if (!isValidCode(code, storedCode, timestamp)) {
            const errorChain = new MessageChain()
                .Text("验证码已过期！\n")
                .Text("请重新进入服务器获取新验证码。");
            event.Context.Reply(errorChain);
            // 清理过期验证码
            pendingVerifications.delete(foundPlayerKey);
            return;
        }

        // 验证成功，执行登录完成操作
        server.SendRunCommandAsync(realPlayerName, `endlogin ${realPlayerName}`, false)
            .then(() => {
                console.log(`[StarLogin] 玩家 ${realPlayerName} 执行endlogin命令成功`);
            })
            .catch(error => {
                console.error(`[StarLogin] 执行endlogin命令失败: ${error}`);
            });

        // 发送欢迎消息
        const successChain = new MessageChain()
            .Text("✅ 验证成功！\n")
            .Text(`欢迎 ${realPlayerName} 回家！`);
        event.Context.Reply(successChain);

        // 游戏内显示欢迎标题
        server.SendRunCommandAsync(realPlayerName, `vtitle ${realPlayerName} §a§l${realPlayerName} 欢迎回家!`, false);

        // 清理验证码信息
        pendingVerifications.delete(foundPlayerKey);

        console.log(`[StarLogin] 玩家 ${realPlayerName}(QQ:${senderQQ}) 验证成功，登录完成`);
        return;
    }

    // 帮助信息
    if (messageText === "!help" || messageText === "!帮助") {
        const helpChain = new MessageChain()
            .Text("🎮 StarLogin 登录系统\n\n")
            .Text("📝 可用指令:\n")
            .Text("#login 验证码 - 验证登录\n")
            .Text("!help - 显示此帮助\n\n")
            .Text("示例:\n")
            .Text("#login 123456\n\n")
            .Text("⚠️ 注意:\n")
            .Text("1. 请先在游戏内绑定QQ号\n")
            .Text("2. 验证码有效期为10分钟");
        event.Context.Reply(helpChain);
        return;
    }
});

// 初始化日志
console.log("[StarLogin] 服务器登录插件已加载");

// 定期清理过期的验证码（每小时执行一次）
setInterval(() => {
    const now = getTimestamp();
    const tenMinutesInMs = 10 * 60 * 1000;
    let cleanedCount = 0;

    for (const [playerKey, info] of pendingVerifications.entries()) {
        if (now - info.timestamp > tenMinutesInMs) {
            pendingVerifications.delete(playerKey);
            cleanedCount++;
        }
    }

    if (cleanedCount > 0) {
        console.log(`[StarLogin] 清理了 ${cleanedCount} 条过期的验证码信息`);
    }
}, 60 * 60 * 1000);