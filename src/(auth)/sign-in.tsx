
import AuthLayout from "./layout";

export default function SignIn() {
  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <button
          type="submit"
          className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition"
        >
          Login
        </button>
      </form>
    </AuthLayout>
  );
}
