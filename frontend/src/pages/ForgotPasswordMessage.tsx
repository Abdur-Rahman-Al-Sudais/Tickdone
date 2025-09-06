const ForgotPasswordMessage = () => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div className="bg-neutral-100-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 px-6 py-4 rounded-2xl shadow-md text-center max-w-md">
        <h2 className="text-xl font-semibold mb-2">Check your email</h2>
        <p className="text-sm">
          A password reset link has been sent to your email. Please check your
          inbox.
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordMessage;
