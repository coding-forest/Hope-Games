
const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')

module.exports = {
    name: 'test',
    execute : async(message, args, client) => {


        var players = {
            player_a: 'abdessamad',
            player_b: 'youness',
            player_c: 'achraf',
            player_d: 'youssef',
            player_f: 'ahmed',
            player_g: 'hassan',
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

            for(p of inversedArr){
                // wheelCanvas.context.save()
                    var pieAngle = 2 * Math.PI / players_length;
                    var dx = 400 * Math.sin((i+1) * (pieAngle)) + 975
                    var dy = 400 * Math.cos((i+1) * (pieAngle))+ 975
                    var alphabet = Object.keys(players).find(key => players[key] === p).split('_')[1]
                    console.log(alphabet)
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

           
            
            
    
                return wheelCanvas.create.toBuffer()
            }
            var random_player = Object.keys(players)[Math.floor(Math.random()*Object.keys(players).length)]
            message.channel.send({
                content: players[random_player],
                files:[new MessageAttachment(await generateRoulette(random_player), 'nice-guy.png')]
            })

    }
}