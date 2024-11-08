// import React, { useRef, useEffect } from 'react';

// const GridCanvas = () => {
//     const canvasRef = useRef(null); // Reference to the canvas element

//     // Constants for the grid
//     const numColumns = 50; // Number of columns in the grid (represents beats)
//     const numRows = 15; // Number of rows in the grid (represents note values)

//     const drawGrid = (ctx, width, height) => {
//         const columnWidth = width / numColumns; // Calculate column width
//         const rowHeight = height / numRows; // Calculate row height

//         ctx.clearRect(0, 0, width, height); // Clear the canvas before redrawing
//         ctx.strokeStyle = '#ccc'; // Light gray color for the grid lines
//         ctx.lineWidth = 0.5; // Thin lines for the grid

//         // Draw vertical lines (for beats)
//         for (let i = 0; i <= numColumns; i++) {
//             ctx.beginPath();
//             ctx.moveTo(i * columnWidth, 0);
//             ctx.lineTo(i * columnWidth, height);
//             ctx.stroke();
//         }

//         // Draw horizontal lines (for note values)
//         for (let j = 0; j <= numRows; j++) {
//             ctx.beginPath();
//             ctx.moveTo(0, j * rowHeight);
//             ctx.lineTo(width, j * rowHeight);
//             ctx.stroke();
//         }
//     };

//     useEffect(() => {
//         const canvas = canvasRef.current; // Get canvas reference
//         const ctx = canvas.getContext('2d'); // Get canvas drawing context
//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth; // Set canvas width to window width
//             canvas.height = window.innerHeight; // Set canvas height to window height
//             drawGrid(ctx, canvas.width, canvas.height); // Draw the grid on resize
//         };

//         // Initial draw and setup resize event
//         resizeCanvas();
//         window.addEventListener('resize', resizeCanvas); // Redraw grid when window is resized

//         return () => {
//             window.removeEventListener('resize', resizeCanvas); // Cleanup on component unmount
//         };
//     }, []);

//     return (
//         <canvas ref={canvasRef} className="grid-canvas"/> // Canvas for the grid
//     );
// };

// export default GridCanvas;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useRef, useEffect } from 'react';

// const GridCanvas = () => {
//     const canvasRef = useRef(null); // Reference to the canvas element

//     // Constants for the grid
//     const numDotsX = 50; // Number of dots horizontally
//     const numDotsY = 15; // Number of dots vertically
//     const dotRadius = 3; // Radius of the dots

//     // Function to draw the dots on the canvas
//     const drawDots = (ctx, width, height) => {
//         const dotSpacingX = width / numDotsX; // Spacing between dots horizontally
//         const dotSpacingY = height / numDotsY; // Spacing between dots vertically

//         ctx.clearRect(0, 0, width, height); // Clear the canvas before drawing
//         ctx.fillStyle = '#cfcccc'; // Red color for the dots

//         // Draw dots in a grid-like pattern, but with space in between
//         for (let i = 0; i < numDotsX; i++) {
//             for (let j = 0; j < numDotsY; j++) {
//                 const x = i * dotSpacingX + dotSpacingX / 2; // X position of the dot
//                 const y = j * dotSpacingY + dotSpacingY / 2; // Y position of the dot

//                 ctx.beginPath();
//                 ctx.arc(x, y, dotRadius, 0, Math.PI * 2); // Draw a dot (circle)
//                 ctx.fill();
//             }
//         }
//     };

//     useEffect(() => {
//         const canvas = canvasRef.current; // Get the canvas reference
//         const ctx = canvas.getContext('2d'); // Get the canvas drawing context
//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth; // Set canvas width to window width
//             canvas.height = window.innerHeight; // Set canvas height to window height
//             drawDots(ctx, canvas.width, canvas.height); // Draw dots when canvas is resized
//         };

//         // Initial draw and setup resize event
//         resizeCanvas();
//         window.addEventListener('resize', resizeCanvas); // Redraw dots when window is resized

//         return () => {
//             window.removeEventListener('resize', resizeCanvas); // Cleanup on component unmount
//         };
//     }, []);

//     return (
//         <canvas ref={canvasRef} className="grid-canvas"/> // Canvas for the dots
//     );
// };

// export default GridCanvas;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useRef, useEffect } from 'react';

// const GridCanvas = ({ showGrid }) => {
//     const canvasRef = useRef(null);

//     const numDotsX = 50;
//     const numDotsY = 15;
//     const dotRadius = 3;

//     const drawDots = (ctx, width, height) => {
//         const dotSpacingX = width / numDotsX;
//         const dotSpacingY = height / numDotsY;
//         ctx.clearRect(0, 0, width, height);

//         if (!showGrid) return; // Only draw dots if `showGrid` is true

