import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);

container.registerSingleton<IMailProvider>(
  'MailProvider',
  EtherealMailProvider
);
