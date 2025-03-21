import React, { useRef, useEffect } from 'react';
import { getStroke } from 'perfect-freehand';
import { firstColumn, numDotsX, numDotsY, dotRadius } from './gridConfig'; // Import constants

const ERASER_COLOR = '#eae6e1'; // Choose a color that represents the eraser

export const canvasDimensions = { width: 0, height: 0 }; // Export an object to store dimensions

const drawStar = (ctx, x, y, radius, color, rotationAngle = 0) => {
    ctx.save(); // Save the context state

    ctx.fillStyle = color;
    ctx.beginPath();
    const spikes = 100;
    const outerRadius = radius;
    const innerRadius = radius / 2;
    let rotation = Math.PI / 2 * 3;
    let step = Math.PI / spikes;

    ctx.moveTo(x, y - outerRadius);
    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rotation) * outerRadius, y - Math.sin(rotation) * outerRadius);
        rotation += step;

        ctx.lineTo(x + Math.cos(rotation) * innerRadius, y - Math.sin(rotation) * innerRadius);
        rotation += step;
    }
    ctx.lineTo(x, y - outerRadius);
    ctx.closePath();
    ctx.fill();

    ctx.restore(); // Restore the original context state
};

const GridCanvas = ({ showGrid, scannedColumn, intersectedDots }) => {
    const canvasRef = useRef(null);

    const drawGlowingDot = (ctx, x, y, color) => {
        ctx.save(); // Save the context state
    
        const glowLayers = [
            { blur: 30, sizeMultiplier: 5, color: `${color}33` },  // Softer outer glow
            { blur: 20, sizeMultiplier: 4, color: `${color}55` },    // Mid glow
            { blur: 10, sizeMultiplier: 3, color: `${color}99` },     // Inner glow
            { blur: 5, sizeMultiplier: 2.5, color: `${color}CC` }    // Core glow, slightly transparent
        ];
    
        glowLayers.forEach(({ blur, sizeMultiplier, color }) => {
            ctx.shadowColor = color;
            ctx.shadowBlur = blur;
            ctx.fillStyle = color;
            
            // ctx.beginPath();
            const size = dotRadius * sizeMultiplier;
            // ctx.arc(x, y, dotRadius * sizeMultiplier, 0, Math.PI * 2);
            drawStar(ctx, x, y, size, color); // Draw star

            // ctx.closePath();
            // ctx.fill();
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

    const drawColumn = (ctx, column, containerWidth, containerHeight) => {
        const dotSpacingX = containerWidth / numDotsX; // Adjust spacing to fit 24 columns
        const dotSpacingY = containerHeight / numDotsY;
    
        for (let j = 0; j < numDotsY; j++) {
            const x = column * dotSpacingX + dotSpacingX / 2;
            const y = j * dotSpacingY + dotSpacingY / 2;
    
            const isScanned = column === scannedColumn; // Check if it's the scanned column
            const intersectData = intersectedDots?.[column]?.[j]; // Check if this dot is intersected
            const isIntersected = Boolean(intersectData);
    
            // Check if the intersected dot's color is the eraser (background color)
            const isBackgroundColor = intersectData?.color === ERASER_COLOR;
    
            if (isScanned && isIntersected && !isBackgroundColor) {
                const lineColor = intersectData.color;
                drawGlowingDot(ctx, x, y, lineColor); // Draw intense glow
            } else if (isScanned) {
                drawSmoothDot(ctx, x, y, 'rgba(255, 88, 51, 0.11)', true); // Mild glow for scanned dots
            } else if (isBackgroundColor) {
                // For dots erased with the soft eraser, draw with the regular dot color
                drawSmoothDot(ctx, x, y, 'rgba(228, 193, 158, 0.5)', false);
            } else {
                drawSmoothDot(ctx, x, y, 'rgba(228, 193, 158, 0.5)', false); // Regular dot color
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
    
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
    
        // const resizeCanvas = () => {
        //     canvas.width = window.innerWidth;
        //     canvas.height = window.innerHeight;
        //     if (showGrid) {
        //         ctx.clearRect(0, 0, canvas.width, canvas.height);
        //         for (let i = firstColumn; i < numDotsX; i++) {
        //             drawColumn(ctx, i, canvas.width, canvas.height);
        //         }
        //     }
        // };

        const resizeCanvas = () => {
            const container = document.querySelector('.canvas-container');
            // if (!container) {
            //     console.error('canvas-container not found');
            //     return;
            // } else {
            //     console.log('canvas-container found');
            // }
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;

            canvasDimensions.width = containerWidth;
            canvasDimensions.height = containerHeight;
            
            // console.log('containerWidth:', containerWidth);
            // console.log('containerHeight:', containerHeight);
            canvas.width = containerWidth; // Adjust canvas size to container width
            canvas.height = containerHeight; // Adjust canvas size to container height
        
            if (showGrid) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = firstColumn; i < numDotsX; i++) { // Ensure we draw 24 columns
                    drawColumn(ctx, i, containerWidth, containerHeight); // Use container dimensions for spacing
                }
            }
        };
    
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    
        return () => {
            window.removeEventListener('resize', resizeCanvas);
        }; 
    }, [showGrid]); // Add showGrid as a dependency

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (showGrid) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = firstColumn; i < numDotsX; i++) {
                drawColumn(ctx, i, canvas.width, canvas.height);
            }
        }
    }, [scannedColumn, intersectedDots, showGrid]); // Redraw only the scanned column

    return showGrid ? <canvas ref={canvasRef} className="grid-canvas" /> : null;
};

export default GridCanvas;