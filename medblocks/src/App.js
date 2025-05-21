import React, { useEffect, useState } from "react";
import { usePGlite } from "@electric-sql/pglite-react";

function App() {
  const db = usePGlite();

  // Ensure patients table exists
  useEffect(() => {
    db.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name TEXT,
        age INTEGER,
        gender TEXT
      );
    `);
  }, [db]);

  // Patient Registration Form state
  const [form, setForm] = useState({ name: "", age: "", gender: "" });
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.gender) {
      setFormError("All fields are required.");
      return;
    }
    if (isNaN(Number(form.age)) || Number(form.age) <= 0) {
      setFormError("Age must be a positive number.");
      return;
    }
    await db.query(
      "INSERT INTO patients (name, age, gender) VALUES (?, ?, ?);",
      [form.name, Number(form.age), form.gender]
    );
    setForm({ name: "", age: "", gender: "" });
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>Patient Registration</h1>
      {/* Patient Registration Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <div style={{ marginBottom: 8 }}>
          <label>
            Name:{" "}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Age:{" "}
            <input
              name="age"
              value={form.age}
              onChange={handleChange}
              type="number"
              min="1"
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Gender:{" "}
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>
        {formError && (
          <div style={{ color: "red", marginBottom: 8 }}>{formError}</div>
        )}
        <button type="submit">Register Patient</button>
      </form>
    </div>
  );
}

export default App;
