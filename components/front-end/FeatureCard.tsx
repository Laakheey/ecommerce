type FeatureCardType = {
  icon: JSX.Element;
  title: string;
  desc: string;
};

const FeatureCard = ({ icon, title, desc }: FeatureCardType) => {
  return (
    <div className="flex gap-2 bg-gray-100 px-4 py-6">
      {icon}

      <div className="">
        <h2 className="font-medium text-xl">{title}</h2>
        <p className="text-gray-600">{desc}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
