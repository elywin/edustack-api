// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator';



export default class UsersController {
    public async register({ request, response }) {
        const user = new User();
        const payload = await request.validate(CreateUserValidator);
    
        user.name = payload.name;
        user.email = payload.email;
        user.password = payload.password;
    
        await user.save();
        response.status(201);
    
        if (!user.$isPersisted) {
          return {
            status: 'fail',
            message: 'Failed to register user'
          };
        }
    
        return {
          status: 'success',
          data: user,
          message: 'User registered successfully',
        };
      }
}
