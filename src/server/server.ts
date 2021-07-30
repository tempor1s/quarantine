import { AkairoClient } from 'discord-akairo'
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
        resave: false,
        saveUninitialized: false,
    })
)

module.exports = (client: AkairoClient) => {
    app.get('/api/verify', async function (req, res) {
        if (!req.session.uid) {
            req.session.uid = req.query.uid
        }

        if (String(req.session.uid).length !== 18) {
            res.send({ msg: 'UID required' })
            return
        }

        // Make sure its a valid user id
        let oauth2 = google.oauth2({ version: 'v1', auth: oauth2Client })

        if (req.session.auth) {
            // Reset auth so we only make 1 request
            req.session.auth = false

            // Get discord related things
            let channel = client.channels.cache.get(logChannel) as TextChannel
            let guild: Guild = channel.guild
            let discordUser: User = client.users.cache.get(
                String(req.session.uid)
            ) as User
            let guildMember: GuildMember = guild.member(discordUser)

            let roleToAdd: string

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
                .setFooter('https://github.com/tempor1s/quarantine')

            // Make sure that they are a Make School student or Staff
            if (userInfo.data.email.includes('@students.dominican.edu')) {
                // The user is student
                embed.addField('Student or Staff', 'Student')

                roleToAdd = studentRoleId
            } else if (userInfo.data.email.includes('@dominican.edu')) {
                // The user is staff
                embed.addField('Student or Staff', 'Staff')

                roleToAdd = staffRoleId
            } else {
                // the user did not use their dominican email
                const msg =
                    'Please use an @students.dominican.edu or @dominican.edu email to join - if you believe this was an error, DM a Discord Mod'

                discordUser.send(msg)

                res.send(msg)
                return
            }

            // send the embed
            channel.send(embed)

            // Set their nickname to their real name
            await guildMember.setNickname(userInfo.data.name)
            await guildMember.roles.add(roleToAdd)

            // alert the user that they have been verified
            discordUser.send('Thanks for verifying! Have fun and stay safe!')

            res.send('Success, you can now close this tab')
            return
        }

        let redirectUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: ['email', 'profile'],
            state: req.session.uid,
        })

        req.session.save((err) => {
            if (err) {
                console.log(err)
            }

            res.send({ url: redirectUrl })
        })
    })

    app.get('/auth/google/callback', async function (req, res) {
        let code = req.query.code.toString()
        let state = req.query.state

        if (code) {
            let { tokens } = await oauth2Client.getToken(code)
            oauth2Client.setCredentials(tokens)
            req.session.auth = true
            req.session.uid = state
        }

        res.redirect(`/api/verify?uid=${state}`)
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
