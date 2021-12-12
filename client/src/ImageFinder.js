import ProductImages from "./ProductImages";

export default function ImageFinder (name){
    const img = ProductImages.find(i => i.includes(name));
    return img;
  }
