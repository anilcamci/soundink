import React, { useState, useRef, useEffect } from 'react';
import { getStroke } from 'perfect-freehand'; // Used to calculate stroke paths for drawing
import './drawing.css'; // Importing the associated CSS file for styles
import { getSvgPathFromStroke } from './utils'; // Utility function to convert stroke to SVG path
import { mapRowToNote } from './soundMappings'; // Function to map rows to musical notes
import { playSound } from './soundPlayer'; // Function to play the sound associated with each note/color
import { PlaybackSpeedProvider, usePlaybackSpeed } from './playbackSpeedContext'; // Context for playback speed
import { stopSoundsForLine } from './soundPlayer';
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs
import GridCanvas from '../GridComponent/grid';
import P5GridCanvas from '../GridComponent/P5GridCanvas';

import PlayIcon from './../../assets/icons/Play.svg';
import StopIcon from './../../assets/icons/Stop.svg';
import UndoIcon from './../../assets/icons/Undo.svg';
import RedoIcon from './../../assets/icons/Redo.svg';
import BrushIcon from './../../assets/icons/Brush.svg';
import EraseIcon from './../../assets/icons/Erase.svg';
import LoopIcon from './../../assets/icons/Loop.svg';
import TempoIcon from './../../assets/icons/Tempo.svg';
import GridIcon from './../../assets/icons/Grid.svg';
import bassIcon from './../../assets/icons/Bass.svg';
import guitarIcon from './../../assets/icons/Guitar.svg';
import marimbaIcon from './../../assets/icons/Marimba.svg';
import pianoIcon from './../../assets/icons/Piano.svg';
import violinIcon from './../../assets/icons/Violin.svg';
import TrashIcon from './../../assets/icons/Trash.svg';


// Constants for brush colors and sizes
// const colors = ['#161a1d', '#ffb703', '#fb8500', '#023047', '#219ebc', '#d62828', '#9a031e', '#5f0f40', '#006400', '#8ac926', LOCAL_ERASER_COLOR];

const sizes = [25, 50];
const MAX_DELAY = 600; // Maximum delay in milliseconds for the slowest speed

const dotRadius = 3; // Radius of the dots
const numDotsX = 50; // Number of dots horizontally
const numDotsY = 15; // Number of dots vertically

const ERASER_COLOR = '#eae6e1'; // Choose a color that represents the eraser
const LOCAL_ERASER_COLOR = '#eae6e1'; // Match this to your background color
const colors = ['#161a1d', '#ffb703', '#219ebc', '#9a031e', '#006400', LOCAL_ERASER_COLOR];

// Options for stroke drawing (customizable for smoothness, taper, etc.)
const options = {
  size: 16,
  thinning: 0.5,
  smoothing: 0.5,
  streamline: 0.5,
  easing: (t) => t,
  start: {
    taper: 0,
    easing: (t) => t,
    cap: true,
  },
  end: {
    taper: 100,
    easing: (t) => t,
    cap: true,
  },
};

// Helper function to check if a point (from a line) is close enough to a dot
const isPointNearDot = (pointX, pointY, dotX, dotY, dotRadius, lineThickness) => {
  const distance = Math.hypot(pointX - dotX, pointY - dotY);
  // Include both dotRadius and line thickness in the intersection threshold
  return distance <= dotRadius + lineThickness / 2;
};

