#!/bin/bash

./cpolar http 8081 > /dev/null &

echo "cpolar pid: $!"

reptyr -T $! > 1.log &

echo "reptyr pid: $!"

sleep 10s

node watch.js > watch.log &


#!/bin/bash
 
#a=`./a.out`
#echo "获取a.out的输出结果到变量a：$a"
#./a.out &
#echo "获取a.out进程的pid：$!"

#./a.out
#echo "1"
#echo "a$!"
#java T
#echo "2"
#echo "b$!"
# 正常情况是同步执行
#c
#1
#a
#java
#2
#b

#./a.out &
#echo "1"
#echo "a$!"
#java T &
#echo "2"
#echo "b$!"
# &是后台运行 异步执行
#1
#a11641
#2
#b11642
#c
#java

#./a.out &
#wait
#echo "1"
#echo "a$!"
#java T &
#wait
#echo "2"
#echo "b$!"
# wait等待紫禁城结束 同步执行
#c
#1
#a12852
#java
#2
#b12853

