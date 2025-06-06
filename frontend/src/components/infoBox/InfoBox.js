import "./InfoBox.scss"

const InfoBox = ({ bgColor, title, count, icon }) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <div className="info-icon">{icon}</div>
      <div className="info-text">
        <p>{title}</p>
        <h4>{count}</h4>
      </div>
    </div>
  )
}

export default InfoBox
