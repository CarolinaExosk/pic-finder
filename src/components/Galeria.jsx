import React, { useEffect, useState } from 'react';

const accessKey = 'Qhf5Uh8E7PAkUUCcDErcUZi8rOzHp1X_R3Zx9JpCHus';

function Galeria({ termoBusca }) {
    const [imagens, setImagens] = useState([]);
    const [imagemSelecionada, setImagemSelecionada] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [pagina, setPagina] = useState(1);

    async function buscarImagens(termo, page = 1) {
        setCarregando(true);
        try {
            const res = await fetch(
                `https://api.unsplash.com/search/photos?query=${encodeURIComponent(termo)}&per_page=12&page=${page}&client_id=${accessKey}`
            );
            const data = await res.json();
            const novasImagens = data.results.map(img => ({
                url: img.urls.regular,
                alt: img.alt_description || termo,
            }));
            setImagens(prev => page === 1 ? novasImagens : [...prev, ...novasImagens]);
        } catch (err) {
            console.error('Erro ao buscar imagem:', err);
        } finally {
            setCarregando(false);
        }
    }

    // Quando o termo de busca mudar
    useEffect(() => {
        setPagina(1);
        buscarImagens(termoBusca, 1);
    }, [termoBusca]);

    // Quando a página mudar
    useEffect(() => {
        if (pagina !== 1) {
            buscarImagens(termoBusca, pagina);
        }
    }, [pagina]);

    // Scroll infinito
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
                !carregando
            ) {
                setPagina(prev => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [carregando]);

    return (
        <div style={{ padding: '10px' }}>
            <div className="galeria">
                {imagens.map((img, index) => (
                    <img
                        key={index}
                        src={img.url}
                        alt={img.alt}
                        className="foto-galeria"
                        onClick={() => setImagemSelecionada(img.url)}
                        style={{ cursor: 'pointer' }}
                    />
                ))}
            </div>

            {carregando && <p>Carregando imagens...</p>}

            {imagemSelecionada && (
                <div
                    onClick={() => setImagemSelecionada(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        cursor: 'zoom-out'
                    }}
                >
                    <img
                        src={imagemSelecionada}
                        alt="Imagem ampliada"
                        style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '10px' }}
                    />
                </div>
            )}
        </div>
    );
}

export default Galeria;
