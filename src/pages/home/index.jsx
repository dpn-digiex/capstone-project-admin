import { Bar, Pie } from 'react-chartjs-2'

import 'chart.js/auto'

const HomePage = () => {
  const dataBar = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Người dùng',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: [65, 59, 80, 81, 56, 55, 40, 85, 75]
      }
    ]
  }

  const productData = {
    iPhone: 300,
    Macbook: 150,
    iPad: 100,
    Loa: 50,
    Watch: 75,
    ['Phụ kiện']: 25
  }

  // Tính tổng số lượng
  const total = Object.values(productData).reduce((acc, value) => acc + value, 0)

  // Tính tỷ lệ phần trăm
  const dataPie = {
    labels: Object.keys(productData),
    datasets: [
      {
        data: Object.values(productData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF']
      }
    ]
  }

  const optionsPie = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw
            const percentage = ((value / total) * 100).toFixed(1) + '%'
            return `${tooltipItem.label}: ${percentage}`
          }
        }
      }
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Chào mừng bạn trở lại 👋</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        <div className='p-4 bg-lime-100 rounded-lg'>
          <div className='flex items-center justify-between'>
            <span className='text-green-800'>Doanh số mỗi tuần</span>
            <span className='text-green-800'>+2.6%</span>
          </div>
          <div className='mt-4 text-2xl font-bold text-green-800'>714.000 VND</div>
        </div>
        <div className='p-4 bg-purple-100 rounded-lg'>
          <div className='flex items-center justify-between'>
            <span className='text-purple-800'>Khách hàng mới</span>
            <span className='text-purple-800'>-0.1%</span>
          </div>
          <div className='mt-4 text-2xl font-bold text-purple-800'>58</div>
        </div>
        <div className='p-4 bg-yellow-100 rounded-lg'>
          <div className='flex items-center justify-between'>
            <span className='text-yellow-800'>Đơn đặt hàng</span>
            <span className='text-yellow-800'>+2.8%</span>
          </div>
          <div className='mt-4 text-2xl font-bold text-yellow-800'>18</div>
        </div>
        <div className='p-4 bg-red-100 rounded-lg'>
          <div className='flex items-center justify-between'>
            <span className='text-red-800'>Tin nhắn</span>
            <span className='text-red-800'>+3.6%</span>
          </div>
          <div className='mt-4 text-2xl font-bold text-red-800'>234</div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='text-lg font-semibold mb-2'>Sản phẩm của bạn</h2>
          <Pie data={dataPie} options={optionsPie} />
        </div>
        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='text-lg font-semibold mb-2'>Lượt ghé thăm Website</h2>
          <Bar data={dataBar} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
