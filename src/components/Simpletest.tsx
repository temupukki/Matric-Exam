import { useState } from "react";

import { authClient } from "../../lib/auth-client";
import { redirect } from "react-router-dom";
import { toast } from "sonner";

export default function SimpleTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [name, setName] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authClient.signUp.email(
      {
        email,
        password,
        name,

        callbackURL: "/dashboard",
      },
      {
      
        onSuccess: (ctx) => {
           toast.success(`signed up sucess fully${ctx}`) 
         redirect("/dashboard")
        },
        onError: (ctx) => {
              toast.error(`you fucked up man`) 
     
        
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="m-auto">
      <div className="mb-10">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 5 }}
        />
      </div>
    <div className="mb-10">
        <label>name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: 5 }}
        />
      </div>
      <div className="mb-10">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 5 }}
        />
      </div>

      <button type="submit" className="p-4 bg-red-600">
        Login
      </button>
    </form>
  );
}
