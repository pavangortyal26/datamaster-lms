const nodes = [
  { x: 40, y: 60, label: 'Raw Data' },
  { x: 190, y: 30, label: 'Clean' },
  { x: 340, y: 90, label: 'Model' },
  { x: 480, y: 40, label: 'Insight' },
]

const paths = [
  'M 70 60 C 120 60, 140 30, 175 30',
  'M 220 32 C 270 32, 290 90, 320 90',
  'M 365 88 C 410 88, 430 40, 465 40',
]

export function PipelineAnimation() {
  return (
    <svg
      viewBox="0 0 540 140"
      className="w-full max-w-xl mx-auto"
      role="img"
      aria-label="Diagram showing raw data flowing through cleaning and modeling stages into an insight"
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#223049"
          strokeWidth="2"
        />
      ))}
      {paths.map((d, i) => (
        <path
          key={`flow-${i}`}
          d={d}
          fill="none"
          stroke="#2DD4BF"
          strokeWidth="2"
          strokeDasharray="6 18"
          className="animate-flow-dash"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
      {nodes.map((node, i) => (
        <g key={node.label} className="animate-pulse-soft" style={{ animationDelay: `${i * 0.4}s` }}>
          <circle
            cx={node.x}
            cy={node.y}
            r="18"
            fill="#121A2B"
            stroke={i === nodes.length - 1 ? '#FBBF24' : '#2DD4BF'}
            strokeWidth="2"
          />
          <text
            x={node.x}
            y={node.y + 36}
            textAnchor="middle"
            className="fill-slate font-mono"
            style={{ fontSize: '11px' }}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
