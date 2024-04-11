import React, { useState } from 'react';
import styles from './CadastroLogin.module.css';
import Logo from '../../assets/icon.png';
import api from '../../services/api';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function CadastroLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [username, setUsername] = useState('');
    const [repetirSenha, setRepetirSenha] = useState('');
    const [isCadastro, setIsCadastro] = useState(false);

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleSenhaChange = (event) => setSenha(event.target.value);
    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handleRepetirSenhaChange = (event) => setRepetirSenha(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!email || !senha || (isCadastro && (!username || !repetirSenha))) {
            document.querySelector(`.${styles.LabelError}`).style.display = 'block';
            document.querySelector(`.${styles.LabelError}`).textContent = 'Por favor, preencha todos os campos.';
            return;
        }
        if (isCadastro && senha !== repetirSenha) {
            document.querySelector(`.${styles.LabelError}`).style.display = 'block';
            document.querySelector(`.${styles.LabelError}`).textContent = 'As senhas não coincidem.';
            return;
        }
        document.querySelector(`.${styles.LabelError}`).style.display = 'none';
    
        if(isCadastro){
            api.post(`/api/cadastro`, {
                email: email,
                username: username,
                password: senha
            })
            .then(response => {
                Cookies.set('accessToken', response.data.access_token);
                window.location.href = '/';
            })
            .catch(error => {
                if(error.request.status == 401){
                    document.querySelector(`.${styles.LabelError}`).style.display = 'block';
                    document.querySelector(`.${styles.LabelError}`).textContent = 'Email já cadastrado.';
                    return;
                } else{
                    document.querySelector(`.${styles.LabelError}`).style.display = 'block';
                    document.querySelector(`.${styles.LabelError}`).textContent = 'Erro desconhecido, tente novamente.';
                    console.log(error.request)
                    return;
                }
            });
        } else{
            api.post(`/api/login`, {
                email: email,
                password: senha
            })
            .then(response => {
                Cookies.set('accessToken', response.data.access_token);
                window.location.href = '/';
            })
            .catch(error => {
                if(error.request.status == 401){
                    document.querySelector(`.${styles.LabelError}`).style.display = 'block';
                    document.querySelector(`.${styles.LabelError}`).textContent = 'Senha inválida.';
                    return;
                } if(error.request.status == 402){
                    document.querySelector(`.${styles.LabelError}`).style.display = 'block';
                    document.querySelector(`.${styles.LabelError}`).textContent = 'Email não cadastrado.';
                    return;
                }else{
                    document.querySelector(`.${styles.LabelError}`).style.display = 'block';
                    document.querySelector(`.${styles.LabelError}`).textContent = 'Erro desconhecido, tente novamente.';
                    console.log(error.request)
                    return;
                }
            });
        }
    };
    

    const handleToggleCadastro = () => setIsCadastro(!isCadastro);

    return (
        <div className={styles.divLogin}>
            <Link to={'/'} style={{width: '100%'}}>
                <img src={Logo} alt="Logo" />
            </Link>
            <h1>Bem-Vindo!</h1>
            <p>{isCadastro ? 'Já possui uma conta?' : 'Novo por aqui?'}{' '}<span onClick={handleToggleCadastro}> {isCadastro ? 'Entrar' : 'Crie uma conta'} </span></p>
            <form onSubmit={handleSubmit}>
                {isCadastro && (
                    <input
                        type="text"
                        placeholder="Nome de usuário"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                )}
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={handleSenhaChange}
                />
                {isCadastro && (
                    <input
                        type="password"
                        placeholder="Repetir senha"
                        value={repetirSenha}
                        onChange={handleRepetirSenhaChange}
                    />
                )}
                <h4 className={styles.LabelError} style={{display: 'none'}}>Por favor, preencha todos os campos.</h4>
                <button type="submit">
                    {isCadastro ? 'Cadastrar' : 'Entrar'}
                </button>
                <h3 className={styles.ajudaLogin}>Problemas com login?</h3>
            </form>
        </div>
    );
}

export default CadastroLogin;
