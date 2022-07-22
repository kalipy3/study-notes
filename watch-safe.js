const fs = require("fs")
let nodemailer = require('nodemailer')
var exec = require('child_process').exec
const promisify = require("util").promisify;


var transporter = nodemailer.createTransport({
    service: 'qq', //使用了内置传输发送邮件 支持列表传送门
    auth: {
        user: '3069****72@qq.com',//发送邮箱
        pass: 'mdn*******bf' //授权码,通过QQ邮箱中的设置获取
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

function handler(cur) {
    console.log("sendMail()")
    sendMail(cur)

    let a = "自己的笔记：https://github.com/kalipy3/my_study_notes\r\n\n"
    let b = "毕业设计：https://github.com/kalipy3/liteos_nb_bc35/blob/master/%E6%AF%95%E8%AE%BE.md\r\n"
    let c = "毕业论文：https://github.com/kalipy3/liteos_nb_bc35/blob/master/%E8%AE%BA%E6%96%87%E6%AD%A3%E6%96%87%E6%9C%80%E7%BB%88%E7%89%88.pdf\r\n\n"
    let f = "云共享开发板：https://gitee.com/kalipy3/liteos_stm32f407zgtx_ali_mqtt\r\n"
    let d = "串口调试助手：https://github.com/kalipy3/usart_assistant\r\n"
    let e = "音频播放器：https://github.com/kalipy3/net-radio\r\n\n"
    let g = "leetcode算法题500：https://github.com/kalipy3/leetcode_practice\r\n"

    //清空方式打开readme.txt
    //写readme.txt
    try {
        const data = fs.writeFileSync('readme.txt', "巨人的肩膀(学习笔记)：" + cur + "\r\n" + a + b + c + f + d + e + g)
    } catch (err) {
        console.error(err)
    }

    //git add
    //git commit - ""
    //git push
    gitbash()
}

let pre = null
function watch(){
    fs.readFile("./1.log","utf8",function(err,data){
        str = getUrl(data);
        console.log(str);
        console.log(str.length);
        console.log("\r\n");

        if (pre == null) {
            pre = str[str.length - 1]
            handler(pre)
        }

        let cur = str[str.length - 1]

        if (pre != cur) {
            pre = cur
            handler(cur)
        } 
    })
}

setInterval(watch, 3 * 1000);
