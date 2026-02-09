// Burger model data generator for Gaussian Splatting format
// This creates synthetic splat data that mimics real Gaussian Splatting models

const BURGER_MODELS = {
  classic_burger: {
    name: "Классический Бургер",
    description: "Традиционная говядина с салатом и помидором",
    price: "899₽",
    ingredients: ["Говяжья котлета", "Салат", "Помидор", "Лук", "Огурцы"]
  },
  cheese_burger: {
    name: "Чизбургер", 
    description: "Сочная говяжья котлета с плавленным сыром чеддер",
    price: "949₽",
    ingredients: ["Говяжья котлета", "Сыр Чеддер", "Салат", "Помидор", "Специальный соус"]
  },
  bacon_burger: {
    name: "Бекон Делюкс",
    description: "Премиум бургер с хрустящим беконом и карамелизированным луком",
    price: "1199₽",
    ingredients: ["Говяжья котлета", "Бекон", "Сыр Чеддер", "Карамелизированный лук", "BBQ соус"]
  },
  veggie_burger: {
    name: "Вегги Суприм",
    description: "Растительная котлета со свежими овощами",
    price: "1049₽",
    ingredients: ["Вегетарианская котлета", "Авокадо", "Ростки", "Помидор", "Салат", "Веганский майонез"]
  },
  double_burger: {
    name: "Двойная Порция",
    description: "Две говяжьи котлеты для максимального удовольствия",
    price: "1399₽",
    ingredients: ["2 Говяжьих котлеты", "Двойной сыр", "Салат", "Помидор", "Лук", "Специальный соус"]
  }
};

