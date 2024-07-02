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
                <div>
                    <button type="button" 
                        onClick={this.toggle} 
                        className="btn btn-danger btn-lg m-1 power-button"
                        title="Power On"
                        aria-label="Power On">
                        <i className="fa fa-power-off fa-2x"></i>
                    </button>
                </div>
            );
        }
        else {
            return(
                <div>
                    <button type="button" 
                        onClick={this.toggle} 
                        className="btn btn-success btn-lg m-1 power-button"
                        title="Power Off"
                        aria-label="Power Off">
                        <i className="fa fa-power-off fa-2x"></i>
                    </button>
                </div>
            );
        }
        
    };
}

function TimeComponent () {
    const [currTime, setCurrTime] = React.useState(new Date());
    React.useEffect(() => {
        const intervalID = setInterval(() => setCurrTime(new Date()), 1000);
        return () => {
            clearInterval(intervalID);
        };
    }, []);
    return (
        
        currTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
       
    );
}

class ECGGraph extends React.Component {
    componentDidMount() {
        this.canvas = document.getElementById(this.props.id);
        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.offset = 0;
        this.currentAmplitude = this.getRandomAmplitude();
        this.drawGraph(this.currentAmplitude);
        this.animate();
    }

    getRandomAmplitude = () => {
        const randomNumber = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
        return this.props.amplitude * (randomNumber/100);
    };

    animate = () => {
        if (!this.ctx) return;

        this.drawGraph(this.currentAmplitude);

        let step = 20;
        let x = this.offset;
        let y = this.height / 2;
        
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(x-5, y-100, step, y*2); 
        
        this.offset += 4;
        if (this.offset >= this.width) {
            this.offset = 0;
            this.currentAmplitude = this.getRandomAmplitude();
        }

        requestAnimationFrame(this.animate);
    };

    drawGraph = (amplitude) => {
        if (!this.ctx) return;
        
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.ctx.beginPath();

        this.ctx.moveTo(0, this.height / 2);

        
        const shift = this.props.shift || 0
        
        for (let x = 0; x < this.width; x++) {
            let y = this.height / 2 + amplitude * Math.sin(x * (shift)); 
            this.ctx.lineTo(x, y);
        }
        
        this.ctx.strokeStyle = this.props.strokeColor || 'lime';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    };

    render() {
        return <canvas id={this.props.id} className="waveform-canvas"></canvas>;
    }
}
    