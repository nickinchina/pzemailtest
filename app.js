const http = require('http');
const sendmail = require('sendmail')({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  },
  devHost:'localhost',
  devPort: 25
})
const server = http.createServer(function(req,res){
    sendmail({
        from: 'test@yourdomain.com',
        to: 'info@yourdomain.com',
        replyTo: 'jason@yourdomain.com',
        subject: 'MailComposer sendmail',
        html: 'Mail of test sendmail '
        }, 
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