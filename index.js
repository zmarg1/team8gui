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
                <div className="container">
                    <h1 className="bg-info text-white text-center">Patient Monitoring Device Main Menu</h1>
                    <div className="row">
                        <div className="col-sm-4 text-center">
                            <PowerButton 
                                power={this.state.power}
                                onPowerChange={this.handlePowerChange}
                        />
                        </div>
                        <div className="col-sm-8 text-start">
                            <button onClick={() => {this.setState({page:'Patients'})}} className="btn btn-primary btn-lg m-1">Patient Info</button>
                            <button onClick={() => {this.setState({page:'Alarms'})}} className="btn btn-primary btn-lg m-1">Alarms</button>
                        </div>
                        
                    </div>
                </div>
            );
        }
        else if (this.state.page === 'Patients') {
            return (
                <div className="container">
                        <h1 className="bg-info text-white text-center">Pateint Info</h1>
                        <div className="row text-center">
                            <div className="col-sm-12">
                            <button onClick={() => {this.setState({page:'Home'})}} className="btn btn-primary btn-lg m-1">Back</button>
                            </div>
                        </div>
                    </div>
            );
        }
        else if (this.state.page === 'Alarms'){
            return (
                <div className="container">
                    <h1 className="bg-info text-white text-center">Alarms</h1>
                    <div className="row text-center">
                        <div className="col-sm-12">
                            <button onClick={() => {this.setState({page:'Home'})}} className="btn btn-primary btn-lg m-1">Back</button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