//         ctx.fillStyle = '#cfcccc';
//         for (let i = 0; i < numDotsX; i++) {
//             for (let j = 0; j < numDotsY; j++) {
//                 const x = i * dotSpacingX + dotSpacingX / 2;
//                 const y = j * dotSpacingY + dotSpacingY / 2;
//                 ctx.beginPath();
//                 ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
//                 ctx.fill();
//             }
//         }
//     };

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             drawDots(ctx, canvas.width, canvas.height);
//         };

//         resizeCanvas();
//         window.addEventListener('resize', resizeCanvas);
//         return () => window.removeEventListener('resize', resizeCanvas);
//     }, [showGrid]); // Redraw when `showGrid` changes

//     return <canvas ref={canvasRef} className="grid-canvas" />;
// };

// export default GridCanvas;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useRef, useEffect } from 'react';

// const GridCanvas = ({ showGrid, scannedColumn }) => {
//     const canvasRef = useRef(null);

//     const numDotsX = 50;
//     const numDotsY = 15;
//     const dotRadius = 3;

//     const drawDots = (ctx, width, height) => {
//         const dotSpacingX = width / numDotsX;
//         const dotSpacingY = height / numDotsY;

//         ctx.clearRect(0, 0, width, height);

//         for (let i = 0; i < numDotsX; i++) {
//             for (let j = 0; j < numDotsY; j++) {
//                 const x = i * dotSpacingX + dotSpacingX / 2;
//                 const y = j * dotSpacingY + dotSpacingY / 2;

//                 ctx.fillStyle = i === scannedColumn ? '#ff5733' : '#cfcccc';
//                 ctx.beginPath();
//                 ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
//                 ctx.fill();
//             }
//         }
//     };

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return; // Exit if canvasRef is not defined

//         const ctx = canvas.getContext('2d');
//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             drawDots(ctx, canvas.width, canvas.height);
//         };

//         resizeCanvas();
//         window.addEventListener('resize', resizeCanvas);

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//         };
//     }, [scannedColumn]);

//     return showGrid ? <canvas ref={canvasRef} className="grid-canvas" /> : null;
// };

// export default GridCanvas;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useRef, useEffect } from 'react';
// import { getStroke } from 'perfect-freehand';

// const GridCanvas = ({ showGrid, scannedColumn }) => {
//     const canvasRef = useRef(null);

//     const numDotsX = 50;
//     const numDotsY = 15;
//     const dotRadius = 3; // Base radius for defining the smooth dots

//     const drawSmoothDot = (ctx, x, y, color) => {
//         const circlePoints = [
//             [x - dotRadius, y],   // Left
//             [x, y - dotRadius],   // Top
//             [x + dotRadius, y],   // Right
//             [x, y + dotRadius],   // Bottom
//             [x - dotRadius, y]    // Closing the circle
//         ];
    
//         const path = getStroke(circlePoints, {
//             size: dotRadius * 2,
//             thinning: 0,
//             smoothing: 1,     // Maximize smoothing for roundness
//             streamline: 1,    // Increase streamline for a consistent shape
//             start: { taper: 0 }, // Remove any tapering at the start
//             end: { taper: 0 },   // Remove any tapering at the end
//         });
    
//         ctx.fillStyle = color;
//         ctx.beginPath();
//         path.forEach(([px, py], i) => {
//             if (i === 0) {
//                 ctx.moveTo(px, py);
//             } else {
//                 ctx.lineTo(px, py);
//             }
//         });
//         ctx.closePath();
//         ctx.fill();
//     };

//     const drawDots = (ctx, width, height) => {
//         const dotSpacingX = width / numDotsX;
//         const dotSpacingY = height / numDotsY;

//         ctx.clearRect(0, 0, width, height);

//         for (let i = 0; i < numDotsX; i++) {
//             for (let j = 0; j < numDotsY; j++) {
//                 const x = i * dotSpacingX + dotSpacingX / 2;
//                 const y = j * dotSpacingY + dotSpacingY / 2;
//                 const color = i === scannedColumn ? 'rgba(139, 139, 139, 0.4)' : 'rgba(203, 203, 203, 0.4)';
                
//                 // Use perfect-freehand to draw a smooth dot
//                 drawSmoothDot(ctx, x, y, color);
//             }
//         }
//     };

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             drawDots(ctx, canvas.width, canvas.height);
//         };

//         resizeCanvas();
//         window.addEventListener('resize', resizeCanvas);

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//         };
//     }, [scannedColumn]);

//     return showGrid ? <canvas ref={canvasRef} className="grid-canvas" /> : null;
// };

// export default GridCanvas;

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useRef, useEffect } from 'react';
// import { getStroke } from 'perfect-freehand';

// const GridCanvas = ({ showGrid, scannedColumn }) => {
//     const canvasRef = useRef(null);

//     const numDotsX = 50;
//     const numDotsY = 15;
//     const dotRadius = 3;

