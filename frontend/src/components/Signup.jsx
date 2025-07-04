import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/actions/authActions';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'User', specialization: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(form));
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="User">User</option>
          <option value="Doctor">Doctor</option>
        </select>
        {form.role === 'Doctor' && (
          <input name="specialization" type="text" placeholder="Specialization" value={form.specialization} onChange={handleChange} required />
        )}
        <button type="submit" disabled={loading}>Signup</button>
        {error && <div style={{color:'red'}}>{error}</div>}
      </form>
    </div>
  );
};

export default Signup; 