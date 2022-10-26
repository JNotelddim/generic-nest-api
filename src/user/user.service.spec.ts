import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseService } from '../database/database.service';
import { mockUsers } from '../test/fixtures/user.fixtures';

/**
 * UNIT TESTS
 * on individual UserService methods
 */
describe('UserService Unit Tests', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, DatabaseService],
    })
      .useMocker((token) => {
        if (token === DatabaseService) {
          return {
            user: { findUnique: jest.fn().mockResolvedValue(mockUsers[0]) },
          };
        }
      })
      .compile();

    userService = moduleRef.get(UserService);
  });

  it('`user` fn gets an individual user by id', async () => {
    // Arrange
    const expected = mockUsers[0];

    // Act
    const result = await userService.user({ id: mockUsers[0].id });

    // Assert
    expect(result).toBe(expected);
  });
});
