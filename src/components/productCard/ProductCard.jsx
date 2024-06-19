import { useContext, useEffect } from "react";
import myContext from "../../context/data/myContext";
import {useDispatch,useSelector} from 'react-redux'
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
function ProductCard() {
  const context = useContext(myContext);
  const { mode,product,searchkey, filterType,
    filterPrice } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state)=>state.cart)
  // console.log(cartItems)
  //add to cart
  const addCart = (product) =>{
    dispatch(addToCart(product));
    toast.success("Add to Cart");
  }

  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cartItems))
  },[cartItems]) 

  // Define filter functions
  const filterBySearch = (item) => item.title.toLowerCase().includes(searchkey);
  const filterByCategory = (item) => {
    return  item.category.toLowerCase().includes(filterType);
  };
  const filterByPrice = (item) => {
    return item.price.toLowerCase().includes(filterPrice);
  };
  // Apply filters to the product list
  const filteredProducts = product.filter((item) => {
    return filterBySearch(item) && filterByCategory(item) && filterByPrice(item);
  });
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Trending
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
        
          {
            filteredProducts.slice(0,4).map((item,index)=>{
              const {title,price,imageUrl,id} = item;
              return(
        
                <div className="p-4 md:w-1/4  drop-shadow-lg" key={index}>
            <div
              className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div className="flex justify-center cursor-pointer" onClick={()=>window.location.href=`/productinfo/${id}`}>
                <img
                  className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out"
                  src={imageUrl}
                  alt="blog"
                />
              </div>
              <div className="p-5 border-t-2">
                <h2
                  className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  DG-Shop 
                </h2>
                <h1
                  className="title-font text-lg font-medium text-gray-900 mb-3"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {title}
                </h1>
                {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
                <p
                  className="leading-relaxed mb-3"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  ₹ {price}
                </p>
                <div className=" flex justify-center">
                  <button
                    onClick={()=>addCart(item)}
                    type="button"
                    className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
             
              )
            })
          }
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
