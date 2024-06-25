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
                <div className="container bg-dark">
                    <div className = "row bg-primary">
                        <div className = "col-sm-10"></div>
                        <div className = "col-sm-2 text-end">
                            <TimeComponent/>
                            <img src="img/bluetooth2.png" alt ="bluetooth logo" width="20px" height ="auto" />
                            <span>
                                95%  
                            </span>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-sm-1 text-center">
                            <PowerButton 
                                    power={this.state.power}
                                    onPowerChange={this.handlePowerChange}
                            /> 
                        </div>
                        <div className="col-sm-8 text-center">
                            <button onClick={() => {this.setState({page:'Patients'})}} className="btn btn-primary btn-lg m-1">Patients</button>
                            <button onClick={() => {this.setState({page:'Alarms'})}} className="btn btn-primary btn-lg m-1">Alarms</button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-lg m-1">Data I/O</button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-lg m-1">Display</button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-lg m-1">Camera</button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-lg m-1">Waveform</button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-lg m-1">Events</button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-lg m-1">Full Menu</button>
                        </div>
                        <div className="col-sm-3">
                            <div className="temp-container border border-white">
                                <h2 className="text-white text-center">Temp: 98.6</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row my-1">
                        <div className="col-sm-9">
                            <div className="waveform-container border border-success"></div>
                        </div>
                        <div className="col-sm-3">
                            <div className="side-container border border-success">
                                <h2 className="text-white text-center">120 HR BPM</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row my-1">
                        <div className="col-sm-9">
                            <div className="waveform-container border border-success"></div>
                        </div>
                        <div className="col-sm-3">
                            <div className="side-container border border-success ">
                                <h2 className="text-white text-center">120 HR BPM</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row my-1">
                        <div className="col-sm-9">
                            <div className="waveform-container border border-primary"></div>

                        </div>
                        <div className="col-sm-3">
                            <div className="side-container border border-primary">
                                <h2 className="text-white text-center">120 HR BPM</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row my-1">
                        <div className="col-sm-9">
                            <div className="waveform-container border border-warning"></div>

                        </div>
                        <div className="col-sm-3">
                                <div className="side-container border border-warning">
                                    <h2 className="text-white text-center">120 HR BPM</h2>
                                </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-sm-3 text-start text-white">
                            <div className="patient-container border border-white">
                                <h3 className="text-white text-start">Patient: -</h3>
                                <h3 className="text-white text-start">-</h3>
                            </div>
                        </div>
                        <div className="col-sm-4 text-center">
                            <button onClick={() => {this.setState({page:'Patients'})}} className="btn btn-success btn-lg m-1"><i class="fa fa-phone"></i></button>
                            <button onClick={() => {this.setState({page:'Alarms'})}} className="btn btn-danger btn-lg m-1"><i class="fa fa-phone"></i></button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-lg m-1"><i class="fa fa-bell"></i></button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-lg m-1"><i class="fa fa-bell-slash-o"></i></button>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-primary btn-lg m-1"><i class="fa fa-sun-o"></i></button>
                            
                        </div>
                        <div className="col-sm-5 d-flex justify-content-between">
                            <div className="pressure-container border border-white">
                                <h2 className="text-white text-center">S: 110</h2>
                            </div>
                            <div className="pressure-container border border-white">
                                <h2 className="text-white text-center">M: 100</h2>
                            </div>
                            <div className="pressure-container border border-white">
                                <h2 className="text-white text-center">D: 70</h2>
                            </div>
                            <button onClick={() => {this.setState({page:'#'})}} className="btn btn-warning btn-lg m-1"><i class="fa fa-play"></i></button>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.page === 'Patients') {
            return (
                <div className="container-fluid">
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
                <div className="container-fluid">
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
