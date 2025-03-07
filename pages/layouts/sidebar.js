import { useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();
  const currentPath = router.pathname;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Manage Products', path: '/product' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="dashboard-sidebar">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => router.push(item.path)}
                className={currentPath === item.path ? 'active' : ''}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <style jsx>{`
        .dashboard-sidebar {
          width: 250px;
          background: white;
          padding: 2rem 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          height: calc(100vh - 60px); /* Adjust based on header height */
          position: fixed;
          top: 60px; /* Header height */
          left: 0;
        }

        .dashboard-sidebar nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .dashboard-sidebar nav ul li {
          margin-bottom: 1rem;
        }

        .dashboard-sidebar nav ul li button {
          width: 100%;
          padding: 0.75rem;
          background: none;
          border: 1px solid #ddd;
          border-radius: 5px;
          color: #333;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .dashboard-sidebar nav ul li button:hover {
          background: #ddd;
          border-color: black;
        }

        .dashboard-sidebar nav ul li button.active {
          background: black;
          color: white;
          border-color: black;
        }

        .dashboard-sidebar nav ul li button.active:hover {
          background: grey;
        }
      `}</style>
    </aside>
  );
}