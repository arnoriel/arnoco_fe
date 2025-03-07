import { useState } from 'react'; // Tambah useState untuk mengelola modal
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State untuk modal logout

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
    setIsLogoutModalOpen(false); // Tutup modal setelah logout
  };

  return (
    <>
      <header className="dashboard-header">
        <h1><b>ARNOCO</b></h1>
        <button className="logout-button" onClick={openLogoutModal}>
          Logout
        </button>
      </header>

      {/* Modal untuk Logout Confirmation */}
      {isLogoutModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content logout-modal">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button onClick={handleLogout} className="logout-confirm-button">
                Yes, Logout
              </button>
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .dashboard-header {
          background: white;
          padding: 1rem 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
        }

        .dashboard-header h1 {
          color: #333;
          margin: 0;
          font-size: 1.5rem;
        }

        .logout-button {
          padding: 0.5rem 1rem;
          background: black;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .logout-button:hover {
          background: grey;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000; /* Pastikan modal di atas header */
        }

        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          width: 90%;
          max-width: 400px; /* Modal logout lebih kecil */
          text-align: center;
          position: relative;
        }

        .modal-content h2 {
          color: #333;
          margin-bottom: 1.5rem;
        }

        .logout-modal p {
          color: #666;
          margin-bottom: 1.5rem;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .logout-confirm-button,
        .cancel-button {
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .logout-confirm-button {
          background: black; /* Warna merah untuk logout */
          color: white;
        }

        .logout-confirm-button:hover {
          background: gray;
        }

        .cancel-button {
          background: #f5f5f5;
          color: #333;
          border: 1px solid #ddd;
        }

        .cancel-button:hover {
          background: #e5e5e5;
        }
      `}</style>
    </>
  );
}