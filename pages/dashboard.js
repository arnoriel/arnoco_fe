import { useEffect, useState } from 'react';
import AdminLayout from './layouts/admin';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Dashboard() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }

    // Fungsi untuk menentukan salam berdasarkan waktu
    const updateGreeting = () => {
      const hour = new Date().getHours();
      let newGreeting = '';

      if (hour >= 5 && hour < 11) {
        newGreeting = 'Selamat Pagi';
      } else if (hour >= 11 && hour < 15) {
        newGreeting = 'Selamat Siang';
      } else if (hour >= 15 && hour < 18) {
        newGreeting = 'Selamat Sore';
      } else {
        newGreeting = 'Selamat Malam';
      }

      setGreeting(newGreeting);
    };

    // Panggil sekali saat komponen dimuat
    updateGreeting();

    // Optional: Update setiap menit
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  // Data statis untuk Bar Chart (Penjualan per bulan)
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Penjualan (Rp Juta)',
        data: [12, 19, 3, 5, 2, 15],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Penjualan Bulanan',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Penjualan (Rp Juta)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Bulan',
        },
      },
    },
  };

  // Data statis untuk Pie Chart (Distribusi Kategori Produk)
  const pieChartData = {
    labels: ['Elektronik', 'Fashion', 'Makanan', 'Lainnya'],
    datasets: [
      {
        label: 'Distribusi Kategori',
        data: [30, 25, 20, 25],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribusi Kategori Produk',
      },
    },
  };

  return (
    <AdminLayout>
      <div className="dashboard-content-wrapper">
        <h1><b>Halo, {greeting}. Admin Arnoco!</b></h1>
        <p>
          This is your CMS dashboard. Use the sidebar to navigate through different sections.
        </p>

        {/* Chart Section */}
        <section className="chart-section">
          <div className="chart-container">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
          <div className="chart-container">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </section>
      </div>

      <style jsx>{`
        .dashboard-content-wrapper {
          width: 100%;
        }

        .dashboard-content-wrapper h2 {
          color: #333;
          margin-bottom: 1rem;
        }

        .dashboard-content-wrapper p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .chart-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }

        .chart-container {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .chart-section {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AdminLayout>
  );
}