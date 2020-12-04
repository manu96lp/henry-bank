"use strict";
const relation = require ('../relations.js')
const SequelizeAdapter = require('moleculer-db-adapter-sequelize');
const {User} = require ('../models/User')
const {Account} = require ('../models/Account')
const {Token} = require ('../models/token')
const { MoleculerError } = require("moleculer").Errors;
const dbConfig = require ('../dbConfig');
const bcrypt = require('bcrypt');
const sendMail = require( '../helpers/email/sender' );

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
module.exports = {
	name: "user",
	adapter: new SequelizeAdapter(dbConfig.db),
	settings: {
	},

	dependencies: [],

	actions: {

		list: {
			rest: {
				method: "GET",
				path: "/users"
			},
			async handler() {
				const data = await User.findAll()
				return data;
			}
		},
		listToken: {
			rest: {
				method: "GET",
				path: "/token"
			},
			async handler() {
				const data = await Token.findAll()
				return data;
			}
		},

	//REGISTRO DE USUARIO		
		newUser: {
 			rest: {
                method: "POST",
                path: "/",
            },

		async handler(ctx) {
			let data = ctx.params

			const existe = await User.findOne({
				$or: [
					{ username: data.username },
					{ email: data.email },
				],
			})
			console.log( " asdasdasda"+existe)
	//SE VERIFICA SI EL USUARIO SE ENCUENTRA EN USO
		if(existe && existe.username && existe.username === data.username) {
				throw new MoleculerError("Usuario en uso !", 422,"")}
				
	//SE VERIFICA SI EL EMAIL SE ENCUENTRA EN USO
		if(existe && existe.email && existe.email === data.email){
				throw new MoleculerError("Email en uso !", 422,"")}
				
	//ENCRIPTAR CONTRASEÑA
		data.password = bcrypt.hashSync(data.password, 11);
			
	//CREO EL USUARIO Y LO RETORNO (el usuario todavia no esta dado de alta)	
		const newuser = await User.create(data)
	
	//CREO LA CUENTA 
	let codigo = Math.floor(Math.random() * 100000000)
	let cod = Math.floor(Math.random() * 100000000000)
	let cvu = cod.toString() + cod.toString()
	console.log("ESTE ES EL cvu ",cvu)
	const cuenta = Account.create({
		code:codigo,
		userId:newuser.id,
		cvu:cvu
	})
	//GENERAR PIN PARA DAR ALTA DE CLIENTE 
		const newToken = await Token.create({
			pin:Math.floor((Math.random() * 1000000)),
			userId:newuser.id,
			
			})
	//SE ENVIA EMAIL CON EL CODIGO DE VERIFICACION

		await sendMail( {
			to: data.email,
			subject: "[Henry Bank] Código de confirmación",
			template: "confirmation",
			input: {
				code: newToken.pin
			}
		} )
		return newuser;
	},
},
	//BUSCAR USUARIO POR ID USUARIO
	userById: {
		rest: {
			method: "GET",
			path: "/user/:id"
		},
		async handler(ctx) {
		const {id} = ctx.params
		const data = await User.findOne({
			where:{id:id},
			include:Account
		})

			return data;
			}
		},
	
	//ALTA DE USUARIO	
	userConfirm: {
		rest: {
			method:"PUT",
			path:"/confirm"
		},
		
		async handler(ctx) {
			const data = ctx.params;

			const existe = await User.findOne({
				$or: [
					{ identityNumber: data.identityNumber},
				],
			})

			if(existe && existe.identityNumber && existe.identityNumber == data.identityNumber) {
				throw new MoleculerError("DNI duplicado !", 422,"")}
		//SE COMPRUEBA QUE SEA MAYOR DE 16 AÑOS
		let fechaNac = new Date(data.birthday);
		let fechaAct = new Date()
		let edad = fechaAct.getTime() - fechaNac.getTime()

			if(Math.floor(edad/(1000*60*60*24)/365)<16) {
				throw new MoleculerError("Debe ser mayor de 16 años", 422,"")}

		await User.update(
			{	email:data.email,
				name:data.name,
				surname:data.surname,
				birthday:data.birthday,
				identityType:data.identityType,
				identityNumber:data.identityNumber,
				phone_number:data.phone_number,
				adress:data.adress,
				verified:true
			},

			{
			where:{
				id:data.id
				}
			}
		);
		await Account.update(
			{
				verified:true,
			},
			{
				where:{
					userId:data.id
					}
			}
		)

		const user = await User.findOne({
			where:{id:data.id},
			include:[{
				model:Account,
				where:{userId:data.id}
			}]	
		})
		return user

		},
	},
	updateAvatar:{
		rest: {
			method:"PUT",
			path:"/avatar/:_id"
		},
		async handler(ctx){

			const data=ctx.params;
			console.log(data)
			await User.update({
				avatar:data.avatar
			},
			{
				where:{
					id:data._id
				}
			}
			)
			return data.avatar;
		}
	},
		//MODIFICAR DATOS DEL USUARIO
		updateUser:{
			rest: {
				method:"PUT",
				path:"/update/:_id"
			},
			async handler(ctx){
	
			const data = ctx.params;
				console.log(ctx.params._id)
				console.log(ctx.params.avatar)
				await User.update(
					
					{  
						email:data.email,
						username:data.username,
						surname:data.surname,
						birthday:data.birthday,
						phone_number:data.phone_number,
						adress:data.adress,
					},
	
					{
					where:{
						id:data._id
						}
					}
				);
				const user = await User.findOne({
					where:{id:data._id},
	
				})
				return user
			}
		},
		
	validarToken:{
		rest: {
			method:"POST",
			path:"/validartoken"
		},  
		async handler(ctx) {
			const {pin} = ctx.params 
			const existe = await Token.findOne({
				$or: [
					{ pin: pin},
				],
			})

			if(existe && existe.pin && existe.pin == data.pin) {
				throw new MoleculerError("PIN incorrecto !", 422,"")}

				return "email validado";
		}
	}

},
	events: {
	},
	methods: {
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		relation()
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
}