//     const drawSmoothDot = (ctx, x, y, color, isScanned) => {
//         const circlePoints = [
//             [x - dotRadius, y],
//             [x, y - dotRadius],
//             [x + dotRadius, y],
//             [x, y + dotRadius],
//             [x - dotRadius, y]
//         ];

//         const path = getStroke(circlePoints, {
//             size: dotRadius * 2,
//             thinning: 0,
//             smoothing: 1,
//             streamline: 1,
//             start: { taper: 0 },
//             end: { taper: 0 },
//         });

//         // Apply glow effect for scanned dots
//         if (isScanned) {
//             // ctx.shadowColor = color;
//             ctx.shadowColor = 'rgba(171, 121, 121, 0.7)';
//             ctx.shadowBlur = 10; // Adjust for the intensity of glow
//             ctx.shadowOffsetX = 0;
//             ctx.shadowOffsetY = 0;
//         } else {
//             ctx.shadowColor = 'transparent';
//             ctx.shadowBlur = 0;
//         }

//         ctx.fillStyle = color;
//         ctx.beginPath();
//         path.forEach(([px, py], i) => {
//             if (i === 0) {
//                 ctx.moveTo(px, py);
//             } else {
//                 ctx.lineTo(px, py);
//             }
//         });
//         ctx.closePath();
//         ctx.fill();
//     };

//     const drawDots = (ctx, width, height) => {
//         const dotSpacingX = width / numDotsX;
//         const dotSpacingY = height / numDotsY;

//         ctx.clearRect(0, 0, width, height);

//         for (let i = 0; i < numDotsX; i++) {
//             for (let j = 0; j < numDotsY; j++) {
//                 const x = i * dotSpacingX + dotSpacingX / 2;
//                 const y = j * dotSpacingY + dotSpacingY / 2;
//                 const color = i === scannedColumn ? 'rgba(171, 121, 121, 0.7)' : 'rgba(207, 204, 204, 0.7)';

//                 // Draw the dot with or without glow based on if it’s in the scanned column
//                 drawSmoothDot(ctx, x, y, color, i === scannedColumn);
//             }
//         }
//     };

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             drawDots(ctx, canvas.width, canvas.height);
//         };

//         resizeCanvas();
//         window.addEventListener('resize', resizeCanvas);

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//         };
//     }, [scannedColumn]);

//     return showGrid ? <canvas ref={canvasRef} className="grid-canvas" /> : null;
// };

// export default GridCanvas;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useRef, useEffect } from 'react';
// import { getStroke } from 'perfect-freehand';

// const GridCanvas = ({ showGrid, scannedColumn }) => {
//     const canvasRef = useRef(null);

//     const numDotsX = 50;
//     const numDotsY = 15;
//     const dotRadius = 3;

//     // Function to draw a highly saturated glowing dot
//     const drawGlowingDot = (ctx, x, y, baseColor) => {
//         const glowLayers = [
//             // { blur: 30, sizeMultiplier: 4, color: `${baseColor}33` }, // Outer glow (lighter)
//             // { blur: 20, sizeMultiplier: 3, color: `${baseColor}66` }, // Mid glow
//             // { blur: 10, sizeMultiplier: 2, color: `${baseColor}AA` }, // Inner glow
//             // { blur: 0, sizeMultiplier: 1, color: baseColor } // Core dot
//             { blur: 10, sizeMultiplier: 4, color: `rgba(255, 88, 51, 0.08)` }, // Outer glow (lighter)
//             { blur: 10, sizeMultiplier: 3, color: `rgba(255, 204, 51, 0.28)` }, // Mid glow
//             { blur: 10, sizeMultiplier: 2, color: `rgba(255, 95, 51, 0.32)` }, // Inner glow
//             { blur: 10, sizeMultiplier: 1, color: 'rgba(255, 51, 51, 0.43)' } // Core dot
//         ];

//         glowLayers.forEach(({ blur, sizeMultiplier, color }) => {
//             ctx.shadowColor = color;
//             ctx.shadowBlur = blur;
//             ctx.fillStyle = color;

//             ctx.beginPath();
//             ctx.arc(x, y, dotRadius * sizeMultiplier, 0, Math.PI * 2);
//             ctx.closePath();
//             ctx.fill();
//         });

//         // Reset shadow settings after drawing glow
//         ctx.shadowColor = 'transparent';
//         ctx.shadowBlur = 0;
//     };

//     const drawSmoothDot = (ctx, x, y, color, isScanned) => {
//         if (isScanned) {
//             drawGlowingDot(ctx, x, y, color); // Use glowing effect for scanned dots
//         } else {
//             const circlePoints = [
//                 [x - dotRadius, y],
//                 [x, y - dotRadius],
//                 [x + dotRadius, y],
//                 [x, y + dotRadius],
//                 [x - dotRadius, y]
//             ];

