import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from '../components/SignUp/SignUp';
import * as firebaseAuth from 'firebase/auth';

describe('SignUp', () => {
  it('calls createUserWithEmailAndPassword on sign up', async () => {
    const mockCreate = jest.spyOn(firebaseAuth, 'createUserWithEmailAndPassword').mockResolvedValue({ user: { email: 'test@example.com' } });
    render(<Signup />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password');

    const button = screen.getByRole('button', { name: /sign up/i });
    await userEvent.click(button);

    expect(mockCreate).toHaveBeenCalled();
    mockCreate.mockRestore();
  });
});
