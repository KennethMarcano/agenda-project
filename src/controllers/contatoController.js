const Contato = require('../models/contatoModel');

exports.index = (req, res) => {
    return res.render('contato', {
        contato: {}
    })
};

exports.register = async function (req, res) {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(function () {
                return res.redirect('/contato/index');
            });
            return
        }

        req.flash('success', 'Seu contato foi cadastrado com sucesso');
        req.session.save(function () {
            return res.redirect(`/contato/index/${contato.contato._id}`);
        });

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async function (req, res) {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);
    if (!contato) return res.render('404');

    res.render('contato', { contato });
}

exports.edit = async function (req, res) {
    try {
        if (!req.params.id) return res.render('404');
        let contato = new Contato(req.body);
        await contato.edit(req.params.id);
        if (contato.errors.length > 0) {
            const errorsMsj = contato.errors;
            contato = await Contato.buscaPorId(req.params.id);
            if (!contato) return res.render('404');
            req.flash('errors', errorsMsj);
            req.session.save(function () {
                return res.redirect(`/contato/index/${contato._id}`);
            })
            return;
        }
        req.flash('success', 'Seu contato foi editado com sucesso');
        req.session.save(function () {
            return res.redirect(`/contato/index/${contato.contato._id}`);
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }

}

exports.delete = async function(req, res) {
    try {
        if (!req.params.id) return res.render('404');
        await Contato.delete(req.params.id);
       // const contatos = await Contato.buscaContatos();
        req.flash('success', 'Seu contato foi apagado com sucesso');
        req.session.save(function () {
            return res.redirect('back');
        });
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}