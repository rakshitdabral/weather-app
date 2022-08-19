const path = require('path');
const express=require('express')
const https = require('https')

var fs = require('fs');
const bodyParser = require('body-parser')

const app= express()
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post('/',function(req,res) {
    const query=req.body.cityName;
    const apiKey="8ef0a674eb5df59d317dd49f4d4f4249";
    const units="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=8ef0a674eb5df59d317dd49f4d4f4249&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode)

        response.on('data', (chunk) => {
            JSON.parse(chunk)
            const weatherData = JSON.parse(chunk)
            const temp=weatherData.main.temp;
            const weatherDesc=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const imageURL="http://openweathermap.org/img/wn/" +icon+"@2x.png";
            
        })
        
    })
})



app.listen(port, function (){
    console.log("server running on port " + port)
})