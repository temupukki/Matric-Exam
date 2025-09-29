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
    
    console.log("🚀 SIGNUP ATTEMPT");
    console.log("📧 Email:", email);
    console.log("👤 Name:", name);
    console.log("🔐 Password length:", password.length);

    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: (ctx) => {
          console.log("🎉 SUCCESS! Full context:", ctx);
          console.log("👤 User created:", ctx.data?.user);
          toast.success(`Signed up successfully!`);
          redirect("/dashboard");
        },
        onError: (ctx) => {
          console.log("💥 ERROR! Full error context:", ctx);
          console.log("❌ Error message:", ctx.error?.message);
          console.log("🔧 Error code:", ctx.error?.code);
          toast.error(`Signup failed!`);
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
        <label>Name:</label>
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
        Sign up (Check Console)
      </button>
    </form>
  );
}