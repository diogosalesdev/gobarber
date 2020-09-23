import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendAForgotPasswordEmailService from '@modules/users/services/SendAForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(SendAForgotPasswordEmailService);

    await sendForgotPasswordEmail.execute({
      email,
    });


    return response.status(204).json();
  }
}
