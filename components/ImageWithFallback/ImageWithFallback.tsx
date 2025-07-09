import React, { useState } from 'react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type ImageWithFallbackProps = NextImageProps & {
  alt: string
  fallbackText?: string
  className?: string
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackText = 'Image not found',
  className,
  ...props
}) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <div className={`relative ${className || ''}`}>
      <AnimatePresence mode="wait">
        {loading && !error && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg p-4 z-10"
            style={{ minHeight: 120, minWidth: 120 }}
            aria-label="Loading image"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="#a1a1aa"
                  strokeWidth="4"
                  strokeDasharray="80"
                  strokeDashoffset="60"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
            <span className="text-zinc-400 text-sm mt-2">Loading...</span>
          </motion.div>
        )}

        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg p-4 z-10"
            style={{ minHeight: 120, minWidth: 120 }}
            aria-label={fallbackText}
          >
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
              <rect width="48" height="48" rx="8" fill="#27272a"/>
              <path d="M14 34l8-10 6 8 6-6 6 8" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="18" cy="18" r="2" fill="#a1a1aa"/>
            </svg>
            <span className="text-zinc-400 text-sm mt-2">{fallbackText}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key="image"
        initial={{ opacity: 0 }}
        animate={{ opacity: !loading && !error ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: loading || error ? 'none' : 'block',
        }}
      >
        <NextImage
          {...props}
          src={src}
          alt={alt}
          className={className}
          loading="lazy"
          onError={() => {
            setError(true)
            setLoading(false)
          }}
          onLoadingComplete={() => setLoading(false)}
        />
      </motion.div>
    </div>
  )
}