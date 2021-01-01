const express = require('express');
const router = express.Router();
const User = require('./User')
const bcrypt = require('bcryptjs');
const adminAuth = require("../middlewares/adminAuth")


router.get("/admin/listing",adminAuth, function(req, res) {//listagem de usuario
    User.findAll().then(users => {
        res.render("users/listing", {users: users});
    })
})


router.get("/register", (req,res) => {//renderizando formulario de registro
    res.render("users/register")
});


router.post("/register/save", (req,res) => {//salvando dados da criação no banco
    var usuario = req.body.usuario;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where: {email: email}}).then(user => {//verificar se email cadastrad
        if(user == undefined ){
            
            var salt = bcrypt.genSaltSync(10); //gerar o sal
            var hash = bcrypt.hashSync(password, salt); //

            User.create({
                usuario: usuario,
                email:email,
                password: hash                
            }).then(() => {
               res.send("Usuário criado com sucesso!")
            }).catch((err) => {
                res.send("Houve um erro durante a criação do usuario!" + err)

            })

        }else{
            res.redirect("/register");
        }
    })
})



router.get("/login", (req,res) => {//renderizando formulario de login
    res.render("users/login")
})

router.post("/authenticate", (req, res) => {//rota recebendo dados do formulário de login
    var usuario = req.body.usuario;
    var password = req.body.password;
    
    User.findOne({where: {usuario: usuario}}).then(user => {
        if(user != undefined) { //se existir um usuario com este email
            //validar senha
            var correct = bcrypt.compareSync(password, user.password)

            if(correct) {
                req.session.user = { //logado com sucesso
                    id: user.id,
                    email: user.email                    
                }
                res.send("usuário logado com sucesso!")
            }else{
                res.redirect("/login")
            }
        }else{
            res.redirect("login")
        }
    })

})

router.get("/logout",(req, res) =>{
    req.session.user = undefined;
    res.redirect("/login");
})

module.exports = router;
