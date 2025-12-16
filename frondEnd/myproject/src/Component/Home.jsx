import React from "react";
import SlickSlider from "./SlickSlider.jsx";
import ShopByCategory from "./ShopByCategory.jsx";
import Product from "./Product.jsx";
import Loading from "./Loading.jsx";

export default function Home() {
 
  return (
      <>
   
      <SlickSlider />
      <ShopByCategory />
      <Product />
      </>
    
  );
}
