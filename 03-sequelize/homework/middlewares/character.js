const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const { request } = require('../server');
const router = Router();


router.post('/', async (req,res) => {
    const {code, name,hp,mana} = req.body;
    if (!code || !name || !hp || !mana) return res.status(404).send('Falta enviar datos obligatorios');
    try {
        const character = await Character.create(req.body);
        res.status(201).json(character);
    } catch (error) {
        res.status(404).send('Error en alguno de los datos provistos');
    }
})

router.get('/', async (req, res) => {
    const {race,name,hp} = req.query;
    try{
        const condition = {
            where : {}
        };
        if (race) condition.where.race = race;
        //si el condition es un objeto vacio trae todos los datos directamente
        // - ahora si race contiene algo lo agrega al objeto where y el mismo se agrega a condition

        //! EXTRA
        //? filtrar todos los elementos pero traer solo name o hp o ambos
        const attributes = []
        if (name) {
            attributes.push('name');
            condition.attributes=attributes
        }
        if (hp) {
            attributes.push('hp')
            condition.attributes=attributes
        }
        // si encuentra algo en la query lo agrega en attributes y luego lo agrega al condition
        // si no hay name o hp, attributes queda vacio y no se agrega nada en condition

        const characters = await Character.findAll(condition)
        res.status(200).json(characters)

        //* con este metodo podemos filtrar de manera DINAMICA ya que no estamos
        //* hardcodeadndo el objeto dentro del findALL 
    }catch(e){
        res.status(404).send(e)
    }   
})

router.get('/:code', async (req, res)=>{
    const {code} = req.params;
    let result = await Character.findByPk(code);
    if (!result) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
    res.status(200).send(result);
})

module.exports = router;