//             const path = getStroke(circlePoints, {
//                 size: dotRadius * 2,
//                 thinning: 0,
//                 smoothing: 1,
//                 streamline: 1,
//                 start: { taper: 0 },
//                 end: { taper: 0 },
//             });

//             ctx.fillStyle = color;
//             ctx.beginPath();
//             path.forEach(([px, py], i) => {
//                 if (i === 0) {
//                     ctx.moveTo(px, py);
//                 } else {
//                     ctx.lineTo(px, py);
//                 }
//             });
//             ctx.closePath();
//             ctx.fill();
//         }
//     };

//     const drawDots = (ctx, width, height) => {
//         const dotSpacingX = width / numDotsX;
//         const dotSpacingY = height / numDotsY;

//         ctx.clearRect(0, 0, width, height);

//         for (let i = 0; i < numDotsX; i++) {
//             for (let j = 0; j < numDotsY; j++) {
//                 const x = i * dotSpacingX + dotSpacingX / 2;
//                 const y = j * dotSpacingY + dotSpacingY / 2;
//                 const color = i === scannedColumn ? 'rgba(255, 87, 51, 1)' : 'rgba(207, 204, 204, 0.7)';

//                 // Draw the dot with or without glow based on if it’s in the scanned column
//                 drawSmoothDot(ctx, x, y, color, i === scannedColumn);
//             }
//         }
//     };

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             drawDots(ctx, canvas.width, canvas.height);
//         };

//         resizeCanvas();
//         window.addEventListener('resize', resizeCanvas);

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//         };
//     }, [scannedColumn]);

//     return showGrid ? <canvas ref={canvasRef} className="grid-canvas" /> : null;
// };

// export default GridCanvas;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useRef, useEffect } from 'react';
// import { getStroke } from 'perfect-freehand';

// const GridCanvas = ({ showGrid, scannedColumn }) => {
//     const canvasRef = useRef(null);
//     const numDotsX = 50;
//     const numDotsY = 15;
//     const dotRadius = 3;

//     // Function to draw a highly saturated, colorful glowing dot
//     const drawGlowingDot = (ctx, x, y) => {
//         const glowLayers = [
//             { blur: 20, sizeMultiplier: 6, color: `rgba(255, 102, 0, 0.07)` },  // Deep outer glow (orange)
//             { blur: 15, sizeMultiplier: 4.5, color: `rgba(255, 153, 51, 0.15)` }, // Mid glow (amber)
//             { blur: 10, sizeMultiplier: 3, color: `rgba(255, 204, 102, 0.25)` },  // Inner glow (yellow)
//             { blur: 5, sizeMultiplier: 2, color: `rgba(255, 255, 204, 0.5)` },    // Core glow (light yellow)
//             { blur: 0, sizeMultiplier: 1, color: 'rgba(255, 255, 255, 0.8)' }     // Bright core (white)
//         ];

//         glowLayers.forEach(({ blur, sizeMultiplier, color }) => {
//             ctx.shadowColor = color;
//             ctx.shadowBlur = blur;
//             ctx.fillStyle = color;

//             ctx.beginPath();
//             ctx.arc(x, y, dotRadius * sizeMultiplier, 0, Math.PI * 2);
//             ctx.closePath();
//             ctx.fill();
//         });

//         // Reset shadow settings after drawing glow
//         ctx.shadowColor = 'transparent';
//         ctx.shadowBlur = 0;
//     };

//     const drawSmoothDot = (ctx, x, y, color, isScanned) => {
//         if (isScanned) {
//             drawGlowingDot(ctx, x, y); // Use glowing effect for scanned dots
//         } else {
//             const circlePoints = [
//                 [x - dotRadius, y],
//                 [x, y - dotRadius],
//                 [x + dotRadius, y],
//                 [x, y + dotRadius],
//                 [x - dotRadius, y]
//             ];

//             const path = getStroke(circlePoints, {
//                 size: dotRadius * 2,
//                 thinning: 0,
//                 smoothing: 1,
//                 streamline: 1,
//                 start: { taper: 0 },
//                 end: { taper: 0 },
//             });

//             ctx.fillStyle = color;
//             ctx.beginPath();
//             path.forEach(([px, py], i) => {
//                 if (i === 0) {
//                     ctx.moveTo(px, py);
//                 } else {
//                     ctx.lineTo(px, py);
//                 }
//             });
//             ctx.closePath();
//             ctx.fill();
//         }
//     };

//     const drawDots = (ctx, width, height) => {
//         const dotSpacingX = width / numDotsX;
//         const dotSpacingY = height / numDotsY;

//         ctx.clearRect(0, 0, width, height);

//         for (let i = 0; i < numDotsX; i++) {
//             for (let j = 0; j < numDotsY; j++) {
//                 const x = i * dotSpacingX + dotSpacingX / 2;
//                 const y = j * dotSpacingY + dotSpacingY / 2;
//                 const color = i === scannedColumn ? 'rgba(255, 87, 51, 1)' : 'rgba(207, 204, 204, 0.7)';

