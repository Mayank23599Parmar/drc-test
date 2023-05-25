import { Routes, Route } from 'react-router-dom';
import { Home, Login, Register } from './pages';
import { Header } from './components/Global';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="add-todo/:userId" element={<AddTodo />} />
        <Route path="edit-todo/:userId/:todoId" element={<EditTodo />} />
      </Route>
    </Routes>
  );
};

export default App;