const TlDrawCanvasComponent = () => {
  const { playbackSpeed, setPlaybackSpeed } = usePlaybackSpeed(); // Access playbackSpeed
  const [sonificationPoints, setSonificationPoints] = useState([]); // Points that trigger sounds
  const [lines, setLines] = useState([]); // List of drawn lines
  const [currentLine, setCurrentLine] = useState([]); // Current line being drawn
  const [currentColor, setCurrentColor] = useState(colors[0]); // Currently selected brush color
  const [currentSize, setCurrentSize] = useState(sizes[0]); // Currently selected brush size
  const [isEraser, setIsEraser] = useState(false); // Toggle for eraser mode
  const [isTrash, setIsTrash] = useState(false); // Toggle for trash mode
  const [undoStack, setUndoStack] = useState([]); // Stack for undo functionality
  const [redoStack, setRedoStack] = useState([]); // Stack for redo functionality
  const [currentColumn, setCurrentColumn] = useState(-1); // Current column being played back (for visual feedback)
  const intersectedDots = useRef({}); // Ref to track intersected dots
  const [showGrid, setShowGrid] = useState(true); // Add state to control grid visibility
  const [isPlaying, setIsPlaying] = useState(false); // To control playback state
  const [loop, setLoop] = useState(false); // To control looping
  let playbackStopped = useRef(false); // To stop playback externally
  const [scannedColumn, setScannedColumn] = useState(-1);
  const [previousColor, setPreviousColor] = useState(colors[0]);


  // Add this at the top of your component, along with other state variables
  const [selectedColor, setSelectedColor] = useState(null); // Track the color for which the modal is shown
  // State to hold instrument assignment for each color
  const [colorInstrumentMap, setColorInstrumentMap] = useState({
    '#161a1d': 'marimba',
    '#ffb703': 'pianohigh',
    '#fb8500': 'pianolow',
    '#023047': 'guitar',
    '#219ebc': 'floom',
    '#d62828': 'epiano',
    '#9a031e': 'synthflute',
    '#5f0f40': 'strings',
    '#006400': 'bass',
    '#8ac926': 'marimba'
  });

  // Define the available instrument options
  const instrumentOptions = ['bass', 'epiano', 'floom', 'guitar', 'marimba', 'pianohigh', 'pianolow', 'strings', 'synthflute'];

  // Function to open the instrument selection menu for a specific color
  const openInstrumentMenu = (color) => {
    setSelectedColor(color); // Set the color for which the menu should be shown
  };

  // Function to update the selected instrument for the currently selected color
  const updateInstrumentForColor = (instrument) => {
    setColorInstrumentMap((prevMap) => ({
      ...prevMap,
      [selectedColor]: instrument, // Update the map with the selected instrument for the color
    }));
    closeInstrumentMenu(); // Close the modal after selection
  };

  // Function to close the instrument selection menu
  const closeInstrumentMenu = () => {
    setSelectedColor(null); // Clear the selected color, hiding the modal
  };

  const toggleGrid = () => {
    setShowGrid((prevShowGrid) => !prevShowGrid);
    // console.log('Grid visibility toggled:', !showGrid);
  };

  useEffect(() => {}, [playbackSpeed]);

  // Helper function to check if two line segments intersect (used for eraser functionality)
  const doLineSegmentsIntersect = (p0, p1, p2, p3) => {
    // Validate that all points are defined
    if (!p0 || !p1 || !p2 || !p3) {
      return false;
    }
  
    const det = (p1[0] - p0[0]) * (p3[1] - p2[1]) - (p1[1] - p0[1]) * (p3[0] - p2[0]);
    if (det === 0) {
      return false; // Lines are parallel
    }
    const lambda = ((p3[1] - p2[1]) * (p3[0] - p0[0]) + (p2[0] - p3[0]) * (p3[1] - p0[1])) / det;
    const gamma = ((p0[1] - p1[1]) * (p3[0] - p0[0]) + (p1[0] - p0[0]) * (p3[1] - p0[1])) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  };

  // Interpolates points between start and end to generate smooth lines
  const interpolatePoints = (start, end, numPoints) => {
    const points = [];
    for (let i = 1; i <= numPoints; i++) {
      const t = i / (numPoints + 1);
      const x = start[0] + (end[0] - start[0]) * t;
      const y = start[1] + (end[1] - start[1]) * t;
      const pressure = start[2] + (end[2] - start[2]) * t;
      points.push([x, y, pressure]);
    }
    return points;
  };

  // Handles the slider input for changing playback speed
  const handleSliderChange = (e) => {
    const value = Number(e.target.value);

    const playbackSpeedValue = 50 + value; // Adjusting the base to 200 ms
    setPlaybackSpeed(playbackSpeedValue); // Ensure playbackSpeed is updated correctly

    console.log("Current playback speed:", playbackSpeedValue);
  };

  // Called when user starts drawing (pointer down)
  const handlePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    const newPoint = [e.pageX, e.pageY, e.pressure];
    setCurrentLine([newPoint]);
    setSonificationPoints([newPoint]); // Initialize sound-triggering points
  };

  const handlePointerMove = (e) => {
    if (e.buttons !== 1) return; // Only draw when mouse button is held down
    const newPoint = [e.pageX, e.pageY, e.pressure];
    setCurrentLine((prevLine) => [...prevLine, newPoint]); // Append new point to the current line

    if (isEraser) {
      // In eraser mode, we check for intersections with existing lines and remove the intersecting parts
      setLines((prevLines) => {
        return prevLines.map((line) => {
          const filteredPoints = line.points.filter((point, index) => {
            if (index === line.points.length - 1) return true; // Skip the last point to avoid index issues
            
            // Check if the eraser intersects with the current line segment
            const isIntersecting = doLineSegmentsIntersect(point, line.points[index + 1], currentLine[currentLine.length - 2], newPoint);
            
            // If intersecting, we remove that point, otherwise keep it
            return !isIntersecting;
          });

          // If all points are erased, remove the line
          if (filteredPoints.length === 0) {
            return null; // Mark line for removal
          }

          // Return updated line with remaining points
          return { ...line, points: filteredPoints };
        }).filter(Boolean); // Filter out null lines (fully erased ones)
      });
    } else {
      // Normal drawing mode
      setSonificationPoints((prevPoints) => {
        // Interpolate points for smoother sonification
        const lastPoint = prevPoints.length > 0 ? prevPoints[prevPoints.length - 1] : newPoint;
        const distance = Math.hypot(newPoint[0] - lastPoint[0], newPoint[1] - lastPoint[1]);
        const numInterpolatedPoints = Math.floor(distance / 5); // Adjust this value for more/less interpolation
        const interpolatedPoints = interpolatePoints(lastPoint, newPoint, numInterpolatedPoints);
        return [...prevPoints, ...interpolatedPoints, newPoint]; // Add interpolated points for smoother sonification
      });
    }
  };

  const handlePointerUp = () => {
    if (isEraser) {
      // Filter out lines to erase
      const updatedLines = lines.filter(line => {
        const isErased = line.points.some((point, i) => {
          return currentLine.some((eraserPoint, j) => {
            if (j === currentLine.length - 1) return false; // Skip last point
            return doLineSegmentsIntersect(
              line.points[i],
              line.points[i + 1],
              currentLine[j],
              currentLine[j + 1]
            );
          });
        });
        // return !isErased; // Keep only the non-erased lines

        if (isErased) {
          // Temporarily store intersections in undo stack instead of deleting
          const intersectionData = line.intersections;
          setUndoStack([...undoStack, { lines, sonificationPoints, intersectionData }]);
          return false;
        }
  
        return true;
      });

      // Collect IDs of erased lines
      const erasedLineIds = lines
      .filter(line => {
        return line.points.some((point, i) => {
          return currentLine.some((eraserPoint, j) => {
            if (j === currentLine.length - 1) return false;
            return doLineSegmentsIntersect(
              line.points[i],
              line.points[i + 1],
              currentLine[j],
              currentLine[j + 1]
            );
          });
        });
      }).map(line => line.lineId);

      // Remove entries in intersectedDots associated with erased line IDs
      erasedLineIds.forEach(lineId => {
        for (const column in intersectedDots.current) {
          for (const row in intersectedDots.current[column]) {
            if (intersectedDots.current[column][row].lineId === lineId) {
              delete intersectedDots.current[column][row]; // Remove specific intersection data
            }
          }
        }
      });
  
      // Make sure to call stopSoundsForLine for the erased lines
      lines.forEach(line => {
        const isErased = line.points.some((point, i) => {
          return currentLine.some((eraserPoint, j) => {
            if (j === currentLine.length - 1) return false; 
            return doLineSegmentsIntersect(
              line.points[i],
              line.points[i + 1],
              currentLine[j],
              currentLine[j + 1]
            );
          });
        });
  
        if (isErased) {
          // console.log(`Stopping sound for line ID: ${line.lineId}`);
          stopSoundsForLine(line.lineId); // This should stop the sound associated with this line
        }
      });
  
      // Update the lines and sonification points after erasing
      const remainingSonificationPoints = updatedLines.flatMap(line => line.sonificationPoints);
      // Remove only visual points but preserve the undo data

      setLines(updatedLines); // Update state with the remaining lines
      setSonificationPoints(remainingSonificationPoints); // Update the remaining sonification points
      setRedoStack([]);
      setCurrentLine([]);
    } else {
      // Regular drawing mode
      const lineId = uuidv4(); // Generate a unique ID for this new line
      // console.log(`Adding new line with ID: ${lineId}`);
  
      const newLine = {
        points: currentLine,
        color: currentColor,
        size: currentSize,
        sonificationPoints: [],
        lineId, // Assign the unique ID to the line
        intersections: {} // Initialize an object to store intersections
      };

      // Add intersections to both intersectedDots and newLine.intersections
      sonificationPoints.forEach(point => {
        for (let i = 0; i < numDotsX; i++) {
          for (let j = 0; j < numDotsY; j++) {
            const dotX = (window.innerWidth / numDotsX) * i + window.innerWidth / numDotsX / 2;
            const dotY = (window.innerHeight / numDotsY) * j + window.innerHeight / numDotsY / 2;

            if (isPointNearDot(point[0], point[1], dotX, dotY, dotRadius, currentSize)) {
              if (!intersectedDots.current[i]) intersectedDots.current[i] = {};
              if (!newLine.intersections[i]) newLine.intersections[i] = {};

              intersectedDots.current[i][j] = { point, color: currentColor, size: currentSize, lineId };
              newLine.intersections[i][j] = { point, color: currentColor, size: currentSize, lineId };
            }
          }
        }
      });
  

      setUndoStack([...undoStack, { lines, sonificationPoints }]);
      setLines(prevLines => [...prevLines, newLine]);
      setRedoStack([]);
      setCurrentLine([]);
      setSonificationPoints([]);
    }
  };

  const handlePlay = async () => {
    if (isPlaying) return;

    setIsPlaying(true);
    playbackStopped.current = false;

    do {
        for (let column = 4; column < numDotsX; column++) {
            if (playbackStopped.current) break;

            setCurrentColumn(column);
            setScannedColumn(column); // Update the scanned column for dot highlighting
            // console.log(`Scanning column ${column}`, intersectedDots.current[column] || {});

            
            if (intersectedDots.current[column]) {
                const playPromises = [];
                for (const row in intersectedDots.current[column]) {
                    const { point, color } = intersectedDots.current[column][row];
                    const note = mapRowToNote[row];
                    playPromises.push(playSound(color, note, 1, playbackSpeed, intersectedDots.current[column][row].lineId, colorInstrumentMap));
}
                await Promise.all(playPromises);
            }
            await new Promise(resolve => setTimeout(resolve, playbackSpeed));
        }
    } while (loop && !playbackStopped.current);

    setCurrentColumn(-1);
    setScannedColumn(-1); // Reset after scanning
    setIsPlaying(false);
};

  // // Undo and redo logic for managing drawing history
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack.pop();
  
      // Add current state to redo stack before applying undo
      setRedoStack([{ lines, sonificationPoints }, ...redoStack]);
  
      // Set lines and sonification points to the previous state
      setLines(previousState.lines);
      setSonificationPoints(previousState.sonificationPoints);
  
      // Clear and rebuild intersection data based on the undone lines
      intersectedDots.current = {}; // Reset first to avoid data carryover
  
      previousState.lines.forEach(line => {
        if (!line.erased) {
          // If the line was not erased, restore its intersection points
          if (line.intersections) {
            Object.entries(line.intersections).forEach(([column, rows]) => {
              if (!intersectedDots.current[column]) intersectedDots.current[column] = {};
              Object.entries(rows).forEach(([row, intersectionData]) => {
                intersectedDots.current[column][row] = intersectionData;
              });
            });
          }
        }
      });
    }
  };

  // Updated redo functionality with intersection handling
  const handleRedo = () => {
    if (redoStack.length > 0) {
      // Retrieve the next state from redo stack
      const nextState = redoStack.shift();
  
      // Add the current state to the undo stack before applying redo
      setUndoStack([...undoStack, { lines, sonificationPoints }]);
  
      // Update lines and sonification points with the redone state
      setLines(nextState.lines);
      setSonificationPoints(nextState.sonificationPoints);
  
      // Clear and rebuild intersection data based on the redone lines
      intersectedDots.current = {}; // Reset to avoid overlapping data
  
      nextState.lines.forEach(line => {
        if (!line.erased) {
          // If the line is visible (not erased), re-add its intersection points
          if (line.intersections) {
            Object.entries(line.intersections).forEach(([column, rows]) => {
              if (!intersectedDots.current[column]) intersectedDots.current[column] = {};
              Object.entries(rows).forEach(([row, intersectionData]) => {
                intersectedDots.current[column][row] = intersectionData;
              });
            });
          }
        }
      });
    }
  };

  // Renders the paths for all the strokes (lines)
  const allStrokes = lines.map((line, index) => {
    const strokeOptions = { ...options, size: line.size };
    return (
      <path key={index} d={getSvgPathFromStroke(getStroke(line.points, strokeOptions))} fill={line.color} />
    );
  });

  // Generates the stroke for the current line being drawn
  const currentStroke = getSvgPathFromStroke(getStroke(currentLine, { ...options, size: currentSize }));

