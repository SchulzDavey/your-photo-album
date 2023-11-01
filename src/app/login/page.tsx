import LoginForm from './LoginForm';

const LoginPage = async () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-[30rem] bg-slate-800 p-10 rounded-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
