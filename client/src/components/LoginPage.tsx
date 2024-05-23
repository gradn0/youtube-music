import { FormEvent, useState } from "react"
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

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
          <label>
            Email
            <input autoComplete="on" id="email" value={email} className="mb-2 block" type="text" onChange={(e) => setemail(e.target.value)}/>
          </label>
          
          <label>
            Password
            <input autoComplete="on" id="password" value={password} className="mb-2 block" type="text" onChange={(e) => setpassword(e.target.value)}/>
          </label>

          
          <div className="text-highlight h-[1em]">{error && error}</div>
          <button type="submit" className="my-4" disabled={loading}>Submit</button>

          <Link to={"/signup"}><p>Create an account</p></Link>
        </form>
      </div>
    </div>
  )
}

export default LoginPage