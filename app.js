//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

})
app.post("/", function (req, res) {

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
 
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
          
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/eb06d5b6b4";

  const options = {
    method: "POST",
    auth: "prath:f5a35a05deb1ff8eec6066785e02496d-us21"
}

  const request = https.request(url, options, function (response) {
   
   
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/sucess.html");
   } else {
    res.sendFile(__dirname + "/failure.html");
   }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    })
 })
  request.write(jsonData);
  request.end();
});
app.post("/failure", function(req,res) {
  res.redirect("/");
})



app.listen(process.env.PORT || 3000, function(){
  console.log("server is running");
});



