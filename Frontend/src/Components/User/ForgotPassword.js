import React,{useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { forgotPassword } from '../../Store/User/User-action';

export const ForgotPassword = () => {
    const [email,setEmail]=useState("");
    const[emailSent,setEmailSent]=useState(false);
    const dispatch=useDispatch();

    const sumbmitHandler=(e)=>{
        e.preventDefault();
        dispatch(forgotPassword(email));
        setEmailSent(true);

    }
  return (
   <>
      <div className="row wrapper">
          <div className="col-10col-lg-5">
            {!emailSent?(
                <form onSubmit={sumbmitHandler}>
                    <h1 className="password_title">Forgot Password</h1>
                    <div className="form-group">
                        <label htmlFor='email_field'>
                           Enter Email
                        </label>
                        <input
                              type="email"
                              id="email_field"
                              className="form-control"
                              value={email}
                              required
                              onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <button 
                    id="forgot_password_button"
                    type="submit"
                    className="btn-block-py-3 password-btn"
                    >
                      Send Email
                    </button>
                </form>
            ):(
                <div>Email Sent.Please Check your inbox.</div>
            )
}
          </div>
      </div>
   </>
  )
}
