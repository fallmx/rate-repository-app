import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInHandler } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const signIn = jest.fn();
      const navigate = jest.fn();
      render(<SignInHandler signIn={signIn} navigate={navigate} />);

      fireEvent.changeText(screen.getByTestId('usernameField'), 'name');
      fireEvent.changeText(screen.getByTestId('passwordField'), 'password');
      fireEvent.press(screen.getByTestId('signInButton'));

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledTimes(1);
        expect(signIn.mock.calls[0][0]).toEqual({
          username: 'name',
          password: 'password',
        });
      });
    });
  });
});
