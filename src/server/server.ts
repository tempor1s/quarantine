import express from 'express'
import session from 'express-session'
import cors from 'cors'
import { google } from 'googleapis'
import bodyParser from 'body-parser'
import log from '../util/logger'
import {
    logChannel,
    googleClientId,
    googleClientSecret,
    studentRoleId,
    staffRoleId,
    apiUrl,
} from '../config'
import { TextChannel, GuildMember, Guild, User, MessageEmbed } from 'discord.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(
    session({
        secret: 'a-very-secret-key',
        name: 'specialcookie',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: false,
            secure: false,
        },
    })
)

module.exports = client => {
    // Place Holders
    let guild: Guild
    let discordUser: User
    let guildMember: GuildMember
    let auth = false

    app.get('/api/verify', async function(req, res) {
        // Get the channel
        let channel = client.channels.cache.get(logChannel) as TextChannel

        if (!req.session.uid) {
            req.session.uid = req.query.uid
        }

        guild = channel.guild

        discordUser = client.users.cache.get(String(req.session.uid)) as User
        guildMember = guild.member(discordUser)

        // Make sure its a valid user id
        if (String(req.session.uid).length !== 18) {
            res.send({ msg: 'UID required' })
            return
        }

        let oauth2 = google.oauth2({ version: 'v1', auth: oauth2Client })

        if (auth) {
            // Reset auth so we only make 1 request
            auth = false

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

            // Make sure that they are a Make School student or Staff
            if (userInfo.data.email.includes('@students.makeschool.com')) {
                // THe user is student
                embed.addField('Student or Staff', 'Student')

                guildMember.roles.add(studentRoleId)
            } else if (userInfo.data.email.includes('@makeschool.com')) {
                // The user is staff
                embed.addField('Student or Staff', 'Staff')

                guildMember.roles.add(staffRoleId)
            } else {
                // The user is not from Make School or did not use their Make School email
                let msg =
                    'Please use an @students.makeschool.com or @makeschool.com email to join - if you believe this was an error, DM Ben Lafferty on Slack'

                discordUser.send(msg)

                // reset
                discordUser = null
                guildMember = null
                auth = false

                res.send(msg)
                return
            }

            // send the embed
            channel.send(embed)

            // Set their nickname to their real name
            guildMember.setNickname(userInfo.data.name, ':)')

            // alert the user that they have been verified
            discordUser.send('Thanks for verifiying! Have fun and stay safe!')

            // Reset
            discordUser = null
            guildMember = null
            auth = false

            // log.info(userInfo.data.name)
            // TODO: figure out redirect back to react
            // TODO: Create window popout?
            res.send('Success, you can now close this tab')
            return
        }

        res.send({ url: redirectUrl })
    })

    app.get('/auth/google/callback', async function(req, res) {
        console.log('Callback Session: ', req.session.uid)
        console.log('Set Session: ', req.session.uid)
        let code = req.query.code
        if (code) {
            let { tokens } = await oauth2Client.getToken(code)
            oauth2Client.setCredentials(tokens)
            auth = true
            req.session.auth = true
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
    apiUrl + '/auth/google/callback'
)

const redirectUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['email', 'profile'],
})
