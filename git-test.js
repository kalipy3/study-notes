var exec = require('child_process').exec
const promisify = require("util").promisify;

async function gitbash() {
    console.log(111)
    await git("git add .");
    console.log(222)
    await git(`git commit -m "学习笔记"`);
    console.log(333)
    await git("git push");
    console.log(444)
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

console.log("start")
gitbash()
console.log("end")
