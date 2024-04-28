import React, { FormEvent, useEffect, useState } from 'react'
import api from '../../api/Api';
type User = {
  id: number,
  firstName: string,
  lastName: string,
  password?: string,
  confirmPassword?: string,
  email: string,
  role: string,
}
export default function ListUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: ''
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseUser = await api.get('/user/all');
        setUsers(responseUser.data.data);

      } catch (error) {
        console.error('Error fetching Users:', error);
      }

    };
    fetchUsers();
  }, []);

  const handleAddUser = async (event: FormEvent<HTMLFormElement>) => {
    try {
      // event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const response = await api.post('user/register', formData);
      const responseData = response.data;
      setUsers(responseData);
      window.location.href = '/List-User';
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this User?');
    if (!confirmDelete) return;
    try {
      await api.delete(`/user/deleteUser/${id}`);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));

    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUser = async (event: any, id: number) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await api.put(`/user/updateUser/${id}`, formData)
      console.log(response)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };


  const renderModalAddUser = () => {
    const handleOpenModal = () => {
      setShowModal(true);
    };
    const handleCloseModal = () => {
      setShowModal(false);
    };
    return (
      <>
        <button onClick={handleOpenModal} className='block font-bold text-xl mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="button">Add User</button>
        {
          showModal && (
            <div id="myModal" className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center" onClick={handleCloseModal}>
              <div className="modal-content bg-white rounded-lg shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
                <span id="closeModalButton" className="cursor-pointer absolute top-0 right-0 p-2" onClick={handleCloseModal}>Add User</span>
                <form onSubmit={handleAddUser} encType="multipart/form-data">
                  <h3 className='font-bold text-2xl text-center mb-2 uppercase'>Create User</h3>
                  <div>
                    <p className='font-bold'>FirstName</p>
                    <input type="text" name="firstName" className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                    <p className='font-bold'>lastName</p>
                    <input type="text" name="lastName" className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                    <p className='font-bold'>Email</p>
                    <input type="text" name="email" className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                    <p className='font-bold'>Role</p>
                    <input type="text" name="role" className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                    <p className='font-bold'>Password</p>
                    <input type="password" name="password" className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                    <p className='font-bold'>ConfirmPassword</p>
                    <input type="password" name="confirmPassword" className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex justify-center items-center">
                    <button type="submit" className='font-bold rounded-md p-3 mt-3 text-gray-50 bg-blue-700 hover:bg-blue-800'>Add User</button>
                  </div>
                </form>
              </div>
            </div>

          )
        }
      </>
    )
  }

  const handleOpenModalUpdate = (user: User) => {
    setShowModalUpdate(true);
    setFormData({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    });
    setSelectedUser(user);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const renderModalUpdateUser = () => {
    const handleCloseModal = () => {
      setShowModalUpdate(false);
    };
    return (
      <>

        {
          showModalUpdate && (
            <div id="myModal" className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center" onClick={handleCloseModal}>
              <div className="modal-content bg-white rounded-lg shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={(event) => handleUpdateUser(event, selectedUser?.id ?? 0)} encType="multipart/form-data">
                  <h3 className='font-bold text-2xl text-center mb-2 uppercase'>Update User</h3>

                  <div>
                    <p className='font-bold'>FirstName</p>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                    <p className='font-bold'>lastName</p>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                    <p className='font-bold'>Email</p>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
                    <p className='font-bold'>Role</p>
                    <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-[700px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />


                  </div>
                  <div className="flex justify-center items-center">
                    <button type="submit" className='font-bold rounded-md p-3 mt-3 text-gray-50 bg-blue-700 hover:bg-blue-800'>Update User</button>
                  </div>
                </form>
              </div>
            </div>

          )
        }
      </>
    )
  }
  const renderTitleUser = () => {
    return (
      <div className="font-bold text-2xl">
        <div className='flex bg-mainColor-main p-5 rounded-lg'>
          <p className='flex-1 text-center'>FirstName</p>
          <p className='flex-1 text-center'>LastName</p>
          <p className='flex-1 text-center'>Email</p>
          <p className='flex-1 text-center'>Role</p>
          <p className='flex-1 text-center'>Actions</p>
        </div>
        {users?.map(user => (
          <div className='flex p-6  hover:bg-stone-300 hover:rounded-lg'>
            <p className='flex-1 w-[100px] mx-4 text-center my-auto'>{user?.firstName}</p>
            <p className='flex-1 w-[100px] mx-4 text-center my-auto'>{user?.lastName}</p>
            <p className='flex-1 w-[200px] my-auto overflow-hidden whitespace-nowrap overflow-ellipsis'>{user?.email}</p>
            <p className='flex-1 w-[100px] mx-4 text-center my-auto'>{user?.role}</p>
            <div className='flex-1 w-[100px] mx-4 text-center my-auto'>
              <button className='flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 font-bold text-xl dark:focus:ring-blue-800 mr-3'
                onClick={() => handleOpenModalUpdate(user)}>Edit</button>
              <button className='flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 font-bold text-xl dark:focus:ring-blue-800'
                onClick={() => handleDelete(user?.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className='mx-32 mt-[150px]'>
      {renderModalAddUser()}
      {renderModalUpdateUser()}
      {renderTitleUser()}
    </div>
  )
}
