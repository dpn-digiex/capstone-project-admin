import { useState } from 'react'
import { createPortal } from 'react-dom'
import { MdAdd, MdClose } from 'react-icons/md'
import SelectBase from '@components/select'
import { formatCurrency } from '@utils/index'
import clsx from 'clsx'

const INIT_OPTION = {
  id: Date.now(),
  price: '',
  inventory: '',
  color: '',
  hex: '',
  discount: '',
  soldCount: 0,
  status: 'new',
  tag: [],
  images: [],
  mainImageUrl: ''
}

const VariantModal = ({ showModal = false, setShowModal = () => {}, onSetVariants = () => {} }) => {
  const [option, setOption] = useState(INIT_OPTION)
  const [variant, setVariant] = useState({ options: [] })

  const handleAddOption = () => {
    setVariant((prev) => ({ ...prev, options: prev.options.concat(option) }))
    setOption({ ...INIT_OPTION, id: Date.now() })
  }
  const handleRemoveOption = (optionId) => {
    setVariant((prev) => ({ ...prev, options: prev.options.filter((opt) => opt.id !== optionId) }))
  }

  return showModal
    ? createPortal(
        <div className={clsx('fixed inset-0 bg-black/75 backdrop-blur-sm', 'flex items-center justify-center')}>
          <div className='flex flex-col gap-4 bg-white px-6 py-4 rounded-xl w-2/3 max-h-[75vh] overflow-auto'>
            <div className='flex items-center justify-between'>
              <h1 className='text-lg font-bold'>Thêm mẫu mới</h1>
              <button
                type='button'
                className='p-1 rounded-full cursor-pointer hover:bg-slate-100'
                onClick={() => setShowModal(false)}
              >
                <MdClose size={24} />
              </button>
            </div>
            <div className='flex-1 grid gap-6 mb-6 md:grid-cols-2'>
              <div className=''>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Tên mẫu</label>
                <input
                  type='text'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Tên mẫu'
                  required
                />
              </div>
              <div className=''>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Kích thước</label>
                <input
                  type='text'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Kích thước'
                  required
                />
              </div>
              <div className=''>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Bộ xử lý</label>
                <input
                  type='text'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Bộ xử lý'
                  required
                />
              </div>
              <div className=''>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Dung lượng</label>
                <input
                  type='text'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Dung lượng'
                  required
                />
              </div>
              <div className='col-span-2'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Phiên bản</label>
                <div className='flex items-center gap-4 px-4'>
                  <div className='grid grid-cols-4 gap-4 flex-1'>
                    <div className=''>
                      <span className='block mb-2 text-sm font-medium text-gray-900/50 dark:text-white'>Giá</span>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Giá'
                        required
                        value={option.price}
                        onChange={(e) => setOption((prev) => ({ ...prev, price: +e.target.value }))}
                      />
                    </div>
                    <div className=''>
                      <span className='block mb-2 text-sm font-medium text-gray-900/50 dark:text-white'>Tồn kho</span>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Tồn kho'
                        required
                        value={option.inventory}
                        onChange={(e) => setOption((prev) => ({ ...prev, inventory: +e.target.value }))}
                      />
                    </div>
                    <div className=''>
                      <span className='block mb-2 text-sm font-medium text-gray-900/50 dark:text-white'>Màu</span>
                      <SelectBase
                        placeholder='Chọn màu...'
                        className='text-sm'
                        valueKey='hex'
                        renderKey='color'
                        options={[
                          {
                            color: 'Trắng',
                            hex: '#E2DDD7'
                          },
                          {
                            color: 'Đen Xanh',
                            hex: '#3F4045'
                          },
                          {
                            color: 'Xanh',
                            hex: '#677081'
                          },
                          {
                            color: 'Xanh đen đậm',
                            hex: '#1D2229'
                          },
                          {
                            color: 'Xanh dương nhạt',
                            hex: '#A0B5D6'
                          },
                          {
                            color: 'Hồng',
                            hex: '#FFE3E3'
                          },
                          {
                            color: 'Xanh đen',
                            hex: '#363A45'
                          },
                          {
                            color: 'Đỏ',
                            hex: '#F8203E'
                          },
                          {
                            color: 'Vàng',
                            hex: '#F4E8CF'
                          },
                          {
                            color: 'Đen',
                            hex: '#000000'
                          },
                          {
                            color: 'Nâu',
                            hex: '#584853'
                          },
                          {
                            color: 'Xanh dương',
                            hex: '#3D4555'
                          },
                          {
                            color: 'Xanh Oliu',
                            hex: '#808000'
                          },
                          {
                            color: 'Cam',
                            hex: '#FFA500'
                          },
                          {
                            color: 'Xám',
                            hex: '#57565F'
                          }
                        ]}
                        onSelect={(selected) => {
                          setOption((prev) => ({ ...prev, color: selected.color, hex: selected.hex }))
                        }}
                      />
                    </div>
                    <div className=''>
                      <span className='block mb-2 text-sm font-medium text-gray-900/50 dark:text-white'>
                        Khuyến mãi
                      </span>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Khuyến mãi'
                        required
                        value={option.discount}
                        onChange={(e) => setOption((prev) => ({ ...prev, discount: +e.target.value }))}
                      />
                    </div>
                  </div>
                  <button
                    type='button'
                    className='mt-7 bg-slate-700 border border-slate-400 text-white outline-none p-2 rounded active:scale-95 flex items-center'
                    onClick={handleAddOption}
                  >
                    <MdAdd />
                  </button>
                </div>
                <div className='flex flex-col gap-2 mt-4'>
                  {variant.options?.map((option) => (
                    <div key={option.id} className='w-full p-2 rounded bg-gray-50 text-sm flex items-center gap-4'>
                      <div
                        className='w-10 h-10 rounded-full'
                        style={{
                          backgroundColor: option.hex
                        }}
                      />
                      <div className='flex flex-col gap-1 flex-1'>
                        <div className='flex items-center gap-1'>
                          <span className='text-sm font-medium text-gray-900 dark:text-white'>Màu:</span>
                          <span className='text-sm  text-gray-900/75 dark:text-white'>{option.color}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <span className='text-sm font-medium text-gray-900 dark:text-white'>Giá:</span>
                          <span className='text-sm  text-gray-900/75 dark:text-white'>
                            {formatCurrency(option.price)}
                          </span>
                        </div>
                      </div>
                      <button type='button' onClick={() => handleRemoveOption(option.id)}>
                        <MdClose stroke='red' fill='red' size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center gap-4'>
              <button
                type='button'
                className='bg-gray-100 border border-gray-200 outline-none px-6 py-1 rounded active:scale-95'
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
              <button
                type='button'
                className='bg-slate-600 border border-slate-400 text-white outline-none px-6 py-1 rounded active:scale-95'
                onClick={() => {
                  onSetVariants((prev) => prev.concat(variant))
                  setShowModal(false)
                }}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null
}

export default VariantModal
