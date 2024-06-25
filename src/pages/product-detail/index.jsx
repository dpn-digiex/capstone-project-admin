import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdAdd, MdClose } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '@components/loading'
import SelectBase from '@components/select'
import Skeleton from '@components/skeleton'
import useFetch from '@hooks/useFetch'
import { getCategoryListService } from '@services/category-service'
import { getProductByIdService, updateProduct, uploadImage } from '@services/product-service'
import { getType } from '@utils/index'

import VariantModal from './variant'

import styles from './index.module.scss'

const ProductDetailPage = () => {
  const { isLoading: categoryLoad, response: categories } = useFetch({
    queryFunction: getCategoryListService
  })

  const navigate = useNavigate()
  const params = useParams()
  const { isLoading, response: product } = useFetch({
    queryFunction: () => getProductByIdService(params.productId)
  })
  const [productName, setProductName] = useState('')
  const [productImage, setProductImage] = useState('')
  const [category, setCategory] = useState({ id: null })

  const [showModal, setShowModal] = useState(false)
  const [variants, setVariants] = useState([])
  const [selectedVariant, setSelectedVariant] = useState({ options: [], specifications: [] })

  const handleRemoveVariant = (variantId) => {
    setVariants((prev) => prev.filter((variant) => variant._id !== variantId))
    setSelectedVariant({ options: [], specifications: [] })
  }
  const handleUploadImage = async (e) => {
    try {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      const response = await uploadImage(formData, productName, category._id)
      setProductImage(response.url ?? '')
    } catch (error) {
      console.log(error)
      toast.error('Không thể tải ảnh lên')
    }
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.target)
      const payload = {
        ...Object.fromEntries(formData),
        brand: 'Apple',
        slug: Date.now(),
        mainImageUrl: productImage,
        images: [productImage],
        variants: variants.map((v) => {
          delete v._id
          return {
            ...v,
            options: v.options?.map((o) => {
              delete o._id
              return o
            })
          }
        })
      }
      const result = await updateProduct(params.productId, payload)
      if (!result) throw new Error('')
      toast.success('Thêm thành công')
      navigate('/products')
    } catch (error) {
      console.log(error)
      toast.error('Đã xảy ra lỗi, vui lòng thử lại.')
    }
  }

  useEffect(() => {
    if (getType(product) === 'object') {
      setProductName(product.name)
      setVariants(product.variants)
      setProductImage(product.mainImageUrl)
      if (getType(categories) === 'array') {
        setCategory(categories.find((c) => c._id === product.category))
      }
    }
  }, [product, categories])

  if (isLoading) return <Loading />
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h3 className={styles.title}>Chi tiết sản phẩm</h3>
      </div>
      <form className='grid gap-6 mb-6 md:grid-cols-2' onSubmit={handleSubmit}>
        <div className='col-span-2'>
          <label htmlFor='productName' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Tên sản phẩm
          </label>
          <input
            type='text'
            id='productName'
            name='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Tên sản phẩm'
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Phân loại</label>
          {categoryLoad ? (
            <Skeleton />
          ) : (
            <SelectBase
              name='category'
              className='text-sm'
              options={categories}
              renderKey='name'
              valueKey='_id'
              onSelect={(option) => setCategory(option)}
              placeholder='Chọn phân loại...'
              defaultValue={product.category}
            />
          )}
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Dòng sản phẩm</label>
          <SelectBase
            key={category.subCategories}
            name='subCategory'
            disabled={category.id === null}
            className='text-sm'
            options={category.subCategories}
            renderKey='name'
            valueKey='_id'
            placeholder='Chọn dòng sản phẩm...'
            defaultValue={product.subCategory}
          />
        </div>
        <div className='col-span-2'>
          <label htmlFor='productImage' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Hình ảnh
          </label>
          <input
            type='file'
            id='productImage'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            // required
            onChange={handleUploadImage}
          />
        </div>
        <div>
          <input type='hidden' id='productModel' name='model' placeholder='Model' value={productName} />
        </div>
        <div className='mb-6 col-span-2'>
          <div className='flex items-center gap-4'>
            <label className='block text-sm font-medium text-gray-900 dark:text-white'>Các mẫu sản phẩm</label>
            <button
              type='button'
              className='border-gray-50 outline-none bg-slate-600 text-white p-2 rounded'
              onClick={() => setShowModal(true)}
            >
              <MdAdd size={18} />
            </button>
          </div>
          <div className='grid grid-cols-4 gap-2 mt-2'>
            {variants.map((variant) => (
              <div
                key={variant._id}
                className='px-4 py-2 bg-white shadow-md rounded-md relative cursor-pointer'
                onClick={() => {
                  setSelectedVariant(variant)
                  setShowModal(true)
                }}
              >
                <button
                  type='button'
                  className='absolute top-2 right-2 hover:bg-gray-50 rounded-full'
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveVariant(variant._id)
                  }}
                >
                  <MdClose size={16} fill='red' stroke='red' />
                </button>
                <p className='text-sm font-medium'>Mẫu: {variant.name}</p>
                <div className='mt-2 pt-2 border-t border-gray-100 text-sm flex flex-col gap-1'>
                  {variant.specifications?.map?.((specification) => (
                    <span key={specification.type} className='capitalize'>
                      {specification.type}: {specification.value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='mb-6 col-span-2'>
          <label htmlFor='description' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Mô tả sản phẩm
          </label>
          <textarea
            id='description'
            name='description'
            rows={4}
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Viết mô tả về sản phẩm...'
            defaultValue={product.descriptions}
          ></textarea>
        </div>
        <div className='col-span-2 flex items-center justify-center'>
          <button type='submit' className='border-gray-50 outline-none bg-slate-800 text-white px-12 py-2 rounded'>
            Lưu
          </button>
        </div>
      </form>
      {showModal ? (
        <VariantModal
          showModal={showModal}
          setShowModal={setShowModal}
          item={selectedVariant}
          onSetVariants={setVariants}
        />
      ) : null}
    </div>
  )
}

export default ProductDetailPage
