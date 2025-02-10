export function Gauge({
  className,
  value,
  size,
}: {
  className?: string
  value: number
  size: number
}) {
  const normalizedValue = Math.min(100, Math.max(0, value))
  
  const startAngle = 60
  const endAngle = 300
  const totalAngle = endAngle - startAngle
  
  const radius = size * 0.4
  const strokeWidth = size * 0.04
  
  const getArcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(0, 0, radius, startAngle)
    const end = polarToCartesian(0, 0, radius, endAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
    
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
    ].join(" ")
  }
  
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    }
  }

  // Calculate gradient coordinates
  const startPoint = polarToCartesian(0, 0, radius, startAngle)
  const endPoint = polarToCartesian(0, 0, radius, endAngle)

  // Calculate the arc length for stroke-dasharray
  const arcLength = (Math.PI * radius * totalAngle) / 180
  const progress = normalizedValue / 100

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`${-size/2} ${-size/2} ${size} ${size}`}
      style={{ transform: 'rotate(180deg)' }}
    >
      {/* Background arc */}
      <path
        d={getArcPath(startAngle, endAngle)}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      
      {/* Value arc with gradient */}
      <defs>
        <linearGradient
          id="gaugeGradient"
          x1={startPoint.x}
          y1={startPoint.y}
          x2={endPoint.x}
          y2={endPoint.y}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--bgtxt-teal-lighter)" />
          <stop offset="33%" stopColor="var(--bgtxt-teal-light)" />
          <stop offset="67%" stopColor="var(--bgtxt-teal-normal)" />
          <stop offset="100%" stopColor="var(--bgtxt-teal-dark)" />
        </linearGradient>
      </defs>
      
      <path
        d={getArcPath(startAngle, endAngle)}
        fill="none"
        stroke="url(#gaugeGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={arcLength}
        strokeDashoffset={arcLength * (1 - progress)}
        style={{ transition: 'stroke-dashoffset 0.3s ease-in-out' }}
      />
    </svg>
  )
}
