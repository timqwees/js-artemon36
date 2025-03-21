import React, { useState, useEffect } from 'react';

// Theme component
const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
    );
};

// Toast component
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast ${type} show`} role="alert" aria-live="polite">
            <div className="toast-content">{message}</div>
            <button
                className="toast-close"
                onClick={onClose}
                aria-label="Close notification"
            >
                &times;
            </button>
        </div>
    );
};

const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
};

// Gallery component
const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchImages = async (retryCount = 0) => {
        try {
            setLoading(true);
            const response = await fetch('https://api.example.com/images');
            if (!response.ok) throw new Error('Failed to fetch images');
            const data = await response.json();
            setImages(data);
        } catch (err) {
            if (retryCount < 3) {
                setTimeout(() => fetchImages(retryCount + 1), 1000 * (retryCount + 1));
            } else {
                setError('Failed to load images. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    if (loading) return <div className="loader" />;
    if (error) return <p>{error}</p>;
    if (!images.length) return <p>No images found</p>;

    return (
        <div className="gallery-grid">
            {images.map((image, index) => (
                <div key={index} className="gallery-item">
                    <img src={image.url} alt={image.caption} />
                    <div className="gallery-item-caption">{image.caption}</div>
                </div>
            ))}
        </div>
    );
};

// Temperature form component
const TemperatureForm = () => {
    const [formData, setFormData] = useState({
        roomNumber: '',
        temperature: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://api.example.com/temperature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    temperature: parseFloat(formData.temperature)
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to submit temperature');

            showToast(data.message);
            setFormData({ roomNumber: '', temperature: '' });
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <form className="temperature-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="roomNumber">Номер комнаты:</label>
                <input
                    type="text"
                    id="roomNumber"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="temperature">Температура (°C):</label>
                <input
                    type="number"
                    id="temperature"
                    name="temperature"
                    step="0.1"
                    value={formData.temperature}
                    onChange={handleChange}
                    required
                />
            </div>
            <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
            >
                отправить
            </button>
        </form>
    );
};

// Demo buttons
const DemoButtons = () => {
    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            display: 'flex',
            gap: '10px'
        }}>
            <button onClick={() => showToast('Operation completed successfully!', 'success')}>
                Show Success Toast
            </button>
            <button onClick={() => showToast('An error occurred!', 'error')}>
                Show Error Toast
            </button>
        </div>
    );
};

// App component
const App = () => {
    return (
        <>
            <ThemeToggle />
            <Gallery />
            <TemperatureForm />
            <ToastContainer />
            <DemoButtons />
        </>
    );
};

export default App;