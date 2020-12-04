"use strict";
const relation = require ('../relations.js')
const SequelizeAdapter = require('moleculer-db-adapter-sequelize');
const { MoleculerError } = require("moleculer").Errors;
const dbConfig = require ('../dbConfig');
const {User} = require ('../models/User')
const {Account} = require ('../models/Account')

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
module.exports = {
	name: "account",
	adapter: new SequelizeAdapter(dbConfig.db),
	settings: {
	},


	actions: {
		allAcoounts:{
			rest:{
				method:"GET",
				path: "/accounts"
			},
			async handler(ctx){
				const accounts = await Account.findAll()
				return accounts;
			}
		},

        getAccount: {
			rest: {
				method: "GET",
				path: "/getaccount/:id"
			},
            async handler(ctx){

                const {id} = ctx.params
            
                const account = await Account.findOne({
                    where:{
                    	userId:id
                    },
                })
            
                return account
            },      
		},
			newAccount:{
				rest:{
					method:"POST",
					path:"/"
				},
				async handler(ctx){
					const data = ctx.params;
					const newAccount = await Account.create(data)
					return newAccount
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