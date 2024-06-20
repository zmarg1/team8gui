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
                <div className="container-fluid">
                    <h1 className="bg-info text-white text-center">Patient Monitoring Device Main Menu</h1>
                    <div className="row">
                        <div className="col-sm-2 text-start">
                            <TimeComponent/>
                            <PowerButton 
                                power={this.state.power}
                                onPowerChange={this.handlePowerChange}
                        />
                        </div>
                        <div className="col-sm-6 text-center">
                            <button onClick={() => {this.setState({page:'Patients'})}} className="btn btn-primary btn-md m-1">Patients</button>
                            <button onClick={() => {this.setState({page:'Alarms'})}} className="btn btn-primary btn-md m-1">Alarms</button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-md m-1">Data I/O</button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-md m-1">Display</button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-md m-1">Camera</button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-md m-1">Waveform</button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-md m-1">Prev Act</button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-md m-1">Events</button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-md m-1">Full Menu</button>
                        </div>
                        <div className="col-sm-1"> 

                        </div>
                        <div className="col-sm-3 text-center">  
                            <img src="img/bluetooth.png" alt ="bluetooth logo" width="20px" height ="auto" />
                            <span>
                                95%  
                            </span>
                            <h1 className="bg-info text-white text-center">Temp: 98.6</h1>
                        </div>
                    </div>
                    <div className="row">
                        
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
