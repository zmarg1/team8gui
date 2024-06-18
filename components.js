class PowerButton extends React.Component{
    constructor(props){
        super(props);

    }
    toggle = () => {
        const p = this.props.power;
        if (p === 0){
            this.props.onPowerChange(1);
        }
        else {
            this.props.onPowerChange(0);
        }
    }
    render(){
        const p = this.props.power;  
        if (p === 0) {
            return(
                <div className="text-center">
                    <button type="button" onClick={this.toggle} className="btn btn-danger btn-lg m-1">Power</button>
                </div>
            );
        }
        else {
            return(
                <div className="text-center">
                    <button type="button" onClick={this.toggle} className="btn btn-success btn-lg m-1">Power</button>
                </div>
            );
        }
        
    };
}