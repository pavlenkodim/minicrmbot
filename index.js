const { TOKEN } = require('./options/bot_config.json')
const MESSAGE = require('./options/bot_messages.json')
const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(TOKEN, {polling: true})

async function register(chatId) {
    try {
        bot.sendMessage(chatId, MESSAGE.CHANGE_DATE)
        
    } catch (error) {
        console.warn(error)
    }
}

function start() {
    bot.setMyCommands([
        {command: '/price', description: 'Прайс'},
        {command: '/register', description: 'Записаться'},
        {command: '/help', description: 'Помощь'}
    ])

    bot.on('message', msg => {
        try {
            const chatId = msg.chat.id;
            const text = msg.text;

            if (msg.entities[0].type === 'bot_command') {
                switch (text) {
                    case '/start':
                        bot.sendMessage(chatId, MESSAGE.WELCOME)
                        break;
                    case '/help':
                        bot.sendMessage(chatId, MESSAGE.HELP)
                        break;
                    case '/price':
                        bot.sendMessage(chatId, MESSAGE.PRICE)
                        break;
                    case '/register':
                        console.log(msg) //TODO: Delete after testing
                        register(chatId)
                        break;
                    default:
                        bot.sendMessage(chatId, MESSAGE.COMMAND_NOT_FOUND)
                        break;
                }
            }

        } catch (error) {
            console.warn(error)
        }
    })
}

start()