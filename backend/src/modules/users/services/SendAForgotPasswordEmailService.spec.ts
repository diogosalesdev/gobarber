// import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendAForgotPasswordEmailService from './SendAForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendAForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

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

});
