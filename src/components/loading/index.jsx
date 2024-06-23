import ReactDOM from 'react-dom'

const Loading = () => {
  return ReactDOM.createPortal(
    <div className='fixed inset-0 bg-black/75 backdrop-blur-sm z-[9999]'>
      <div className='absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 '>
        <div className='border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-20 w-20'></div>
      </div>
    </div>,
    document.body
  )
}

export default Loading
