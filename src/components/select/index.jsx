import { useEffect, useRef, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { MdOutlineExpandMore } from 'react-icons/md'
import { getType } from '@utils/index'
import clsx from 'clsx'

const SelectBase = ({
  options = [],
  renderKey = 'label',
  valueKey = 'value',
  placeholder = 'Choose',
  emptyPlaceholder = 'No available option',
  inputPlaceholder = '',
  className = '',
  labelClassName = '',
  dropdownClassName = '',
  prefix = null,
  suffix = null,
  disabled = false,
  defaultValue = null,
  onSelect = () => {},
  customRender = null,
  filter = false,
  name
}) => {
  // States
  const selectRef = useRef()
  const originRenderData = useRef(options)
  const [renderData, setRenderData] = useState(options)
  const [selectedOption, setSelectedOption] = useState(() => {
    if (defaultValue === null || defaultValue === undefined) return { [valueKey]: null, [renderKey]: placeholder }
    const defaultOption = options.find((option) => option[valueKey] === defaultValue)
    return defaultOption ?? { [valueKey]: null, [renderKey]: placeholder }
  })
  const [expand, setExpand] = useState(false)

  //   Handlers
  const handleToggleSelect = () => {
    if (disabled) return
    if (expand === true) return setExpand(false)
    setExpand(true)
    setRenderData(originRenderData.current)
  }
  const handleSelect = (option) => {
    if (disabled) return
    if (option[valueKey] === selectedOption[valueKey]) return
    onSelect?.(option)
    setSelectedOption(option)
    setExpand(false)
  }
  const handleFilter = (value) => {
    const lowerCaseValue = value.toLowerCase()
    if (value === '') return setRenderData(originRenderData.current)
    const newRenderData = originRenderData.current.filter((option) =>
      option[renderKey].toString().toLowerCase().includes(lowerCaseValue)
    )
    setRenderData(newRenderData)
  }

  //   Side Effects
  useEffect(() => {
    // Close dropdown select after clicked outside
    const handleBlur = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setExpand(false)
      }
    }
    document.addEventListener('click', handleBlur)

    return () => document.removeEventListener('click', handleBlur)
  }, [])

  //   Renders
  return (
    <div
      className={clsx(className, 'relative bg-gray-50 rounded-md', {
        'opacity-50 cursor-default': disabled === true,
        'cursor-pointer': disabled === false
      })}
      ref={selectRef}
    >
      <div
        className={clsx(
          labelClassName,
          'flex items-center justify-between p-2.5 shadow-md bg-inherit rounded-md h-full border border-gray-300'
        )}
        onClick={handleToggleSelect}
      >
        {prefix ? <div className=''>{prefix}</div> : null}
        <span className='flex-1 pr-2'>{selectedOption[renderKey]}</span>
        {suffix ? (
          <div className=''>{suffix}</div>
        ) : (
          <MdOutlineExpandMore
            className={clsx('transition-transform duration-100 ease-linear w-4 h-4', {
              '-rotate-180': expand
            })}
          />
        )}
      </div>
      <ul
        className={clsx(
          'absolute top-[calc(100%+0.25rem)] left-0 transition-[transform,opacity,visibility] duration-150 ease-linear origin-top',
          'max-h-40 min-w-48 list-none overflow-auto bg-inherit p-2 rounded-md z-50 shadow-md select-dropdown w-full',
          {
            'scale-y-0 opacity-0 invisible': !expand,
            'visible scale-y-100 opacity-100': expand
          },
          dropdownClassName
        )}
      >
        {filter === true ? (
          <div className='py-1 px-2 flex items-center bg-white text-black rounded-md shadow-md mb-2'>
            <input
              type='text'
              className='bg-transparent outline-none border-none flex-1 text-xs placeholder:text-[0.675rem]'
              placeholder={inputPlaceholder}
              onChange={(e) => handleFilter(e.target.value)}
            />
            <HiMagnifyingGlass className='w-4 h-4 fill-black' />
          </div>
        ) : null}
        {renderData.length > 0 ? (
          renderData.map((option, index) => (
            <li
              key={option[valueKey]}
              className={clsx('rounded px-2 py-2 hover:bg-gray-300 peer-[]:mt-1', {
                'bg-gray-300': selectedOption[valueKey] === option[valueKey],
                peer: index === 0
              })}
              onClick={() => handleSelect(option)}
            >
              {getType(customRender).includes('function') ? customRender(option) : option[renderKey]}
            </li>
          ))
        ) : (
          <div className='flex items-center justify-center p-1 w-full'>
            <p className='text-black/50'>{emptyPlaceholder}</p>
          </div>
        )}
      </ul>
      {name ? (
        <input type='hidden' name={name} value={selectedOption[valueKey] ? selectedOption[valueKey] : ''} />
      ) : null}
    </div>
  )
}

export default SelectBase
