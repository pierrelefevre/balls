export default function Ball(props) {

    let className = 'ball'
    if(props.hovered){
        className += ' hovered'
    }
    if(!props.active){
        className += ' removed'
    }

    return (
        <div onClick={() => props.clicked({ number: props.number, color: props.color })} className={className} style={{ backgroundColor: props.color }}>
            <div className="ball-stripe" style={props.striped ? { backgroundColor: "white", color: "black" } : { backgroundColor: props.color }}>
                {props.number}
            </div>
        </div>)
}