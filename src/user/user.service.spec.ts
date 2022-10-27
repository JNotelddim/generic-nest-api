import { DatabaseService } from 'src/database/database.service';
import { mockUsers } from 'src/test/fixtures/user.fixtures';
import { UserService } from './user.service';

/**
 * UNIT TESTS
 * on individual UserService methods
 */
describe('UserService Unit Tests', () => {
  let databseService: DatabaseService;
  let userService: UserService;

  beforeEach(() => {
    databseService = new DatabaseService();
    userService = new UserService(databseService);
  });

  it('`user` fn gets an individual user by id', async () => {
    // Arrange
    const expected = mockUsers[0];
    jest
      .spyOn(databseService.user, 'findUnique')
      .mockImplementation(() => mockUsers[0]);

    // Act
    const result = await userService.user({ id: mockUsers[0].id }); // TODO: resolve type

    // Assert
    expect(result).toBe(expected);
  });

  it('`users` fn gets full list of users', async () => {
    // Arrange
    const expected = mockUsers;
    jest
      .spyOn(databseService.user, 'findMany')
      .mockImplementation(() => mockUsers); // TODO: resolve type

    // Act
    const result = await userService.users({});

    // Assert
    expect(result).toBe(expected);
  });
});
