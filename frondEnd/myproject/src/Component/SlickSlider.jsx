import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pepsi from "../assets/image/Pepsi_New_Cans-Group-1540x800.JPG";
import learn from "../assets/image/pngtree-back-to-school-stationery-set-isolated-on-white-background-3d-render-image_13560058.png";
import learn2 from "../assets/image/243194711_162182662751567_7688233892480613845_n.JPG";
import chipse from "../assets/image/image-14-7-1024x750.JPG";
import indome from "../assets/image/FUCWalKWIAEmi2I.JPG";
export default function SlickSlider() {
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container md:mt-20 flex flex-col md:flex-row items-center justify-center caret-transparent ">
      <div className="w-[80%] md:w-[50%]  py-5  ">
        <Slider {...settings}>
          <img src={pepsi} className=" h-[300px]   object-contain" alt="" />
          <img src={chipse} className=" h-[300px] object-contain" alt="" />
          <img src={indome} className=" h-[300px]   object-contain" alt="" />
        </Slider>
      </div>
      <div className="w-[30%] flex justify-center md:flex-col ">
        <img src={learn} className="h-[150px]" alt="" />
        <img src={learn2} className="h-[150px] w-[267px]" alt="" />
      </div>
    </div>
  );
}
