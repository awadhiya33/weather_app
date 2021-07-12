const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const city=req.body.cityName;

  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=410bd4ee863d547abd7761d0c997c5ac";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const parse_data=JSON.parse(data);
      console.log(parse_data);
      const temp=parse_data.main.temp;
      const weather_des=parse_data.weather[0].description;
      const icon=parse_data.weather[0].icon;
      const imgurl="http://openweathermap.org/img/wn/" + icon + "@4x.png";

      res.write("<p>weather is currently "+weather_des+"</p>");
      res.write("<h2>the temparature in "+city+" is "+temp+" degree kelvin</h2>");
      res.write("<img src='" + imgurl + "'>");
      res.send();
    });
  });
});

app.listen(3000,function(){
  console.log("server is running on port 3000 bete!!!");
});
