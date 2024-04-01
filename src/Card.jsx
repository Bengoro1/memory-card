export default function Card({charUrl, charName}) {
  return (
    <div
      className="card"
    >
      <img src={charUrl} rel="card"/>
      <p>
        {charName}
      </p>
    </div>
  )
}