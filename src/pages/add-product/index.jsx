import { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'
import Loading from '@components/loading'
import SelectBase from '@components/select'
import useFetch from '@hooks/useFetch'
import { getCategoryListService } from '@services/category-service'

import VariantModal from './variant'

import styles from './index.module.scss'

const AddProductPage = () => {
  const { isLoading, response } = useFetch({
    queryFunction: getCategoryListService
  })
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState({ id: null })

  const [showModal, setShowModal] = useState(false)
  const [variants, setVariants] = useState([])
  const [selectedVariant, setSelectedVariant] = useState({ options: [] })
  
  const handleRemoveVariant = (variantId) => {
    setVariants((prev) => prev.filter((variant) => variant.id !== variantId))
    setSelectedVariant({ options: [] })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(variants)
  }

  if (isLoading) return <Loading />
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h3 className={styles.title}>Thêm sản phẩm</h3>
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
          <SelectBase
            name='category'
            className='text-sm'
            options={response}
            renderKey='name'
            valueKey='_id'
            onSelect={(option) => setCategory(option)}
            placeholder='Chọn phân loại...'
          />
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
          <div className='grid grid-cols-6 gap-2 mt-2'>
            {variants.map((variant) => (
              <div
                key={variant.id}
                className='px-4 py-2 bg-white shadow-md rounded-md relative'
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
                    handleRemoveVariant(variant.id)
                  }}
                >
                  <MdClose size={16} fill='red' stroke='red' />
                </button>
                <p className='text-sm font-medium'>Mẫu: {variant.name}</p>
                <div className='mt-2 border-t border-gray-100'>
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
            Descriptions
          </label>
          <textarea
            id='description'
            name='description'
            rows={4}
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Viết mô tả về sản phẩm...'
          ></textarea>
        </div>
        <div className='col-span-2 flex items-center justify-center'>
          <button type='submit' className='border-gray-50 outline-none bg-slate-800 text-white px-12 py-2 rounded'>
            Thêm
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

export default AddProductPage
