import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchContacts = async () => {
    const res = await axios.get(`${API}/api/contacts`);
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${API}/api/contacts`, form);
    setForm({ name: "", email: "", phone: "" });
    fetchContacts();
  };

  const deleteContact = async (id) => {
    await axios.delete(`${API}/api/contacts/${id}`);
    fetchContacts();
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Contact Management App</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} />
        <br /><br />
        <input name="email" placeholder="Email" onChange={handleChange} value={form.email} />
        <br /><br />
        <input name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} />
        <br /><br />
        <button>Add Contact</button>
      </form>

      <h2>Contacts</h2>

      {contacts.map((c) => (
        <div key={c._id}>
          {c.name} - {c.email} - {c.phone}
          <button onClick={() => deleteContact(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;