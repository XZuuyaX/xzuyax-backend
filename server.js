const express = require("express");
const multer = require("multer");
const fetch = require("node-fetch");
const cors = require("cors");
const FormData = require("form-data");

const app = express();

app.use(cors());

const upload = multer({
storage: multer.memoryStorage()
});

const WEBHOOK =
"https://discord.com/api/webhooks/1504897291079782610/b7GS2VPvNeG5295mtUlHk84crSHx_IhJqNBIghloDZHqaZLbGSrPbTlBMz_2MkcKXz2G";

app.post(
"/upload",
upload.single("file"),
async(req,res)=>{

try{

const form =
new FormData();

form.append(
"file",
req.file.buffer,
req.file.originalname
);

form.append(
"content",

`🧾 NEW PAYMENT

👤 Buyer:
${req.body.buyer}

💳 Method:
${req.body.payment}

🕒 Time:
${new Date().toLocaleString()}
`

);

await fetch(WEBHOOK,{
method:"POST",
body:form
});

res.json({
success:true
});

}catch(err){

console.log(err);

res.json({
success:false
});

}

});

app.listen(3000,()=>{

console.log(
"Server Running"
);
});
