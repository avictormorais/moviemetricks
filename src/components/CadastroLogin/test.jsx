import { render, screen, fireEvent } from '@testing-library/react';
import CadastroLogin from './CadastroLogin';
import { BrowserRouter as Router } from 'react-router-dom';

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: Router });
};

describe('CadastroLogin Component', () => {
    it('Renderiza o componente em modo login', () => {
        renderWithRouter(<CadastroLogin />);
        expect(screen.getByText(/Bem-Vindo!/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    });

    it('Muda o componte para modo cadastro', () => {
        renderWithRouter(<CadastroLogin />);
        fireEvent.click(screen.getByText(/Crie uma conta/i));
        expect(screen.getByPlaceholderText(/Nome de usuário/i)).toBeInTheDocument();
        expect(screen.getAllByPlaceholderText(/Senha/i)).toHaveLength(2);
        expect(screen.getByPlaceholderText(/Repetir senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Cadastrar/i })).toBeInTheDocument();
    });

    it('Renderiza o componente em modo cadastro', () => {
        renderWithRouter(<CadastroLogin />);
        fireEvent.click(screen.getByText(/Crie uma conta/i));
        expect(screen.getByText(/Bem-Vindo!/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Nome de usuário/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        const senhaInputs = screen.getAllByPlaceholderText(/Senha/i);
        expect(senhaInputs).toHaveLength(2);
        expect(screen.getByPlaceholderText(/Repetir senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Cadastrar/i })).toBeInTheDocument();
    });
});
