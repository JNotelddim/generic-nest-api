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

  it('`user` fn gets an individual user by id', () => {
    // Arrange
    const expected = mockUsers;
    jest
      .spyOn(databseService.user, 'findUnique')
      .mockImplementation(() => mockUsers[0] as any);

    // Act
    const result = userService.user({ id: mockUsers[0].id });

    // Assert
    expect(result).toBe(expected);
  });
});
