const http = require('http');
let listaVinhosSalva = [];

module.exports = app => {

    const ip = app.get('ip');
    const port = '3000';
    let counter = 0;
    let fs = require('fs');

    listaVinhosSalva = [
        { "id": 0, "nome": "Crasto Douro Superior", "safra": '1959', "quantidade": '2', "pais": 'Portugal', "descricao": "A fermentação de ambos decorreu em cubas de inox, com controlo de temperatura, e o estágio decorreu em cubas de inox até ao engarrafamento.", "preco": 85, "fotos": [`http://ivanamorim-com-br.umbler.net/images/vinho0.1.jpg`, `http://ivanamorim-com-br.umbler.net/images/vinho0.2.jpg`, `http://ivanamorim-com-br.umbler.net/images/vinho0.3.jpg`] },
        { "id": 1, "nome": "Castello d’Albola Chianti", "safra": '1961', "quantidade": '5', "pais": 'Itália', "preco": 145, "descricao": "A fermentação de ambos decorreu em cubas de inox, com controlo de temperatura, e o estágio decorreu em cubas de inox até ao engarrafamento.",  "fotos": [`http://ivanamorim-com-br.umbler.net/images/vinho1.1.jpg`, `http://ivanamorim-com-br.umbler.net/images/vinho1.2.jpg`] },
        { "id": 2, "nome": "Torre de Oña Roja", "safra": '1963', "quantidade": '1', "pais": 'Portugal', "preco": 180, "descricao": "A fermentação de ambos decorreu em cubas de inox, com controlo de temperatura, e o estágio decorreu em cubas de inox até ao engarrafamento.",  "fotos": [`http://ivanamorim-com-br.umbler.net/images/vinho2.1.jpg`] },
        { "id": 3, "nome": "Viña Koyle Cabernet", "safra": '1958', "quantidade": '9', "pais": 'Portugal', "preco": 425, "descricao": "A fermentação de ambos decorreu em cubas de inox, com controlo de temperatura, e o estágio decorreu em cubas de inox até ao engarrafamento.",  "fotos": [`http://ivanamorim-com-br.umbler.net/images/vinho3.1.jpg`] }
    ];
    const usuario = {
        "id": 1,
        "nome": "Ivan Amorim",
        "dataNascimento": "08/09/1989",
        "telefone": "(48) 98453-0344",
        "email": "amorim-ivan@hotmail.com.br",
        "senha": "ivan123"
    };

    app.get('/api/vinho/listaTodos', (req, res) =>
        res.json(listaVinhosSalva));

    app.post('/api/vinho/cadastro', (req, res) => {
        counter++;
        let vinho = req.body;
        if (vinho.id == null) {
            // Cadastrando
            vinho.id = listaVinhosSalva.length;
            listaVinhosSalva.push(vinho);
        } else {
            // Editando
            for (let i = 0; i < listaVinhosSalva.length; i++) {
                if (listaVinhosSalva[i].id == vinho.id) {
                    listaVinhosSalva[i] = vinho;
                }
            }
        }

        if (counter % 3 != 0) {
            // setTimeout(() => enviaNotificacao(vinho), 5000);
            res.json(listaVinhosSalva);
        } else {
            console.log('Erro no processamento do envio de mensagem vinho salvo.');
            res.status(500).end();
        }
    });

    app.post('/api/vinho/delete', (req, res) => {
        let vinho = req.body;
        listaVinhosSalva = listaVinhosSalva.filter(vinhoElem => vinhoElem.id != vinho.id);
        res.json(listaVinhosSalva);
    });

    app.post('/api/login', (req, res) => {
        let usuarioLogin = req.body;
        console.log('usuarioLogin = ', usuarioLogin);
        console.log('usuario = ', usuario);
        if (usuarioLogin.email == usuario.email
            && usuarioLogin.senha == usuario.senha) {
                res.json(usuario);
                console.log('usuario Invalido = ', usuarioLogin);
        } else {
            console.log('status 403');
            res.status(403).end();
        }
    });

    function enviaNotificacao(vinho) {
        const vinhoId = vinho.nome + vinho.safra;

        const message = { 
            app_id: "e53f5d24-40e4-458f-99db-5230cf3f8bc0",
            headings: {"en": "Adega de Vinhos"},
            contents: {"en": "Novo Vinho Cadastrado!"},
            data: {"vinho-id": vinhoId},
            included_segments: ["All"]
        };

        const headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic MGJlOGMxZGEtMDY3Ni00NWY3LWI0ZjYtMjRjMjYzMzhmZmEz"
        };
        
        const options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };
        
        const req = http.request(options, function(res) {
          res.on('data', function(data) {
            console.log("Response:");
            console.log(JSON.parse(data));
          });
        });
        
        req.on('error', function(e) {
          console.log("ERROR:");
          console.log(e);
        });
        
        req.write(JSON.stringify(message));
        req.end();
      }
};
