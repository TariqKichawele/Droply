import React from 'react'

export default function CloudStorageIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-md max-h-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background gradient circle */}
        <defs>
          <radialGradient id="backgroundGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(59 130 246 / 0.1)" className="dark:stop-color-[rgb(59_130_246_/_0.2)]" />
            <stop offset="100%" stopColor="rgb(59 130 246 / 0.05)" className="dark:stop-color-[rgb(59_130_246_/_0.1)]" />
          </radialGradient>
          
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(59 130 246 / 0.8)" />
            <stop offset="100%" stopColor="rgb(99 102 241 / 0.8)" />
          </linearGradient>
          
          <linearGradient id="fileGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(34 197 94)" />
            <stop offset="100%" stopColor="rgb(21 128 61)" />
          </linearGradient>
          
          <linearGradient id="fileGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(239 68 68)" />
            <stop offset="100%" stopColor="rgb(185 28 28)" />
          </linearGradient>
          
          <linearGradient id="fileGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(245 158 11)" />
            <stop offset="100%" stopColor="rgb(217 119 6)" />
          </linearGradient>
          
          <linearGradient id="fileGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(168 85 247)" />
            <stop offset="100%" stopColor="rgb(124 58 237)" />
          </linearGradient>

          {/* Animation for floating effect */}
          <animateTransform
            id="float1"
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0; 0,-10; 0,0"
            dur="3s"
            repeatCount="indefinite"
          />
          
          <animateTransform
            id="float2"
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0; 0,-8; 0,0"
            dur="2.5s"
            repeatCount="indefinite"
          />
          
          <animateTransform
            id="float3"
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0; 0,-12; 0,0"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </defs>

        {/* Background circle */}
        <circle cx="200" cy="200" r="180" fill="url(#backgroundGrad)" />

        {/* Cloud */}
        <g>
          <path
            d="M 120 120 C 120 100, 140 80, 160 80 C 170 70, 190 70, 200 80 C 220 70, 240 80, 250 100 C 270 100, 280 120, 280 130 C 280 150, 260 160, 240 160 L 140 160 C 120 160, 120 140, 120 120 Z"
            fill="url(#cloudGrad)"
            className="drop-shadow-lg"
          />
          
          {/* Cloud highlight */}
          <ellipse
            cx="180"
            cy="110"
            rx="25"
            ry="15"
            fill="rgb(255 255 255 / 0.3)"
            className="blur-sm"
          />
        </g>

        {/* Floating Files */}
        
        {/* File 1 - Image file */}
        <g>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0; 0,-10; 0,0"
            dur="3s"
            repeatCount="indefinite"
          />
          <rect x="90" y="250" width="30" height="35" rx="4" fill="url(#fileGrad1)" className="drop-shadow-md" />
          <rect x="95" y="255" width="20" height="15" rx="2" fill="rgb(255 255 255 / 0.9)" />
          <circle cx="100" cy="262" r="3" fill="rgb(34 197 94)" />
          <path d="M 105 268 L 110 263 L 115 268 Z" fill="rgb(34 197 94)" />
        </g>

        {/* File 2 - Document */}
        <g>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0; 0,-8; 0,0"
            dur="2.5s"
            repeatCount="indefinite"
          />
          <rect x="280" y="280" width="30" height="35" rx="4" fill="url(#fileGrad2)" className="drop-shadow-md" />
          <rect x="285" y="285" width="20" height="3" rx="1" fill="rgb(255 255 255 / 0.9)" />
          <rect x="285" y="290" width="15" height="2" rx="1" fill="rgb(255 255 255 / 0.7)" />
          <rect x="285" y="294" width="18" height="2" rx="1" fill="rgb(255 255 255 / 0.7)" />
          <rect x="285" y="298" width="12" height="2" rx="1" fill="rgb(255 255 255 / 0.7)" />
        </g>

        {/* File 3 - Folder */}
        <g>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0; 0,-12; 0,0"
            dur="3.5s"
            repeatCount="indefinite"
          />
          <path
            d="M 170 320 L 170 315 C 170 312, 172 310, 175 310 L 185 310 L 190 305 L 205 305 C 208 305, 210 307, 210 310 L 210 335 C 210 338, 208 340, 205 340 L 175 340 C 172 340, 170 338, 170 335 Z"
            fill="url(#fileGrad3)"
            className="drop-shadow-md"
          />
        </g>

        {/* File 4 - Video file */}
        <g>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0; 0,-9; 0,0"
            dur="2.8s"
            repeatCount="indefinite"
          />
          <rect x="320" y="220" width="30" height="35" rx="4" fill="url(#fileGrad4)" className="drop-shadow-md" />
          <polygon points="330,235 330,245 340,240" fill="rgb(255 255 255 / 0.9)" />
        </g>

        {/* File 5 - Small image */}
        <g>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0; 0,-7; 0,0"
            dur="4s"
            repeatCount="indefinite"
          />
          <rect x="140" y="320" width="25" height="30" rx="3" fill="url(#fileGrad1)" className="drop-shadow-md" />
          <rect x="144" y="324" width="17" height="12" rx="2" fill="rgb(255 255 255 / 0.9)" />
          <circle cx="148" cy="328" r="2" fill="rgb(34 197 94)" />
        </g>

        {/* Floating particles/dots for extra effect */}
        <circle cx="250" cy="200" r="2" fill="rgb(59 130 246 / 0.6)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-15; 0,0"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle cx="150" cy="180" r="1.5" fill="rgb(99 102 241 / 0.5)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-10; 0,0"
            dur="3.2s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle cx="300" cy="190" r="1" fill="rgb(168 85 247 / 0.4)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-8; 0,0"
            dur="3.8s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Connection lines (subtle) */}
        <g opacity="0.3">
          <path
            d="M 105 250 Q 150 200 180 160"
            stroke="rgb(59 130 246 / 0.4)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3,3"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;6"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
          
          <path
            d="M 295 280 Q 250 230 200 160"
            stroke="rgb(59 130 246 / 0.4)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3,3"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;6"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>
    </div>
  )
} 