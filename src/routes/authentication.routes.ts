import * as authenticate from '../controllers/authentication.controller'

export default (app : any) => {


    app.post('/login', authenticate.login);
}