//                 // Draw the dot with or without glow based on if it’s in the scanned column
//                 drawSmoothDot(ctx, x, y, color, i === scannedColumn);
//             }
//         }
//     };

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             drawDots(ctx, canvas.width, canvas.height);
//         };

//         resizeCanvas();
//         window.addEventListener('resize', resizeCanvas);

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//         };
//     }, [scannedColumn]);

//     return showGrid ? <canvas ref={canvasRef} className="grid-canvas" /> : null;
// };

// export default GridCanvas;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useRef, useEffect } from 'react';
// import { getStroke } from 'perfect-freehand';

// const GridCanvas = ({ showGrid, scannedColumn, intersectedDots }) => {
//     const canvasRef = useRef(null);
//     const numDotsX = 50;
//     const numDotsY = 15;
//     const dotRadius = 3;

//     // Function to draw a highly saturated glowing dot
//     const drawGlowingDot = (ctx, x, y, color) => {
//         const glowLayers = [
//             { blur: 20, sizeMultiplier: 6, color: `${color}33` },
//             { blur: 15, sizeMultiplier: 4.5, color: `${color}66` },
//             { blur: 10, sizeMultiplier: 3, color: `${color}99` },
//             { blur: 5, sizeMultiplier: 2, color: `${color}CC` },
//             { blur: 0, sizeMultiplier: 1, color }
//         ];

//         glowLayers.forEach(({ blur, sizeMultiplier, color }) => {
//             ctx.shadowColor = color;
//             ctx.shadowBlur = blur;
//             ctx.fillStyle = color;

//             ctx.beginPath();
//             ctx.arc(x, y, dotRadius * sizeMultiplier, 0, Math.PI * 2);
//             ctx.closePath();
//             ctx.fill();
//         });

//         // Reset shadow settings after drawing glow
//         ctx.shadowColor = 'transparent';
//         ctx.shadowBlur = 0;
//     };

//     const drawSmoothDot = (ctx, x, y, color, isScanned, isIntersected) => {
//         if (isScanned || isIntersected) {
//             drawGlowingDot(ctx, x, y, color);
//         } else {
//             const circlePoints = [
//                 [x - dotRadius, y],
//                 [x, y - dotRadius],
//                 [x + dotRadius, y],
//                 [x, y + dotRadius],
//                 [x - dotRadius, y]
//             ];

//             const path = getStroke(circlePoints, {
//                 size: dotRadius * 2,
//                 thinning: 0,
//                 smoothing: 1,
//                 streamline: 1,
//                 start: { taper: 0 },
//                 end: { taper: 0 },
//             });

//             ctx.fillStyle = color;
//             ctx.beginPath();
//             path.forEach(([px, py], i) => {
//                 if (i === 0) {
//                     ctx.moveTo(px, py);
//                 } else {
//                     ctx.lineTo(px, py);
//                 }
//             });
//             ctx.closePath();
//             ctx.fill();
//         }
//     };

//     const drawDots = (ctx, width, height) => {
//         const dotSpacingX = width / numDotsX;
//         const dotSpacingY = height / numDotsY;

//         ctx.clearRect(0, 0, width, height);

//         for (let i = 0; i < numDotsX; i++) {
//             for (let j = 0; j < numDotsY; j++) {
//                 const x = i * dotSpacingX + dotSpacingX / 2;
//                 const y = j * dotSpacingY + dotSpacingY / 2;
                
//                 const isScanned = i === scannedColumn;
//                 const intersectData = intersectedDots?.[i]?.[j];
//                 const isIntersected = Boolean(intersectData);
                
//                 const color = isIntersected ? intersectData.color : (isScanned ? 'rgba(255, 87, 51, 1)' : 'rgba(207, 204, 204, 0.7)');

//                 drawSmoothDot(ctx, x, y, color, isScanned, isIntersected);
//             }
//         }
//     };

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             drawDots(ctx, canvas.width, canvas.height);
//         };

//         resizeCanvas();
//         window.addEventListener('resize', resizeCanvas);

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//         };
//     }, [scannedColumn, intersectedDots]);

//     return showGrid ? <canvas ref={canvasRef} className="grid-canvas" /> : null;
// };

// export default GridCanvas;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useRef, useEffect } from 'react';
// import { getStroke } from 'perfect-freehand';

// const GridCanvas = ({ showGrid, scannedColumn, intersectedDots }) => {
//     const canvasRef = useRef(null);
//     const numDotsX = 50;
//     const numDotsY = 15;
//     const dotRadius = 3;