// Generate Gaussian Splatting data for a specific burger type
const generateBurgerSplatData = (burgerType) => {
  const modelConfig = BURGER_MODELS[burgerType] || BURGER_MODELS.classic_burger;
  const count = 8000; // More points for better quality
  
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const opacities = new Float32Array(count);
  const scales = new Float32Array(count * 3);
  const rotations = new Float32Array(count * 4);

  // Base burger dimensions
  const baseRadius = 0.35;
  const layerSpacing = 0.08;
  let pointIndex = 0;

  // Helper function to add a layer
  const addLayer = (layerPoints, centerY, colorFunc, layerName) => {
    for (let i = 0; i < layerPoints && pointIndex < count; i++) {
      const idx = pointIndex * 3;
      
      // Position with some randomness for organic look
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * baseRadius;
      const heightVariation = (Math.random() - 0.5) * 0.03;
      
      positions[idx] = Math.cos(angle) * radius;
      positions[idx + 1] = centerY + heightVariation;
      positions[idx + 2] = Math.sin(angle) * radius;
      
  const layerName = {
    'bottom_bun': 'нижняя булочка',
    'patty': 'котлета',
    'cheese': 'сыр',
    'lettuce': 'салат',
    'tomato': 'помидор',
    'onion': 'лук',
    'pickles': 'огурцы',
    'bacon': 'бекон',
    'veggie_patty': 'вегетарианская котлета',
    'avocado': 'авокадо',
    'sprouts': 'ростки',
    'vegan_mayo': 'веганский майонез',
    'onions': 'луковые колечки',
    'special_sauce': 'специальный соус',
    'top_bun': 'верхняя булочка'
  };
      
      // Opacity variation
      opacities[pointIndex] = 0.7 + Math.random() * 0.3;
      
      // Scale variation for realistic appearance
      const scaleBase = 0.02 + Math.random() * 0.03;
      scales[pointIndex * 3] = scaleBase;
      scales[pointIndex * 3 + 1] = scaleBase;
      scales[pointIndex * 3 + 2] = scaleBase;
      
      // Random rotations
      rotations[pointIndex * 4] = Math.random();
      rotations[pointIndex * 4 + 1] = Math.random();
      rotations[pointIndex * 4 + 2] = Math.random();
      rotations[pointIndex * 4 + 3] = Math.random();
      
      pointIndex++;
    }
  };

  // Функции цветов для разных слоев
  const bunColor = () => ({
    r: 0.8 + Math.random() * 0.2,
    g: 0.6 + Math.random() * 0.2,
    b: 0.2 + Math.random() * 0.1
  });

  const pattyColor = () => ({
    r: 0.4 + Math.random() * 0.2,
    g: 0.2 + Math.random() * 0.1,
    b: 0.1 + Math.random() * 0.1
  });

  const cheeseColor = () => ({
    r: 0.9 + Math.random() * 0.1,
    g: 0.8 + Math.random() * 0.2,
    b: 0.1 + Math.random() * 0.2
  });

  const lettuceColor = () => ({
    r: 0.2 + Math.random() * 0.2,
    g: 0.7 + Math.random() * 0.3,
    b: 0.1 + Math.random() * 0.1
  });

  const tomatoColor = () => ({
    r: 0.8 + Math.random() * 0.2,
    g: 0.2 + Math.random() * 0.2,
    b: 0.2 + Math.random() * 0.1
  });

  const baconColor = () => ({
    r: 0.5 + Math.random() * 0.2,
    g: 0.1 + Math.random() * 0.1,
    b: 0.1 + Math.random() * 0.1
  });

  const veggieColor = () => ({
    r: 0.3 + Math.random() * 0.3,
    g: 0.6 + Math.random() * 0.3,
    b: 0.2 + Math.random() * 0.2
  });

  // Генерировать слои в зависимости от типа бургера
  switch(burgerType) {
    case 'bacon_burger':
      // Нижняя булочка
      addLayer(Math.floor(count * 0.15), -0.3, bunColor, 'bottom_bun');
      // Слой бекона
      addLayer(Math.floor(count * 0.1), -0.22, baconColor, 'bacon');
      // Котлета
      addLayer(Math.floor(count * 0.2), -0.15, pattyColor, 'patty');
      // Сыр
      addLayer(Math.floor(count * 0.1), -0.08, cheeseColor, 'cheese');
      // Карамелизированный лук (представлен как маленькие желто-оранжевые точки)
      addLayer(Math.floor(count * 0.08), -0.02, () => ({
        r: 0.9 + Math.random() * 0.1,
        g: 0.6 + Math.random() * 0.2,
        b: 0.1 + Math.random() * 0.1
      }), 'onions');
      // Салат
      addLayer(Math.floor(count * 0.15), 0.05, lettuceColor, 'lettuce');
      // Помидор
      addLayer(Math.floor(count * 0.12), 0.12, tomatoColor, 'tomato');
      // Верхняя булочка
      addLayer(Math.floor(count * 0.15), 0.2, bunColor, 'top_bun');
      break;

    case 'veggie_burger':
      // Нижняя булочка
      addLayer(Math.floor(count * 0.15), -0.3, bunColor, 'bottom_bun');
      // Вегетарианская котлета
      addLayer(Math.floor(count * 0.2), -0.2, veggieColor, 'veggie_patty');
      // Авокадо (зеленый слой)
      addLayer(Math.floor(count * 0.12), -0.12, () => ({
        r: 0.3 + Math.random() * 0.2,
        g: 0.6 + Math.random() * 0.3,
        b: 0.2 + Math.random() * 0.1
      }), 'avocado');
      // Ростки (светло-зеленые)
      addLayer(Math.floor(count * 0.1), -0.05, () => ({
        r: 0.5 + Math.random() * 0.2,
        g: 0.8 + Math.random() * 0.2,
        b: 0.3 + Math.random() * 0.2
      }), 'sprouts');
      // Помидор
      addLayer(Math.floor(count * 0.12), 0.02, tomatoColor, 'tomato');
      // Салат
      addLayer(Math.floor(count * 0.15), 0.09, lettuceColor, 'lettuce');
      // Веганский майонез (белый крем)
      addLayer(Math.floor(count * 0.08), 0.15, () => ({
        r: 0.95 + Math.random() * 0.05,
        g: 0.95 + Math.random() * 0.05,
        b: 0.85 + Math.random() * 0.1
      }), 'vegan_mayo');
      // Верхняя булочка
      addLayer(Math.floor(count * 0.15), 0.22, bunColor, 'top_bun');
      break;

    case 'double_burger':
      // Нижняя булочка
      addLayer(Math.floor(count * 0.12), -0.4, bunColor, 'bottom_bun');
      // Первая котлета
      addLayer(Math.floor(count * 0.15), -0.3, pattyColor, 'patty1');
      // Первый сыр
      addLayer(Math.floor(count * 0.08), -0.23, cheeseColor, 'cheese1');
      // Вторая котлета
      addLayer(Math.floor(count * 0.15), -0.16, pattyColor, 'patty2');
      // Второй сыр
      addLayer(Math.floor(count * 0.08), -0.09, cheeseColor, 'cheese2');
      // Салат
      addLayer(Math.floor(count * 0.12), -0.02, lettuceColor, 'lettuce');
      // Помидор
      addLayer(Math.floor(count * 0.1), 0.05, tomatoColor, 'tomato');
      // Луковые колечки
      addLayer(Math.floor(count * 0.08), 0.12, () => ({
        r: 0.8 + Math.random() * 0.2,
        g: 0.7 + Math.random() * 0.2,
        b: 0.5 + Math.random() * 0.2
      }), 'onions');
      // Специальный соус (красноватая подливка)
      addLayer(Math.floor(count * 0.05), 0.18, () => ({
        r: 0.7 + Math.random() * 0.2,
        g: 0.2 + Math.random() * 0.2,
        b: 0.2 + Math.random() * 0.1
      }), 'special_sauce');
      // Верхняя булочка
      addLayer(Math.floor(count * 0.12), 0.25, bunColor, 'top_bun');
      break;

    case 'cheese_burger':
      // Нижняя булочка
      addLayer(Math.floor(count * 0.15), -0.25, bunColor, 'bottom_bun');
      // Котлета
      addLayer(Math.floor(count * 0.25), -0.15, pattyColor, 'patty');
      // Сыр
      addLayer(Math.floor(count * 0.15), -0.05, cheeseColor, 'cheese');
      // Салат
      addLayer(Math.floor(count * 0.15), 0.02, lettuceColor, 'lettuce');
      // Помидор
      addLayer(Math.floor(count * 0.15), 0.09, tomatoColor, 'tomato');
      // Специальный соус
      addLayer(Math.floor(count * 0.1), 0.15, () => ({
        r: 0.6 + Math.random() * 0.2,
        g: 0.3 + Math.random() * 0.2,
        b: 0.1 + Math.random() * 0.1
      }), 'special_sauce');
      // Верхняя булочка
      addLayer(Math.floor(count * 0.15), 0.22, bunColor, 'top_bun');
      break;

    default: // classic_burger
      // Нижняя булочка
      addLayer(Math.floor(count * 0.15), -0.25, bunColor, 'bottom_bun');
      // Котлета
      addLayer(Math.floor(count * 0.2), -0.15, pattyColor, 'patty');
      // Салат
      addLayer(Math.floor(count * 0.2), -0.05, lettuceColor, 'lettuce');
      // Помидор
      addLayer(Math.floor(count * 0.15), 0.05, tomatoColor, 'tomato');
      // Лук
      addLayer(Math.floor(count * 0.1), 0.12, () => ({
        r: 0.8 + Math.random() * 0.2,
        g: 0.7 + Math.random() * 0.2,
        b: 0.6 + Math.random() * 0.2
      }), 'onion');
      // Огурцы (ярко-зеленые)
      addLayer(Math.floor(count * 0.1), 0.18, () => ({
        r: 0.2 + Math.random() * 0.2,
        g: 0.8 + Math.random() * 0.2,
        b: 0.2 + Math.random() * 0.1
      }), 'pickles');
      // Верхняя булочка
      addLayer(Math.floor(count * 0.15), 0.25, bunColor, 'top_bun');
      break;
  }

  return {
    positions,
    colors,
    opacities,
    scales,
    rotations,
    modelInfo: modelConfig
  };
};

// Export the model data generator
export { BURGER_MODELS, generateBurgerSplatData };