import Image, { StaticImageData } from "next/image";

type Props = {
  name: string;
  price: string;
  image: StaticImageData;
};

export default function CoffeeCard({ name, price, image }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition cursor-pointer">
      <div className="relative w-full h-40 sm:h-44 md:h-48 rounded-xl overflow-hidden">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <h3 className="text-xl font-semibold mt-4 text-gray-800">{name}</h3>
     
    </div>
  );
}
