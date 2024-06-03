import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { updateProfile, signOut } from 'firebase/auth';
import { Typography } from '@material-tailwind/react';

const Home = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [userDisplayName, setUserDisplayName] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');

  const addRestaurant = async () => {
    if (name.trim() && description.trim() && city.trim()) {
      await addDoc(collection(db, `${auth.currentUser.email}`), {
        name,
        description,
        city,
      });
      setName('');
      setDescription('');
      setCity('');
      fetchRestaurants();
    }
  };

  const fetchRestaurants = async () => {
    const querySnapshot = await getDocs(collection(db, `${auth.currentUser.email}`));
    const restaurantsData = querySnapshot.docs.map((doc) => doc.data());
    setRestaurants(restaurantsData);
  };

  const changeDisplayName = async () => {
    await updateProfile(auth.currentUser, {
      displayName: newDisplayName,
    });
    setUserDisplayName(newDisplayName);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    fetchRestaurants();
    setUserDisplayName(auth.currentUser?.displayName || '');
  }, []);

  const handleEditDisplayName = () => {
    const newDisplayName = prompt('Enter your new display name:');
    if (newDisplayName !== null) {
      setNewDisplayName(newDisplayName);
      changeDisplayName();
    }
  };

  const isAddDisabled = !name.trim() || !description.trim() || !city.trim();

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 text-2xl font-bold">Yelp</div>
          <nav>
            <button
              onClick={handleEditDisplayName}
              className="w-full px-6 py-2 text-left text-indigo-400 hover:bg-gray-700"
            >
              Edit Username
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-6 py-2 text-left text-red-400 hover:bg-gray-700"
            >
              Logout
            </button>
          </nav>
        </div>
        <div className="p-6 text-lg">
          <Typography className="text-gray-300">Hello, {userDisplayName} 👋</Typography>
        </div>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={addRestaurant}
              disabled={isAddDisabled}
              className={`w-full py-2 px-4 rounded-md text-white ${isAddDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              Add Restaurant
            </button>
          </div>

          <div className="h-96 overflow-y-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/3 px-4 py-2">Name</th>
                  <th className="w-1/3 px-4 py-2">Description</th>
                  <th className="w-1/3 px-4 py-2">City</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {restaurants.map((restaurant, index) => (
                  <tr key={index} className="bg-gray-100 border-b border-gray-200">
                    <td className="px-4 py-2">{restaurant.name}</td>
                    <td className="px-4 py-2">{restaurant.description}</td>
                    <td className="px-4 py-2">{restaurant.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
