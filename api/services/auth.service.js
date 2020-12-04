"use strict";
const relation = require ('../relations.js')
const SequelizeAdapter = require('moleculer-db-adapter-sequelize');
const model = require ('../models/User')
const jwt = require('jsonwebtoken');
const { MoleculerError } = require("moleculer").Errors;
const dbConfig = require ('../dbConfig');
const {User} = require ('../models/User')
const bcrypt = require('bcrypt');
const {Account} = require('../models/Account.js');

const {CLAVE_TOKEN} = process.env;

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
module.exports = {
	name: "auth",
	adapter: new SequelizeAdapter(dbConfig.db),
	settings: {
		fields: [
            'id',
            'username',
            'email',
            'name',
            'lastname',
			'typeUser'
        ],
	},


	actions: {
        login: {
			rest: {
				method: "POST",
				path: "/login"
			},
            async handler(ctx) {
				const { email, password } = ctx.params;
                //CHECKEO EL EMAIL
                const logUser = await User.findOne({
					where: {email: email},
					include:Account
				});
				//CHECKEO CONTRASEÑA
				const checkPass = await bcrypt.compare(password , logUser?logUser.password:" ");

                if(!logUser || !checkPass){
                    throw new MoleculerError('Email o contraseña invalido', 422)
                }

                const res = { 
				token:  jwt.sign({id: logUser.id},CLAVE_TOKEN,{expiresIn: "1d"}),
				logUser
				};
				
				
                if(!res) {
                    throw new MoleculerError('algo malir sal',422)
				}
				
                return res;

            }
        }      
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
};