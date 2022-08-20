const cooldowns = new Map()
const {Collection} = require('discord.js');
require('dotenv').config();
const permissions = [   
    'CREATE_INSTANT_INVITE', 'KICK_MEMBERS',
    'BAN_MEMBERS',           'ADMINISTRATOR',
    'MANAGE_CHANNELS',       'MANAGE_GUILD',
    'ADD_REACTIONS',         'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',      'STREAM',
    'VIEW_CHANNEL',          'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',     'MANAGE_MESSAGES',
    'EMBED_LINKS',           'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',  'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',   'VIEW_GUILD_INSIGHTS',
    'CONNECT',               'SPEAK',
    'MUTE_MEMBERS',          'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',          'USE_VAD',
    'CHANGE_NICKNAME',       'MANAGE_NICKNAMES',
    'MANAGE_ROLES',          'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS'
  ]

  var prefix = process.env.PREFIX
module.exports = {
    name: 'messageCreate',
    execute: async (message, client) => {
        if (!message.content.startsWith(prefix)) return
        const args = message.content.slice(prefix.length).split(/ +/)
        const commandName = args.shift().toLowerCase()
        const command = client.commands.get(commandName)
        if(!command) return
        if(command.permissions){
            const invalidPerms = []
            for (perm of command.permissions){
                if(!permissions.includes(perm)){
                    return console.log(`The command has invalid permission ${perm}`)
                }
                if(!message.member.permissions.has(perm)){
                    invalidPerms.push(perm)
                }
            }
            if(invalidPerms.length){
                message.channel.send('This command requires  `' + invalidPerms  +' `permissions'.replace(/(\r\n|\n|\r)/gm, ""))
                return 
            }
        }
        if(!cooldowns.has(command.name)){
            cooldowns.set(command.name, new Collection())
        }
        const current_time = Date.now();
        const time_stamp = cooldowns.get(command.name)
        const cooldown_amount = command.cooldown * 1000
        if(time_stamp.has(message.author.id)){
            const expiration_time = time_stamp.get(message.author.id) + cooldown_amount
            if(current_time < expiration_time){
                const time_left = (expiration_time - current_time) / 1000
                return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ` + '`'+prefix + command.name +'` again' ) 
            }
        }
        time_stamp.set(message.author.id, current_time)
        setTimeout(() => {
            time_stamp.delete(message.author.id)
        }, cooldown_amount);
        command.execute(message, args, client)
    }
}