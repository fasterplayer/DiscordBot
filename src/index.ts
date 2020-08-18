import * as Discord from 'discord.js'
import settings from "./imports/settings";

const client: Discord.Client = new Discord.Client();
const prefix: string = settings.config.prefix;

client.login(settings.config.token)

client.on('error', (err: Error) => console.log(err))

client.on('ready', () => {
    console.log(`Le bot est maintenant connecté dans ${client.guilds.cache.size}`)
})

client.on('message', async (message: Discord.Message) => {

// Ignore les messages provenant d'autres bots.
if (message.author.bot) return

//Prévient une éventuelle erreur pour laquelle message pourrait ne pas contenir de membre (Sinon TypeScript pourrait indiquer une possibilité d'erreur :P). 
if (!message.member) return false

//Ignore les messages envoyés en privé au bot (peut être utilisé autrement dans le future).
if (message.channel.type === 'dm') return false

//Fait en sorte qu'on ignore les messages ne commençant pas par le préfix établi dans le fichier settings.json.
if (message.content.indexOf(prefix) !== 0) return false

//Décortique le message et nous retourne chaque mots (excluant le préfix) du message comme un argument dans un array.
const args: string[] = message.content.slice(settings.config.prefix.length).trim().split(/ +/g)

//Nous permet d'identifier le premier élément de l'array afin de l'utiliser comme commande.
const firstArg: string | undefined = args.shift()

//Prévient les cas où le préfix serait écrit mais aucune commande ne serait inscrite.
if (typeof firstArg === 'undefined') return false

//Nous permet d'utiliser la constante "command" afin d'identifier quel commande a été inscrite dans le message et convertit les majuscules en minuscules.
const command: string = firstArg.toLowerCase()


if (command === 'bonjour') {
    message.reply('Bonsoir.')
}


})