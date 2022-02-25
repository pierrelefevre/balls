export default function Ball(props) {


    let className = 'ball'
    if (props.ball.hovered) {
        className += ' hovered'
    }
    if (!props.ball.active) {
        className += ' removed'
    }

    return (
        <div onClick={() => props.clicked(props.ball)} className={className} style={{ backgroundColor: props.ball.color }}>
            <div className="ball-stripe" style={props.ball.striped ? { backgroundColor: "white", color: "black" } : { backgroundColor: props.ball.color }}>
                {props.ball.number}
            </div>
        </div>)
}