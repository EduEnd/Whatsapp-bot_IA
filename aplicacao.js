const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');

    const getAutoShopAIResponse = require('./src/api')

wppconnect
.create({
    session: 'sessionName',
    catchQR: (base64Qr, asciiQR) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
        var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

        if (matches.length !== 3) {
        return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');

    var imageBuffer = response;
    require('fs').writeFile(
        'out.png',
        imageBuffer['data'],
        'binary',
        function (err) {
        if (err != null) {
            console.log(err);
            }
        }
    );
    },
    logQR: false,
})
.then((client) => start(client))
.catch((error) => console.log(error));

    async function start(client) {
       client.onMessage(async (message) => {
        if (message.body.toLocaleLowerCase()) {
            try{
                const resposta = await getAutoShopAIResponse(message.body)

                await client.sendText(message.from, resposta);

            }catch(erro) {
            console.error('Error when sending: ', erro);
            };
        }
    });
}