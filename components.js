
class PowerButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isPoweringUp: false };
		this.state = { isPoweringDown: false };

	}
	toggle = () => {
		const power = this.props.power;
		const isPoweringUp = this.state.isPoweringUp;
		const onPoweringUpChange = this.props.onPoweringUpChange;
		const onPoweringDownChange = this.props.onPoweringDownChange;

		// Set the powering on mode and turns on after 3 seconds
		if (power === 0 && !isPoweringUp) {
			this.setState({ isPoweringUp: true });
			onPoweringUpChange(true);

			setTimeout(() => {
				this.setState({ isPoweringUp: false });
				this.props.onPowerChange(1);
				onPoweringUpChange(false);
			}, 3000);
		}
		//  Turn the device off if it's already on, takes 3 seconds
		else if (power === 1) {
			this.setState({ isPoweringDown: true });
			onPoweringDownChange(true);

			setTimeout(() => {
				this.setState({ isPoweringDown: false });
				this.props.onPowerChange(0);
				onPoweringDownChange(false);
			}, 3000);
		}
	}



	render() {
		const power = this.props.power;
		const isPoweringUp = this.state.isPoweringUp;
		const isPoweringDown = this.state.isPoweringDown;

		if (power === 0 && !isPoweringUp) {
			return (
				<div>
					<button type="button"
						onClick={this.toggle}
						className="btn btn-danger btn-lg m-1 power-button"
						title="Power On"
						aria-label="Power On">
						<i className="fa fa-power-off"></i>
					</button>
				</div>
			);
		}
		else if (power === 0 && isPoweringUp) {
			return (
				<div>
					<button type="button"
						onClick={this.toggle}
						className="btn btn-info btn-lg m-1 power-button"
						title="Powering Up"
						aria-label="Powering Up">
						<i className="fa fa-power-off"></i>
					</button>
				</div>
			);
		}
		else if (power === 1 && isPoweringDown) {
			return (
				<div>
					<button type="button"
						onClick={this.toggle}
						className="btn btn-warning btn-lg m-1 power-button"
						title="Powering Down"
						aria-label="Powering Down">
						<i className="fa fa-power-off"></i>
					</button>
				</div>
			);
		}

		else if (power === 1 && !isPoweringDown) {
			return (
				<div>
					<button type="button"
						onClick={this.toggle}
						className="btn btn-success btn-lg m-1 power-button"
						title="Power Off"
						aria-label="Power Off">
						<i className="fa fa-power-off"></i>
					</button>
				</div>
			);
		}

	};
}


// Function to generate the the current time in the top bar
function TimeComponent() {
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

// function to generates each of the waveform graphs
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

	// Function to generate a random number to affect the sine wave function
	getRandomAmplitude = () => {
		const randomNumber = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
		return this.props.amplitude * (randomNumber / 100);
	};


	animate = () => {
		if (!this.ctx) return;

		// draw the waveform
		this.drawGraph(this.currentAmplitude);

		// Function to set selected patient to the one we select in the patient page
		let step = 20;
		let x = this.offset;
		let y = this.height / 2;

		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(x - 5, y - 100, step, y * 2);

		this.offset += 4;
		if (this.offset >= this.width) {
			this.offset = 0;

			// get a new amplitude after the black box sweeps over the graph each time
			this.currentAmplitude = this.getRandomAmplitude();
		}

		requestAnimationFrame(this.animate);
	};

	drawGraph = (amplitude) => {
		if (!this.ctx) return;

		// Clear the canvas
		this.ctx.clearRect(0, 0, this.width, this.height);

		// Draw the green millivolt legend on the ecg2 graph
		if (this.props.id === 'ecg2') {
			this.ctx.beginPath();

			// Start from bottom right
			this.ctx.moveTo(this.width - 25, this.height - 2);

			// Move to the right a bit
			this.ctx.lineTo(this.width - 25 + 5, this.height - 2);

			// Move to the center
			this.ctx.lineTo(this.width - 25 + 5, (this.height / 2));

			// Move to the right a bit
			this.ctx.lineTo(this.width - 25 + 10, (this.height / 2));

			// Move down to bottom
			this.ctx.lineTo(this.width - 25 + 10, this.height - 2);

			// Move right again
			this.ctx.lineTo(this.width - 25 + 15, this.height - 2);

			this.ctx.strokeStyle = this.props.strokeColor;
			this.ctx.lineWidth = 2;
			this.ctx.stroke();
		}

		// draw the waveform
		this.ctx.beginPath();

		this.ctx.moveTo(0, this.height / 2);

		// assign the waveform shift to make each graph look different
		const shift = this.props.shift || 0

		// generate a sine wave for each graph
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
