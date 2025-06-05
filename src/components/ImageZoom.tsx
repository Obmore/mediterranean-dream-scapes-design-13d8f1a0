import React, { useState, useCallback, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageZoomProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt, isOpen, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom when modal opens
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-') {
        e.preventDefault();
        handleZoomOut();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleZoomIn = useCallback(() => {
    setScale(prev => Math.min(prev * 1.5, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale(prev => {
      const newScale = Math.max(prev / 1.5, 1);
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return;
    
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [scale, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;

    e.preventDefault();
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Limit dragging to keep image within reasonable bounds
    const container = containerRef.current;
    const image = imageRef.current;
    
    if (container && image) {
      const containerRect = container.getBoundingClientRect();
      const maxX = (image.width * scale - containerRect.width) / 2;
      const maxY = (image.height * scale - containerRect.height) / 2;
      
      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      });
    } else {
      setPosition({ x: newX, y: newY });
    }
  }, [isDragging, dragStart, scale]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  }, [handleZoomIn, handleZoomOut]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={handleZoomOut}
          disabled={scale <= 1}
          className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom out"
        >
          <ZoomOut size={20} />
        </button>
        <button
          onClick={handleZoomIn}
          disabled={scale >= 5}
          className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom in"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={onClose}
          className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Zoom level indicator */}
      {scale > 1 && (
        <div className="absolute top-4 left-4 bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
          {Math.round(scale * 100)}%
        </div>
      )}

      {/* Image */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`max-w-none max-h-none transition-transform duration-200 ${
          scale > 1 ? 'cursor-grab' : 'cursor-zoom-in'
        } ${isDragging ? 'cursor-grabbing' : ''}`}
        style={{
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          maxWidth: scale === 1 ? '90vw' : 'none',
          maxHeight: scale === 1 ? '90vh' : 'none'
        }}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        onClick={scale === 1 ? handleZoomIn : undefined}
        draggable={false}
      />

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-lg">
        {scale === 1 ? 'Click to zoom in • Scroll to zoom • ESC to close' : 'Drag to pan • Scroll to zoom • ESC to close'}
      </div>
    </div>
  );
};

export default ImageZoom;
