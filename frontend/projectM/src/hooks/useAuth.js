import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {loginUser, registerUser} from '../api/auth';

export const useAuth = ()=>{
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authenticate = async (isLogin, data) =>{
    setLoading(true);
    try{
      await (isLogin? loginUser(data) : registerUser(data));
      navigate('/home');
    }
    catch(err){
      alert(err.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
  };

  return {authenticate, loading};
};