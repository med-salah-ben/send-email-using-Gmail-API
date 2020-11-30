const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = ''     //take it from https://console.cloud.google.com/
const CLIENT_SECRET = '' // take it from https://console.cloud.google.com/
const REDIRECT_URI = ''  // https://developers.google.com/oauthplayground
const REFRESH_TOKEN = '' // refresh token from https://developers.google.com/oauthplayground

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token : REFRESH_TOKEN})

async function sendMail(){
    
try {
    const accessToken = await oAuth2Client.getAccessToken()
      
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'xxxxx@gmail.com',//sender address
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET ,
            refreshToken: REFRESH_TOKEN , 
            accessToken: accessToken
        }
    })

    const mailOptions ={
        from : 'Ecommerce Application <xxxx@gmail.com>',//sender address
        to : 'yyyyy@gmail.com',//list of receivers
        subject: "send mail from gmail", // Subject line
        text: 'Hello in my github account',  // plain text body
        html: '<h1> https://github.com/med-salah-ben </h1>', // html body
    };

    const result = await transport.sendMail(mailOptions)
    return result

} catch (error) {
    return error
}}

sendMail()
 .then((result)=> console.log('email sent ..', result))
 .catch((error)=> console.log(error.message));