//     // Function to draw a highly saturated glowing dot
//     const drawGlowingDot = (ctx, x, y, color) => {
//         const glowLayers = [
//             { blur: 20, sizeMultiplier: 6, color: `${color}33` },
//             { blur: 15, sizeMultiplier: 4.5, color: `${color}66` },
//             { blur: 10, sizeMultiplier: 3, color: `${color}99` },
//             { blur: 5, sizeMultiplier: 2, color: `${color}CC` },
//             { blur: 0, sizeMultiplier: 1, color }
//             // { blur: 20, sizeMultiplier: 6, color: `#ff6600` },  // Deep outer glow (orange)
//             // { blur: 15, sizeMultiplier: 4.5, color: `#ff9933` }, // Mid glow (amber)
//             // { blur: 10, sizeMultiplier: 3, color: `#ffcc66` },  // Inner glow (yellow)
//             // { blur: 5, sizeMultiplier: 2, color: `#ffffcc` },    // Core glow (light yellow)
//             // { blur: 0, sizeMultiplier: 1, color: color }     // Bright core (white)
//         ];

//         glowLayers.forEach(({ blur, sizeMultiplier, color }) => {
//             ctx.shadowColor = color;
//             ctx.shadowBlur = blur;
//             ctx.fillStyle = color;

//             ctx.beginPath();
//             ctx.arc(x, y, dotRadius * sizeMultiplier, 0, Math.PI * 2);
//             ctx.closePath();
//             ctx.fill();
//         });

//         // Reset shadow settings after drawing glow
//         ctx.shadowColor = 'transparent';
//         ctx.shadowBlur = 0;
//     };

//     const drawSmoothDot = (ctx, x, y, color, isScanned, isIntersected) => {
//         if (isScanned || isIntersected) {
//             drawGlowingDot(ctx, x, y, color);
//         } else {
//             const circlePoints = [
//                 [x - dotRadius, y],
//                 [x, y - dotRadius],
//                 [x + dotRadius, y],
//                 [x, y + dotRadius],
//                 [x - dotRadius, y]
//             ];

//             const path = getStroke(circlePoints, {
//                 size: dotRadius * 2,
//                 thinning: 0,
//                 smoothing: 1,
//                 streamline: 1,
//                 start: { taper: 0 },
//                 end: { taper: 0 },
//             });

//             ctx.fillStyle = color;
//             ctx.beginPath();
//             path.forEach(([px, py], i) => {
//                 if (i === 0) {
//                     ctx.moveTo(px, py);
//                 } else {
//                     ctx.lineTo(px, py);
//                 }
//             });
//             ctx.closePath();
//             ctx.fill();
//         }
//     };

//     const drawDots = (ctx, width, height) => {
//         const dotSpacingX = width / numDotsX;
//         const dotSpacingY = height / numDotsY;
    
//         ctx.clearRect(0, 0, width, height);
    
//         for (let i = 0; i < numDotsX; i++) {
//             for (let j = 0; j < numDotsY; j++) {
//                 const x = i * dotSpacingX + dotSpacingX / 2;
//                 const y = j * dotSpacingY + dotSpacingY / 2;
                
//                 console.log(`Dot at row ${j}, column ${i}, x: ${x}, y: ${y}`);

//                 const isScanned = i === scannedColumn; // Check if it's the scanned column
//                 const intersectData = intersectedDots?.[i]?.[j]; // Check if this dot is intersected
//                 const isIntersected = Boolean(intersectData);
                
//                 // Use mild glow for scanned column, and intense glow if it’s intersected
//                 if (isScanned && isIntersected) {
//                     const lineColor = intersectData.color; // Use the color of the intersected line
//                     drawGlowingDot(ctx, x, y, lineColor); // Draw intense glow
//                 } else if (isScanned) {
//                     drawSmoothDot(ctx, x, y, 'rgba(255, 88, 51, 0.11)', true); // Mild glow for regular scanned dots
//                 } else {
//                     drawSmoothDot(ctx, x, y, 'rgba(207, 204, 204, 0.7)', false); // Regular dot color for unscanned
//                 }
//             }
//         }
//     };

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             drawDots(ctx, canvas.width, canvas.height);
//         };

//         resizeCanvas();
//         window.addEventListener('resize', resizeCanvas);

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//         };
//     }, [scannedColumn, intersectedDots]);

//     return showGrid ? <canvas ref={canvasRef} className="grid-canvas" /> : null;
// };

// export default GridCanvas;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useRef, useEffect } from 'react';
// import { getStroke } from 'perfect-freehand';

// const GridCanvas = ({ showGrid, scannedColumn, intersectedDots }) => {
//     const canvasRef = useRef(null);
//     const numDotsX = 50;
//     const numDotsY = 15;
//     const dotRadius = 3;

