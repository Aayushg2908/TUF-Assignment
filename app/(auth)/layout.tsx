const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mb-4">
        <span>Admin Email:- admin@gmail.com</span>
        <span>Admin Password:- Admin@123</span>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
