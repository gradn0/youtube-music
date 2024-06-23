import { FormEvent, useState } from "react"
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const {authenticate, error, loading} = useAuth("signup");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await authenticate(email, password);
  }

  return (
    <div className="bg-lightGray h-screen flex justify-center items-center">
      <div className="bg-grey flex flex-col text-textGray p-10 gap-7 text-body">
        <h2 className="text-heading">Sign Up</h2>
        <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
          <label>
            Email
            <input id="email" autoComplete="on" value={email} className="mb-2 block w-full mt-2" type="text" onChange={(e) => setemail(e.target.value)}/>
          </label>
          
          <label>
            Password
            <input id="password" autoComplete="on" value={password} className="mb-2 block w-full mt-2" type="text" onChange={(e) => setpassword(e.target.value)}/>
          </label>
          
          <div className="text-highlight min-h-[1em] max-w-[30ch]">{error && error}</div>
          <button className="my-4" disabled={loading}>Submit</button>
          
          <Link to={"/login"}><p>Already have an account?</p></Link>
        </form>
      </div>
    </div>
  )
}

export default SignupPage