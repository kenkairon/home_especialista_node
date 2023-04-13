const app = require('./app');
const conexion = require('./database/db')
async function main(){
    app.listen(app.get('port'));
    console.log('Server on port',app.get('port'));
}
main();