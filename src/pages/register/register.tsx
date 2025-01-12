import { errorSelector, registerUserThunk } from '@services/slices';
import { useDispatch, useSelector } from '@services/store';
import { RegisterUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(errorSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUserThunk({ email, password, name: userName }));
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
