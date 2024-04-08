export default function Card(props) {
  return (
    <div
      className="card"
    >
      <img src={props.charUrl} rel="card"/>
      <p>
        {props.charName.charAt(0).toUpperCase() + props.charName.slice(1)}
      </p>
    </div>
  )
}