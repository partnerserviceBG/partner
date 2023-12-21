import { useRouteError } from 'react-router-dom';

interface ErrorPage {
  statusText: string;
  message: string;
}
export const ErrorPage = () => {
  const error = useRouteError() as ErrorPage;
  console.log(error);
  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Извените, что-то пошло не так.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
