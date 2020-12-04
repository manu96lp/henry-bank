const {Account} = require('./models/Account')
const {Token} = require('./models/Token')
const {User} = require('./models/User')
const {Transaction} = require('./models/Transaction')
const {Contact} = require('./models/Contact')
module.exports=()=>{
    
    User.hasOne(Token);

    User.hasOne(Account)

    User.hasMany(Contact,{foreignKey:'user_id'});

    Contact.belongsTo(User,{foreignKey: 'user_id'});

    Contact.belongsTo(User,{foreignKey: 'contact_id'});

    Account.hasMany(Transaction,{foreignKey:'accountId'})

}