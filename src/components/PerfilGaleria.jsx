import React, { useState } from "react";
import "./PerfilGaleria.css";
import Galeria from "./Galeria";

export default function PerfilGaleria() {
    const [termoBusca, setTermoBusca] = useState("");
    const [termoFinal, setTermoFinal] = useState("nature"); // valor inicial padrão

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (termoBusca.trim()) {
            setTermoFinal(termoBusca); 
        } else {
            setTermoFinal("nature"); // Se a busca estiver vazia buscar por natureza mesmo assim
        }
    };

    return (
        <div className="perfil-container">
            <aside className="destaques monospace">
                {[6, 5, 4, 3, 2, 1].map((num) => (
                    <div className="destaque" key={num}>
                        <div className="bolha" />
                        <span>Destaque {num}</span>
                    </div>
                ))}
            </aside>

            <main className="perfil-conteudo">
                <section className="capa">
                    <div className="overlay"></div>

                    {/* BARRA DE BUSCA FUNCIONAL */}
                    <div className="barra-busca">
                        <input
                            type="text"
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                            placeholder="Buscar imagens..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit(e); // Ação ao pressionar Enter
                                }
                            }}
                        />
                        <button onClick={handleSubmit}>Buscar</button> {/* Ação ao clicar no botão */}
                    </div>
                </section>

                <section className="perfil-info">
                    <img
                        src="https://images.unsplash.com/photo-1507740200687-1e35a4aba605?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Perfil"
                        className="avatar"
                    />
                    <div className="dados">
                        <h1>Lana Snow</h1>
                        <p>📍Canadá</p>
                        <p className="monospace">Fotografia cinematográfica digital</p>
                        <div className="player">
                            <button>▶️</button>
                            <span>Sirens - Pearl Jam</span>
                            <span className="monospace">5:40</span>
                            <button>≡</button>
                        </div>
                    </div>
                    <div className="acoes">
                        <button>🔔</button>
                        <button>💬</button>
                        <button className="seguir">SEGUIR</button>
                    </div>
                </section>

                <nav className="menu">
                    <span>FOTOS</span>
                    <span>ALBÚNS</span>
                    <span>REELS</span>
                    <span>REPOSTS</span>
                    <span>MARCADOS</span>
                </nav>

                <Galeria termoBusca={termoFinal} />
            </main>
        </div>
    );
}
