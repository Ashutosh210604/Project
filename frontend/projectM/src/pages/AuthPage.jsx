import React, {useState} from 'react';
import {useAuth} from '../hooks/useAuth';
import {initiateGoogleAuth} from '../api/auth';

const AuthPage = ()=>{
  const [isLogin, setIsLogin] = useState(true);
  const {authenticate, loading} = useAuth();
  const [formData, setFormData] = useState({email:'', password:'',name:''});

  const handleSubmit = (e)=>{
    e.preventDefault();
    authenticate(isLogin, formData);
  }

  return(
    <div className = "flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h1 className = 'text-2xl font-bold mb-6 text-center'>{isLogin? 'Login' : 'Register'}</h1>

        {/* Google OAuth triggers the route in your auth.routes.js */}

        <button onClick={initiateGoogleAuth} className = "w-full py-2 mg-4 border rounded-lg hover:bg-gray-100">
          Continue with Google
        </button>

        <div className = "text-center text-sm mb-4">or</div>

        <form onSubmit={handleSubmit} className = "space-y-4">
          {!isLogin && (
            <input className="w-full p-2 border rounded" placeholder="Name"
            onChange={(e)=> setFormData({...formData, name:e.target.value})}/>
          )}

          <input className = "w-full p-2 border rounded" placeholder="Email" type="email"
          onChange={(e)=> setFormData({...formData, email:e.target.value})}/>

          <input className="w-full p-2 border rounded" placeholder="Password" type="password" onChange={(e)=> setFormData({...formData, password:e.target.value})}/>

          <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg">
            {loading? 'Processing...' : (isLogin? 'Login' : 'Register')}
          </button>
        </form>

        <p className="mt-4 text-center cursor-pointer text-blue-500" onClick={()=>setIsLogin(!isLogin)}>
          {isLogin? "Need an account" :"Already have an account? :Login"}
        </p>
      </div>
    </div>
  )
}

export default AuthPage;