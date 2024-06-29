class ECGGraph extends React.Component {
    componentDidMount() {
        this.canvas = document.getElementById(this.props.id);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.offset = 0;

        this.animate();
    }

    animate = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawGrid();
        this.drawGraph();
        this.drawBlackBox();

        this.offset += 2; // Speed of the black box
        if (this.offset > this.width) {
            this.offset = 0;
        }

        requestAnimationFrame(this.animate);
    };

    drawGrid = () => {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.lineWidth = 1;

        for (let x = 0; x < this.width; x += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }

        for (let y = 0; y < this.height; y += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
    };

    drawGraph = () => {
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height / 2);
        for (let x = 0; x < this.width; x++) {
            let y = this.height / 2 + 20 * Math.sin((x + this.offset) / 10); // Example sine wave
            this.ctx.lineTo(x, y);
        }
        this.ctx.strokeStyle = 'lime';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    };

    drawBlackBox = () => {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(this.offset, 0, 20, this.height);
    };

    render() {
        return <canvas id={this.props.id} width="600" height="175" className="waveform-container"></canvas>;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'Home',
            power: 0
        };
    }

    handlePowerChange = (power) => {
        this.setState({ power });
    };

    renderPageButtons = () => (
        <>
            <button onClick={() => this.setState({ page: 'Patients' })} className="btn btn-primary btn-lg m-1">
                <i className="fa fa-users"></i>
            </button>
            <button onClick={() => this.setState({ page: 'Alarms' })} className="btn btn-primary btn-lg m-1">Alarms</button>
            <button onClick={() => this.setState({ page: '#' })} className="btn btn-primary btn-lg m-1">Data I/O</button>
            <button onClick={() => this.setState({ page: '#' })} className="btn btn-primary btn-lg m-1">Display</button>
            <button onClick={() => this.setState({ page: '#' })} className="btn btn-primary btn-lg m-1">Camera</button>
            <button onClick={() => this.setState({ page: '#' })} className="btn btn-primary btn-lg m-1">Waveform</button>
            <button onClick={() => this.setState({ page: '#' })} className="btn btn-primary btn-lg m-1">Events</button>
            <button onClick={() => this.setState({ page: '#' })} className="btn btn-primary btn-lg m-1">Full Menu</button>
        </>
    );

    renderHeader = () => (
        <div className="row bg-primary">
            <div className="col-sm-9"></div>
            <div className="col-sm-3 text-end align-items">
                <i className="fa fa-signal icon-bar"></i>
                <i className="fa fa-plug icon-bar"></i>
                <TimeComponent />
                <img src="img/bluetooth2.png" alt="bluetooth logo" width="20px" height="auto" />
                <span>95%</span>
            </div>
        </div>
    );

    renderSideContainer = (content, additionalClass = '') => (
        <div className={`side-container border border-success text-white text-center ${additionalClass}`}>
            {content}
        </div>
    );

    renderWaveformRow = (id, content) => (
        <div className="row my-1">
            <div className="col-sm-9">
                <ECGGraph id={id} />
            </div>
            <div className="col-sm-3">
                {this.renderSideContainer(content)}
            </div>
        </div>
    );

    render() {
        if (this.state.page === 'Home') {
            return (
                <div className="container bg-dark">
                    {this.renderHeader()}
                    <div className="row mt-1">
                        <div className="col-sm-1 text-center">
                            <PowerButton 
                                power={this.state.power}
                                onPowerChange={this.handlePowerChange}
                            />
                        </div>
                        <div className="col-sm-8 text-center">
                            {this.renderPageButtons()}
                        </div>
                        <div className="col-sm-3">
                            <div className="temp-container border border-white">
                                <h2 className="text-white text-center">Temp: 98.6</h2>
                            </div>
                        </div>
                    </div>
                    {this.renderWaveformRow('ecg1',
                        <>
                            <h1>120</h1>
                            <h2>HR BPM</h2>
                        </>
                    )}
                    {this.renderWaveformRow('ecg2',
                        <>
                            <h2>10</h2>
                            <h2>Lead</h2>
                            <span>
                                <i className="fa fa-heartbeat fa-5x"></i>
                            </span>
                        </>
                    )}
                    {this.renderWaveformRow('ecg3',
                        <>
                            <h1>99</h1>
                            <h2>S<sub>p</sub>O<sub>2</sub> %</h2>
                        </>
                    )}
                    {this.renderWaveformRow('ecg4',
                        <div className="text-white">
                            <h2>40</h2>
                            <h5>Resp. rpm ETCO<sub>2</sub></h5>
                            <h3>mmHg</h3>
                            <h2>42</h2>
                        </div>
                    )}
                    <div className="row mt-1">
                        <div className="col-sm-3 text-start text-white">
                            <div className="patient-container border border-white">
                                <h3 className="text-white text-start">Patient: -</h3>
                                <h3 className="text-white text-start">-</h3>
                            </div>
                        </div>
                        <div className="col-sm-4 text-center">
                            <button onClick={() => this.setState({ page: 'Patients' })} className="btn btn-success btn-lg m-1">
                                <i className="fa fa-phone"></i>
                            </button>
                            <button onClick={() => this.setState({ page: 'Alarms' })} className="btn btn-danger btn-lg m-1">
                                <i className="fa fa-phone"></i>
                            </button>
                            <button onClick={() => this.setState({ page: '#' })} className="btn btn-primary btn-lg m-1">
                                <i className="fa fa-bell"></i>
                            </button>
                            <button onClick={() => this.setState({ page: '#' })} className="btn btn-primary btn-lg m-1">
                                <i className="fa fa-bell-slash-o"></i>
                            </button>
                            <button onClick={() => this.setState({ page: '#' })} className="btn btn-primary btn-lg m-1">
                                <i className="fa fa-sun-o"></i>
                            </button>
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
                            <button onClick={() => this.setState({ page: '#' })} className="btn btn-warning btn-lg m-1">
                                <i className="fa fa-play"></i>
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.page === 'Patients') {
            return (
                <div className="container-fluid">
                    <h1 className="bg-info text-white text-center">Patient Info</h1>
                    <div className="row text-center">
                        <div className="col-sm-12">
                            <button onClick={() => this.setState({ page: 'Home' })} className="btn btn-primary btn-lg m-1">Back</button>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.page === 'Alarms') {
            return (
                <div className="container-fluid">
                    <h1 className="bg-info text-white text-center">Alarms</h1>
                    <div className="row text-center">
                        <div className="col-sm-12">
                            <button onClick={() => this.setState({ page: 'Home' })} className="btn btn-primary btn-lg m-1">Back</button>
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