return (
  <div className="tldraw-container">
    <div className="controls">
      <div className="color-group">
        {colors.map((color, index) => (
          <div key={index} className="color-instrument-pair">
            <button
              className="color-button"
              style={{ backgroundColor: isEraser ? ERASER_COLOR : color }}
              onClick={() => {
                setCurrentColor(isEraser ? ERASER_COLOR : color);
                setIsEraser(false);
              }}
            />
            <button
              className="instrument-select-button"
              onClick={() => openInstrumentMenu(color)}
            >
              ♩
            </button>
          </div>
        ))}
      </div>

      {/* Center the Eraser button in its own container */}
      <div className="eraser-container">
        <button
          className={`eraser-button ${isEraser ? 'active' : ''}`}
          // onClick={() => setIsEraser(!isEraser)}
          onClick={() => {
            if (isEraser) {
              // If eraser is already on, turn it off and restore the previous color
              setCurrentColor(previousColor);
            } else {
              // If eraser is off, save the current color and set to eraser color
              setPreviousColor(currentColor);
              setCurrentColor(ERASER_COLOR);
            }
            setIsEraser(!isEraser); // Toggle the eraser mode
          }}
        >
          <img src={TrashIcon} alt="Eraser" className="iconEraser" />
        </button>
        <button
          className={`trash-button ${isTrash ? 'active' : ''}`}
          onClick={() => setIsTrash(!isTrash)}
        >
          <img src={EraseIcon} alt="Eraser" className="iconTrash" />
        </button>
      </div>

      {/* Undo and Redo Buttons */}
      <div className="steps-group">
        <button className="undo" onClick={handleUndo}>
          <img src={UndoIcon} alt="Undo" className="iconDo" />
        </button>
        <button className="redo" onClick={handleRedo}>
          <img src={RedoIcon} alt="Redo" className="iconDo" />
        </button>
      </div>

      {/* Play, Stop, and Loop Controls */}
      <div className="play-controls-group">
        <button className="play-button" onClick={handlePlay} disabled={isPlaying}>
          <img src={PlayIcon} alt="Play" className="iconPlay" />
        </button>
        <button
          className="stop-button"
          onClick={() => playbackStopped.current = true}
          disabled={!isPlaying}
        >
          <img src={StopIcon} alt="Stop" className="iconStop" />
        </button>
      </div>

      {/* Toggle Grid Visibility Button */}
      <div className="grid-loop-group">
        <button className="grid-button" onClick={toggleGrid}>
          <img src={GridIcon} alt="Grid Icon" className="iconGrid" />
        </button>
        <button
          className={`loop-button ${loop ? 'active' : ''}`}
          onClick={() => setLoop(!loop)}
        >
          <img src={LoopIcon} alt="Loop" className="iconLoop" />
        </button>
      </div>

      {/* Brush size slider */}
      {/* Playback Speed Slider */}
      <div className="vertical-sliders">
          <div className="brush-size-group">
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={currentSize}
            onChange={(e) => setCurrentSize(Number(e.target.value))}
          />
          </div>
          <div className="slider-group">
          <input
            type="range"
            min="0"
            max="350"
            step="25"
            value={350 - (playbackSpeed - 50)} // Inverting the slider effect
            onChange={(e) => {
              const reversedValue = 350 - Number(e.target.value); // Reverse the slider's value
              const playbackSpeedValue = 50 + reversedValue;
              setPlaybackSpeed(playbackSpeedValue);
              console.log("Current playback speed:", playbackSpeedValue);
            }}
          />
          </div>
      </div>


    </div>

    {/* Grid Canvas Component */}
    <GridCanvas showGrid={showGrid} scannedColumn={scannedColumn} intersectedDots={intersectedDots.current} />

    {/* SVG Drawing Area */}
    <svg
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: 'none', width: '100%', height: '100%' }}
    >

      {allStrokes}
      {currentLine.length > 0 && <path d={currentStroke} fill={currentColor} />}
    </svg>

    {/* Instrument Selection Modal */}
    {selectedColor && (
      <div className="instrument-selection-modal">
        <div className="instrument-options">
          {instrumentOptions.map((instrument) => (
            <button
              key={instrument}
              onClick={() => updateInstrumentForColor(instrument)}
              className="instrument-option-button"
            >
              {instrument}
            </button>
          ))}
        </div>
        <button onClick={closeInstrumentMenu} className="close-modal-button">❌</button>
      </div>
    )}
  </div>
);
}

export default TlDrawCanvasComponent;