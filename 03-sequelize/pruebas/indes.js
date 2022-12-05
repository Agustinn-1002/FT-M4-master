const { Sequelize, DataTypes } = require('sequelize');
 
// Opción 1: Connection URI
const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/prueba',{
    logging: false
})

/* Verificar la conexion de la base de datos 
* sequelize.authenticate()
*     .then(()=> {
*         console.log('Conexion Exitosa')
*     })
*     .catch(err => {
*         console.log(err)
*     })
*/

const User = sequelize.define('user',{
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    money: {
        type: DataTypes.FLOAT,
        defaultValue: 1500
    },
    dni: {
        type: DataTypes.INTEGER,
        unique: true, // siempre va a ser un unico valor, es decir no se van a repetir
    },
    fechaNacimiento: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: 'index' // puede ser cualquier nombre
    },
    hora: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: 'index' // se sincroniza con todos los unique de 'index' y hace que la combinacion entre estos no se repita en la tabla
    },
    dataOnly: {
        type: DataTypes.DATEONLY()
    },
},{
    timestamps: false,  //elimina el updatedAt y el createdAt
})

console.log(sequelize.models) // consologear todos los models (tablas) de la base de datos 

//no hace falta resperat el orden
//al crear una nueva columna y al sincronizar se agregan los valores por defecto en las otras tablas automaticamente

User.sync({force:true})  // con force:true elimina todas las tablas y las vuelve a crear para actualizarlas 
    .then(async ()=>{
        console.log('User sincronizado')

        //! CREAR
        const users = await User.create({
            name: 'agustin',
            lastName: 'Pasten',
            dni: 1234567,
            fechaNacimiento: '07/11/2000',
            hora: '12:30',
            money: 0.50
        });
        const users2 = await User.create({
            name: 'Mauro',
            lastName: 'jaleff',
            dni: 7654321,
            fechaNacimiento: '21/10/1970',
            hora: '16:00'
        });
        const users3 = await User.create({
            name: 'Juan',
            lastName: 'Pasten',
            dni: 1726354,
            fechaNacimiento: '01/04/1968',
            hora: '08:00'
        });


        const usersData = await User.findAll();
        console.log(usersData.map(u => u.toJSON()));

        //! ACTUALIZAR - MODIFICAR
        //? users.money = 10.0;
        //? await users.save();

        //! ELIMINAR
        //? await users.destroy();

        //! LEER TRAR DATOS
            //*  SELECT * FROM ...
            //todo TRAER TODOS LOS DATOS DE LA TABLA    
                //? const usersData = await User.findAll();
                //? console.log(usersData.map(u => u.toJSON()));
            
            //*  SELECT name,dni FROM ...
            //todo TRAER DATOS ESPECIFICOS DE LA TABLA  
                //? const usersData = await User.findAll({
                //?     attributes: ['name' , 'dni']
                //? });
                //? console.log(usersData.map(u => u.toJSON()));

            //*  SELECT name, dni as pasaporte FROM ...
            //todo TRAER DATOS ESPECIFICOS DE LA TABLA Y RENOMBRARLOS
                //? const usersData = await User.findAll({
                //?     attributes: ['name' , ['dni','pasaporte']]
                //? });
                //? console.log(usersData.map(u => u.toJSON()));

            //todo TRAER TODOS LOS DATOS DE LA TABLA EXPEPTO UNO/VARIOS
                //? const usersData = await User.findAll({
                //?     attributes: {exclude: ['money', 'dni']}
                //? });
                //? console.log(usersData.map(u => u.toJSON()));

            //*  WHERE ID = 1 o NAME='AGUSTIN'
            //todo TRAER DATOS DE LA TABLA QUE COMPLE CIERTA CONDICION
                //? const usersData = await User.findAll({
                //?     where: {
                //?         lastName: 'jaleff',
                //?         id: 2
                //?     }
                //? });
                //? console.log(usersData.map(u => u.toJSON()));

            //todo METODOS->
            //todo METODO PARA TRAER TODOS LOS DATOS DE UN PRIMARY KEY ESPECIFICO
                //? const usersData = await User.findByPk(1);
                //? console.log(usersData.toJSON());

                //* o Traer algunos datos de esa fila con ese id especifico

                //? const usersData = await User.findByPk(2,{
                //?     attributes: ['name', 'dni']
                //? });
                //? console.log(usersData.toJSON());
            
            //todo METODO TRAER LOS DATOS DEL PRIMERO ELEMENTO QUE ENCUENTRE
                //? const usersData = await User.findOne({
                //?     where: {
                //?         lastName: 'Pasten'
                //?     }
                //? });
                //? console.log(usersData.toJSON());

            //todo METODO TRAER LOS DATOS DE LA TABLA QUE COMPLE CIERTA CONDICION Y SI NO LO ENCUENTRA LO CREA Y LO GUARDA EN LA TABLA
                //? const [userData, created] = await User.findOrCreate({
                //?    where: {
                //?        lastName: 'fernandez'
                //?    },
                //?    defaults: {
                //?        name: 'gabriel',
                //?        dni: 1002938,
                //?         fechaNacimiento: '12/02/2001',
                //?         hora: '11:30'
                //?    }    
                //? })

                //?  console.log(created); ----> false si no se creo en la tabla || true si se creo en la tabla
                //?  console.log(userData.toJSON()); ----> traemos todos los datos de cualquier forma



        // VER DATOS DE UNA FILA EN FORMATO JSON
        //* console.log(users2.toJSON());
    })
