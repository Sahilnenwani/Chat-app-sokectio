const moment=require('moment');

function fromatMessage(username,text){
    return{
        username,
        text,
        time:moment().format('h:m a')
    }

}

module.exports=fromatMessage;