import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

export default function UserAuth({ loggedIn, setLoggedIn }) {
    const [selectedOption, setSelectedOption] = useState('login');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="login"
                        checked={selectedOption === 'login'}
                        onChange={() => handleOptionChange('login')}
                    />
                    Login
                </label>
                <label>
                    <input
                        type="radio"
                        value="register"
                        checked={selectedOption === 'register'}
                        onChange={() => handleOptionChange('register')}
                    />
                    Register
                </label>
            </div>
            {selectedOption === 'login' ? <Login /> : <Register />}
        </div>
    );
}
