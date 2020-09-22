import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendAForgotPasswordEmailService from './SendAForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendAForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendAForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );
  });

  it('should be able to recover the password using email', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Diogo Sales',
      email: 'diogosalesdev@gmail.com',
      password: '123456'
    });

    await sendForgotPasswordEmail.execute({
      email: 'diogosalesdev@gmail.com'
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {

    expect(
      sendForgotPasswordEmail.execute({
        email: 'diogosalesdev@gmail.com'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a fogort password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Diogo Sales',
      email: 'diogosalesdev@gmail.com',
      password: '123456'
    });

    await sendForgotPasswordEmail.execute({
      email: 'diogosalesdev@gmail.com'
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });

});
