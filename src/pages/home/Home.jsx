import { Link } from "react-router-dom"
import Filter from "../../components/filter/Filter"
import HeroSection from "../../components/heroSection/HeroSection"
import Layout from "../../components/layout/Layout"
import ProductCard from "../../components/productCard/ProductCard"
import Testimonial from "../../components/testimonial/Testimonial"
import Track from "../../components/track/Track"
import MiddleSection from "../../components/heroSection/MiddleSection"

const Home = () => {

  return (
    <>
      <Layout>
        <HeroSection />
        <Filter />
        <ProductCard />
        <div className="flex justify-center -mt-10 mb-4 p-5">
        <Link to={'/allproducts'}>
          <button className=' bg-gray-300 px-5 py-2 rounded-xl hover:shadow-xl hover:shadow-gray-200 border-gray-200'>See more</button>       
        </Link>
       </div>
        <MiddleSection />
        <Track />
        <Testimonial />
      </Layout>
    </>
  )
}

export default Home;















