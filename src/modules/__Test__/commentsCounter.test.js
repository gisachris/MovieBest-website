import { createComment, getComments, clearComments } from './commentsCounter.js';

describe('Comments Counter', () => {
  beforeEach(() => {
    clearComments();
  });

  test('Create comments and check count', () => {
    createComment('abc234', 'item1', 'John', 'This is nice!');
    createComment('abc234', 'item1', 'Jane', 'Great content!');
    createComment('abc234', 'item2', 'John', 'Awesome!');
    createComment('xyz789', 'item1', 'Alice', 'Good job!');

    expect(getComments('abc234', 'item1')).toHaveLength(2);
    expect(getComments('abc234', 'item2')).toHaveLength(1);
    expect(getComments('xyz789', 'item1')).toHaveLength(1);
    expect(getComments('abc234', 'item3')).toHaveLength(0);
  });

  test('Create comments and check content', () => {
    createComment('abc234', 'item1', 'John', 'This is nice!');
    createComment('abc234', 'item1', 'Jane', 'Great content!');
    createComment('abc234', 'item2', 'John', 'Awesome!');
    createComment('xyz789', 'item1', 'Alice', 'Good job!');

    expect(getComments('abc234', 'item1')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          comment: 'This is nice!',
          creation_date: expect.any(String),
          username: 'John',
        }),
        expect.objectContaining({
          comment: 'Great content!',
          creation_date: expect.any(String),
          username: 'Jane',
        }),
      ]),
    );
    expect(getComments('abc234', 'item2')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          comment: 'Awesome!',
          creation_date: expect.any(String),
          username: 'John',
        }),
      ]),
    );
    expect(getComments('xyz789', 'item1')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          comment: 'Good job!',
          creation_date: expect.any(String),
          username: 'Alice',
        }),
      ]),
    );
    expect(getComments('abc234', 'item3')).toEqual([]);
  });
});
