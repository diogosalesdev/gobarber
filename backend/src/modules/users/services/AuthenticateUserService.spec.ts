import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserservice from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authtenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const createUser = new CreateUserservice(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'Diogo Sales',
      email: 'diogosalesdev@gmail.com',
      password: '123456',
    });

    const user = await authtenticateUser.execute({
      email: 'diogosalesdev@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authtenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authtenticateUser.execute({
        email: 'diogosalesdev@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authtenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const createUser = new CreateUserservice(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'Diogo Sales',
      email: 'diogosalesdev@gmail.com',
      password: '123456',
    });

    expect(
      authtenticateUser.execute({
        email: 'diogosalesdev@gmail.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});
