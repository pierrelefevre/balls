export default function Ball(props) {
    return (
        <div onClick={() => props.clicked({ number: props.number, color: props.color })} className="ball" style={{ backgroundColor: props.color }}>
            <div className="ball-stripe" style={props.striped ? { backgroundColor: "white", color: "black" } : { backgroundColor: props.color }}>
                {props.number}
            </div>
        </div>)
}