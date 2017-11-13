let express = require('express');
let webServer  = express();

//allow static fies to be delivered when request comes from browser
webServer.use(express.static("."));

webServer.get('/',function(request, response){
    // response.send('<h1>Welcome to my App</h1>')
    response.sendFile(__dirname +  "/index.html");
});


webServer.listen(2000,() => {
    console.log('server started at 2000');
})
