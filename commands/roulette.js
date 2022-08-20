
const fs = require('fs')
const Canvas = require('canvas')

const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment} = require('discord.js')





module.exports = {
    name: 'roulette',   
    execute: async(message, args, client) => {
        var players = {
           
        }
        // wheelCanvas.context.beginPath()
        // wheelCanvas.context.arc(0, 0, 2000, 0, Math.PI * 2, true)
        // wheelCanvas.context.closePath()
        // wheelCanvas.context.clip()
        const generateEmbed = (plys) => {

            var players_str = ''

            for(key of Object.keys(plys)){
                var player = plys[key]
                players_str += `:regional_indicator_${key.split('_')[1]}:  :  <@${player}>\n`
            }


            var startEmbed = new MessageEmbed()
            .setColor('#4bd1e1')
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .setTitle('روليت')
            .setDescription(`**...جاري انتظار لاعبين اخرين**\n ستبدأ الجولة الأولى بعد \n <t:${game_start_at}:R>`)
            .addField('**>>> الاعبون: **', players_str !== '' ? players_str : 'لا يوجد أي لاعب')
            .setTimestamp()

            return startEmbed
        }

        const generateRoulette = async(randomPlayer) => {  
            
            
         
        var wheelCanvas = {}
        wheelCanvas.create = Canvas.createCanvas(1920, 1920)
        wheelCanvas.context = wheelCanvas.create.getContext('2d')
        wheelCanvas.context.font = '72px sans-serif';
        wheelCanvas.context.fillStyle = '#ffffff'
        
        var arrayOfPlayers = Object.keys(players).map(player => {
            return players[player]
        })

        var randomPlayerIndex = arrayOfPlayers.indexOf(randomPlayer)
        arrayOfPlayers.splice(randomPlayerIndex, 1)
        arrayOfPlayers = [randomPlayer].concat(arrayOfPlayers)

        var players_length = arrayOfPlayers.length


        for (var i = 0; i < players_length; i++) {
            var pieAngle = 2 * Math.PI / players_length;
            wheelCanvas.context.beginPath();
            wheelCanvas.context.moveTo(975, 975);
            wheelCanvas.context.arc(975, 975, 870, i*pieAngle - (pieAngle/2), (i+1)*pieAngle - (pieAngle/2), false);
            wheelCanvas.context.lineWidth = 150;
            var hueValue = i * 15;
            wheelCanvas.context.fillStyle = 'hsl(' + hueValue + ',70%, 60%)';
            // '#'+(Math.random()*0xFFFFFF<<0).toString(16);
            wheelCanvas.context.fill();
            wheelCanvas.context.lineWidth = 2;
            wheelCanvas.context.strokeStyle = '#444';
            wheelCanvas.context.stroke();
        }  
        var i = 0
        for(p of arrayOfPlayers){
            var member = await message.guild.members.cache.get(p)
                var pieAngle = 2 * Math.PI / players_length;
                var dx = 800 * Math.sin((i+1) * (pieAngle))   + 975
                var dy = 800 * Math.cos((i+1) * (pieAngle))   + 975
               
                wheelCanvas.context.font = '100px Poppins'
                wheelCanvas.context.fillStyle = '#ffffff'
                wheelCanvas.context.textAlign = 'center'
                wheelCanvas.context.textBaseline = 'middle';
                wheelCanvas.context.fillText(`${member.user.username}`,dx, dy)
           
            i++
        }
        
        

        await Canvas.loadImage('C:/Users/Nasirishop/Documents/GitHub/Hope-Games/images/empty-roulette-wheel.png').then(img => {
            wheelCanvas.context.drawImage(img, 0,0, 1920, 1920)
        })
            return wheelCanvas.create.toBuffer()
        }

        var game_over = false
        var alphabets = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹']
        // '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'
        var curr_timestamp = Date.now()
        var game_start_at = Math.floor(curr_timestamp/1000) + 30
        var currPlayer;
        var rows = []
        var real_alphabets = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t"];
        for(var i = 0; i < Math.floor(alphabets.length/5); i++){
            var row = new MessageActionRow()
            for(var j = 5*i; j < 5*i+5; j++){
                var button = new MessageButton()
                .setCustomId(`player_${real_alphabets[j]}`)
                .setEmoji(alphabets[j])
                .setStyle('SECONDARY')
                row.addComponents(
                    button
                )
            }
            rows.push(row)
        }

        var helpRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('helpButton')
                .setLabel('كيفية اللعب')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('randomJoin')
                .setLabel(' إختيار عشوائي')
                .setStyle('PRIMARY')
            )

        rows.push(helpRow)
        
        var msg = await message.channel.send({
            embeds: [
                generateEmbed(players)
            ],
            components: rows
        })


        client.on('interactionCreate', (interaction) => {
            try{
                if(interaction.isButton()){
                    var customId = interaction.customId
                    const userId = interaction.user.id
                    if(customId.startsWith('player_')){
                        if(!players.hasOwnProperty(customId) && Object.values(players).indexOf(userId) === -1){
                            players[customId] = userId
                            var alphabet = customId.split('_')[1]
                            var alphabet_index = real_alphabets.indexOf(alphabet)
                            var row = rows[Math.floor(alphabet_index/5)]
                            for(button of row.components){
                                if(button.customId === customId){
                                    button.setDisabled(true)
                                    button.setLabel(`${interaction.user.username}`)
                                }
                            }
                            msg.edit({
                                embeds: [
                                    generateEmbed(players)
                                ],
                                components: rows  
                            }).then(async(msg) => {
                               
                            })
                        }else if(Object.values(players).indexOf(userId) > -1){
                           interaction.reply({
                                ephemeral: true,
                                content: 'إنك مشارك بالفعل',
                           })
                        }else if(players.hasOwnProperty(customId)){
                            interaction.reply({
                                ephemeral: true,
                                content: 'لقد تم أخذ هذا الحرف من قبل شخص أخر.',
                           })
                        }
                    }else if(customId === 'randomJoin'){
                        if(!players.hasOwnProperty(customId) && Object.values(players).indexOf(userId) === -1){
                            var players_alphabets = Object.keys(players).map(players => {
                                return players.split('_')[1]
                            })
                            var available_alphabets = real_alphabets.filter(alpha => !players_alphabets.includesIalpha)
                            var randomIndex = Math.floor(Math.random() * available_alphabets.length)
                            var randomAlphabet = available_alphabets[randomIndex]
                            var realAlphabetIndex = real_alphabets.indexOf(randomAlphabet)
                            var row = rows[Math.floor(realAlphabetIndex/5)]
                            for(button of row.components){
                                if(button.customId === `player_${randomAlphabet}`){
                                    button.setDisabled(true)
                                    button.setLabel(`${interaction.user.username}`)
                                }
                            }
                            players[`player_${randomAlphabet}`] = userId
    
                            msg.edit({
                                embeds: [
                                    generateEmbed(players)
                                ],
                                components: rows  
                            }).then(async(msg) => {
                               
                            })
    
                        }else if(Object.values(players).indexOf(userId) > -1){
                           
                         }else if(players.hasOwnProperty(customId)){
                           
                         }
                    }else if(customId.startsWith('kick_')){
                        if(currPlayer === userId){
                            var kickAlphabet = customId.split('_')[1]

                            var kickPlayer = `player_${kickAlphabet}`
    
                            message.channel.send(`لقد طرد <@${userId}> <@${players[kickPlayer]}> الجولة القادمة في بضع ثواني, ستبدأالجولة القادمة في بضع ثواني...`)
    
                            delete players[kickPlayer]
                            if(Object.keys(players).length === 2){
                                return interaction.channel.send(':crown: هذه الجولة الأخيرة ! اللاعب المختار هو اللاعب الفائز في اللعبة.')
                            }
                        }else{
                           
                        }
                    }else if(customId === 'surrender'){
                        if(currPlayer === userId){
                           
                            var key = Object.keys(players).find(key => players[key] === userId)

                            interaction.channel.send(`لقد انسحب <@${players[key]}>`)
                            delete players[key]
                            if(Object.keys(players).length === 2){
                                return interaction.channel.send(':crown: هذه الجولة الأخيرة ! اللاعب المختار هو اللاعب الفائز في اللعبة.')
                            }
                        }else{
                           
                        }
                    }
                }
            }catch(err){
                console.log(err)
            }
        })
        
        await new Promise(r => setTimeout(r, 10*1000))

        for(row of rows){
            for(button of row.components){
                button.setDisabled(true)
            }
        }

        msg.edit({
            embeds: [
                generateEmbed(players)
            ],
            components: rows
        })
      


        if(Object.keys(players).length < 2){
            players = {}
            return message.reply('**لقد تم إلغاء اللعبة,  بسبب عدم تواجد اللاعبين!**')
        }

        message.channel.send(`تم إختيار الحروف لكل لاعب, ستبدأ الجولة الأولى في  ✅  <t:${Math.floor(Date.now()/1000 + 10)}:R>`).then(async(startMsg) => {
                await new Promise(r => setTimeout(r, 10*1000)).then(async(r) => {
                    
                })
                await startMsg.edit(`تم إختيار الحروف لكل لاعب, ستبدأ الجولة الأولى في  ✅` + '`0  ثانية`').then(async(r) => {
                    while(Object.keys(players).length > 1){
                        var currLength = Object.keys(players).length
                        var plys_alphabets = Object.keys(players)
                        var randomKey = plys_alphabets[Math.floor(Math.random() * plys_alphabets.length)]
                        var randomPlayer = players[randomKey]
                        currPlayer = randomPlayer
                        if(Object.keys(players).length === 2){
                            var lastPlayer = Object.keys(players).find(key => players[key] !== randomPlayer)
                            message.channel.send({
                                content: `:regional_indicator_${randomKey.split('_')[1]}: : <@${randomPlayer}>  -  فاز بالعبة!`,
                                files: [new MessageAttachment(await generateRoulette(randomPlayer), 'nice-guy.png')]
                            }).then(winMsg => {
                                delete players[lastPlayer]
                                return message.channel.send({
                                    content: `مبروك <@${randomPlayer}>, لقد فزت بالعبة :crown:`
                                })
                            })
                        }else{
                            var kickRow = new MessageActionRow()
    
                            for(player of Object.keys(players)){
                                var member = await message.guild.members.cache.get(players[player])
                                var kick_alphabet = player.split('_')[1]
                                var emojiAlphabet = alphabets[real_alphabets.indexOf(kick_alphabet)]
                                var playerId = players[player]
                                var button =   new MessageButton()
                                .setCustomId(`kick_${kick_alphabet}`)
                                .setEmoji(emojiAlphabet)
                                .setLabel(member.user.username)
                                .setStyle('SECONDARY')
                                if(randomPlayer === playerId){
                                    button.setDisabled(true)
                                }
                                kickRow.addComponents(
                                    button
                                )
                            }

                            var helpRow = new MessageActionRow()
                            helpRow.addComponents(
                                new MessageButton()
                                .setCustomId('surrender')
                                .setLabel('إنسحاب')
                                .setStyle('DANGER')
                            )
    
                            message.channel.send({
                            content: `:regional_indicator_${randomKey.split('_')[1]}: :  <@${randomPlayer}>  - قم باختيار لاعب لطرده \n <@${randomPlayer}> لديك 15 ثانية لاختيار لاعب لطرده`,
                                files: [new MessageAttachment(await generateRoulette(randomPlayer), 'nice-guy.png')],
                                components: [kickRow,helpRow]
                            })
                        }
                        await new Promise(r => setTimeout(r, 15*1000))
                        if(currLength === Object.keys(players).length) {
                            var key = Object.keys(players).find(key => players[key] === randomPlayer)
                            delete players[key]
                            message.channel.send(`لقد تم طرد <@${randomPlayer}> لعدم تفاعله مع اللعبة!`)
                        }
                    }
                })
            })


    }
}