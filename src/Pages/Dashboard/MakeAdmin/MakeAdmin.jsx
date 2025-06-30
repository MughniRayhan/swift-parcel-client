import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { FaSearch, FaUserShield, FaUserTimes } from 'react-icons/fa';
import Loader from '../../../Components/Loader/Loader';

function MakeAdmin() {
  const axiosSecure = UseAxiosSecure();
  const [searchEmail, setSearchEmail] = useState('');

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['userSearch', searchEmail],
    enabled: !!searchEmail, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${searchEmail}`);
      return res.data;
    },
  });

  const handleMakeAdmin = async (id) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${id}`);
      if (res.data.modifiedCount) {
        Swal.fire('Success!', 'User is now an admin.', 'success');
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveAdmin = async (id) => {
    try {
      const res = await axiosSecure.patch(`/users/remove-admin/${id}`);
      if (res.data.modifiedCount) {
        Swal.fire('Removed!', 'Admin role has been removed.', 'success');
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className=" px-12 py-10 bg-white rounded-2xl shadow-md min-h-screen">
      <h2 className="text-3xl font-extrabold text-secondary mb-2">Make Admin</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4 mt-8">
        <input
          type="text"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          placeholder="Search users by email"
          className="input input-bordered "
        />
        <button type="submit" className="btn btn-primary text-black">
          <FaSearch className='text-gray-700'/> Search
        </button>
      </form>

      {isLoading && <Loader/>}

      {users.length > 0 ? (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-primary font-bold text-gray-700">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u._id}>
                  <td>{index + 1}</td>
                  <td>{u.displayName}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    {u.role === 'admin' ? (
                      <button
                        onClick={() => handleRemoveAdmin(u._id)}
                        className="btn btn-error btn-sm"
                      >
                        <FaUserTimes /> Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(u._id)}
                        className="btn btn-secondary btn-sm"
                      >
                        <FaUserShield /> Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        searchEmail && <p>No users found matching this email.</p>
      )}
    </div>
  );
}

export default MakeAdmin;
