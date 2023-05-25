import { useEffect, useState } from 'react';
import users from '../constants/Users.json';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteUserTodo } from '../redux/user/userActions';
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user.loggedUser);
  const todosData = useSelector((state) => state.user.todosData);
  const UserTodoData = todosData.filter((cv) => cv.userId === loggedUser.id);
  const deletedTodo = (selectedTodo, onClose) => {
    dispatch(
      deleteUserTodo(
        todosData.filter(
          (cv) => cv.userId !== selectedTodo.userId && cv.id !== selectedTodo.id
        )
      )
    );
    onClose();
  };
  const showDeletePopup = (selectedTodo) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this Todo?
              </h3>
              <button
                type="button"
                onClick={() => deletedTodo(selectedTodo, onClose)}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => onClose()}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        );
      },
    });
  };
  useEffect(() => {
    if (Object.keys(loggedUser).length <= 0) {
      navigate('/login');
    }
  }, []);
  return (
    <>
      <div className="dashboad-page min-w-full py-2 sm:px-6 lg:px-8">
        <div className="add-todo-wrapper my-4">
          <Link
            to={`/add-todo/${loggedUser?.id}`}
            className="block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Add Todo
          </Link>
        </div>

        <div className="flex flex-col max-w-full">
          <div className="overflow-x-auto ">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                {UserTodoData.length > 0 ? (
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-4">
                          TimeStamp
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {UserTodoData.map((todo, index) => {
                        if (todo.userId === loggedUser.id) {
                          return (
                            <tr
                              className="border-b transition duration-300 ease-in-out  border-neutral-500 hover:bg-neutral-600 hover:text-white"
                              key={index}
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {todo.title}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {todo.description}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {todo.timeStamp}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex">
                                  <Link
                                    to={`/edit-todo/${loggedUser.id}/${todo.id}`}
                                    type="button"
                                    class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                  >
                                    Edit
                                  </Link>
                                  <button
                                    type="button"
                                    onClick={() => showDeletePopup(todo)}
                                    class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p>No Users Available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
