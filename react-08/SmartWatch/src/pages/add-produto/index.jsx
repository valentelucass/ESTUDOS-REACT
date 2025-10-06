import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/header/index.jsx';
import Footer from '../../components/footer/index.jsx';
import './index.css';

const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

const AddProduto = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Smartwatch');
    const [description, setDescription] = useState('');
    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState('');
    const [slug, setSlug] = useState('');
    const [stockStatus, setStockStatus] = useState('');
    const [images, setImages] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState('#4a4a4a');
    const navigate = useNavigate();

    // Efeitos para automatizar campos
    useEffect(() => {
        if (title) {
            const generatedSlug = title.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            setSlug(generatedSlug);
        }
    }, [title]);

    useEffect(() => {
        const qty = parseInt(quantity, 10);
        if (!isNaN(qty)) {
            setStockStatus(qty > 0 ? "Em estoque" : "Fora de estoque");
        }
    }, [quantity]);

    // Função para lidar com upload de imagens
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setImages(prev => [...prev, imageUrl]);
            };
            reader.readAsDataURL(file);
        });
    };

    // Função para remover imagem
    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    // Função para adicionar cor
    const addColor = () => {
        if (selectedColor && !colors.includes(selectedColor)) {
            setColors(prev => [...prev, selectedColor]);
        }
    };

    // Função para remover cor
    const removeColor = (colorToRemove) => {
        setColors(prev => prev.filter(color => color !== colorToRemove));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newProduct = {
            title,
            price: parseFloat(price),
            category,
            description,
            sku,
            slug,
            stockStatus,
            quantity: parseInt(quantity, 10),
            images: images.length > 0 ? images : [`https://via.placeholder.com/250/FFFFFF/000000?text=${encodeURIComponent(title || 'Produto')}`],
            colors,
        };

        try {
            const response = await axios.post('http://localhost:3001/products', newProduct);
            
            if (response.status === 201 || response.status === 200) {
                alert('Produto adicionado com sucesso!');
                // Limpar formulário
                setTitle('');
                setPrice('');
                setDescription('');
                setSku('');
                setQuantity('');
                setImages([]);
                setColors([]);
                navigate('/smartwatch');
            } else {
                alert('Erro ao adicionar o produto. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            alert("Não foi possível conectar ao servidor. Verifique se o servidor está rodando na porta 3001 e tente novamente.");
        }
    };

    return (
        <div className="add-product-page">
            <Header />
            <main className="add-product-container">
                <h1>Adicionar produto</h1>
                <form className="add-product-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Título</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stockStatus">Status estoque</label>
                        <input 
                            type="text" 
                            id="stockStatus" 
                            value={stockStatus}
                            readOnly
                            placeholder="Será preenchido automaticamente"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Preço</label>
                        <input type="number" id="price" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantidade</label>
                        <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Categoria</label>
                        <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                    </div>
                    <div className="form-group form-images">
                        <label>Imagens</label>
                        <div className="image-uploader" onClick={() => document.getElementById('imageInput').click()}>
                            <UploadIcon />
                            <span>Clique aqui para adicionar imagens</span>
                            <input
                                type="file"
                                id="imageInput"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                        </div>
                        {images.length > 0 && (
                            <div className="image-preview-container">
                                {images.map((image, index) => (
                                    <div key={index} className="image-preview">
                                        <img src={image} alt={`Preview ${index + 1}`} />
                                        <button
                                            type="button"
                                            className="remove-image"
                                            onClick={() => removeImage(index)}
                                        >
                                            <CloseIcon />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="slug">Slug</label>
                        <input 
                            type="text" 
                            id="slug" 
                            value={slug}
                            readOnly
                            placeholder="Será gerado automaticamente baseado no título"
                        />
                    </div>
                    <div className="form-group form-colors">
                        <label>Cores</label>
                        <div className="color-input-container">
                            <input
                                type="color"
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                                className="color-picker"
                            />
                            <button
                                type="button"
                                onClick={addColor}
                                className="add-color-btn"
                            >
                                Adicionar Cor
                            </button>
                        </div>
                        <div className="color-swatches">
                            {colors.map((color, index) => (
                                <div key={index} className="color-swatch-container">
                                    <div
                                        className="color-swatch"
                                        style={{ backgroundColor: color }}
                                    ></div>
                                    <button
                                        type="button"
                                        className="remove-color"
                                        onClick={() => removeColor(color)}
                                    >
                                        <CloseIcon />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sku">SKU</label>
                        <input type="text" id="sku" value={sku} onChange={(e) => setSku(e.target.value)} />
                    </div>
                    <div className="form-group description-group">
                        <label htmlFor="description">Descrição</label>
                        <textarea id="description" rows="6" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Salvar produto</button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default AddProduto;