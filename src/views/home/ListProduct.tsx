import React, { useEffect, useState } from 'react'
import api from '../../api/Api';
import { formatPrice } from '../../helpers/formatprice';

type Product = {
  id: number,
  imgUrl: string,
  name: string,
  price: number,
  categoryId: number,
}

export default function ListProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [formDataUpdate, setFormData] = useState({
    name: '',
    price: '',
    categoryId: '',
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseProduct = await api.get('/product/all');
        setProducts(responseProduct.data.data);

      } catch (error) {
        console.error('Error fetching products:', error);
      }

    };
    fetchProducts();
  }, []);
  const [file, setFile] = useState();
  const handleAddfile = (files: any) => {
    setFile(files[0]);
  }
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleAddProduct = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("price", event.target.price.value);
    formData.append("categoryId", event.target.categoryId.value);
    formData.append("description", event.target.description.value);
    formData.append("imgUrl", file as any);
    const headers = {
      headers: {
        'Content-Type': `multipart/form-data`,
      }
    }
    try {
      const response = await api.post("/product/createProduct", formData, headers)
      console.log(response)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;
    try {
      await api.delete(`/product/deleteProduct/${id}`);
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const renderModalAddProduct = () => {
    return (
      <>
        <button onClick={handleOpenModal} className='block font-bold text-xl mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="button">Add Product</button>
        {showModal && (
          <div id="myModal" className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center" onClick={handleCloseModal}>
            <div className="modal-content bg-white rounded-lg shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleAddProduct} >
                <h3 className='font-bold text-2xl text-center mb-2 uppercase'>Create Product</h3>
                <div>
                  <p className='font-bold'>Name</p>
                  <input type="text" name="name" className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                  <p className='font-bold'>Price</p>
                  <input type="text" name="price" className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                  <p className='font-bold'>Description</p>
                  <input type="text" name="description" className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                  <p className='font-bold'>CategoryId</p>
                  <input type="text" name="categoryId" className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                  <p className='font-bold'>Img</p>
                  <input onChange={(e) => handleAddfile(e.target.files)} type="file" className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex justify-center items-center">
                  <button type="submit" className='font-bold rounded-md p-3 mt-3 text-gray-50 bg-blue-700 hover:bg-blue-800'>Add Product</button>
                </div>
              </form>
            </div>
          </div>

        )}
      </>
    )

  }
  const handleUpdateProduct = async (event: any, id: number) => {
    event.preventDefault();
    try {
      const formDataUpdate = new FormData(event.currentTarget);
      const response = await api.put(`/product/updateProduct/${id}`, formDataUpdate)
      console.log(response)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenModalUpdate = (product: Product) => {
    setShowModalUpdate(true);
    setFormData({
      name: product.name,
      price: String(product.price),
      categoryId: String(product.categoryId)
    });
    setSelectedProduct(product);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const renderModalUpdateUser = () => {
    const handleCloseModal = () => {
      setShowModalUpdate(false);
    };
    return (
      <>

        {
          showModalUpdate && (
            <div id="myModal" className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center" onClick={handleCloseModal}>
              <div className="modal-content bg-white rounded-lg shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={(event) => handleUpdateProduct(event, selectedProduct?.id ?? 0)} encType="multipart/form-data">
                  <h3 className='font-bold text-2xl text-center mb-2 uppercase'>Update User</h3>

                  <div>
                    <p className='font-bold'>Name</p>
                    <input type="text" name="name" value={formDataUpdate.name} onChange={handleChange} className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                    <p className='font-bold'>Price</p>
                    <input type="text" name="price" value={formDataUpdate.price} onChange={handleChange} className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                    <p className='font-bold'>CategoryId</p>
                    <input type="text" name="categoryId" value={formDataUpdate.categoryId} onChange={handleChange} className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />

                  </div>
                  <div className="flex justify-center items-center">
                    <button type="submit" className='font-bold rounded-md p-3 mt-3 text-gray-50 bg-blue-700 hover:bg-blue-800'>Update Product</button>
                  </div>
                </form>
              </div>
            </div>

          )
        }
      </>
    )
  }
  const renderTitleProducts = () => {
    return (
      <div className="font-bold text-2xl">
        <div className='flex bg-mainColor-main p-5 rounded-lg'>
          <p className='flex-1 text-center'>Image</p>
          <p className='flex-1 text-center'>Name</p>
          <p className='flex-1 text-center'>Price</p>
          <p className='flex-1 text-center'>categoryId</p>
          <p className='flex-1 text-center'>Actions</p>
        </div>
        {products?.map(product => (
          <div className='flex p-6  hover:bg-stone-300 hover:rounded-lg'>
            <div className="flex-1 text-center">
              <img
                src={product?.imgUrl}
                alt={product?.name}
                className="top-0 left-0 w-full h-full"
              />
            </div>
            <p className='flex-1 text-center my-auto'>{product?.name}</p>
            <p className='flex-1 text-center my-auto'>{formatPrice(product?.price)}</p>
            <p className='flex-1 text-center my-auto'>{product?.categoryId}</p>
            <div className='flex-1 text-center my-auto'>
              <button className='flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 font-bold text-xl dark:focus:ring-blue-800 mr-3'
                onClick={() => handleOpenModalUpdate(product)}>Edit</button>
              <button className=' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 font-bold text-xl dark:focus:ring-blue-800'
                onClick={() => handleDelete(product?.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div>
      <div className='mx-32 mt-[150px]'>
        {renderModalAddProduct()}
        {renderModalUpdateUser()}
        {renderTitleProducts()}
      </div>
    </div>
  )
}
