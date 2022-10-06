const Discord = require('discord.js')
const axios = require('axios').default
const key = require('../config.json').robloxAPIkey

module.exports = {
    name: 'dtr',
    description: 'Execute a Discord-to-Roblox moderation action.',
    options: [
        {
            name: 'kick',
            type: 1,
            description: 'Kick someone ingame by their username or unique UserID.',
            options: [
                {
                    name: 'user',
                    description: 'The username/userID to kick.',
                    type: 3,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Reason for kicking the player.',
                    type: 3,
                    required: false
                }
            ]
        },
        {
            name: 'ban',
            type: 1,
            description: 'Ban someone from the game by their username or unique UserID.',
            options: [
                {
                    name: 'user',
                    description: 'The username/userID to ban.',
                    type: 3,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Reason for banning the player.',
                    type: 3,
                    required: false
                }
            ]
        },
        {
            name: 'unban',
            type: 1,
            description: 'Unban someone from the game by their username or unique UserID.',
            options: [
                {
                    name: 'user',
                    description: 'The username/userID to unban.',
                    type: 3,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Reason for unbanning the player.',
                    type: 3,
                    required: false
                }
            ]
        },
        {
            name: 'shutdown',
            type: 1,
            description: 'Execute a global shutdown on all servers.',
            options: [
                {
                    name: 'time',
                    description: 'The delay before the shutdown. Starts after the success message.',
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: '30 seconds',
                            value: '30s'
                        },
                        {
                            name: '1 minute',
                            value: '1m'
                        },
                        {
                            name: '5 minutes',
                            value: '5m'
                        },
                        {
                            name: '10 minutes',
                            value: '10m'
                        },
                        {
                            name: '15 minutes',
                            value: '15m'
                        },
                        {
                            name: '30 minutes',
                            value: '30m'
                        },
                        {
                            name: '45 minutes',
                            value: '45m'
                        },
                        {
                            name: '1 hour',
                            value: '1h'
                        },
                        {
                            name: '2 hours',
                            value: '2h'
                        },
                        {
                            name: '3 hours',
                            value: '3h'
                        },
                        {
                            name: '6 hours',
                            value: '6h'
                        }
                    ]
                },
                {
                    name: 'reason',
                    description: 'Why you are shutting down all servers.',
                    type: 3,
                    required: false
                }
            ]
        }
    ],
    defaultPermission: false,
    async execute(interaction) {
        var reason = interaction.options.get('reason')
        try {
            reason = reason.value
        } catch {
            console.log('reason is undefined, set to none specified')
            reason = 'No reason specified.'
        }
        switch (interaction.options.getSubcommand()) {
            case 'kick':
                var user = interaction.options.get('user')
                if (isNaN(user)) { // username
                    var res = await axios.get('https://api.roblox.com/users/get-by-username?username=' + user)
                    .catch(() => {
                        interaction.reply({ embeds: [new Discord.EmbedBuilder()
                            .setDescription('❌ Invalid Username')
                            .setColor('DarkRed')
                        ]})
                    })
                    res = res.data
                    if (res.Id != undefined) {
                        var embed = new Discord.EmbedBuilder()
                            .setTitle('Kick successful.')
                            .setFooter({ text: '1+1=2' })
                            .addFields([{ name: 'Username', value: res.Username }, { name: 'User ID', value: res.Id.toString() }, { name: 'Reason', value: reason }])
                            .setColor('#00ff44')
                            .setAuthor({ name: '@littleBitsman#4576' })
                            .setTimestamp()
                        var req = await axios.post(
                            'https://apis.roblox.com/messaging-service/v1/universes/1841687313/topics/moderation',
                            { 'message': `kick | ${res.Id} | ${reason} | Discord To Roblox Command Execution - Executor: <@${interaction.member.id}>` },
                            { headers: { 'x-api-key': key } }
                        )
                        await req.data
                        console.log(req.headers)
                        interaction.reply({ content: interaction.member.toString(), embeds: [embed], ephemeral: true })
                    } else {
                        interaction.reply({ embeds: [new Discord.EmbedBuilder()
                            .setDescription('❌ Invalid Username')
                            .setColor('DarkRed')
                        ]})
                    }
                } else if (!isNaN(user)) { // userid
                    var res = await axios.get('https://api.roblox.com/users/' + user)
                    .catch(() => {
                        interaction.reply({ embeds: [new Discord.EmbedBuilder()
                            .setDescription('❌ Invalid Username')
                            .setColor('DarkRed')
                        ]})
                    })
                    res = res.data
                    if (res.Id != undefined) {
                        var embed = new Discord.EmbedBuilder()
                            .setTitle('Kick successful.')
                            .setFooter({ text: '1+1=2' })
                            .addFields([{ name: 'Username', value: res.Username }, { name: 'User ID', value: res.Id.toString() }, { name: 'Reason', value: reason }])
                            .setColor('#00ff44')
                            .setAuthor({ name: '@littleBitsman#4576' })
                            .setTimestamp()
                        var req = await axios.post(
                            'https://apis.roblox.com/messaging-service/v1/universes/1841687313/topics/moderation',
                            { 'message': `kick | ${res.Id} | ${reason} | Discord To Roblox Command Execution - Executor: <@${interaction.member.id}>` },
                            { headers: { 'x-api-key': key } }
                        )
                        await req.data
                        interaction.reply({ content: interaction.member.toString(), embeds: [embed], ephemeral: true })
                    } else {
                        interaction.reply({ embeds: [new Discord.EmbedBuilder()
                            .setDescription('❌ Invalid Username')
                            .setColor('DarkRed')
                        ]})
                    }
                }
                break;
            case 'ban':
                var user = interaction.options.get('user')
                if (isNaN(user)) { // username
                    var res = await axios.get('https://api.roblox.com/users/get-by-username?username=' + user)
                    .catch(() => {
                        interaction.reply({ embeds: [new Discord.EmbedBuilder()
                            .setDescription('❌ Invalid Username')
                            .setColor('DarkRed')
                        ]})
                    })
                    res = res.data
                    if (res.Id != undefined) {
                        var embed = new Discord.EmbedBuilder()
                            .setTitle('Ban successful.')
                            .setFooter({ text: '1+1=2' })
                            .addFields([{ name: 'Username', value: res.Username }, { name: 'User ID', value: res.Id.toString() }, { name: 'Reason', value: reason }])
                            .setColor('#00ff44')
                            .setAuthor({ name: '@littleBitsman#4576' })
                            .setTimestamp()
                        var req = await axios.post(
                            'https://apis.roblox.com/messaging-service/v1/universes/1841687313/topics/moderation',
                            { 'message': `ban | ${res.Id} | ${reason} | Discord To Roblox Command Execution - Executor: <@${interaction.member.id}>` },
                            { headers: { 'x-api-key': key } }
                        )
                        await req.data
                        console.log(req.headers)
                        interaction.reply({ content: interaction.member.toString(), embeds: [embed], ephemeral: true })
                    } else {
                        interaction.reply({ embeds: [new Discord.EmbedBuilder()
                            .setDescription('❌ Invalid Username')
                            .setColor('DarkRed')
                        ]})
                    }
                } else if (!isNaN(user)) { // userid
                    var user = interaction.options.get('user').value
                    var res = await axios.get('https://api.roblox.com/users/' + user)
                    .catch(() => {
                        interaction.reply({ embeds: [new Discord.EmbedBuilder()
                            .setDescription('❌ Invalid Username')
                            .setColor('DarkRed')
                        ]})
                    })
                    res = res.data
                    console.log(res.Username)
                    console.log(res.Id)
                    if (res.Id != undefined) {
                        var embed = new Discord.EmbedBuilder()
                            .setTitle('Ban successful.')
                            .setFooter({ text: '1+1=2' })
                            .addFields([{ name: 'Username', value: res.Username }, { name: 'User ID', value: res.Id.toString() }, { name: 'Reason', value: reason }])
                            .setColor('#00ff44')
                            .setAuthor({ name: '@littleBitsman#4576' })
                            .setTimestamp()
                        var req = await axios.post(
                            'https://apis.roblox.com/messaging-service/v1/universes/1841687313/topics/moderation',
                            { 'message': `ban | ${res.Id} | ${reason} | Discord To Roblox Command Execution - Executor: <@${interaction.member.id}>` },
                            { headers: { 'x-api-key': key } }
                        )
                        await req.data
                        interaction.reply({ content: interaction.member.toString(), embeds: [embed], ephemeral: true })
                    } else {
                        interaction.reply({ embeds: [new Discord.EmbedBuilder()
                            .setDescription('❌ Invalid Username')
                            .setColor('DarkRed')
                        ]})
                    }
                }
                break;
            case 'unban':
                var user = interaction.options.get('user')
                .catch(() => {
                    interaction.reply({ embeds: [new Discord.EmbedBuilder()
                        .setDescription('❌ Invalid Username')
                        .setColor('DarkRed')
                    ]})
                })
                if (isNaN(user)) { // username
                    var res = await axios.get('https://api.roblox.com/users/get-by-username?username=' + user)
                    res = res.data
                    if (res.Id != undefined) {
                        var embed = new Discord.EmbedBuilder()
                            .setTitle('Unban successful.')
                            .setFooter({ text: '1+1=2' })
                            .addFields([{ name: 'Username', value: res.Username }, { name: 'User ID', value: res.Id.toString() }, { name: 'Reason', value: reason }])
                            .setColor('#00ff44')
                            .setAuthor({ name: '@littleBitsman#4576' })
                            .setTimestamp()
                        var req = await axios.post(
                            'https://apis.roblox.com/messaging-service/v1/universes/1841687313/topics/moderation',
                            { 'message': `unban | ${res.Id} | ${reason} | Discord To Roblox Command Execution - Executor: <@${interaction.member.id}>` },
                            { headers: { 'x-api-key': key } }
                        )
                        await req.data
                        interaction.reply({ content: interaction.member.toString(), embeds: [embed], ephemeral: true })
                    } else {
                        interaction.reply({ embeds: [new Discord.EmbedBuilder()
                            .setDescription('❌ Invalid Username')
                            .setColor('DarkRed')
                        ]})
                    }
                } else if (!isNaN(user)) { // userid
                    var user = interaction.options.get('user').value
                    var res = await axios.get('https://api.roblox.com/users/' + user)
                    .catch(() => {
                        interaction.reply({ embeds: [new Discord.EmbedBuilder()
                            .setDescription('❌ Invalid Username')
                            .setColor('DarkRed')
                        ]})
                    })
                    res = res.data

                    if (res.Id != undefined) {
                        var embed = new Discord.EmbedBuilder()
                            .setTitle('Unban successful.')
                            .setFooter({ text: '1+1=2' })
                            .addFields([{ name: 'Username', value: res.Username }, { name: 'User ID', value: res.Id.toString() }, { name: 'Reason', value: reason }])
                            .setColor('#00ff44')
                            .setAuthor({ name: '@littleBitsman#4576' })
                            .setTimestamp()
                        var req = await axios.post(
                            'https://apis.roblox.com/messaging-service/v1/universes/1841687313/topics/moderation',
                            { 'message': `unban | ${res.Id} | ${reason} | Discord To Roblox Command Execution - Executor: <@${interaction.member.id}>` },
                            { headers: { 'x-api-key': key } }
                        )
                        await req.data
                        interaction.reply({ content: interaction.member.toString(), embeds: [embed], ephemeral: true })
                    } else {
                        interaction.reply({ embeds: [new Discord.EmbedBuilder()
                            .setDescription('❌ Invalid Username')
                            .setColor('DarkRed')
                        ]})
                    }
                }
                break;
            case 'shutdown':
                var time = interaction.options.get('time').value || ''
                var embed = new Discord.EmbedBuilder()
                    .setTitle('Shutdown successful.')
                    .setFooter({ text: '1+1=2' })
                    .addFields([{ name: 'Reason', value: reason }, { name: 'Time Delay', value: time }])
                    .setColor('#00ff44')
                    .setAuthor({ name: '@littleBitsman#4576' })
                    .setTimestamp()
                var req = await axios.post(
                    'https://apis.roblox.com/messaging-service/v1/universes/1841687313/topics/shutdowns',
                    { 'message': `${reason} | ${time} |  Discord To Roblox Command Execution - Executor: <@${interaction.member.id}>` },
                    { headers: { 'x-api-key': key } }
                )
                await req.data
                interaction.reply({ content: interaction.member.toString(), embeds: [embed], ephemeral: true })
                break;
            //}
        }

    }
}
