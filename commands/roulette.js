
const fs = require('fs')
const Canvas = require('canvas')

const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment} = require('discord.js')





module.exports = {
    name: 'roulette',   
    execute: async(message, args, client) => {
        var players = {
            player_a: '881186915271970907',
            player_b: '976534298062639106'
        }

        var firstPlayers;
        // wheelCanvas.context.beginPath()
        // wheelCanvas.context.arc(0, 0, 2000, 0, Math.PI * 2, true)
        // wheelCanvas.context.closePath()
        // wheelCanvas.context.clip()
        const generateEmbed = (plys) => {

            var players_str = ''
            var kickedPlayersStr = ''
            for(key of Object.keys(plys)){
                var player = plys[key]
                players_str += `:regional_indicator_${key.split('_')[1]}:  :  <@${player}>\n`
            }

            if(firstPlayers){
                for(kickedKey of Object.keys(firstPlayers)){
                    if(!players.hasOwnProperty(kickedKey)){
                        var player = plys[kickedKey]
                        kickedPlayersStr += `:regional_indicator_${kickedKey.split('_')[1]}:  :  <@${player}>\n`
                    }
                }
            }


            var startEmbed = new MessageEmbed()
            .setColor('#4bd1e1')
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .setTitle('روليت')
            .setDescription(rounds ? `**لقد بدأت اللعبة .**` : `**...جاري انتظار لاعبين اخرين**\n ستبدأ الجولة الأولى بعد \n <t:${game_start_at}:R>`)
            .addField('**>>> الاعبون : **', players_str !== '' ? players_str : 'لا يوجد أي لاعب')
            .setTimestamp()

            if(kickedPlayersStr !== ''){
                startEmbed.addField('**>>> تم إقصاء : **',kickedPlayersStr )
            }


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
    
           
            var players_length = arrayOfPlayers.length
    
            var canvasWidth = wheelCanvas.context.canvas.width;
            var canvasHeight =  wheelCanvas.context.canvas.height
            for (var i = 0; i < players_length; i++) {
                var pieAngle = 2 * Math.PI / players_length;
                wheelCanvas.context.beginPath();
                wheelCanvas.context.moveTo(canvasWidth/2, canvasHeight/2);
                wheelCanvas.context.arc(canvasWidth/2, canvasHeight/2, canvasWidth/2, i*pieAngle, (i+1)*pieAngle   , false);
                wheelCanvas.context.lineWidth = 150;
                var hueValue = i * 15;
                wheelCanvas.context.fillStyle = 'hsl(' + hueValue + ',70%, 60%)';
                // '#'+(Math.random()*0xFFFFFF<<0).toString(16);
                wheelCanvas.context.fill();
                wheelCanvas.context.lineWidth = 2;
                wheelCanvas.context.strokeStyle = '#444';
                wheelCanvas.context.stroke();

            }  

            await Canvas.loadImage('C:/Users/Nasirishop/Documents/GitHub/Hope-Games/images/empty-roulette-wheel.png').then(img => {
                wheelCanvas.context.drawImage(img, 0,0, 1920, 1920)
            })

            // await Canvas.loadImage(message.guild.iconURL({format: 'png',size: 128})).then(img => {
            //     wheelCanvas.context.drawImage(img, canvasWidth/2 - 64, canvasHeight/2 - 64, 500, 500)
            // })
            wheelCanvas.context.save()
            await Canvas.loadImage('C:/Users/Nasirishop/Documents/GitHub/Hope-Games/images/roulette-pointer.png').then(img => {
                var randomPlayerIndex = arrayOfPlayers.indexOf(players[randomPlayer])
                var pieAngle = 2 * Math.PI / players_length;
                var rotateAngle = (randomPlayerIndex) * pieAngle + (pieAngle/2)
                var imgX = canvasWidth/2 - 448/2 + 105
                var imgY = canvasHeight/2 - 496/2
                var imgWidth = 448
                var imgHeight = 496

                wheelCanvas.context.translate(canvasWidth/2,canvasHeight/2); 
                wheelCanvas.context.rotate(rotateAngle)


                wheelCanvas.context.drawImage(img, imgX - (canvasHeight/2), imgY - (canvasHeight/2) , imgWidth,imgHeight)

                
            })
            wheelCanvas.context.restore()   

            var i = 0
            var inversedArr = arrayOfPlayers
            var firstElm = inversedArr.shift()
            inversedArr.reverse()
            inversedArr = [firstElm].concat(inversedArr)

            var emoji_alphabets = {
                "a":"https://discord.com/assets/bbe8ae762f831966587a35010ed46f67.svg","b":"https://discord.com/assets/515873f6898e0b26daf51921c65a43f7.svg","c":"https://discord.com/assets/3e0ee2fd29177284491b8fb543bb4bdb.svg","d":"https://discord.com/assets/7b63a90197c59c371914e0d1c91af358.svg","e":"https://discord.com/assets/0df8cc6898cdb812709a4672f137b62d.svg","f":"https://discord.com/assets/197cdfb70e6835c81cbb1af86ab7e01e.svg","g":"https://discord.com/assets/8971c31a6aaa34e99f197c5c9c3d03ad.svg","h":"https://discord.com/assets/8971c31a6aaa34e99f197c5c9c3d03ad.svg","i":"https://discord.com/assets/4606ee2759d6aae4410c034fb94a8395.svg","j":"https://discord.com/assets/72005bede6a07f7681914dc974ed3ff8.svg","k":"https://discord.com/assets/547b9b60d8dfc97568666a168793dc73.svg","l":"https://discord.com/assets/c07212f2d498c21e56d3b3f581799972.svg","m":"https://discord.com/assets/3ae4af803746f6882a684a5a48dc29ff.svg","n":"https://discord.com/assets/f654b0f03f641e89a0db09b4c69cc33b.svg","o":"https://discord.com/assets/89bba1c5173777ba0a352d7ac585a647.svg","p":"https://discord.com/assets/7f56a6932ada40d5b3562468de2b0cde.svg","q":"https://discord.com/assets/8f10626d49756081044bcb1a2314140f.svg","r":"https://discord.com/assets/7102ad5cacc8ba7bd99fa16b4e6468a5.svg","s":"https://discord.com/assets/c4cb8aa4b3abef19178d052694e3ebf4.svg","t":"https://discord.com/assets/6c0a0b4df6f599f65e40ad372047d782.svg"
            }
            wheelCanvas.context.save()
            for(p of inversedArr){
                // wheelCanvas.context.save()
                    var pieAngle = 2 * Math.PI / players_length;
                    var dx = 400 * Math.sin((i+1) * (pieAngle )) + 975
                    var dy = 400 * Math.cos((i+1) * (pieAngle ))+ 975
                    var alphabet = Object.keys(players).find(key => players[key] === p).split('_')[1]
                   
                    // wheelCanvas.context.rotate(pieAngle/2)
                    // wheelCanvas.context.font = '100px Poppins'
                    // wheelCanvas.context.fillStyle = '#ffffff'
                    // wheelCanvas.context.textAlign = 'center'
                    // wheelCanvas.context.textBaseline = 'middle';
                    // wheelCanvas.context.fillText(`${p}`,dx, dy)
                    var emoji_alphabet = emoji_alphabets[alphabet]
                    await Canvas.loadImage(emoji_alphabet).then(img => {
                        wheelCanvas.context.drawImage(img, dx-50, dy-50, 100, 100)
                    })
                    i++
                // wheelCanvas.context.restore()
            }

            wheelCanvas.context.rotate(2 * Math.PI / players_length)
            wheelCanvas.context.restore()

           
            
            
    
                return wheelCanvas.create.toBuffer()
            }

        var game_over = false
        var alphabets = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹']
        // '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'
        var curr_timestamp = Date.now()
        var game_start_at = Math.floor(curr_timestamp/1000) + 30
        var currPlayer;
        var rounds = 0
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


        client.on('interactionCreate', async(interaction) => {
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
                               await interaction.reply({
                                ephemeral: true,
                                content: 'لقد شاركت في اللعبة'
                               }).catch(err => console.log(err))
                            }).catch(err => console.log(err))
                        }else if(Object.values(players).indexOf(userId) > -1){
                           await interaction.reply({
                                ephemeral: true,
                                content: 'إنك مشارك بالفعل',
                           })
                        }else if(players.hasOwnProperty(customId)){
                            await interaction.reply({
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
                            await interaction.reply({
                                 ephemeral: true,
                                 content: 'إنك مشارك بالفعل',
                            })
                         }else if(players.hasOwnProperty(customId)){
                             await interaction.reply({
                                 ephemeral: true,
                                 content: 'لقد تم أخذ هذا الحرف من قبل شخص أخر.',
                            })
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
                    }else if(customId === 'helpButton'){
                        await interaction.reply({
                            ephemeral: true,
                            content: `**
                            1- اختر الحرف الذي سيمثلك في اللعبة 
                            2- ستبدأ الجولة الأولى وسيتم تدوير العجلة واختيار لاعب عشوائي
                            3- إذا كنت اللاعب المختار ، فستختار لاعبًا من اختيارك ليتم طرده من اللعبة
                            4- يُطرد اللاعب وتبدأ جولة جديدة ، عندما يُطرد جميع اللاعبين ويتبقى لاعبان فقط ، ستدور العجلة ويكون اللاعب المختار هو الفائز باللعبة
                            **`
                        })
                    }
                }
            }catch(err){
                console.log(err)
            }
        })
        
        await new Promise(r => setTimeout(r, 30*1000))
        const toDisable = ['randomJoin', 'player_']
        for(row of rows){
            for(button of row.components){
               if(button.customId.startsWith(toDisable[0]) || button.customId.startsWith(toDisable[1])){
                button.setDisabled(true)
               }
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
                firstPlayers = players
                await startMsg.edit(`تم إختيار الحروف لكل لاعب, ستبدأ الجولة الأولى في  ✅` + '`0  ثانية`').then(async(r) => {
                    while(Object.keys(players).length > 1){
                        rounds++
                        var currLength = Object.keys(players).length
                        var plys_alphabets = Object.keys(players)
                        var randomKey = plys_alphabets[Math.floor(Math.random() * plys_alphabets.length)]
                        var randomPlayer = players[randomKey]
                        currPlayer = randomPlayer
                        if(Object.keys(players).length === 2){
                            var lastPlayer = Object.keys(players).find(key => players[key] !== randomPlayer)
                            message.channel.send({
                                content: `:regional_indicator_${randomKey.split('_')[1]}: : <@${randomPlayer}>  -  فاز باللعبة!`,
                                files: [new MessageAttachment(await generateRoulette(randomPlayer), 'nice-guy.png')]
                            }).then(winMsg => {
                                delete players[lastPlayer]
                                return message.channel.send({
                                    content: `مبروك <@${randomPlayer}>, لقد فزت باللعبة :crown:`
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
                                
                                .setStyle('SECONDARY')
                                if(member) {
                                    button.setLabel(member.user.username)
                                }else{
                                    button.setLabel('unknown')
                                }

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