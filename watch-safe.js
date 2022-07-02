const fs = require("fs")
let nodemailer = require('nodemailer')
var exec = require('child_process').exec
const promisify = require("util").promisify;


var transporter = nodemailer.createTransport({
    service: 'qq', //使用了内置传输发送邮件 支持列表传送门
    auth: {
        user: '3069087972@qq.com',//发送邮箱
        pass: '' //授权码,通过QQ邮箱中的设置获取
    }
});

function sendMail(msg) {
    var message = {
        from: '"cpolar" <3069087972@qq.com>', // 发送者
        to: '3069087972@qq.com', // 接受者,可以同时发送多个,以逗号隔开
        subject: msg, // 标题
        text: msg// 文本
    };

    transporter.sendMail(message, function (err, info) {
        if (err) {
            console.log("==邮件发送失败==");
            console.log(err);
            return;
        }
        console.log('==邮件发送成功==');
    });
}

function getUrl(str){
    return str.match(/(((https:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/g)
}

async function gitbash() {
    await git("git add .");
    await git(`git commit -m "学习笔记"`);
    await git("git push");
}

function git(cmd) {
  return new Promise((resolve, reject)=>{
    exec(cmd,function (err,stdout,stderr){
      if (err){
        console.log("err:"+err);
        reject(err);
      }
      console.log("ok:"+stdout)
      resolve("ok");
    });
  })
}

let pre = null
function watch(){
    fs.readFile("./1.log","utf8",function(err,data){
        str = getUrl(data);
        console.log(str);
        console.log(str.length);
        console.log("\r\n");

        if (pre == null)
            pre = str[str.length - 1]

        let cur = str[str.length - 1]

        if (pre != cur) {
            pre = cur
            console.log("sendMail()")
            sendMail(cur)

            //清空方式打开readme.txt
            //写readme.txt
            try {
                const data = fs.writeFileSync('readme.txt', "巨人的肩膀(学习笔记)：" + cur)
            } catch (err) {
                console.error(err)
            }
            //git add
            //git commit - ""
            //git push
            gitbash()
        } 
    })
}

setInterval(watch, 3 * 1000);
