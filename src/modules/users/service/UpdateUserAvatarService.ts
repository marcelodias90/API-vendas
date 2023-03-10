import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';
import User from '../typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar); //pegando o caminho do arquivo
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); //pegando o status do arquivo

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); //veririficando se existe o arquivo e excluindo(unlink) o msms para alteração
      }
    }
    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
