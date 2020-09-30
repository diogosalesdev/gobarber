import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user',
      provider_id: '234561773'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('234561773');
  });

  it('should not be able to create two appointment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(2020, 6, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user',
      provider_id: '234561773'
    });

    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: 'user',
      provider_id: '234561773'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'user',
      provider_id: '234561773'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 14),
      user_id: '234561773',
      provider_id: '234561773'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(AppError);

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(AppError);
  });
});
