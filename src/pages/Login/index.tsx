import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginBg from "../../assets/images/login.jpg"
import Button from '../../components/button/Button';
import { BASE_URL } from '../../constant/base-urls';
import { useAuthContext } from '../../context/AuthContext';
import { loginAction } from '../../redux/authReducer';
import { AuthCheckAccess } from '../../utils/AuthCheckAccess';

interface createUserType {
  email: string;
  password: string
}

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [error, setError] = useState(false)

  const [loading, setLoading] = useState(false)
  const loginBg: any = {
    width: "100%",
    maxWidth: "100vw",
    padding: "0",
    backgroundImage: `url(${LoginBg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    position: "relative",
  };

  const loginFormSchema: createUserType = {
    email: "",
    password: ""
  }
  const [loginForm, setLoginForm] = useState(loginFormSchema)

  const clearState = () => {
    setLoginForm((state) => ({
      ...state, ...loginFormSchema
    }))
  }

  const login = async (e: any) => {
    e.preventDefault();
    // dispatch({ type: "START" });
    setLoading(true)
    const url = `${BASE_URL}/admin/auth`
    try {
      let res = await axios.post(url, loginForm)

      if (res.data.status === "success") {
        
        let user = {
          id: res.data.data._id as number,
          email: res.data.data.email as string,
          mobileNumber: res.data.data.mobileNumber as string,
          fullname: res.data.data.fullname as string,
          country: res.data.data.country as string,
          isAdmin: res.data.data.isAdmin as boolean,
          role: res.data.data.role as string,
        };

        let token = res.data.token as string

        dispatch(loginAction({ ...user, auth_token: token }));

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.data._id);
        navigate("/dashboard")
        toast.success(res.data.message)
        // dispatch({ type: "SUCCESS", payload: res.data });1
        clearState()
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (error: any) {
      dispatch({ type: "FAILED", payload: error?.response?.data });
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      setError(error?.response?.data?.message)
      setLoading(false)
    }
  }

  return (
    <>
      <section style={loginBg}>
        <div className="auth-overlay">
          <div className='w-full mx-auto p-0'>
            <div className="flex flex-col md:flex-row" style={{ marginTop: "calc(-1 * 0)", marginRight: "calc(-.5 * 0)", marginLeft: "calc(-.5 * 0)" }}>
              {/* left content here later */}
              <div style={{ flex: 3 }} className="2xl">
              </div>
              <div className='bg-white' style={{ flex: 2 }}>
                <div className="h-screen flex p-12">
                  <div className="w-full">
                    <div className="flex flex-col h-full">
                      {/* logo here later */}
                      <div className='md:mb-12 text-center'></div>
                      <div className='my-auto'>
                        <div className='text-center'>
                          <h5 className='text-xl font-bold'>Back to your digital management!</h5>
                          <p className='text-[#74788d] mt-2'>sign in here to continue</p>
                        </div>
                        <form className="space-y-7 mt-6 pt-2" onSubmit={login}>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email address"
                            className="form-input"
                            required
                            onChange={(e) => {
                              setLoginForm((state) => ({
                                ...state, email: e.target.value
                              }))
                            }}
                            value={loginForm.email}
                          />
                          <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="form-input"
                            required
                            onChange={(e) => {
                              setLoginForm((state) => ({
                                ...state, password: e.target.value
                              }))
                            }}
                            value={loginForm.password}
                          />
                          <Button text={`${loading ? "Loading..." : "Login"}`} />
                        </form>
                        {error && (
                          <p className="text-red-700 text-center">
                            {error}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </section >
    </>
  )
}

export default LoginPage