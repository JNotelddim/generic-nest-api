import { User } from '@prisma/client';

export const mockUsers: User[] = [
  {
    id: 'd5d721ac-9d86-4097-b32c-ad7be6af46a5',
    firebaseUid: 'e6a22005-0774-4004-a74e-0f8b3b4ef990',
    email: 'jared@metalabdesign.com',
    username: 'jared_metalab',
    firstName: 'Jared',
    lastName: 'MetaLab',
    timezone: 'PST',
  },
  {
    id: 'd5d721ac-9d86-4097-b32c-ad7be6af46a5',
    firebaseUid: 'e6a22005-0774-4004-a74e-0f8b3b4ef990',
    email: 'jared@metalabdesign.com',
    username: 'jared_metalab',
    firstName: 'Jared',
    lastName: 'MetaLab',
    timezone: undefined,
  },
];
