type Props = {
  title: string;
  description: string;
};

const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold">{title}</h2>

      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
};

export default EmptyState;
