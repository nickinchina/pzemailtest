const http = require('http');
const nodemailer = require('nodemailer');
const sendmail = function(cb) {
    let transporter = nodemailer.createTransport(
        {
            host: 'localhost',
            port: 25,
            secure: true,
            auth: {
                user: 's2k',
                pass: 'Passw0rd'
            },
            logger: false,
            debug: false // include SMTP traffic in the logs
        },
        {
            // sender info
            from: 'Tester <no-reply@s2konline.net>',
            headers: {
                'X-Laziness-level': 1000 // just an example header, no need to use this
            }
        }
    );
    
    let message = {
        // Comma separated list of recipients
        to: 'bptedi@cstoreusa.com',

        // Subject of the message
        subject: 'Nodemailer is unicode friendly ✔',

        // plaintext body
        text: 'Hello to myself!',

        // HTML body
        html:
            '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
            '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',

        // An array of attachments
        attachments: [
            // Binary Buffer attachment
            {
                filename: 'image.png',
                content: new Buffer(
                    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                        '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                        'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                    'base64'
                ),

                cid: 'note@example.com' // should be as unique as possible
            }
        ]
    };
    
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
        }

        console.log('Message sent successfully!');
        cb(error, nodemailer.getTestMessageUrl(info));

        // only needed when using pooled connections
        transporter.close();
    });
}

const server = http.createServer(function(req,res){
    sendmail(
        function (err, reply) {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write("<!DOCTYPE 'html'>");
            res.write("<html>");
            res.write("<head>");
            res.write("<title>Hello World Page</title>");
            res.write("</head>");
            res.write("<body>");
            res.write("<div>Error:"+(err && err.stack)+"</div>");
            res.write("<div>reply:"+reply+"</div>");
            res.write("</body>");
            res.write("</html>");
            res.end();
        })
})
server.listen(8000);