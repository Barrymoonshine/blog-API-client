import { render, screen } from '@testing-library/react';
import { AppProvider } from '../src/context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import BlogOverview from '../src/components/BlogOverview/BlogOverview';

describe('BlogOverview component', () => {
  const blogProps = {
    id: 'test123',
    image:
      'https://res.cloudinary.com/dawxbqbbj/image/upload/v1694765111/ztqmi8ej…',
    region: 'Africa',
    title: '🌴 Exploring the Enchanting Wonders of Marrakesh 🕌',
    isBlogPublished: true,
  };

  const wrappedBlogOverview = (
    <BrowserRouter>
      <AppProvider>
        <BlogOverview {...blogProps} />
      </AppProvider>
    </BrowserRouter>
  );

  it('renders all blog overview elements', () => {
    render(wrappedBlogOverview);
    expect(getImg()).toBeInTheDocument();
    expect(getRegion()).toBeInTheDocument();
    expect(getTitle()).toBeInTheDocument();
    expect(getDeleteButton()).toBeInTheDocument();
    expect(getEditButton()).toBeInTheDocument();
    expect(getPublishedButton()).toBeInTheDocument();
  });

  it('delete button called when clicked', async () => {
    const user = userEvent.setup();
    const deleteMock = vi.fn();

    render(wrappedBlogOverview);

    getDeleteButton().onclick = () => deleteMock();

    await user.click(getDeleteButton());

    expect(deleteMock).toHaveBeenCalled();
  });

  it('edit button called when clicked', async () => {
    const user = userEvent.setup();
    const editMock = vi.fn();

    render(wrappedBlogOverview);

    getEditButton().onclick = () => editMock();

    await user.click(getEditButton());

    expect(editMock).toHaveBeenCalled();
  });

  it('published button called when clicked', async () => {
    const user = userEvent.setup();
    const publishedMock = vi.fn();

    render(wrappedBlogOverview);

    getPublishedButton().onclick = () => publishedMock();

    await user.click(getPublishedButton());

    expect(publishedMock).toHaveBeenCalled();
  });

  it('published conditional rendering works ', async () => {
    const blogPropsUnpublished = { ...blogProps, isBlogPublished: false };

    render(
      <BrowserRouter>
        <AppProvider>
          <BlogOverview {...blogPropsUnpublished} />
        </AppProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Not published')).toBeInTheDocument();
  });
});

// Helper functions
function getImg() {
  return screen.getByRole('img', { name: /travel image/i });
}

function getRegion() {
  return screen.getByRole('heading', { name: /Africa/i });
}

function getTitle() {
  return screen.getByRole('heading', {
    name: /🌴 Exploring the Enchanting Wonders of Marrakesh 🕌/i,
  });
}

function getDeleteButton() {
  return screen.getByRole('button', { name: /delete/i });
}

function getEditButton() {
  return screen.getByText(/edit/i);
}

function getPublishedButton() {
  return screen.getByRole('button', { name: 'Published' });
}
