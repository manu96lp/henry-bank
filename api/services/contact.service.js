"use strict";
const relation = require ('../relations.js')
const SequelizeAdapter = require('moleculer-db-adapter-sequelize');
const { MoleculerError } = require("moleculer").Errors;
const dbConfig = require ('../dbConfig');
const {User} = require ('../models/User')
const {Contact} = require ('../models/Contact')


/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
module.exports = {
	name: "contact",
	adapter: new SequelizeAdapter(dbConfig.db),
	settings: {
	},


	actions: {
        addContact: {
			rest: {
				method: "POST",
				path: "/add"
			},
            async handler(ctx) {
                const data = ctx.params
                data.email = data.email.toLowerCase()
                const contact = await User.findOne({
                    where:{email:data.email}
                })
                const existe = await Contact.findOne({
                    where:{user_id:data.id,email:data.email}
                })
                if(existe){
                    throw new MoleculerError("Ya pertenece a tus contactos !", 422,"")
                }
                if(!contact) {
                    throw new MoleculerError("No se encotro el usuario !", 422,"")}
                
                const newContact = Contact.create(
                {
                    email:contact.email, 
                    contact_id: contact.id, 
                    nickname : data.nickname,
                    user_id: data.id,
                    avatar:contact.avatar,
                    phone:contact.phone
                })
                return newContact
            }
        },
        addContactWithPhone: {
			rest: {
				method: "POST",
				path: "/addWithPhone"
			},
            async handler(ctx) {
                const data = ctx.params

                const contact = await User.findOne({
                    where:{phone_number:data.phone}
                })

                if(!contact) {
                    throw new MoleculerError("No se encotro el usuario !", 404)}

                const existe = await Contact.findOne({
                    where:{user_id:data.id,phone:data.phone}
                })

                if(existe){
                    throw new MoleculerError("Ya pertenece a tus contactos !", 409)
                }
                
                const newContact = Contact.create(
                {
                    email:contact.email, 
                    contact_id: contact.id, 
                    nickname : data.nickname,
                    user_id: data.id,
                    avatar:contact.avatar,
                    phone:contact.phone_number
                })
                return newContact
            }
        },
        getAll:{
            rest: {
				method: "GET",
				path: "/:id"
            },

            async handler(ctx) {
                const data = ctx.params
                const contactos = await Contact.findAll({
                    where:{user_id:data.id}
                })
                return contactos
            }
        },
        update:{
            
            rest: {
                method: "PUT",
                path: "/:userId"
                },
            async handler(ctx){
                console.log( "DATOS CONTACTOS" ,ctx.params)
                const data = ctx.params
                    const contacto = await Contact.findOne({
                    where:{
                        id:data.userId
                    }
                })
                contacto.nickname = data.nickname
                contacto.save()
                return contacto 
            }    
    },
        delete:{
            rest: {
				method:"DELETE",
				path:"/:userId"
            },
            async handler(ctx){
                const data = ctx.params
                const contacto = await Contact.findOne({
                    where:{
                        id: data.userId}
                    });
                    
                const contactDelte = {id:contacto.id, nickname: contacto.nickname}
                await contacto.destroy()
                return contactDelte
            }
        }

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
};