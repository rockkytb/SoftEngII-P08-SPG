import ProductImages from "./ProductImages";

export default function ImageFinder (name){
    const img = ProductImages.find(i => {
        if(typeof i === "string")
        {
            
            return i.includes(name);
        }
    });
    if (img)
        return img;
    else
        return ProductImages.find(i => 
            {
                if(typeof i === "string")
                {         
                    return i.includes("default");
                }
            });
  }
