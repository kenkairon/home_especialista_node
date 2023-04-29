//llamar app
const app = require('./app');
//llamar a una conexion
const conexion = require('./database/db')
//Async llamado al puerto
async function main(){
    app.listen(app.get('port'));
    console.log('Server on port',app.get('port'));
}
main();