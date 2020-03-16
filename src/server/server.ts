import express from 'express'
import cors from 'cors'
import { google } from 'googleapis'
import bodyParser from 'body-parser'
import log from '../util/logger'
import {
    logChannel,
    googleClientId,
    googleClientSecret,
    studentRoleId,
} from '../config'
import { TextChannel, GuildMember, Guild, User, MessageEmbed } from 'discord.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())

let auth = false
let uid = 0

module.exports = client => {
    // Place Holders
    let guild: Guild
    let discordUser: User
    let guildMember: GuildMember

    app.get('/api/verify', async function(req, res) {
        // Get the channel
        let channel = client.channels.cache.get(logChannel) as TextChannel

        if (!uid) {
            uid = req.query.uid

            guild = channel.guild

            discordUser = client.users.cache.get(String(uid)) as User
            guildMember = guild.member(discordUser)
        }

        // Make sure its a valid user id
        if (String(uid).length !== 18) {
            res.send({ msg: 'UID required' })
        }

        let oauth2 = google.oauth2({ version: 'v1', auth: oauth2Client })

        if (auth) {
            // Reset auth so we only make 1 request
            auth = false

            discordUser.send('Thanks for verifiying! Have fun and stay safe!')

            guildMember.roles.add(studentRoleId)

            // Get the info from good OAuth
            let userInfo = await oauth2.userinfo.v2.me.get()

            let embed = new MessageEmbed()
                .setTitle('User Verified')
                .addFields(
                    { name: 'Discord Username', value: guildMember.user.tag },
                    { name: 'Discord ID', value: guildMember.id },
                    { name: 'Real Name', value: userInfo.data.name },
                    { name: 'Email', value: userInfo.data.email }
                )
            // send the embed
            channel.send(embed)

            // Set their nickname
            guildMember.setNickname(userInfo.data.name, ':)')

            // Reset
            uid = 0
            discordUser = null
            guildMember = null
            auth = false

            // log.info(userInfo.data.name)
            // TODO: figure out redirect back to react
            // TODO: Create window popout?
            res.send('Success, you can now close this tab')
        }

        res.send({ url: redirectUrl })
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
        }
        res.redirect('/api/verify')
    })
}

app.listen(8080, '0.0.0.0', () => {
    log.info('Server now listening on port 8080')
})

const oauth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    // TODO: Fix me
    // baseUrl + '/auth/google/callback'
    'http://localhost:8080/auth/google/callback'
)

const redirectUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['email', 'profile'],
})
