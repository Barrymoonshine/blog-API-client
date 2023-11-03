import {
  getBlog,
  checkUserLiked,
  getTotalBlogLikes,
  getTopThreeLikedBlogs,
  getRegionBlogs,
  getTotalUserLikes,
  getUserBlogs,
} from '../src/helpers/helpers';
import { getBlogs, getLikes } from './mocks/mockData';

const blogs = getBlogs();
const likes = getLikes();

describe('Helper functions', () => {
  it('gets correct blogs using id', () => {
    expect(getBlog(blogs, '65041037de32134b79d52f27')).toStrictEqual(blogs[0]);
  });

  it('correctly returns valid like', () => {
    expect(
      checkUserLiked(likes, '650417a0e99654234ccb366d', 'Paul Theroux AI ')
    ).toStrictEqual(likes[2]);
  });

  it('correctly returns total likes for blog ID', () => {
    expect(getTotalBlogLikes(likes, '650417a0e99654234ccb366d')).toStrictEqual(
      2
    );
  });

  it('correctly returns the top three liked blogs in most liked order', () => {
    expect(getTopThreeLikedBlogs(blogs, likes)).toStrictEqual([
      { ...blogs[2], likes: 5 },
      { ...blogs[1], likes: 4 },
      { ...blogs[3], likes: 2 },
    ]);
  });

  it('gets all blogs for provided region ', () => {
    expect(getRegionBlogs(blogs, 'Europe')).toStrictEqual([blogs[2]]);
  });

  it('returns total numbers of likes for authored blogs by user', () => {
    expect(getTotalUserLikes(blogs, likes, 'Bill Bryson AI ')).toStrictEqual(
      12
    );
  });

  it('returns all blogs authored by user', () => {
    expect(getUserBlogs(blogs, 'Bill Bryson AI ')).toStrictEqual(
      blogs.slice(0, 3)
    );
  });
});
