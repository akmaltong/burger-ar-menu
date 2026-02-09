import React, { useState } from 'react';
import ARScene from './components/ARScene';
import './App.css';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedBurger, setSelectedBurger] = useState(null);

  const menuItems = [
    {
      id: 'classic_burger',
      name: 'Классический Бургер',
      description: 'Традиционная говядина с свежим салатом и помидором',
      price: '899₽',
      qrCode: 'QR_CLASSIC_001'
    },
    {
      id: 'cheese_burger',
      name: 'Чизбургер',
      description: 'Сочный фарш с плавленным чеддером',
      price: '949₽',
      qrCode: 'QR_CHEESE_002'
    },
    {
      id: 'bacon_burger',
      name: 'Бекон Делюкс',
      description: 'Премиум бургер с хрустящим беконом и карамелизированным луком',
      price: '1199₽',
      qrCode: 'QR_BACON_003'
    },
    {
      id: 'veggie_burger',
      name: 'Вегги Суприм',
      description: 'Растительная котлета с авокадо и ростками',
      price: '1049₽',
      qrCode: 'QR_VEGGIE_004'
    },
    {
      id: 'double_burger',
      name: 'Двойная Порция',
      description: 'Две говяжьи котлеты с двойным сыром',
      price: '1399₽',
      qrCode: 'QR_DOUBLE_005'
    }
  ];

  const handleMenuItemClick = (item) => {
    setSelectedBurger(item);
    setCurrentView('ar');
  };

  const renderHomeView = () => (
    <div className="home-view">
      <header className="app-header">
        <h1>🍔 AR Меню Бургеров</h1>
        <p>Наведите камеру на любой QR-код, чтобы увидеть вкусные 3D бургеры!</p>
      </header>

      <div className="menu-container">
        <h2>Наше Меню</h2>
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="menu-item"
              onClick={() => handleMenuItemClick(item)}
            >
              <div className="item-image-placeholder">
                <span>📷</span>
                <p>Сканировать QR-код</p>
              </div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <p className="price">{item.price}</p>
                <div className="qr-code-display">
                  <small>QR: {item.qrCode}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="instructions">
        <h3>Как использовать:</h3>
        <ol>
          <li>Выберите бургер из меню выше</li>
          <li>Наведите камеру на соответствующий QR-код на физическом меню</li>
          <li>Наблюдайте, как 3D бургер появляется в дополненной реальности!</li>
          <li>Поворачивайте и изучайте бургер со всех сторон</li>
        </ol>
      </div>
    </div>
  );

  const renderARView = () => (
    <div className="ar-view">
      <div className="ar-header">
        <button 
          className="back-button" 
          onClick={() => setCurrentView('home')}
        >
          ← Назад в Меню
        </button>
        {selectedBurger && (
          <div className="selected-item-info">
            <h2>{selectedBurger.name}</h2>
            <p>{selectedBurger.description}</p>
            <p className="price-highlight">{selectedBurger.price}</p>
          </div>
        )}
      </div>
      <ARScene 
        onBurgerSelect={(burgerId) => {
          const burger = menuItems.find(item => item.id === burgerId);
          setSelectedBurger(burger);
        }}
      />
    </div>
  );

  return (
    <div className="app">
      {currentView === 'home' ? renderHomeView() : renderARView()}
    </div>
  );
};

export default App;