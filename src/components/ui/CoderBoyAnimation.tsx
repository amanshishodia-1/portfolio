'use client';

import React from 'react';

export function CoderBoyAnimation() {
  return (
    <div className="coder-boy-wrapper relative flex items-center justify-center w-full h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] select-none"
        aria-label="Animated coder illustration"
      >
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          @keyframes blink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          @keyframes typeLeft {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(-2px); }
          }
          @keyframes typeRight {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(2px); }
          }
          @keyframes screenGlow {
            0%, 100% { opacity: 0.85; }
            50% { opacity: 1; }
          }
          @keyframes cursorBlink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          @keyframes codeScroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(-14px); }
          }
          @keyframes headBob {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-1.5deg); }
            75% { transform: rotate(1.5deg); }
          }
          @keyframes coffeeFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-3px) rotate(3deg); }
          }
          @keyframes steamRise {
            0% { opacity: 0.6; transform: translateY(0) scaleX(1); }
            100% { opacity: 0; transform: translateY(-8px) scaleX(1.5); }
          }
          @keyframes particleFloat {
            0% { opacity: 0; transform: translate(0, 0) scale(0.5); }
            50% { opacity: 1; }
            100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(1); }
          }

          .coder-float { animation: float 3s ease-in-out infinite; }
          .coder-head-group { animation: headBob 2.5s ease-in-out infinite; transform-origin: 100px 58px; }
          .coder-eye { animation: blink 4s ease-in-out infinite; transform-origin: center center; }
          .coder-left-arm { animation: typeLeft 0.3s ease-in-out infinite; transform-origin: 75px 115px; }
          .coder-right-arm { animation: typeRight 0.3s ease-in-out infinite; transform-origin: 125px 115px; }
          .screen-glow { animation: screenGlow 2s ease-in-out infinite; }
          .cursor-blink { animation: cursorBlink 1s step-end infinite; }
          .code-lines { animation: codeScroll 2s linear infinite; }
          .coffee-cup { animation: coffeeFloat 2.5s ease-in-out infinite; }
          .steam-1 { animation: steamRise 1.2s ease-out infinite 0s; }
          .steam-2 { animation: steamRise 1.2s ease-out infinite 0.4s; }
          .steam-3 { animation: steamRise 1.2s ease-out infinite 0.8s; }
          .particle-1 { --tx: -12px; --ty: -14px; animation: particleFloat 2.5s ease-out infinite 0.2s; }
          .particle-2 { --tx: 14px; --ty: -10px; animation: particleFloat 2.5s ease-out infinite 0.9s; }
          .particle-3 { --tx: 8px; --ty: -16px; animation: particleFloat 2.5s ease-out infinite 1.6s; }
        `}</style>

        {/* Floating group for the entire character */}
        <g className="coder-float">

          {/* ── Laptop / Monitor ── */}
          <g>
            {/* Laptop base shadow */}
            <ellipse cx="100" cy="155" rx="38" ry="5" fill="rgba(0,0,0,0.25)" />

            {/* Laptop body */}
            <rect x="62" y="130" width="76" height="6" rx="2" fill="#1e293b" />
            <rect x="65" y="90" width="70" height="42" rx="4" fill="#0f172a" />
            <rect x="67" y="92" width="66" height="38" rx="3" fill="#0d1b2a" />

            {/* Screen surface glow */}
            <rect
              className="screen-glow"
              x="67" y="92" width="66" height="38" rx="3"
              fill="url(#screenGrad)"
              opacity="0.9"
            />

            {/* Code lines on screen - clipped */}
            <clipPath id="screenClip">
              <rect x="67" y="92" width="66" height="38" rx="3" />
            </clipPath>
            <g clipPath="url(#screenClip)">
              <g className="code-lines">
                {/* Line 1 - keyword */}
                <rect x="71" y="96" width="18" height="2.5" rx="1" fill="#818cf8" opacity="0.9" />
                {/* Line 1 - text */}
                <rect x="91" y="96" width="24" height="2.5" rx="1" fill="#e2e8f0" opacity="0.7" />
                {/* Line 2 - function */}
                <rect x="71" y="100.5" width="12" height="2.5" rx="1" fill="#38bdf8" opacity="0.9" />
                <rect x="85" y="100.5" width="30" height="2.5" rx="1" fill="#94a3b8" opacity="0.5" />
                {/* Line 3 - string */}
                <rect x="75" y="105" width="28" height="2.5" rx="1" fill="#34d399" opacity="0.8" />
                {/* Line 4 - comment */}
                <rect x="75" y="109.5" width="36" height="2.5" rx="1" fill="#475569" opacity="0.6" />
                {/* Line 5 - keyword */}
                <rect x="71" y="114" width="15" height="2.5" rx="1" fill="#f472b6" opacity="0.9" />
                <rect x="88" y="114" width="20" height="2.5" rx="1" fill="#e2e8f0" opacity="0.7" />
                {/* Line 6 */}
                <rect x="71" y="118.5" width="10" height="2.5" rx="1" fill="#38bdf8" opacity="0.8" />
              </g>

              {/* Blinking cursor */}
              <rect
                className="cursor-blink"
                x="83" y="118.5" width="1.5" height="2.5" rx="0.5"
                fill="#e2e8f0"
              />
            </g>

            {/* Screen reflection */}
            <rect x="67" y="92" width="66" height="12" rx="3" fill="url(#reflectGrad)" opacity="0.12" />
          </g>

          {/* ── Character Body ── */}
          <g>
            {/* Hoodie / torso */}
            <rect x="81" y="110" width="38" height="28" rx="8" fill="#334155" />
            {/* Hoodie pocket detail */}
            <rect x="93" y="124" width="14" height="9" rx="3" fill="#1e293b" opacity="0.6" />
            {/* Hoodie front seam */}
            <line x1="100" y1="112" x2="100" y2="128" stroke="#1e293b" strokeWidth="1" opacity="0.4" />
          </g>

          {/* ── Arms ── */}
          {/* Left arm - types */}
          <g className="coder-left-arm">
            <path d="M83 116 Q74 122 72 128" stroke="#334155" strokeWidth="7" strokeLinecap="round" fill="none" />
            {/* Left hand */}
            <ellipse cx="71" cy="130" rx="5" ry="4" fill="#fbbf24" />
          </g>
          {/* Right arm - types */}
          <g className="coder-right-arm">
            <path d="M117 116 Q126 122 128 128" stroke="#334155" strokeWidth="7" strokeLinecap="round" fill="none" />
            {/* Right hand */}
            <ellipse cx="129" cy="130" rx="5" ry="4" fill="#fbbf24" />
          </g>

          {/* ── Head group ── */}
          <g className="coder-head-group">
            {/* Neck */}
            <rect x="94" y="73" width="12" height="10" rx="3" fill="#fbbf24" />

            {/* Head */}
            <rect x="78" y="45" width="44" height="38" rx="14" fill="#fbbf24" />

            {/* Hair */}
            <path
              d="M78 55 Q80 42 100 40 Q120 38 122 52 Q118 44 100 43 Q82 44 80 55 Z"
              fill="#1e293b"
            />
            {/* Hair side tuft left */}
            <path d="M78 53 Q74 48 77 57" fill="#1e293b" />
            {/* Hair side tuft right */}
            <path d="M122 53 Q126 48 123 57" fill="#1e293b" />

            {/* Ears */}
            <ellipse cx="78" cy="63" rx="4" ry="5" fill="#f59e0b" />
            <ellipse cx="122" cy="63" rx="4" ry="5" fill="#f59e0b" />
            {/* Headphone cups over ears */}
            <ellipse cx="78" cy="63" rx="5" ry="6" fill="none" stroke="#334155" strokeWidth="3" />
            <ellipse cx="122" cy="63" rx="5" ry="6" fill="none" stroke="#334155" strokeWidth="3" />
            {/* Headphone band */}
            <path d="M78 57 Q100 38 122 57" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

            {/* Eyes */}
            <g className="coder-eye" style={{ transformOrigin: '89px 63px' }}>
              <ellipse cx="89" cy="63" rx="5" ry="5.5" fill="white" />
              <ellipse cx="89" cy="64" rx="3" ry="3.5" fill="#1e293b" />
              <circle cx="90.5" cy="62.5" r="1" fill="white" />
            </g>
            <g className="coder-eye" style={{ transformOrigin: '111px 63px' }}>
              <ellipse cx="111" cy="63" rx="5" ry="5.5" fill="white" />
              <ellipse cx="111" cy="64" rx="3" ry="3.5" fill="#1e293b" />
              <circle cx="112.5" cy="62.5" r="1" fill="white" />
            </g>

            {/* Glasses */}
            <rect x="83" y="59" width="14" height="10" rx="4" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.8" />
            <rect x="103" y="59" width="14" height="10" rx="4" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.8" />
            <line x1="97" y1="64" x2="103" y2="64" stroke="#60a5fa" strokeWidth="1.5" opacity="0.8" />
            <line x1="78" y1="64" x2="83" y2="64" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />
            <line x1="117" y1="64" x2="122" y2="64" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />

            {/* Subtle smile */}
            <path d="M93 74 Q100 79 107 74" fill="none" stroke="#e78c3a" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* ── Coffee Cup ── */}
          <g className="coffee-cup">
            <rect x="142" y="108" width="14" height="12" rx="2" fill="#e2e8f0" />
            <rect x="143" y="109" width="12" height="10" rx="1" fill="#7c3aed" opacity="0.3" />
            <rect x="143" y="109" width="12" height="4" rx="1" fill="#92400e" opacity="0.9" />
            <path d="M156 113 Q162 113 162 117 Q162 121 156 121" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="140" y="120" width="18" height="2" rx="1" fill="#cbd5e1" />
            {/* Steam */}
            <path className="steam-1" d="M146 107 Q147 104 145 101" fill="none" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path className="steam-2" d="M149 107 Q150 103 148 100" fill="none" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path className="steam-3" d="M152 107 Q153 104 151 101" fill="none" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          </g>

          {/* ── Floating particles (code symbols) ── */}
          <text className="particle-1" x="50" y="80" fontSize="9" fill="#818cf8" fontFamily="monospace" opacity="0">{`{}`}</text>
          <text className="particle-2" x="148" y="72" fontSize="8" fill="#34d399" fontFamily="monospace" opacity="0">{`</>`}</text>
          <text className="particle-3" x="55" y="110" fontSize="7" fill="#38bdf8" fontFamily="monospace" opacity="0">{`fn()`}</text>

        </g>

        {/* ── Gradient definitions ── */}
        <defs>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f2544" />
            <stop offset="100%" stopColor="#0a1628" />
          </linearGradient>
          <linearGradient id="reflectGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
