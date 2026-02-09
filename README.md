# 🍔 AR Burger Menu

Web-based Augmented Reality application for interactive burger menu visualization using Gaussian Splatting technology.

## Features

- **Web AR Experience**: Works directly in mobile browsers without app installation
- **QR Code Scanning**: Scan QR codes from physical menus to trigger 3D models
- **Gaussian Splatting Rendering**: High-quality 3D burger visualization
- **Multiple Burger Types**: Classic, Cheese, Bacon, Veggie, and Double burgers
- **Interactive 3D Models**: Rotate, zoom, and explore burgers in AR space
- **Responsive Design**: Works on phones, tablets, and desktop browsers

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- Modern web browser with WebGL support
- Camera access (for mobile devices)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ar-burger-menu
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open the application in your browser:
   - Desktop: http://localhost:5173
   - Mobile: Scan the QR code shown in terminal

### Usage

1. **Browse Menu**: View the digital menu with different burger options
2. **Select Burger**: Click on any burger to enter AR mode
3. **Scan QR Code**: Point your camera at the corresponding QR code on the physical menu
4. **View in AR**: Watch the 3D burger model appear and interact with it
5. **Explore**: Rotate the model by moving your device or using touch controls

## Technical Architecture

### Core Components

- **ARScene.jsx**: Main AR rendering engine with camera integration
- **GaussianBurger.jsx**: Gaussian Splatting renderer for 3D burger models
- **QRScanner.jsx**: Real-time QR code detection using device camera
- **burgerModels.js**: Synthetic Gaussian splat data generation for different burger types

### Technologies Used

- **React** with **Vite**: Fast development and build tooling
- **Three.js** with **@react-three/fiber**: 3D rendering and WebGL
- **jsQR**: Client-side QR code scanning
- **Gaussian Splatting**: Advanced 3D point cloud rendering technique

### Burger Models

The application includes 5 different burger types with unique visual characteristics:

1. **Classic Burger** - Traditional beef patty with lettuce and tomato
2. **Cheese Burger** - Beef patty with melted cheddar cheese
3. **Bacon Deluxe** - Premium burger with crispy bacon and caramelized onions
4. **Veggie Supreme** - Plant-based patty with fresh vegetables
5. **Double Trouble** - Two beef patties with double cheese

Each model is procedurally generated using Gaussian Splatting techniques to create realistic 3D representations.

## Deployment

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Hosting Options
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect GitHub repository for automatic deployments
- **GitHub Pages**: Configure workflow to deploy `dist` folder

## Customization

### Adding New Burger Types

1. Add new entry to `BURGER_MODELS` in `src/models/burgerModels.js`
2. Create color functions for new ingredients
3. Add layer generation logic in `generateBurgerSplatData`
4. Update menu items in `App.jsx`

### Styling

Modify CSS variables in `src/App.css`:
- Colors: Primary accent colors
- Typography: Font sizes and families
- Spacing: Padding and margins
- Animations: Transition effects

## Troubleshooting

### Camera Access Issues
- Ensure HTTPS is used in production
- Check browser permissions for camera access
- Test with different browsers if issues persist

### Performance Optimization
- Reduce point count in Gaussian splatting for lower-end devices
- Implement progressive loading for complex models
- Add quality settings based on device capabilities

### QR Scanning Problems
- Ensure adequate lighting conditions
- Hold device steady during scanning
- Check QR code quality and size

## Future Enhancements

- [ ] Import real Gaussian Splatting (.splat) files
- [ ] Add nutritional information display
- [ ] Implement ordering integration
- [ ] Add multiplayer AR experiences
- [ ] Include sound effects and animations
- [ ] Support for custom burger builder

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## Support

For issues and questions, please create an issue in the GitHub repository.