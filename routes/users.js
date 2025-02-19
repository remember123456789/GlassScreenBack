var express = require('express');
var router = express.Router();
var db = require('../db/index')
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * 用户注册
 */
router.post('/register', (req, res) => {
    let {count, password} = req.body
    db.query(`select * from user where count =${count} `, (err, result) => {
        if (err) {
            res.send({
                code: 1,
                msg: err
            })
        }
        // 先查找用户是否存在
        if (result.length > 0) {
            res.send({
                code: 1,
                msg: '该账号已存在'
            })
        } else {
            db.query(`insert into user(count, password) values('${count}', '${password}')`, (err, result) => {
                if (err) {
                    res.send({
                        code: 1,
                        msg: err
                    })
                } else {
                    res.send({
                        code: 0,
                        msg: '注册成功'
                    })
                }
            })
        }
    })
})

/**
 * 用户登录
 */
router.post('/login', (req, res) => {
    let {count, password} = req.body
    if(!count || !password) {
        res.send({
            code: 1,
            msg: '账号或密码不能为空'
        })
    }
    db.query(`select * from user where count =${count}`, (err, result) => {
        if (err) {
            res.send({
                code: 1,
                msg: err
            })
        }
        if (result.length > 0) {
            if (result[0].password === password) {
                res.send({
                    code: 0,
                    msg: '登录成功'
                })
            //登录成功生成token



            } else {
                res.send({
                    code: 1,
                    msg: '密码错误'
                })
            }
        } else {
            res.send({
                code: 1,
                msg: '账号未注册'
            })
        }
    })
})
module.exports = router;