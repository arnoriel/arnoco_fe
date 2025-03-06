import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  // Cek apakah token ada saat halaman dimuat
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token dari localStorage
    router.push('/login'); // Arahkan kembali ke halaman login
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}