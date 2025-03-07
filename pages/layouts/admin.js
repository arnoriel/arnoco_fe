import Header from './header';
import Sidebar from './sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <Header />
      <div className="admin-layout">
        <Sidebar />
        <main className="admin-content">{children}</main>
      </div>

      <style jsx>{`
        .admin-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          display: flex;
          flex-direction: column;
        }

        .admin-layout {
          display: flex;
          flex: 1;
          padding-top: 60px; /* Sesuaikan dengan tinggi header */
        }

        .admin-content {
          flex: 1;
          margin-left: 250px; /* Sesuaikan dengan lebar sidebar */
          padding: 2rem;
          overflow-y: auto; /* Memastikan konten bisa scroll jika terlalu panjang */
        }

        @media (max-width: 768px) {
          .admin-layout {
            flex-direction: column;
          }
          .admin-content {
            margin-left: 0;
            width: 100%;
          }
          .admin-sidebar {
            width: 100%;
            position: relative;
            height: auto;
          }
        }
      `}</style>
    </div>
  );
}