import { FormEvent, useState } from "react"
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const {authenticate, error, loading} = useAuth("login");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    authenticate(email, password);
  }

  return (
    <div className="bg-lightGray h-screen flex justify-center items-center">
      <div className="bg-grey flex flex-col text-textGray p-10 gap-7 text-body">
        <h2 className="text-heading">Login</h2>
        <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
          <label>Email</label>
          <input value={email} className="mb-2" type="text" onChange={(e) => setemail(e.target.value)}/>
          <label>Password</label>
          <input value={password} className="mb-2" type="text" onChange={(e) => setpassword(e.target.value)}/>
          <button disabled={loading}>Submit</button>
          {error && <div className="text-highlight">{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default LoginPage