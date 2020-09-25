import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserservice from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authtenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authtenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });
  it('should be able to authenticate', async () => {
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
    await expect(
      authtenticateUser.execute({
        email: 'diogosalesdev@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const createUser = new CreateUserservice(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'Diogo Sales',
      email: 'diogosalesdev@gmail.com',
      password: '123456',
    });

    await expect(
      authtenticateUser.execute({
        email: 'diogosalesdev@gmail.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});
