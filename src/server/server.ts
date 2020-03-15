import express from 'express'
import { google } from 'googleapis'
import bodyParser from 'body-parser'
import log from '../util/logger'
import {
    logChannel,
    googleClientId,
    googleClientSecret,
    baseUrl,
    studentRoleId,
} from '../config'
import { TextChannel, GuildMember, Guild, User } from 'discord.js'

const app = express()
app.use(bodyParser.json())

let auth = false
let uid = 0

module.exports = client => {
    // Place Holders
    let guild: Guild
    let discordUser: User
    let guildMember: GuildMember

    app.get('/', async function(req, res) {
        // Get the channel
        let channel = client.channels.cache.get(logChannel) as TextChannel

        if (!uid) {
            console.log(channel)
            uid = req.query.uid

            guild = channel.guild

            discordUser = client.users.cache.get(String(uid)) as User
            guildMember = guild.member(discordUser)
        }

        // Make sure its a valid user id
        if (String(uid).length !== 18) {
            res.send(
                'Error - Please use link sent to you in your DM or reach out to a staff member.'
            )
        }

        let oauth2 = google.oauth2({ version: 'v1', auth: oauth2Client })

        if (auth) {
            // Reset auth so we only make 1 request
            auth = false

            // Get the info from good OAuth
            let userInfo = await oauth2.userinfo.v2.me.get()

            console.log(discordUser)

            console.log(channel)
            channel.send(userInfo.data.email)

            // log.info(userInfo.data.name)
            res.send('Thanks for verifying! You can now close this tab.')

            // Reset
            uid = 0
            discordUser = null
            guildMember = null
        }

        res.send(redirectUrl)
    })

    app.get('/auth/google/callback', async function(req, res) {
        let code = req.query.code
        if (code) {
            let { tokens } = await oauth2Client.getToken(code)
            oauth2Client.setCredentials(tokens)
            auth = true

            if (String(uid).length !== 18) {
                res.send(
                    'Error - Please use link sent to you in your DM or reach out to a staff member.'
                )
            }

            // let channel = client.channels.cache.get(logchannel) as textchannel)
            // let user = client.util.resolveuser(string(uid))

            // channel.send(`${user.tag} (${user.id}) has verified!`)
            discordUser.send('Thanks for verifiying! Have fun!')

            guildMember.roles.add(studentRoleId)
        }

        res.redirect('/')
    })
}

app.listen(8080, '0.0.0.0', () => {
    log.info('Server now listening on port 8080')
})

const oauth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    baseUrl + '/auth/google/callback'
)

const redirectUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['email', 'profile'],
})
