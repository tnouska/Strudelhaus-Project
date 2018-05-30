console.log('TEST!!!!!');
    const user_name     = 'strudelhausproxy@gmail.com';
    const refresh_token = process.env.REFRESH_TOKEN;
    const access_token  = process.env.ACCESS_TOKEN;
    const client_id     = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    const email_to = `applejoshuajleary@gmail.com`;

    
// login
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: user_name,
            clientId: client_id,
            clientSecret: client_secret,
            refreshToken: refresh_token,
            accessToken: access_token,
            expires: 1527200298318 + 3600      
        }
    });

    // setup e-mail data with unicode symbols
    let mailOptions = {
        from    : user_name, // sender address
        to      : email_to, // list of receivers
        subject : 'Hello ✔', // Subject line
        text    : 'Hello world ?', // plaintext body
        html    : '<b>Hello world ?</b>', // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });