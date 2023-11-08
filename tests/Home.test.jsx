import { render, screen } from '@testing-library/react';
import { AppProvider } from '../src/context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import Home from '../src/pages/Home/Home';
import * as useAuthStateModule from '../src/hooks/useAuthState';
import * as useBlogsStateModule from '../src/hooks/useBlogsState';
import * as useLikesStateModule from '../src/hooks/useLikesState';
import { getBlogs, getLikes } from './mocks/mockData';

describe('Home page', () => {
  const wrappedHomePage = (
    <BrowserRouter>
      <AppProvider>
        <Home />
      </AppProvider>
    </BrowserRouter>
  );

  it('conditionally renders welcome message when user is logged in', () => {
    vi.spyOn(useAuthStateModule, 'default').mockReturnValue({
      isLoggedIn: true,
      username: 'Test',
    });

    render(wrappedHomePage);
    expect(
      screen.getByRole('heading', { name: /Welcome back Test/i })
    ).toBeInTheDocument();
  });

  it('renders top three liked blogs', () => {
    vi.spyOn(useBlogsStateModule, 'default').mockReturnValue({
      blogs: getBlogs(),
      blogsLoading: false,
      blogsError: null,
    });

    vi.spyOn(useLikesStateModule, 'default').mockReturnValue({
      likes: getLikes(),
    });

    render(wrappedHomePage);
    // Vilnius, likes: 5
    expect(
      screen.getByRole('heading', {
        name: /🌍 vilnius: unveiling the charms of lithuania 🇱🇹/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/\| 5/i)).toBeInTheDocument();

    // Lima,  likes: 4
    expect(
      screen.getByRole('heading', {
        name: /🌟 Lima Unveiled: Exploring Peru's Coastal Gem 🇵🇪/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/\| 4/i)).toBeInTheDocument();

    // Tokyo, likes: 2
    expect(
      screen.getByRole('heading', {
        name: /🗼 Tokyo Tales: Navigating the Land of the Rising Sun 🇯🇵/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/\| 2/i)).toBeInTheDocument();
  });

  it("doesn't render a blog that is not in the top three liked blogs", () => {
    vi.spyOn(useBlogsStateModule, 'default').mockReturnValue({
      blogs: getBlogs(),
      blogsLoading: false,
      blogsError: null,
    });

    vi.spyOn(useLikesStateModule, 'default').mockReturnValue({
      likes: getLikes(),
    });

    render(wrappedHomePage);

    const blogHeading = screen.queryByRole('heading', {
      name: /🌴 Exploring the Enchanting Wonders of Marrakesh 🕌/i,
    });

    expect(blogHeading).toBeNull();
  });
});
