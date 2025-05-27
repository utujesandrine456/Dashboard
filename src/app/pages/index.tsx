'use client';
import { useState, useEffect } from 'react';
import {
  HomeIcon,
  ShoppingBagIcon,
  TagIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';
import './index.css';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Homepage() {
  const [users, setusers] = useState<User[]>([]);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [loading, setloading] = useState(false);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
        return res.json();
      })
      .then((data) => setusers(data))
      .catch((error) => {
        console.error('Fetch error:', error);
        alert('Failed to load users');
      });
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      const newUser = await res.json();
      setusers((prev) => [...prev, newUser]);
      setname('');
      setemail('');
    } else {
      alert('Error adding user');
    }

    setloading(false);
  };

  return (
    <div className=" font-poppins flex min-h-screen">
     
      <aside className="w-[300px] bg-orange-800 text-white flex flex-col px-8 py-6 shadow-lg">
        <h1 className="text-[27px] font-bold mb-8 text-center">User Dashboard</h1>
        <nav className="flex flex-col gap-4 text-normal">
          {[
            ['Dashboard', HomeIcon],
            ['Products', ShoppingBagIcon],
            ['Categories', TagIcon],
            ['Customers', UserGroupIcon],
            ['Analytics', ChartBarIcon],
            ['Settings', Cog6ToothIcon],
          ].map(([label, Icon]) => (
            <a key={label}
              href="#"
              className="flex items-center gap-3 hover:bg-orange-600 px-4 py-2 rounded-lg transition"
            >
              <Icon className="w-5 h-5" />
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-white px-10 py-8 overflow-y-auto">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search"
            className="bg-orange-100 placeholder-white text-white px-4 py-2 rounded-lg w-48 focus:outline-none"
          />
          <p className="text-gray-800 text-lg">Sine Shami Michelle</p>
        </div>

        {/* Dashboard Overview */}
        <section className="mb-10">
          <h2 className="text-2xl  text-black font-semibold mb-2">Dashboard Overview</h2>
          <p className="text-gray-600 mb-6">
            Welcome back, Sine Shami Michelle! Here's what's happening with your store today.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ['Total Revenue', '$12,500', '+12.5% from last week'],
              ['Total Orders', '$12,500', '+8.2% from last week'],
              ['New Customers', '$12,500', '+2.1% from last week'],
              ['Conversion Rate', '3.42%', '+1.8% from last week'],
            ].map(([title, value, change]) => (
              <div key={title} className="bg-orange-100 p-6 rounded-xl shadow text-center">
                <p className="text-sm text-white font-medium">{title}</p>
                <p className="text-xl text-black font-bold mt- 2">{value}</p>
                <p className="text-green-700 text-sm mt-1">{change}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Orders */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-black font-semibold">Recent Orders</h2>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition">
              View All Orders
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ['#45678', 'Denim Jacket', '$89.99'],
              ['#45679', 'Silk Blouse', '$129.99'],
              ['#45780', 'Leather Boots', '$169.99'],
              ['#45681', 'Wool Scarf', '$49.99'],
            ].map(([orderId, product, price]) => (
              <div key={orderId} className="bg-orange-100 p-4 rounded-xl shadow text-center">
                <img src="/images/order1.png" alt={product} className="w-20 h-20 mx-auto mb-2" />
                <p className="text-sm text-black font-semibold">{orderId}</p>
                <p className="text-sm text-black">{product}</p>
                <p className="text-sm text-black font-bold">{price}</p>
                <p className="text-xs text-gray-500 mt-1">2025-05-26</p>
              </div>
            ))}
          </div>
        </section>

        {/* Add User Form */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Add New User</h2>
          <form onSubmit={handleAddUser} className="bg-orange-50 p-6 rounded-xl shadow-md max-w-md space-y-4">
            <input
              className="w-full px-4 py-2 rounded-lg border text-black border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
              disabled={loading}
            />
            <input
              className="w-full px-4 py-2 rounded-lg border text-black border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add User'}
            </button>
          </form>

          {/* User List */}
          {users.length > 0 && (
            <ul className="mt-6 space-y-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="border border-orange-200 p-4 rounded-lg bg-white shadow-sm"
                >
                  <p className="font-semibold text-black">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
