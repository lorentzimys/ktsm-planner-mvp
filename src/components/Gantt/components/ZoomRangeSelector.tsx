export const ZoomRangeSelector = () => {
  const handleZoomChange = () => {

  }
  
  return (
    <div className="relative pt-1">
      <label className="form-label">Zoom</label>
      <input
        onChange={handleZoomChange}
        type="range"
        className="
          form-range
          appearance-none
          w-full
          h-6
          p-0
          bg-transparent
          focus:outline-none focus:ring-0 focus:shadow-none
        "
      />
    </div>
  )
}