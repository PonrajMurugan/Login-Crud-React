import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../store/userContext';

const LoginPage = () => {
    const { userItem } = useContext(UserContext);
    const navigate = useNavigate();
    const [inputState, setInputState] = useState({
        email: "",
        password: ""
    });

    const [loginErr, setLoginErr] = useState("");

    const [errInput, setErrInput] = useState({
        email: { isValid: false, mesg: '' },
        password: { isValid: false, mesg: '' }
    });

    const onChangeInput = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        setInputState(prevInpt => ({ ...prevInpt, [name]: val }));
    }

    const validateInput = () => {
        const isValidInputs = [];

        if (inputState.email.trim().length > 0) {
            setErrInput(prev => ({ ...prev, email: { isValid: false, mesg: "" } }))
        } else {
            setErrInput(prev => ({ ...prev, email: { isValid: true, mesg: "Please Enter Email Id" } }))
            isValidInputs[0] = false;
        }
        if (inputState.password.trim().length > 0) {
            if (inputState.password.trim().length > 6) {
                setErrInput(prev => ({ ...prev, password: { isValid: false, mesg: "" } }))
            } else {
                setErrInput(prev => ({ ...prev, password: { isValid: true, mesg: "Password Must Be Minimum Six Digits" } }))
                isValidInputs[1] = false;
            }
        } else {
            setErrInput(prev => ({ ...prev, password: { isValid: true, mesg: "Please Enter Your Password" } }))
            isValidInputs[1] = false;
        }

        return isValidInputs;
    }

    const onLogin = (e) => {
        e.preventDefault();
        const formValid = validateInput();

        if (formValid.length === 0) {
            const findUser = userItem.find(user => user.email === inputState.email);

            if (findUser) {
                if (inputState.password === findUser.password) {
                    localStorage.setItem("token", JSON.stringify(findUser));
                    setLoginErr("");
                    navigate("/");
                } else {
                    setLoginErr("Invalid Email or Password!");
                }
            } else {
                setLoginErr("Invalid Email or Password!");
            }
        }
    }

    return (
       
            <div className='mm'>
                <h1 className='h1'>Welcome To Our Website</h1>
                <div className='auth-form '>
                    <h1>Login-Page</h1>
                    {loginErr && <p style={{ color: "red" }}>{loginErr}</p>}

                    <form onSubmit={onLogin}>
                        <div className='form-group'>
                            <label htmlFor='email'> Email id</label> <br></br>
                            <input type='email' name='email' id='email' value={inputState.email} onChange={onChangeInput} />
                            {errInput.email.isValid && <p className='inpt-err'  style={{ color: "red" }}>{errInput.email.mesg}</p>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>Password</label> <br></br>
                            <input type='password' name='password' id='password' value={inputState.password} onChange={onChangeInput} /> <br></br>
                            {errInput.password.isValid && <p className='inpt-err'  style={{ color: "red" }}>{errInput.password.mesg}</p>}
                        </div>

                        <button type='submit' className='btn btn-primary w-100'>Login</button>
                    </form>
                </div>
            </div>
    
    );
};

export default LoginPage;
