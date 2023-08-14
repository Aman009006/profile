import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  font-size: 20px;
`
const ProfileNavigation = styled.div`
  background: white ;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 15px;
  color: black;
`
const ProfileContent = styled.div`
  //padding: 15px;
  margin-top: 100px;
`
const ProfileImgContent = styled.div`
  background: white ;
  border-radius: 50%;
  width: 200px;
  height: 200px;
`
const ProfileInputsContent = styled.div`
`

const ProfileLabel = styled.p`
  margin-top: 18px;
  margin-bottom: 10px;
`
const ProfileInput = styled.input`
  width: 300px;
  height: 30px;
  padding: 5px;
`
const ProfileButton = styled.button`
  width: 300px;
  height: 50px;
  margin-top: 100px;
`
const Error = styled.p`
  color: red;
  margin: 10px 0;
`

export default function Home() {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        phone: '',
    });

    const validateFullName = (value) => {
        if (value.length < 2 || value.length > 128) {
            return 'ФИО должно быть от 2 до 128 символов';
        }
        return '';
    };

    const validateEmail = (value) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (value.length < 6 || value.length > 128 || !emailPattern.test(value)) {
            return 'Введите корректный email (от 6 до 128 символов)';
        }
        return '';
    };

    const validatePhone = (value) => {
        const phonePattern = /^\d{10,20}$/;
        if (!phonePattern.test(value)) {
            return 'Телефон должен содержать только цифры и быть от 10 до 20 символов';
        }
        return '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullNameError = validateFullName(formData.fullName);
        const emailError = validateEmail(formData.email);
        const phoneError = validatePhone(formData.phone);

        setErrors({
            fullName: fullNameError,
            email: emailError,
            phone: phoneError,
        });

        if (!fullNameError && !emailError && !phoneError) {
            axios.post('https://example.com/api/submit', formData)
                .then(response => {
                    console.log('Успешный ответ:', response.data);
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                });
        }
    };

    return (<>
            <ProfileNavigation>
                <Container>
                    Профиль
                </Container>
            </ProfileNavigation>
            <Container>
                <ProfileContent>
                    <ProfileInputsContent>
                        <ProfileLabel>ФИО</ProfileLabel>
                        <ProfileInput
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                        {errors.fullName && <Error>{errors.fullName}</Error>}
                        <ProfileLabel>Email</ProfileLabel>
                        <ProfileInput
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <Error>{errors.email}</Error>}
                        <ProfileLabel>Телефон</ProfileLabel>
                        <ProfileInput
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        {errors.phone && <Error>{errors.phone}</Error>}

                    </ProfileInputsContent>
                    <ProfileButton onClick={handleSubmit} >Отправить</ProfileButton>
                </ProfileContent>
            </Container>
        </>
    )
}
