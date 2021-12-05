const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const sgMail = require('@sendgrid/mail');

app.use(bodyParser.json())
app.post("/", (req, res) => {

    if(req.method == 'POST'){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
        // POSTデータを取得
        const data = req.body.data
  
        // テンプレートデータを作成
        var msg = {
            'personalizations': [
                {
                    'to': [
                        {'email': data['email']}
                    ],
                    'dynamic_template_data': {
                        'customer':true,
                        'name':data['name'],
                        'email':data['email'],
                        'message':data['message']
                    }
                },
                {
                    'to': [
                        {'email': 'haradakazukii@gmail.com'}
                    ],
                    'dynamic_template_data': {
                        'name':data['name'],
                        'email':data['email'],
                        'message':data['message']
                    }
                }
            ],
            'from': {
                'email': 'haradakazukii@gmail.com',
                'name': '前田真喜'
            },
            'template_id': process.env.TEMPLATE_ID
        }
  
        var cmd_data = {
            'name':data['name'],
            'email':data['email'],
            'message':data['message']
        }
  
        // メールを送信
        sgMail
            .send(msg)
            .then(() => {
                // CMSに保存
                request.post({
                    uri: process.env.CMS_API_URL,
                    headers: { 'Content-type': 'application/json', 'X-WRITE-API-KEY':process.env.API_KEY },
                    json: cmd_data
                }, (err, response) => {
                    if(err){
                        res.statusCode = 500
                        res.send(err)
                    }
                    res.statusCode = 200
                    res.json({ status: response })
                })
            })
            .catch((error) => {
                console.log(error)
                res.statusCode = 500
                res.send(error)
            })
    }else{
        res.statusCode = 400
        res.send({error: new Error('invalid parameters')})
    }
});

module.exports = {
    path: "/api/sendemail",
    handler: app
};