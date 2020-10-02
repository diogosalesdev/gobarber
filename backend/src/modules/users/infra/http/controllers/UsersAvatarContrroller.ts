import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpadateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UsersAvatarCrontroller {
  public async update(request: Request, response: Response): Promise<Response> {
    const upadateUserAvatar = container.resolve(UpadateUserAvatarService);

    const user = await upadateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    });

    return response.json(classToClass(user));
  }
}
