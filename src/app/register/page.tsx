import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-[30rem] bg-slate-800 p-10 rounded-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
