//llamamos la app
const app = require('../app');
//llamamos un funcion asincrona y llamamos el puerto
async function main(){
    app.listen(app.get('port'));
    console.log('Server on port',app.get('port'));
}
main();