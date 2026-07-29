type Props = {
  message: string;
};

const ErrorState = ({ message }: Props) => {
  return (
    <div className="text-center py-20">
      <h2 className="text-red-600 text-2xl">{message}</h2>
    </div>
  );
};

export default ErrorState;
