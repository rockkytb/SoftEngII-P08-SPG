import ProductImages from "./ProductImages";

export default function ImageFinder (name){
    const img = ProductImages.find(i => i.includes(name));
    if (img)
        return img;
    else
        return ProductImages.find(i => i.includes("default"));
  }
