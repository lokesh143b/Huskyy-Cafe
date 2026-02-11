// Import the images
import coffee1 from "../public/coffee1.jpg";
import coffee2 from "../public/coffee2.jpg";
import coffee3 from "../public/coffee3.jpg";

// Import the type for Next.js images
import { StaticImageData } from "next/image";

// Define a TypeScript interface for a coffee
export interface Coffee {
  name: string;
  price: string;
  image: StaticImageData; // This is from Next.js image import
  origin: string;
  roast: string;
  aroma: string;
  strength: string;
  description: string;
}

export interface Reviews {
  name: string;
  rating: number;
  text: string;
}

// Coffee data
export const allCoffees: Coffee[] = [
  {
    name: "Espresso",
    price: "₹120",
    image: coffee1,
    origin: "Colombia",
    roast: "Dark Roast",
    aroma: "Rich chocolate notes",
    strength: "High",
    description: "Strong and bold coffee, perfect for a morning boost.",
  },
  {
    name: "Cappuccino",
    price: "₹180",
    image: coffee2,
    origin: "Italy",
    roast: "Medium Roast",
    aroma: "Nutty and sweet aroma",
    strength: "Medium",
    description: "Creamy milk foam with espresso, a classic favorite.",
  },
  {
    name: "Latte",
    price: "₹200",
    image: coffee3,
    origin: "Ethiopia",
    roast: "Light Roast",
    aroma: "Mild and smooth",
    strength: "Low-Medium",
    description: "Smooth espresso with steamed milk, lightly sweetened.",
  },
  {
    name: "Americano",
    price: "₹150",
    image: coffee1,
    origin: "Brazil",
    roast: "Medium-Dark Roast",
    aroma: "Smooth and rich",
    strength: "Medium-High",
    description: "Espresso diluted with hot water for a lighter flavor.",
  },
  {
    name: "Mocha",
    price: "₹220",
    image: coffee2,
    origin: "Yemen",
    roast: "Medium Roast",
    aroma: "Chocolatey and nutty",
    strength: "Medium",
    description: "A delicious blend of espresso, chocolate, and steamed milk.",
  },
  {
    name: "Flat White",
    price: "₹190",
    image: coffee3,
    origin: "Australia",
    roast: "Medium-Light Roast",
    aroma: "Creamy and mild",
    strength: "Medium-Low",
    description: "Smooth espresso with a velvety microfoam milk texture.",
  },
];


// Sample Customer Reviews
export const reviews:Reviews[] = [
  { name: "Ananya", rating: 5, text: "Absolutely love this coffee! Rich flavor and smooth." },
  { name: "Rohan", rating: 4, text: "Great taste, perfect for morning kickstart." },
  { name: "Priya", rating: 5, text: "My favorite coffee. Always fresh and delicious!" },
];


