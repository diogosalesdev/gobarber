// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  });

  it('should be able to list the providers', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'Diogo Sales',
      email: 'diogosalesdev@gmail.com',
      password: '123456'
    });

    const user1 = await fakeUsersRepository.create({
      name: 'Thiago Sales',
      email: 'ninho@gmail.com',
      password: '123123'
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Victor Sales',
      email: 'cupim@gmail.com',
      password: '654321'
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });

    expect(providers).toEqual([
      user1,
      user2
    ]);
  });
});
