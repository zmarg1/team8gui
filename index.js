class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "Home",
			power: 0,
			isPoweringUp: false,
			isPoweringDown: false,
			searchTerm: "",
			patientDB: [
				{
					id: 0,
					name: "No Patient Selected",
					ageType: "-",
					age: "-",
					prescribedDrugs: "-",
					incidentInfo: "-",
					temperature: "-",
					heartRate: "-",
					spo2: "-",
					respiratoryRPM: "-",
					endTidal: "-",
					bloodPressureSystolic: "-",
					bloodPressureDiastolic: "-",
					bloodPressureMean: "-",
					heartLead: "-",
					NIBPTime: "-",
					ST1: "-",
					ST2: "-",
					QT: "-",
					SpHb: "-",
					SpCO: "-",
					SpMet: "-",
				},
				{
					id: 1,
					name: "Steve McQueen",
					ageType: "Adult",
					age: 23,
					prescribedDrugs: "Enalapril",
					incidentInfo: "Stroke",
					temperature: 100.0,
					heartRate: 60,
					spo2: 95,
					respiratoryRPM: 40,
					endTidal: 42,
					bloodPressureSystolic: 110,
					bloodPressureDiastolic: 70,
					bloodPressureMean: 90,
					heartLead: 12,
					NIBPTime: "7:01",
					ST1: "1.0",
					ST2: "1.5",
					QT: "350",
					SpHb: "9.0",
					SpCO: "8.5",
					SpMet: "1.1",
				},
				{
					id: 2,
					name: "Zach Margulies",
					ageType: "Adult",
					age: 31,
					prescribedDrugs: "Aspirin",
					incidentInfo: "Animal Bite",
					temperature: 97.2,
					heartRate: 70,
					spo2: 99,
					respiratoryRPM: 16,
					endTidal: 35,
					bloodPressureSystolic: 100,
					bloodPressureDiastolic: 60,
					bloodPressureMean: 70,
					heartLead: 3,
					NIBPTime: "7:58",
					ST1: "1.9",
					ST2: "0.5",
					QT: "425",
					SpHb: "9.6",
					SpCO: "8.6",
					SpMet: "1.0",
				},
				{
					id: 3,
					name: "Daniel Folkendt",
					ageType: "Adult",
					age: 22,
					prescribedDrugs: "Amoxicillin ",
					incidentInfo: "Sprained Ankle",
					temperature: 98.9,
					heartRate: 60,
					spo2: 98,
					respiratoryRPM: 30,
					endTidal: 40,
					bloodPressureSystolic: 120,
					bloodPressureDiastolic: 80,
					bloodPressureMean: 90,
					heartLead: 4,
					NIBPTime: "8:56",
					ST1: "1.1",
					ST2: "1.2",
					QT: "450",
					SpHb: "9.2",
					SpCO: "7.9",
					SpMet: "1.8",
				},
			],
			selectedPatient: null,
			newPatient: {
				id: "",
				name: "",
				ageType: "",
				age: "",
				prescribedDrugs: "",
				incidentInfo: "",
				temperature: "",
				heartRate: "",
				spo2: "",
				respiratoryRPM: "",
				endTidal: "",
				bloodPressureSystolic: "",
				bloodPressureDiastolic: "",
				bloodPressureMean: "",
				heartLead: "",
				NIBPTime: "",
				ST1: "",
				ST2: "",
				QT: "",
				SpHb: "",
				SpCO: "",
				SpMet: "",
			},
			messageAddPatient: "",
			messageEditPatient: "",
		};

		this.state.selectedPatient = this.state.patientDB.find(
			(patient) => patient.id === 0
		);
	}

	resetNewPatient = () => {
		this.setState({
			newPatient: {
				id: "",
				name: "",
				ageType: "",
				age: "",
				prescribedDrugs: "",
				incidentInfo: "",
				temperature: "",
				heartRate: "",
				spo2: "",
				respiratoryRPM: "",
				endTidal: "",
				bloodPressureSystolic: "",
				bloodPressureDiastolic: "",
				bloodPressureMean: "",
				heartLead: "",
				NIBPTime: "",
				ST1: "",
				ST2: "",
				QT: "",
				SpHb: "",
				SpCO: "",
				SpMet: "",
			},
		});
	};

	// Function to add a patient to the DB
	addPatient = () => {
		const { patientDB, newPatient } = this.state;

		// Checks if the ID is provided and not already in db
		if (!newPatient.id || patientDB[newPatient.id]) {
			this.setState({
				messageAddPatient: "Please provide a valid or unique ID for the patient.",
				newPatient: { ...newPatient, id: "" },
			});
			return;
		}

		// Create a new patient object
		const patient = {
			id: newPatient.id,
			name: newPatient.name,
			ageType: newPatient.ageType,
			age: newPatient.age,
			prescribedDrugs: newPatient.prescribedDrugs,
			incidentInfo: newPatient.incidentInfo,
			temperature: newPatient.temperature,
			heartRate: newPatient.heartRate,
			spo2: newPatient.spo2,
			respiratoryRPM: newPatient.respiratoryRPM,
			endTidal: newPatient.endTidal,
			bloodPressureSystolic: newPatient.bloodPressureSystolic,
			bloodPressureDiastolic: newPatient.bloodPressureDiastolic,
			bloodPressureMean: newPatient.bloodPressureMean,
			heartLead: newPatient.heartLead,
			NIBPTime: newPatient.NIBPTime,
			ST1: newPatient.ST1,
			ST2: newPatient.ST2,
			QT: newPatient.QT,
			SpHb: newPatient.SpHb,
			SpCO: newPatient.SpCO,
			SpMet: newPatient.SpMet,

		};

		// Reset new patient info
		this.resetNewPatient();

		// Update db and save to local json storage
		this.setState(
			{
				patientDB: [...patientDB, patient],
				messageAddPatient: "Patient added successfully.",
			},
			() => {
				const JSONObject = JSON.stringify(this.state.db);
				localStorage.setItem("localDB", JSONObject);
				console.log(JSONObject);
			}
		);
	};


	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState((prevState) => ({
			newPatient: {
				...prevState.newPatient,
				[name]: value,
			},
		}));
	};

	handleSearchChange = (e) => {
		this.setState({ searchTerm: e.target.value });
	};

	// Function to update the power in the app
	handlePowerChange = (power) => {
		this.setState({ power: power });
		this.state.selectedPatient = this.state.patientDB.find(
			(patient) => patient.id === 0
		);
	};

	// Function to set the powering up state
	handlePoweringUpChange = (isPoweringUp) => {
		this.setState({ isPoweringUp: isPoweringUp });
	}

	// Function to set the powering down state
	handlePoweringDownChange = (isPoweringDown) => {
		this.setState({ isPoweringDown: isPoweringDown });
	}

	// Function to set selected patient to the one we select in the patient page
	handlePatientSelect = (id) => {
		const patientToShow = this.state.patientDB.find(
			(patient) => patient.id === id
		);
		this.setState({ selectedPatient: patientToShow });
	};

	// Function to delete patient from the one selected in the patient page
	handlePatientDelete = (id) => {
		const updatedDB = this.state.patientDB.filter(
			(patient) => patient.id !== id
		);

		// check if the deleted patient was one that was selected
		if (id === this.state.selectedPatient.id) {
			this.handlePatientSelect(0);
		}

		// Then just update the table
		this.setState({
			patientDB: updatedDB,
		});
	};


	// function to wipe the DB except for the placeholder patient
	handleClearDB = () => {
		const initialDB = [
			{
				id: 0,
				name: "No Patient Selected",
				ageType: "-",
				age: "-",
				prescribedDrugs: "-",
				incidentInfo: "-",
				temperature: "-",
				heartRate: "-",
				spo2: "-",
				respiratoryRPM: "-",
				endTidal: "-",
				bloodPressureSystolic: "-",
				bloodPressureDiastolic: "-",
				bloodPressureMean: "-",
				heartLead: "-",
				NIBPTime: "-",
				ST1: "-",
				ST2: "-",
				QT: "-"
			},
		];
		this.setState({
			patientDB: initialDB,
			selectedPatient: initialDB.find((patient) => patient.id === 0),
		});
	};

	// Function that that sets the newpatient as the one we are editing/viewing
	handleViewEditPatient = (id) => {

		const patient = this.state.patientDB.find((patient) => patient.id === id);
		this.setState({
			newPatient: { ...patient },
			page: "Patient-Edit"
		});
	};


	// Function to update the patient in the view/edit mode
	handleUpdatePatient = () => {
		const { patientDB, newPatient } = this.state;

		// Get the index of the patient to be updated
		const patientIndex = patientDB.findIndex((patient) => patient.id === newPatient.id);

		// Check if patient was not found and return error
		if (patientIndex === -1) {
			this.setState({
				messageEditPatient: "Patient not found.",
			});
			return;
		}

		// Update the patient details
		const updatedDB = [...patientDB];
		updatedDB[patientIndex] = newPatient;

		// Update the state and localStorage
		this.setState(
			{
				patientDB: updatedDB,
				messageEditPatient: "Patient updated successfully.",
			},
			() => {
				const JSONObject = JSON.stringify(this.state.patientDB);
				localStorage.setItem("localDB", JSONObject);
				this.resetNewPatient();
			}
		);
	};


	render() {
		// Create a filtered db to exclude the null patient and filters by name
		const filteredPatients = this.state.patientDB.filter(
			(patient) => patient.id !== 0 && patient.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
		);

		const isPatientSelected = this.state.selectedPatient.id !== 0;
		const isPowerOn = this.state.power === 1;
		const isPoweringUp = this.state.isPoweringUp;
		const isPoweringDown = this.state.isPoweringDown;

		if (this.state.page === "Home") {
			return (
				<div className="container bg-dark" style={{ minWidth: "1100px", height: "1010px" }}>
					<div className="row bg-primary">
						<div className="col-sm-4 d-flex justify-content-start text-start align-items-center">
							{isPowerOn && <i
								className="fa fa-plug icon-bar"
								title="Mains power LED"
								aria-label="Mains power LED"></i>}
							{isPowerOn && <i
								className="fa fa-battery-full icon-bar"
								style={{ color: "#28a745" }}
								title="Mains charger attached"
								aria-label="Mains charger attached"></i>}
							{isPowerOn && <i
								className="fa fa-battery-full icon-bar"
								style={{ color: "#28a745" }}
								title="Battery Charging"
								aria-label="Battery Charging"></i>}
							{isPowerOn && <i
								className="fa fa-bolt icon-bar"
								title="Battery Charger LED"
								aria-label="Battery Charger LED">
							</i>}
						</div>
						<div className="col-sm-4 d-flex justify-content-center text-center align-items-center">
							{isPoweringUp && <span className="top-bar">Device Powering Up . . .</span>}
							{isPoweringDown && <span className="top-bar">Device Powering Down . . .</span>}

							{isPowerOn && !(isPoweringDown || isPoweringUp) && <span className="top-bar align-items-center">Corsium Connection Active <i className="fa fa-check-circle mr-2 text-success"></i></span>}
						</div>
						<div className="col-sm-4 d-flex justify-content-end text-end align-items-center">
							{isPowerOn && <span
								className="top-bar"
								title="Battery Charge Percentage"
								aria-label="Battery Charge Percentage">95%</span>}
							{isPowerOn && <i
								className="fa fa-signal icon-bar ml-2"
								title="Internet Signal Strength"
								aria-label="Internet Signal Strength"
							></i>}
							{isPowerOn && (
								<img
									src="img/bluetooth2.png"
									alt="bluetooth logo"
									width="20px"
									height="auto"
									title="Bluetooth Connected"
									aria-label="Bluetooth Connected"
								/>
							)}

							{isPowerOn && (<TimeComponent />)}
							{!isPowerOn && (<span>&nbsp;</span>)}
						</div>
					</div>
					<div className="row mt-1">
						<div className="col-sm-1 button-container">
							<PowerButton
								power={this.state.power}
								onPowerChange={this.handlePowerChange}
								onPoweringUpChange={this.handlePoweringUpChange}
								onPoweringDownChange={this.handlePoweringDownChange}
							/>
						</div>
						<div className="col-sm-8 button-container">

							<button
								onClick={() => { }}
								className="btn btn-primary btn-lg m-1 top-buttons"
								title="Alarms"
								aria-label="Alarms"
							>
								<i className="fa fa-clock-o"></i>
							</button>
							<button
								onClick={() => { }}
								className="btn btn-primary btn-lg m-1 top-buttons"
								title="Data Input/Output"
								aria-label="Data Input/Output"
							>
								<i className="fa fa-exchange"></i>
							</button>
							<button
								onClick={() => { }}
								className="btn btn-primary btn-lg m-1 top-buttons"
								title="Display Options"
								aria-label="Display Options"
							>
								<i className="fa fa-desktop"></i>
							</button>
							<button
								onClick={() => { }}
								className="btn btn-primary btn-lg m-1 top-buttons"
								title="Camera"
								aria-label="Camera"
							>
								<i className="fa fa-camera"></i>
							</button>
							<button
								onClick={() => { }}
								className="btn btn-primary btn-lg m-1 top-buttons"
								title="Waveform"
								aria-label="Waveform"
							>
								<i className="fa fa-heartbeat"></i>
							</button>
							<button
								onClick={() => { }}
								className="btn btn-primary btn-lg m-1 top-buttons"
								title="Events"
								aria-label="Events"
							>
								<i className="fa fa-calendar-check-o"></i>
							</button>
							<button
								onClick={() => { }}
								className="btn btn-primary btn-lg m-1 top-buttons"
								title="Previous Activity"
								aria-label="Previous Activity"
							>
								<i className="fa fa-undo"></i>
							</button>
							<button
								onClick={() => { }}
								className="btn btn-primary btn-lg m-1 top-buttons"
								title="Home"
								aria-label="Home"
							>
								<i className="fa fa-home"></i>
							</button>
							<button
								onClick={() => { }}
								className="btn btn-primary btn-lg m-1 top-buttons"
								title="Full Menu"
								aria-label="Full Menu"
							>
								<i className="fa fa-bars"></i>
							</button>


							<button
								onClick={() => {
									isPowerOn && this.setState({ page: "Patients" });
								}}
								className="btn btn-info btn-lg m-1 top-buttons"
								title="Patient Page"
								aria-label="Patient Page"
							>
								<i className="fa fa-users"></i>
							</button>

						</div>
						<div className="col-sm-3">
							<div className="side-wrapper">
								<div className="temp-container border border-white text-white text-center">
									<div>{isPowerOn && (
										<h1> <h5 className="d-inline">T1 </h5>
											{this.state.selectedPatient.temperature}

										</h1>

									)}
										{isPowerOn && <h3>Temp:  &#8457;</h3>}
									</div>

									<div></div>
								</div>
								<div className="border border-white text-white text-center temp-alert">
									{isPowerOn && <h5 className="">100.0</h5>}
									{isPowerOn && (<h5 className="">95.0</h5>)}
								</div>
							</div>

						</div>
					</div>
					<div className="row my-1">
						<div className="col-sm-9">
							<div className="waveform-container border border-success">
								{isPowerOn && (
									<div className="waveform-text text-success">ECG II</div>
								)}
								{isPowerOn && (
									<div className="arrhythmia-text text-info">Arrhythmia Analysis On</div>
								)}
								{isPowerOn && isPatientSelected && (
									<div className="millivolt-text text-success">1mV</div>
								)}
								{isPowerOn && isPatientSelected && (
									<ECGGraph
										id="ecg2"
										strokeColor="lime"
										amplitude={30}
										shift={0.05}
									/>
								)}
							</div>
						</div>
						<div className="col-sm-3">
							<div className="side-wrapper">
								<div className="side-container border border-success text-white text-center">
									{isPowerOn && <h2>{this.state.selectedPatient.heartRate}</h2>}
									{isPowerOn && <h3>HR BPM</h3>}
									{isPowerOn && (
										<div className="d-flex justify-content-between w-75">
											<span>ST1-II</span>
											<span>{this.state.selectedPatient.ST1}</span>
											<span>mm</span>
										</div>
									)}
									{isPowerOn && (
										<div className="d-flex justify-content-between w-75">
											<span>ST2-I</span>
											<span>{this.state.selectedPatient.ST2}</span>
											<span>mm</span>
										</div>
									)}
									{isPowerOn && (
										<div className="d-flex justify-content-between w-75">
											<span>QT</span>
											<span>{this.state.selectedPatient.QT}</span>
											<span>ms</span>
										</div>
									)}


								</div>
								<div className="side-alert border border-success text-white text-center">
									{isPowerOn && <h5 className="">180</h5>}
									{isPowerOn && (<h5 className="">50</h5>)}
								</div>
							</div>
						</div>
					</div>
					<div className="row my-1">
						<div className="col-sm-9">
							<div className="waveform-container border border-success">
								{isPowerOn && (
									<div className="waveform-text text-success">ECG I</div>
								)}
								{isPowerOn && isPatientSelected && (
									<ECGGraph
										id="ecg1"
										strokeColor="lime"
										amplitude={30}
										shift={0.059}
									/>
								)}
							</div>
						</div>
						<div className="col-sm-3">
							<div className="side-wrapper">
								<div className="side-container border border-success text-white text-center"
								style = {{width:"95%"}}>
									{isPowerOn && <h1>{this.state.selectedPatient.heartLead} Lead</h1>}

									<span>
										{isPowerOn && (
											<i className="fa fa-heartbeat fa-5x text-danger"></i>
										)}
									</span>
								</div>
								
							</div>

						</div>
					</div>
					<div className="row my-1">
						<div className="col-sm-9">
							<div className="waveform-container border border-primary">
								{isPowerOn && (
									<div className="waveform-text text-primary">PLETH</div>
								)}
								{isPowerOn && isPatientSelected && (
									<ECGGraph
										id="pleth"
										strokeColor="blue"
										amplitude={50}
										shift={0.06}
									/>
								)}
							</div>
						</div>
						<div className="col-sm-3">
							<div className="side-wrapper">

								<div className="side-container border border-primary text-white text-center">
									{isPowerOn && (
										<h1>
											{this.state.selectedPatient.spo2} <h4 className="d-inline"> SpO<sub>2</sub> %</h4>
										</h1>
									)}
									{isPowerOn && (
										<div className="d-flex justify-content-between w-75">
											<span>SpHb</span>
											<span>{this.state.selectedPatient.SpHb}</span>
											<span>g/dl</span>
										</div>
									)}
									{isPowerOn && (
										<div className="d-flex justify-content-between w-75">
											<span>SpCO</span>
											<span>{this.state.selectedPatient.SpCO}</span>
											<span>%</span>
										</div>
									)}
									{isPowerOn && (
										<div className="d-flex justify-content-between w-75">
											<span>SpMet</span>
											<span>{this.state.selectedPatient.SpMet}</span>
											<span>%</span>
										</div>
									)}
								</div>

								<div className="side-alert border border-primary text-white text-center justify-content-start">
									{isPowerOn && <h5>100</h5>}
									{isPowerOn && <h5>90</h5>}
								</div>

							</div>
						</div>
					</div>
					<div className="row my-1">
						<div className="col-sm-9">
							<div className="waveform-container border border-warning">
								{isPowerOn && (
									<div className="waveform-text text-warning">CAPNO</div>
								)}
								{isPowerOn && isPatientSelected && (
									<ECGGraph
										id="capno"
										strokeColor="orange"
										amplitude={60}
										shift={0.02}
									/>
								)}
							</div>
						</div>
						<div className="col-sm-3">
							<div className="side-wrapper">
								<div className="side-container border border-warning text-white">
									{isPowerOn && (
										<h1>{this.state.selectedPatient.respiratoryRPM}</h1>
									)}
									{isPowerOn && <h5>Resp. rpm</h5>}
									{isPowerOn && <h1>{this.state.selectedPatient.endTidal}</h1>}
									{isPowerOn && (
										<h5>
											ETCO<sub>2</sub> mmHg
										</h5>
									)}
								</div>
								<div className="side-alert border border-warning text-white text-center">
									<div>
										{isPowerOn && <h5>50</h5>}
										{isPowerOn && <h5>5</h5>}
									</div>
									<div>
										{isPowerOn && <h5>60</h5>}
										{isPowerOn && <h5>25</h5>}
									</div>
								</div>

							</div>
						</div>
					</div>
					<div className="row my-1">
						<div className="col-sm-3 text-start text-white mb-1">
							<div className="patient-container border border-white">
								{isPowerOn && (
									<h5 className="text-white text-start">Patient: {this.state.selectedPatient.name}</h5>
								)}
								{isPowerOn && (
									<h5 className="text-white text-start">
										{this.state.selectedPatient.ageType}
									</h5>
								)}
							</div>
						</div>
						<div className="col-sm-4 button-wrapper">
							<button
								onClick={() => { }}
								className="btn btn-success btn-md mx-1 bottom-buttons"
								title="Connect"
								aria-label="Connect"
							>
								<i className="fa fa-phone"></i>
							</button>
							<button
								onClick={() => { }}
								className="btn btn-danger btn-md mx-1 bottom-buttons"
								title="Disconnect"
								aria-label="Disconnect"
							>
								<i className="fa fa-phone"></i>
							</button>
							<button
								onClick={() => { }}
								className="btn btn-primary btn-md mx-1 bottom-buttons"
								title="Alarm Suspend"
								aria-label="Alarm Suspend"
							>
								<i className="fa fa-hourglass"></i>
							</button>
							<button
								onClick={() => { }}
								className="btn btn-primary btn-md mx-1 bottom-buttons"
								title="Alarm Silence"
								aria-label="Alarm Silence"
							>
								<i className="fa fa-bell-slash"></i>
							</button>
							<button
								onClick={() => { }}
								className="btn btn-primary btn-md mx-1 bottom-buttons"
								title="Battery Gas Gauge Light"
								aria-label="Battery Gas Gauge Light"
								style={{ color: "yellow" }}
							>
								<i className="fa fa-battery-three-quarters" ></i>
							</button>
							<button
								className="btn btn-none btn-md mx-0 bottom-buttons"
								title="LED 1"
								aria-label="LED 1"
								style={{ cursor: "default" }}
							>
								<i className="fa fa-battery"></i>
							</button>
							<button
								className="btn btn-none btn-md mx-0 bottom-buttons"
								title="LED 2"
								aria-label="LED 2"
								style={{ cursor: "default" }}
							>
								<i className="fa fa-battery"></i>
							</button>
							<button
								className="btn btn-none btn-md mx-0 bottom-buttons"
								title="LED 3"
								aria-label="LED 3"
								style={{ cursor: "default" }}
							>
								<i className="fa fa-battery"></i>
							</button>
							<button
								className="btn btn-none btn-md mx-0 bottom-buttons"
								title="LED 4"
								aria-label="LED 4"
								style={{ cursor: "default" }}
							>
								<i className="fa fa-battery"></i>
							</button>
						</div>

						<div className="col-sm-4 d-flex justify-content-between">
							<div className="side-wrapper mr-1">
								<div className="pressure-container border border-white text-white text-center">
									{isPowerOn && (
										<h2>
											S: {this.state.selectedPatient.bloodPressureSystolic}
										</h2>
									)}
								</div>
								<div className="pressure-alert border border-white text-white">
									{isPowerOn && <h6 className="">160</h6>}
									{isPowerOn && (<h6 className="">90</h6>)}
								</div>
							</div>
							<div className="pressure-container border border-white mr-1">
								{isPowerOn && (
									<h3 className="text-white">
										M: {this.state.selectedPatient.bloodPressureMean}
									</h3>
								)}
								{isPowerOn && (
									<p className="text-white">
										NIBP@{this.state.selectedPatient.NIBPTime}
									</p>
								)}
							</div>
							<div className="side-wrapper mr-1">
								<div className="pressure-container border border-white">

									{isPowerOn && (
										<h2 className="text-white text-center">
											D: {this.state.selectedPatient.bloodPressureDiastolic}
										</h2>
									)}
								</div>
								<div className="pressure-alert border border-white text-white">
									{isPowerOn && <h6 className="">90</h6>}
									{isPowerOn && (<h6 className="">50</h6>)}
								</div>
							</div>


						</div>
						<div className="col-sm-1 start-bp-container">
							<button onClick={() => { }}
								className="btn btn-warning btn-lg"
								title="Start Blood Pressure Read"
								aria-label="Start Blood Pressure Read"
							>
								<i className="fa fa-play"></i>
							</button>
						</div>
					</div>
				</div>
			);
		} else if (this.state.page === "Patients") {
			return (
				<div className="container bg-light" style={{ height: "1000px" }}>
					<div className="row bg-info mb-3">
						<div className="col-sm-12 text-center text-white ">
							<h1>Patients</h1>
						</div>
					</div>
					<div className="col-sm-12">
						<input
						type="text"
						className="form-control"
						placeholder="Search by name"
						value={this.state.searchTerm}
						onChange={this.handleSearchChange}
						/>
					</div>
					<div className="row">
						<div className="col-sm-12">
							{/* Scrollable Container */}
							<div className="overflow-auto" style={{ maxHeight: "800px" }}>
								<div className="row bg-light mt-2">
									<div className="col-sm-12">
										<table className="table table-bordered">
											<thead className="thead-dark">
												<tr>
													<th>ID</th>
													<th>Name</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{filteredPatients.map((patient) => (
													<tr key={patient.id}>
														<td>{patient.id}</td>
														<td>{patient.name}</td>
														<td>
															<button
																className="btn btn-success m-1"
																onClick={() => {
																	this.handlePatientSelect(patient.id);
																	this.setState({ page: "Home" });
																}
																}
															>
																Select
															</button>
															<button
																className="btn btn-primary m-1"
																onClick={() => {
																	this.setState({ messageEditPatient: "" });
																	this.handleViewEditPatient(patient.id);
																}
																}
															>
																View Details/Edit
															</button>
															<button
																className="btn btn-danger m-1"
																onClick={() => this.handlePatientDelete(patient.id)}
															>
																Delete
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12 text-center">
							<button
								onClick={() => {
									this.setState({ messageAddPatient: "" });
									this.setState({ page: "Patient-Add" });
								}}
								className="btn btn-success btn-md m-2"
							>
								Add New Patients
							</button>
							<button
								onClick={this.handleClearDB}
								className="btn btn-danger btn-md m-2"
							>
								Clear Database
							</button>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12 text-center">
							<button
								onClick={() => {
									this.setState({ page: "Home" });
								}}
								className="btn btn-primary btn-lg m-1"
							>
								Back
							</button>
						</div>
					</div>
				</div>
			);
		} else if (this.state.page === "Patient-Add") {
			return (
				<div className="container bg-light" style={{ height: "1010px" }}>
					<div className="row bg-info mb-3">
						<div className="col-sm-12 text-center text-white">
							<h1>Add New Patient</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							{/* Scrollable Form Container */}
							<div className="overflow-auto" style={{ maxHeight: "800px" }}>
								{/* Patient Form */}
								<form>
									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="id" className="form-label">
												Patient ID:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="id"
												value={this.state.newPatient.id}
												onChange={this.handleChange}
												name="id"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="name" className="form-label">
												Name:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="name"
												value={this.state.newPatient.name}
												onChange={this.handleChange}
												name="name"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="ageType" className="form-label">
												Age Type:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="ageType"
												value={this.state.newPatient.ageType}
												onChange={this.handleChange}
												name="ageType"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="age" className="form-label">
												Age:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="age"
												value={this.state.newPatient.age}
												onChange={this.handleChange}
												name="age"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="prescribedDrugs" className="form-label">
												Prescribed Drugs:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="prescribedDrugs"
												value={this.state.newPatient.prescribedDrugs}
												onChange={this.handleChange}
												name="prescribedDrugs"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="incidentInfo" className="form-label">
												Incident Info:
											</label>
										</div>
										<div className="col-sm-10">
											<textarea
												className="form-control"
												id="incidentInfo"
												rows="3"
												value={this.state.newPatient.incidentInfo}
												onChange={this.handleChange}
												name="incidentInfo"
											></textarea>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="temperature" className="form-label">
												Temperature:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="temperature"
												value={this.state.newPatient.temperature}
												onChange={this.handleChange}
												name="temperature"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="heartRate" className="form-label">
												Heart Rate:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="heartRate"
												value={this.state.newPatient.heartRate}
												onChange={this.handleChange}
												name="heartRate"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="spo2" className="form-label">
												S<sub>p</sub>O<sub>2</sub> %:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="spo2"
												value={this.state.newPatient.spo2}
												onChange={this.handleChange}
												name="spo2"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="respiratoryRPM" className="form-label">
												Respiratory RPM:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="respiratoryRPM"
												value={this.state.newPatient.respiratoryRPM}
												onChange={this.handleChange}
												name="respiratoryRPM"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="endTidal" className="form-label">
												ETCO<sub>2</sub> mmHg:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="endTidal"
												value={this.state.newPatient.endTidal}
												onChange={this.handleChange}
												name="endTidal"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="bloodPressureSystolic" className="form-label">
												Systolic BP:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="bloodPressureSystolic"
												value={this.state.newPatient.bloodPressureSystolic}
												onChange={this.handleChange}
												name="bloodPressureSystolic"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label
												htmlFor="bloodPressureDiastolic"
												className="form-label"
											>
												Diastolic BP:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="bloodPressureDiastolic"
												value={this.state.newPatient.bloodPressureDiastolic}
												onChange={this.handleChange}
												name="bloodPressureDiastolic"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="bloodPressureMean" className="form-label">
												Mean Arterial BP:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="bloodPressureMean"
												value={this.state.newPatient.bloodPressureMean}
												onChange={this.handleChange}
												name="bloodPressureMean"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="heartLead" className="form-label">
												Heart Lead:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="heartLead"
												value={this.state.newPatient.heartLead}
												onChange={this.handleChange}
												name="heartLead"
											/>
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="NIBP time" className="form-label">
												NIBP Reading Time:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="NIBPTime"
												value={this.state.newPatient.NIBPTime}
												onChange={this.handleChange}
												name="NIBPTime"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="ST1" className="form-label">
												ST1-ECGII elevation (mm):
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="ST1"
												value={this.state.newPatient.ST1}
												onChange={this.handleChange}
												name="ST1"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="ST2" className="form-label">
												ST2-ECG1 elevation (mm):
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="ST2"
												value={this.state.newPatient.ST2}
												onChange={this.handleChange}
												name="ST2"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="QT" className="form-label">
												QT Interval (ms):
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="QT"
												value={this.state.newPatient.QT}
												onChange={this.handleChange}
												name="QT"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="SpHb" className="form-label">
												SpHb (g/dl):
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="SpHb"
												value={this.state.newPatient.SpHb}
												onChange={this.handleChange}
												name="SpHb"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="SpCO" className="form-label">
												SpCO %:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="SpCO"
												value={this.state.newPatient.SpCO}
												onChange={this.handleChange}
												name="SpCO"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="SpMet" className="form-label">
												SpMet %:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="SpMet"
												value={this.state.newPatient.SpMet}
												onChange={this.handleChange}
												name="SpMet"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-12 text-center">
											<button
												type="button"
												className="btn btn-primary"
												onClick={() => {

													this.addPatient();
												}}
											>
												Add Patient
											</button>
										</div>
										<div className="col-sm-12 text-start">
											{/* Display Message */}
											{this.state.messageAddPatient && <h6>{this.state.messageAddPatient}</h6>}
										</div>
									</div>

								</form>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12 text-center">
							<button
								onClick={() => {
									this.setState({ page: "Patients" });
								}}
								className="btn btn-primary btn-lg m-1"
							>
								Back
							</button>
						</div>
					</div>
				</div>
			);
		}
		else if (this.state.page === "Patient-Edit") {
			return (
				<div className="container bg-light" style={{ height: "1010px" }}>
					<div className="row bg-info mb-3">
						<div className="col-sm-12 text-center text-white">
							<h1>Edit Patient Info</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							{/* Scrollable Form Container */}
							<div className="overflow-auto" style={{ maxHeight: "800px" }}>
								{/* Patient Form */}
								<form>
									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="id" className="form-label">
												<h6>Patient ID: {this.state.newPatient.id}</h6>
											</label>
										</div>

									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="name" className="form-label">
												Name:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="name"
												value={this.state.newPatient.name}
												onChange={this.handleChange}
												name="name"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="ageType" className="form-label">
												Age Type:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="ageType"
												value={this.state.newPatient.ageType}
												onChange={this.handleChange}
												name="ageType"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="age" className="form-label">
												Age:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="age"
												value={this.state.newPatient.age}
												onChange={this.handleChange}
												name="age"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="prescribedDrugs" className="form-label">
												Prescribed Drugs:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="prescribedDrugs"
												value={this.state.newPatient.prescribedDrugs}
												onChange={this.handleChange}
												name="prescribedDrugs"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="incidentInfo" className="form-label">
												Incident Info:
											</label>
										</div>
										<div className="col-sm-10">
											<textarea
												className="form-control"
												id="incidentInfo"
												rows="3"
												value={this.state.newPatient.incidentInfo}
												onChange={this.handleChange}
												name="incidentInfo"
											></textarea>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="temperature" className="form-label">
												Temperature:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="temperature"
												value={this.state.newPatient.temperature}
												onChange={this.handleChange}
												name="temperature"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="heartRate" className="form-label">
												Heart Rate:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="heartRate"
												value={this.state.newPatient.heartRate}
												onChange={this.handleChange}
												name="heartRate"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="spo2" className="form-label">
												S<sub>p</sub>O<sub>2</sub> %:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="spo2"
												value={this.state.newPatient.spo2}
												onChange={this.handleChange}
												name="spo2"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="respiratoryRPM" className="form-label">
												Respiratory RPM:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="respiratoryRPM"
												value={this.state.newPatient.respiratoryRPM}
												onChange={this.handleChange}
												name="respiratoryRPM"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="endTidal" className="form-label">
												ETCO<sub>2</sub> mmHg:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="endTidal"
												value={this.state.newPatient.endTidal}
												onChange={this.handleChange}
												name="endTidal"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="bloodPressureSystolic" className="form-label">
												Systolic BP:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="bloodPressureSystolic"
												value={this.state.newPatient.bloodPressureSystolic}
												onChange={this.handleChange}
												name="bloodPressureSystolic"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label
												htmlFor="bloodPressureDiastolic"
												className="form-label"
											>
												Diastolic BP:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="bloodPressureDiastolic"
												value={this.state.newPatient.bloodPressureDiastolic}
												onChange={this.handleChange}
												name="bloodPressureDiastolic"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="bloodPressureMean" className="form-label">
												Mean Arterial BP:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="bloodPressureMean"
												value={this.state.newPatient.bloodPressureMean}
												onChange={this.handleChange}
												name="bloodPressureMean"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="heartLead" className="form-label">
												Heart Lead:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="heartLead"
												value={this.state.newPatient.heartLead}
												onChange={this.handleChange}
												name="heartLead"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="NIBPTime" className="form-label">
												NIBP Reading Time:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="NIBPTime"
												value={this.state.newPatient.NIBPTime}
												onChange={this.handleChange}
												name="NIBPTime"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="ST1" className="form-label">
												ST1-ECGII elevation (mm):
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="ST1"
												value={this.state.newPatient.ST1}
												onChange={this.handleChange}
												name="ST1"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="ST2" className="form-label">
												ST2-ECGI elevation (mm):
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="ST2"
												value={this.state.newPatient.ST2}
												onChange={this.handleChange}
												name="ST2"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="QT" className="form-label">
												QT Interval (ms):
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="QT"
												value={this.state.newPatient.QT}
												onChange={this.handleChange}
												name="QT"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="SpHb" className="form-label">
												SpHb (g/dl):
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="SpHb"
												value={this.state.newPatient.SpHb}
												onChange={this.handleChange}
												name="SpHb"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="SpCO" className="form-label">
												SpCO %:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="SpCO"
												value={this.state.newPatient.SpCO}
												onChange={this.handleChange}
												name="SpCO"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-2">
											<label htmlFor="SpMet" className="form-label">
												SpMet %:
											</label>
										</div>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												id="SpMet"
												value={this.state.newPatient.SpMet}
												onChange={this.handleChange}
												name="SpMet"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-12 text-center">
											<button
												type="button"
												className="btn btn-primary"
												onClick={() => {
													this.handleUpdatePatient();
													this.setState({ page: "Patients" });
												}}
											>
												Update Patient
											</button>
										</div>
										<div className="col-sm-12 text-start">
											{/* Display Message */}
											{this.state.messageEditPatient && <h6>{this.state.messageEditPatient}</h6>}
										</div>
									</div>

								</form>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12 text-center">
							<button
								onClick={() => {
									this.setState({ page: "Patients" });
									this.resetNewPatient();
								}}
								className="btn btn-primary btn-lg m-1"
							>
								Back
							</button>
						</div>
					</div>
				</div>
			);
		}

	}
}
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
