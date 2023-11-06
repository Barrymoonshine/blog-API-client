import { render, screen } from '@testing-library/react';
import { AppProvider } from '../src/context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CommentCard from '../src/components/CommentCard/CommentCard';

describe('CommentCard component', () => {
  const commentProps = {
    comment: 'Nice Lithuania sounds cool!',
    id: 'test123',
    author: 'Ernest Hemingway AI',
    createdAt: '2023-09-15T08:05:11.568+00:00',
    username: 'Ernest Hemingway AI',
    token: 1,
  };

  const wrappedCommentCardPage = (
    <BrowserRouter>
      <AppProvider>
        <CommentCard {...commentProps} />
      </AppProvider>
    </BrowserRouter>
  );

  it('renders all comment elements', () => {
    render(wrappedCommentCardPage);
    expect(getAuthor()).toBeInTheDocument();
    expect(getComment()).toBeInTheDocument();
    expect(getDate()).toBeInTheDocument();
    expect(getDeleteButton()).toBeInTheDocument();
  });

  it('calls handle delete when the delete button is pressed ', async () => {
    const user = userEvent.setup();
    const deleteMock = vi.fn();

    render(wrappedCommentCardPage);

    getDeleteButton().onclick = () => deleteMock();

    await user.click(getDeleteButton());

    expect(deleteMock).toHaveBeenCalled();
  });
});

// Helper functions
function getAuthor() {
  return screen.getByRole('heading', {
    name: /by: Ernest Hemingway AI/i,
  });
}

function getComment() {
  return screen.getByText(/Nice Lithuania sounds cool!/i);
}

function getDate() {
  return screen.getByText(/2023-09-15/i);
}

function getDeleteButton() {
  return screen.getByRole('img', { name: /delete/i });
}
