class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {page: 'Home',
                        power: 0
        };
    }
    handlePowerChange = (power) => {
        this.setState({power:power});
    }
    render(){
        if (this.state.page === 'Home') {
            return (
                <div className="text-center">
                    <p>HOME PAGE RENDERED</p>
                    <button onClick={() => {this.setState({page:'Patients'})}} className="btn btn-primary btn-lg m-1">Patient Info</button>
                    <button onClick={() => {this.setState({page:'Alarms'})}} className="btn btn-primary btn-lg m-1">Alarms</button>
                    <PowerButton 
                        power={this.state.power}
                        onPowerChange={this.handlePowerChange}
                    />
                </div>
            );
        }
        else if (this.state.page === 'Patients') {
            return (
                <div className="text-center">
                    <p>PATIENT INFO PAGE RENDERED</p>
                    <button onClick={() => {this.setState({page:'Home'})}} className="btn btn-primary btn-lg m-1">Back</button>
                </div>
            );
        }
        else if (this.state.page === 'Alarms'){
            return (
                <div className="text-center">
                    <p>ALARM PAGE RENDERED</p>
                    <button onClick={() => {this.setState({page:'Home'})}} className="btn btn-primary btn-lg m-1">Back</button>
                </div>
            );
        }
    }
}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
