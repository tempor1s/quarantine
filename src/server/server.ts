import express from 'express'
import { google } from 'googleapis'
import bodyParser from 'body-parser'
import log from '../util/logger'
import {
    logChannel,
    googleClientId,
    googleClientSecret,
    baseUrl,
} from '../config'
import { TextChannel } from 'discord.js'

const app = express()
app.use(bodyParser.json())

module.exports = client => {
    app.get('/', async function(req, res) {
        res.send(redirectUrl)
    })

    app.get('/authed', async function(req, res) {
        let oauth2 = google.oauth2({ version: 'v1', auth: oauth2Client })
        let userInfo = await oauth2.userinfo.v2.me.get()

        let channel = client.channels.cache.get(logChannel) as TextChannel
        channel.send(userInfo.data.email)

        res.send(userInfo.data.email)
    })

    app.get('/auth/google/callback', async function(req, res) {
        let code = req.query.code
        if (code) {
            let { tokens } = await oauth2Client.getToken(code)
            oauth2Client.setCredentials(tokens)
        }
        res.redirect('/authed')
    })
}

app.listen(8080, '0.0.0.0', () => {
    console.log('Your app is listening on port 8080')
})

const oauth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    baseUrl + '/auth/google/callback'
)

const redirectUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['email'],
})

console.log(redirectUrl)
