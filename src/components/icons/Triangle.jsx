export default function Triangle({ className, fill = "#FFF", style }) {
  return (
    <svg
      className={className}
      fill={fill}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      style = {style}
    >
      <polygon points="256 32 20 464 492 464 256 32" />
    </svg>
  )
}
