import * as authenticate from '../controllers/authenticate.controller'

export default (app : any) => {


    app.post('/login', authenticate.login);
}