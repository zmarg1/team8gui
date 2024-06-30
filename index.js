class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Home",
      power: 0,
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
          heartLead: "12 Lead",
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
          heartLead: "12 Lead",
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
          heartLead: "12 Lead",
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
      },
      message: "",
    };

    this.state.selectedPatient = this.state.patientDB.find(
      (patient) => patient.id === 0
    );
  }

  addPatient = () => {
    const { patientDB, newPatient } = this.state;

    // Checks if the ID is provided and not already in db
    if (!newPatient.id || patientDB[newPatient.id]) {
      this.setState({
        message: "Please provide a valid or unique ID for the patient.",
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
    };

    // Update db and save to localStorage
    this.setState(
      {
        patientDB: [...patientDB, patient],
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
        },
        message: "Patient added successfully.",
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

  handlePowerChange = (power) => {
    this.setState({ power: power });
    this.state.selectedPatient = this.state.patientDB.find(
      (patient) => patient.id === 0
    );
  };

  handlePatientSelect = (id) => {
    const newPatient = this.state.patientDB.find(
      (patient) => patient.id === id
    );
    this.setState({ selectedPatient: newPatient });
  };

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
      },
    ];
    this.setState({
      patientDB: initialDB,
      selectedPatient: initialDB.find((patient) => patient.id === 0),
    });
  };

  render() {
    // Create a filtered db to exclude the null patient
    const filteredPatients = this.state.patientDB.filter(
      (patient) => patient.id !== 0
    );
    const isPatientSelected = this.state.selectedPatient.id !== 0;
    const isPowerOn = this.state.power === 1;

    if (this.state.page === "Home") {
      return (
        <div className="container bg-dark">
          <div className="row bg-primary">
            <div className="col-sm-9"></div>
              <div className="col-sm-3 d-flex justify-content-end text-end align-items-center">
                {isPowerOn && (<span >95%</span>)}
                {isPowerOn && (<i className="fa fa-signal icon-bar ml-2"></i>)}
                {isPowerOn && (<i className="fa fa-plug icon-bar"></i>)}
                {isPowerOn && (<img
                  src="img/bluetooth2.png"
                  alt="bluetooth logo"
                  width="20px"
                  height="auto"
                />)}
                
                <TimeComponent />
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
              <button
                onClick={() => {
                  isPowerOn && this.setState({ page: "Patients" });
                }}
                className="btn btn-primary btn-lg m-1"
              >
                <i className="fa fa-users"></i>
              </button>
              <button
                
                className="btn btn-primary btn-lg m-1"
              >
                Alarms
              </button>
              <button
                onClick={() => {
                  this.setState({ page: "Home" });
                }}
                className="btn btn-primary btn-lg m-1"
              >
                Data I/O
              </button>
              <button
                onClick={() => {
                  this.setState({ page: "#" });
                }}
                className="btn btn-primary btn-lg m-1"
              >
                Display
              </button>
              <button
                onClick={() => {
                  this.setState({ page: "#" });
                }}
                className="btn btn-primary btn-lg m-1"
              >
                Camera
              </button>
              <button
                onClick={() => {
                  this.setState({ page: "#" });
                }}
                className="btn btn-primary btn-lg m-1"
              >
                Waveform
              </button>
              <button
                onClick={() => {
                  this.setState({ page: "#" });
                }}
                className="btn btn-primary btn-lg m-1"
              >
                Events
              </button>
              <button
                onClick={() => {
                  this.setState({ page: "#" });
                }}
                className="btn btn-primary btn-lg m-1"
              >
                Full Menu
              </button>
            </div>
            <div className="col-sm-3">
              <div className="temp-container border border-white text-white text-center">
                {isPowerOn && (<h2 className="">Temp:</h2>)}
                {isPowerOn && (<h2>{this.state.selectedPatient.temperature} &#8457;</h2>)}
              </div>
            </div>
          </div>
          <div className="row my-1">
            <div className="col-sm-9">
              <div className="waveform-container border border-success">
                {isPowerOn && (<div className="waveform-text text-success">ECG II</div>)}
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
              <div className="side-container border border-success text-white text-center">
                {isPowerOn && (<h1>{this.state.selectedPatient.heartRate}</h1>)}
                {isPowerOn && (<h2>HR BPM</h2>)}
              </div>
            </div>
          </div>
          <div className="row my-1">
            <div className="col-sm-9">
              <div className="waveform-container border border-success">
                {isPowerOn && (<div className="waveform-text text-success">ECG I</div>)}
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
              <div className="side-container border border-success text-white text-center">
                {isPowerOn && (<h1>{this.state.selectedPatient.heartLead}</h1>)}
                <span>
                  {isPowerOn && (<i className="fa fa-heartbeat fa-5x text-danger"></i>)}
                </span>
              </div>
            </div>
          </div>
          <div className="row my-1">
            <div className="col-sm-9">
              <div className="waveform-container border border-primary">
                {isPowerOn && (<div className="waveform-text text-primary">PLETH</div>)}
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
              <div className="side-container border border-primary text-white text-center">
                {isPowerOn && (<h1>{this.state.selectedPatient.spo2}</h1>)}
                {isPowerOn && (<h2>
                  S<sub>p</sub>O<sub>2</sub> %
                </h2>)}
              </div>
            </div>
          </div>
          <div className="row my-1">
            <div className="col-sm-9">
              <div className="waveform-container border border-warning">
                {isPowerOn && (<div className="waveform-text text-warning">CAPNO</div>)}
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
              <div className="side-container border border-warning text-white">
                {isPowerOn && (<h1>{this.state.selectedPatient.respiratoryRPM}</h1>)}
                {isPowerOn && (<h5>Resp. rpm</h5>)}
                {isPowerOn && (<h1>{this.state.selectedPatient.endTidal}</h1>)}
                {isPowerOn && (<h5>
                  ETCO<sub>2</sub> mmHg
                </h5>)}
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-sm-3 text-start text-white">
              <div className="patient-container border border-white">
                {isPowerOn && (<h5 className="text-white text-start">Patient:</h5>)}
                {isPowerOn && (<h5>{this.state.selectedPatient.name}</h5>)}
                {isPowerOn && (<h5 className="text-white text-start">
                  {this.state.selectedPatient.ageType}
                </h5>)}
              </div>
            </div>
            <div className="col-sm-4 text-center">
              <button
                onClick={() => {
                  this.setState({ page: "#" });
                }}
                className="btn btn-success btn-lg m-1"
              >
                <i className="fa fa-phone"></i>
              </button>
              <button
                onClick={() => {
                  this.setState({ page: "#" });
                }}
                className="btn btn-danger btn-lg m-1"
              >
                <i className="fa fa-phone"></i>
              </button>
              <button
                onClick={() => {
                  this.setState({ page: "#" });
                }}
                className="btn btn-primary btn-lg m-1"
              >
                <i className="fa fa-bell"></i>
              </button>
              <button
                onClick={() => {
                  this.setState({ page: "#" });
                }}
                className="btn btn-primary btn-lg m-1"
              >
                <i className="fa fa-bell-slash-o"></i>
              </button>
              <button
                onClick={() => {
                  this.setState({ page: "#" });
                }}
                className="btn btn-primary btn-lg m-1"
              >
                <i className="fa fa-sun-o"></i>
              </button>
            </div>
            <div className="col-sm-5 d-flex justify-content-between">
              <div className="pressure-container border border-white">
                {isPowerOn && (<h2 className="text-white text-center">
                  S: {this.state.selectedPatient.bloodPressureSystolic}
                </h2>)}
              </div>
              <div className="pressure-container border border-white">
                {isPowerOn && (<h2 className="text-white text-center">
                  M: {this.state.selectedPatient.bloodPressureMean}
                </h2>)}
              </div>
              <div className="pressure-container border border-white">
                {isPowerOn && (<h2 className="text-white text-center">
                  D: {this.state.selectedPatient.bloodPressureDiastolic}
                </h2>)}
              </div>
              <button
                onClick={() => {
                  this.setState({ page: "#" });
                }}
                className="btn btn-warning btn-lg m-1"
              >
                <i className="fa fa-play"></i>
              </button>
            </div>
          </div>
        </div>
      );
    } else if (this.state.page === "Patients") {
      return (
        <div className="container bg-light">
          <div className="row bg-primary">
            <div className="col-sm-9"></div>
            <div className="col-sm-3 text-end align-items">
              <i className="fa fa-signal icon-bar"></i>
              <i className="fa fa-plug icon-bar"></i>
              <TimeComponent />
              <img
                src="img/bluetooth2.png"
                alt="bluetooth logo"
                width="20px"
                height="auto"
              />
              <span>95%</span>
            </div>
          </div>
          <div className="row bg-info">
            <div className="col-sm-12 text-center text-white">
              <h1>Patient page</h1>
            </div>
          </div>
          <div className="row bg-light mt-2">
            <div className="col-sm-12">
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age Type</th>
                    <th>Age</th>
                    <th>Prescribed Drugs</th>
                    <th>Incident Info</th>
                    <th>Temp</th>
                    <th>Heart Rate</th>
                    <th>Resp. RPM</th>
                    <th>End Tidal</th>
                    <th>BP</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.id}</td>
                      <td>{patient.name}</td>
                      <td>{patient.ageType}</td>
                      <td>{patient.age}</td>
                      <td>{patient.prescribedDrugs}</td>
                      <td>{patient.incidentInfo}</td>
                      <td>{patient.temperature}</td>
                      <td>{patient.heartRate}</td>
                      <td>{patient.respiratoryRPM}</td>
                      <td>{patient.endTidal}</td>
                      <td>
                        {patient.bloodPressureSystolic} /{" "}
                        {patient.bloodPressureDiastolic} (
                        {patient.bloodPressureMean}){" "}
                      </td>
                      <td>
                        <button
                          key={patient.id}
                          className="btn btn-primary m-1"
                          onClick={() => this.handlePatientSelect(patient.id)}
                        >
                          Select
                        </button>
                      </td>
                      <td>
                        <button
                          key={patient.id}
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
          <div className="row">
            <div className="col-sm-12 text-center">
              <button
                onClick={() => {
                  this.setState({ page: "Patient-Add" });
                }}
                className="btn btn-success btn-md m-2"
              >
                Add New Patient
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
        <div className="container bg-light">
          <div className="row bg-primary">
            <div className="col-sm-9"></div>
            <div className="col-sm-3 text-end align-items">
              <i className="fa fa-signal icon-bar"></i>
              <i className="fa fa-plug icon-bar"></i>
              <TimeComponent />
              <img
                src="img/bluetooth2.png"
                alt="bluetooth logo"
                width="20px"
                height="auto"
              />
              <span>95%</span>
            </div>
          </div>
          <div className="row bg-info mb-3">
            <div className="col-sm-12 text-center text-white">
              <h1>Add New Patient</h1>
            </div>
          </div>
          <div>
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

              <button
                type="button"
                className="btn btn-primary"
                onClick={this.addPatient}
              >
                Add Patient
              </button>

              {/* Display Message */}
              {this.state.message && <p>{this.state.message}</p>}
            </form>
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
  }
}
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