//     // Function to draw a highly saturated glowing dot
//     const drawGlowingDot = (ctx, x, y, color) => {
//         // console.log(`Drawing glowing dot at x: ${x}, y: ${y}, color: ${color}`);
//         const glowLayers = [
//             // { blur: 20, sizeMultiplier: 6, color: `${color}33` },
//             { blur: 10, sizeMultiplier: 4, color: `${color}33` },
//             { blur: 15, sizeMultiplier: 4.5, color: `${color}66` },
//             { blur: 10, sizeMultiplier: 3, color: `${color}99` },
//             { blur: 5, sizeMultiplier: 2, color: `${color}CC` },
//             { blur: 0, sizeMultiplier: 1, color }
//         ];

//         glowLayers.forEach(({ blur, sizeMultiplier, color }) => {
//             ctx.shadowColor = color;
//             ctx.shadowBlur = blur;
//             ctx.fillStyle = color;

//             ctx.beginPath();
//             ctx.arc(x, y, dotRadius * sizeMultiplier, 0, Math.PI * 2);
//             ctx.closePath();
//             ctx.fill();
//         });

//         // Reset shadow settings after drawing glow
//         ctx.shadowColor = 'transparent';
//         ctx.shadowBlur = 0;
//     };

//     const drawSmoothDot = (ctx, x, y, color, isScanned, isIntersected) => {
//         // console.log(`Drawing smooth dot at x: ${x}, y: ${y}, color: ${color}, isScanned: ${isScanned}, isIntersected: ${isIntersected}`);
//         if (isScanned || isIntersected) {
//             drawGlowingDot(ctx, x, y, color);
//         } else {
//             const circlePoints = [
//                 [x - dotRadius, y],
//                 [x, y - dotRadius],
//                 [x + dotRadius, y],
//                 [x, y + dotRadius],
//                 [x - dotRadius, y]
//             ];

//             const path = getStroke(circlePoints, {
//                 size: dotRadius * 2,
//                 thinning: 0,
//                 smoothing: 1,
//                 streamline: 1,
//                 start: { taper: 0 },
//                 end: { taper: 0 },
//             });

//             ctx.fillStyle = color;
//             ctx.beginPath();
//             path.forEach(([px, py], i) => {
//                 if (i === 0) {
//                     ctx.moveTo(px, py);
//                 } else {
//                     ctx.lineTo(px, py);
//                 }
//             });
//             ctx.closePath();
//             ctx.fill();
//         }
//     };

//     const drawDots = (ctx, width, height) => {
//         const dotSpacingX = width / numDotsX;
//         const dotSpacingY = height / numDotsY;
    
//         ctx.clearRect(0, 0, width, height);
    
//         for (let i = 0; i < numDotsX; i++) {
//             for (let j = 0; j < numDotsY; j++) {
//                 const x = i * dotSpacingX + dotSpacingX / 2;
//                 const y = j * dotSpacingY + dotSpacingY / 2;
    
//                 const isScanned = i === scannedColumn;
//                 const intersectData = intersectedDots?.[i]?.[j];
//                 const isIntersected = Boolean(intersectData);
    
//                 // console.log(`Rendering dot at (${i}, ${j}) - Scanned: ${isScanned}, Intersected: ${isIntersected}, Color: ${intersectData?.color}`);
//                 // console.log('Intersected dots in GridCanvas:', intersectedDots);
//                 // Combine conditions to avoid duplicate glow
//                 if (isScanned && isIntersected) {
//                     drawGlowingDot(ctx, x, y, intersectData.color); // Intense glow
//                 } else if (isScanned) {
//                     drawSmoothDot(ctx, x, y, 'rgba(255, 88, 51, 0.11)', true); // Mild glow
//                 } else {
//                     drawSmoothDot(ctx, x, y, 'rgba(207, 204, 204, 0.7)', false); // Default dot color
//                 }
//             }
//         }
//     };

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             drawDots(ctx, canvas.width, canvas.height);
//         };

//         resizeCanvas();
//         window.addEventListener('resize', resizeCanvas);

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//         };
//     }, [scannedColumn, intersectedDots]);

//     return showGrid ? <canvas ref={canvasRef} className="grid-canvas" /> : null;
// };

// export default GridCanvas;

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useRef, useEffect } from 'react';
import { getStroke } from 'perfect-freehand';

