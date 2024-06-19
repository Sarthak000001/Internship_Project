import  { useEffect, useState } from 'react';
import MyContext from './myContext';
import PropTypes from 'prop-types';
import { 
  Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';

function MyState(props){

  const [mode, setMode] = useState('light');
  
  const toggleMode = () =>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    title:null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });
  // Add Product 
  const addProduct = async () =>{
    if(products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null){
      return toast.error("All fields are required");
    }
    setLoading(true);
    try{
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, products);
      toast.success("Product Added Successfully");
      setTimeout(()=>{
        window.location.href = "/dashboard";
      },800)
      getProductData();
      setLoading(false);
    }
    catch(error){
      console.log(error);
      setLoading(false);
    }
  }

  const [product,setProduct] = useState([]);
  const getProductData = async() =>{
      setLoading(true);
      try{
          const q = query(
            collection(fireDB, 'products'),
            orderBy("time")
          );
          const data = onSnapshot(q, (QuerySnapshot)=>{
            let productArray = [];
            QuerySnapshot.forEach((doc) =>{
              productArray.push({...doc.data(),id:doc.id});
            });
            setProduct(productArray);
            setLoading(false);
          })
          return ()=>data;
      }
      catch(error){
        console.log(error)
        setLoading(false);
      }
  }

  useEffect(()=>{
    getProductData();
  },[])

  // Update Product 
  const editHandle = (item) =>{
    setProducts(item);
  }
  const updateProduct = async() =>{
    setLoading(true);
    try{
      await setDoc(doc(fireDB,"products",products.id),products);
      toast.success("Product Updated Successfully");
      getProductData();
      setTimeout(()=>{
        window.location.href = "/dashboard";
      },800)
      setLoading(false);
    }
    catch(error){
      console.log(error)
      setLoading(false);
    }
  }
  // delete Product 
  const deleteProduct = async(item) =>{
    setLoading(true);
    try{
      await deleteDoc(doc(fireDB,"products",item.id));
      toast.success("Product Deleted Successfully");
      getProductData();
      setLoading(false);
    }
    catch(error){
      console.log(error);
      setLoading(false);
    }
  }

  const [user,setUser] = useState([]);
  const getUserData = async() =>{
    try{
      const result = await getDocs(collection(fireDB,"users"));
      const userArray = [];
      result.forEach((doc)=>{
        userArray.push(doc.data());
      })
      setUser(userArray);
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getProductData();
    getUserData();
  },[])

  const [searchkey, setSearchkey] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  // Order
  const [order,setOrder] = useState([]);

  const getOrderData = async() =>{
    setLoading(true);
    try{
      const result = await getDocs(collection(fireDB,"order"));
      const ordersArray = [];
      result.forEach( (doc)=>{
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      console.log(ordersArray);
      setLoading(false);
    }
    catch(error){
      console.log(error);
      setLoading(false);
    }
  }

  
  useEffect(()=>{
    getProductData();
    getOrderData();
  },[]);

  return (
    <MyContext.Provider 
    value={{mode,toggleMode,loading,setLoading,products,setProducts,addProduct,product,
        editHandle,updateProduct,deleteProduct,user, searchkey, setSearchkey,filterType, setFilterType,
        filterPrice, setFilterPrice,order
       }}>
      {props.children}
    </MyContext.Provider>
  )
}

MyState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyState;
