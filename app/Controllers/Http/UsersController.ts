import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import CreateUser from 'App/Validators/CreateUserValidator';
import LoginUser from 'App/Validators/LoginUserValidator';




export default class UsersController {
    public async register({ request, response }: HttpContextContract) {
      try {
        const user = new User();
        const payload = await request.validate(CreateUser);
    
        user.name = payload.name;
        user.email = payload.email;
        user.password = payload.password;
    
        await user.save();
        return response.status(201).json({
          status: 'success',
          data: user,
          message: 'User registered successfully',
        });
  
      } catch (error) {
        return response.status(404).json({
          status: 'fail',
          message: 'Failed to register user',
        });
      }
    }
  

      public async login({ auth, request }) {
        const { email, password } = await request.validate(LoginUser);
    
        const token = await auth.use('api').attempt(email, password);
    
        if (auth.user!) {
          return {
            status: 'success',
            data: auth.user,
            access_token: token,
            message: 'User login successful',
          };
        }
      }
}