const GridCanvas = ({ showGrid, scannedColumn, intersectedDots }) => {
    const canvasRef = useRef(null);
    const numDotsX = 50;
    const numDotsY = 15;
    const dotRadius = 3;

    // // Function to draw a glowing dot with confined clipping
    // const drawGlowingDot = (ctx, x, y, color) => {
    //     // ctx.save(); // Save the context state
    //     // ctx.beginPath();
    //     // ctx.arc(x, y, dotRadius * 2, 0, Math.PI * 2); // Draw clipping circle
    //     // ctx.clip(); // Clip to this circle to contain glow

    //     const glowLayers = [
    //         // { blur: 10, sizeMultiplier: 4, color: `${color}33` },
    //         // { blur: 8, sizeMultiplier: 3, color: `${color}66` },
    //         // { blur: 6, sizeMultiplier: 2, color: `${color}99` },
    //         // { blur: 4, sizeMultiplier: 1.5, color: `${color}CC` },
    //         // { blur: 2, sizeMultiplier: 1, color },
    //                     // { blur: 20, sizeMultiplier: 6, color: `${color}33` },
    //         { blur: 10, sizeMultiplier: 4, color: `${color}33` },
    //         { blur: 15, sizeMultiplier: 4.5, color: `${color}66` },
    //         { blur: 10, sizeMultiplier: 3, color: `${color}99` },
    //         { blur: 5, sizeMultiplier: 2, color: `${color}CC` },
    //         { blur: 0, sizeMultiplier: 1, color }
    //     ];

    //     glowLayers.forEach(({ blur, sizeMultiplier, color }) => {
    //         ctx.shadowColor = color;
    //         ctx.shadowBlur = blur;
    //         ctx.fillStyle = color;

    //         ctx.beginPath();
    //         ctx.arc(x, y, dotRadius * sizeMultiplier, 0, Math.PI * 2);
    //         ctx.closePath();
    //         ctx.fill();
    //     });

    //     // Reset shadow settings and restore context after glow rendering
    //     ctx.shadowColor = 'transparent';
    //     ctx.shadowBlur = 0;
    //     ctx.restore();
    // };

    const drawGlowingDot = (ctx, x, y, color) => {
        ctx.save(); // Save the context state
    
        const glowLayers = [
            { blur: 15, sizeMultiplier: 4.5, color: `${color}33` },  // Softer outer glow
            { blur: 10, sizeMultiplier: 3, color: `${color}55` },    // Mid glow
            { blur: 5, sizeMultiplier: 2, color: `${color}99` },     // Inner glow
            { blur: 2, sizeMultiplier: 1.5, color: `${color}CC` }    // Core glow, slightly transparent
        ];
    
        glowLayers.forEach(({ blur, sizeMultiplier, color }) => {
            ctx.shadowColor = color;
            ctx.shadowBlur = blur;
            ctx.fillStyle = color;
    
            ctx.beginPath();
            ctx.arc(x, y, dotRadius * sizeMultiplier, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        });
    
        ctx.restore(); // Restore the original context state
    };

    const drawSmoothDot = (ctx, x, y, color, isScanned, isIntersected) => {
        if (isScanned || isIntersected) {
            drawGlowingDot(ctx, x, y, color);
        } else {
            const circlePoints = [
                [x - dotRadius, y],
                [x, y - dotRadius],
                [x + dotRadius, y],
                [x, y + dotRadius],
                [x - dotRadius, y],
            ];

            const path = getStroke(circlePoints, {
                size: dotRadius * 2,
                thinning: 0,
                smoothing: 1,
                streamline: 1,
                start: { taper: 0 },
                end: { taper: 0 },
            });

            ctx.fillStyle = color;
            ctx.beginPath();
            path.forEach(([px, py], i) => {
                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            });
            ctx.closePath();
            ctx.fill();
        }
    };

    const drawDots = (ctx, width, height) => {
        const dotSpacingX = width / numDotsX;
        const dotSpacingY = height / numDotsY;
    
        ctx.clearRect(0, 0, width, height);
    
        for (let i = 0; i < numDotsX; i++) {
            for (let j = 0; j < numDotsY; j++) {
                const x = i * dotSpacingX + dotSpacingX / 2;
                const y = j * dotSpacingY + dotSpacingY / 2;

                const isScanned = i === scannedColumn; // Check if it's the scanned column
                const intersectData = intersectedDots?.[i]?.[j]; // Check if this dot is intersected
                const isIntersected = Boolean(intersectData);

                // Logging the row and column for debugging
                // console.log(`Rendering dot at (${i}, ${j}) - Scanned: ${isScanned}, Intersected: ${isIntersected}, Color: ${intersectData?.color}`);

                if (isScanned && isIntersected) {
                    const lineColor = intersectData.color;
                    drawGlowingDot(ctx, x, y, lineColor); // Draw intense glow
                } else if (isScanned) {
                    drawSmoothDot(ctx, x, y, 'rgba(255, 88, 51, 0.11)', true); // Mild glow for scanned dots
                } else {
                    drawSmoothDot(ctx, x, y, 'rgba(207, 204, 204, 0.7)', false); // Regular dot color
                }
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
    
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
    
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (showGrid) {
                drawDots(ctx, canvas.width, canvas.height); // Only draw dots if grid is shown
            }
        };
    
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    
        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [scannedColumn, intersectedDots, showGrid]); // Add showGrid as a dependency

    return showGrid ? <canvas ref={canvasRef} className="grid-canvas" /> : null;
};

export default GridCanvas;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////