import { Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import bcrypt from 'bcryptjs';

function Login() {
    const navigate = useNavigate();
    const server = 'http://localhost:8080/api/users';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) navigate("/home");
    }, [navigate]);


    const onFinish = () => {
        fetch(server)
            .then(response => response.json())
            .then(users => {

                const foundUserEmail = users.find(user => user.email === formData.email);
                const foundUserPassword = bcrypt.compareSync(formData.password, foundUserEmail.password)
                const errorPassword = users.find(user => user.email === formData.email && user.password !== formData.password);


                if (foundUserEmail && foundUserPassword) {
                    message.success('Ви увійшли!');

                    const userToStore = {
                        email: foundUserEmail.email,
                        password: foundUserEmail.password
                    };

                    localStorage.setItem('loggedInUser', JSON.stringify(userToStore));
                    navigate('/home');
                    clearFields();
                } else if (errorPassword) {
                    message.error('Ви ввели невірний пароль!');
                    setFormData(prevData => ({
                        ...prevData,
                        password: '', // не працює
                    }));
                } else {
                    message.error('Користувача з таким email та паролем не знайдено. Зареєструйтесь!');
                    navigate('/register');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const clearFields = () => {
        setFormData({
            email: '',
            password: '',
        });
    };

    return (
        <div className="login-content">
            <Form layout="vertical" className="login-form" onFinish={onFinish}>
                <h2 className="login-form-title">Вхід
                    <hr />
                </h2>
                <Form.Item label="Email" className={"no-star"} name="email" rules={[{ required: true, message: 'Будь ласка, введіть email' }]}>
                    <Input type="email"  name="email" value={formData.email} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Пароль" className={"no-star"} name="password" rules={[{ required: true, message: 'Будь ласка, введіть пароль' }]}>
                    <Input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item>
                    <button className="login-button" type="submit">
                        Увійти
                    </button>
                </Form.Item>
                <Link to="/register">
                    Не маєте облікового запису? <strong>Зареєструватися</strong>
                </Link>
            </Form>
        </div>
    );
}

export default Login;