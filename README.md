# Team 8 Patient Monitoring Device

Prototype of a graphical user interface for a patient monitoring device based on the TempusPro unit. 

## Overview

The purpose of this project is to design a graphical user interface for a patient monitoring device. The functionality and UI is based off of the [TempusPro device](https://www.documents.philips.com/assets/Instruction%20for%20Use/20210913/f810edd239df41c19c96ada200c9eb6d.pdf). The current design offers users the ability to simulate a patient monitoring event that would be encountered in a real-world use of the device. Specifically, users can access the patient database stored locally on the device to show the health data (e.g. ECG readings, heart rate, blood pressure, etc.). Additionally, users can add new patients, edit current patients, and delete patients from the local storage. 

### Home Screen

#### Power State
Upon loading the project into the browser, the device is set to off as seen in Figure 1.

![alt text](/img/homePageOff.png)<p align="center"><b>Figure 1:</b> Device in the Power Off State</p>

Users cannot see any patient data yet, only the buttons on the screen. None of the buttons are functional in the off state.

Clicking the Power Button turns the device power on. The device takes three seconds to power up. During this time, the device is not yet functional(See Figure 2). The power button changes from red to blue and the top bar indicates to the user that the "Device is Powering Up".

![alt text](/img/homePagePoweringUp.png)
<p align="center"><b>Figure 2:</b> Device in the Powering Up State</p>

After three seconds, the device is powered on. The power button changes from blue to green and the device is now fully functionally (See Figure 3). Users can hover over any button or icon to see what the intended purpose. Additionally, users can select the large, wide light blue "Patients Button" to access the Patient Page. See the following section on Patients to learn more.

![alt text](/img/homePageOn.png)
<p align="center"><b>Figure 3:</b> Device in Power On State</p>

When the user is finished with the device, press the power button once more. The device begin the powering down operation. The green power button will turn orange (See Figure 4). After three seconds the device will be powered down and the power button will appear red again.

![alt text](/img/homePagePoweringDown.png)
<p align="center"><b>Figure 4:</b> Device in Powering Down State</p>

#### Home Screen Buttons

The home screen GUI offers a large number of buttons for users. On the top left of the home screen is the power buttong. The first set of button on the top half of the device include the following (from left to right, in blue):

- Alarms Page
- Data Input/Output
- Display Options
- Camera Snapshot
- Waveform Snapshot 
- Event
- Previous Activity
- Home (this would have specialized features in a more completed GUI design)
- Full Menu of Features

Below this row of buttons is the wide light blue Patient button. 

On the bottom of the home screen is another set of buttons.
- Connect (green)
- Disconnect (red)
- Alarm Suspend (blue)
- Alarm Silence (blue)
- The Battery Gas Guage (blue with yellow shapes)

If a user were to select the Battery Gas Gauge, then the power status LEDs below this set of buttons would light up indicating power status. Note this feature is not implemented, but would be in the final design.

Finally, in the bottom right corner of the app is the Blood Pressure Reading Start button (yellow-orange). Selecting this would begin sampling the blood pressure of a patient.


### Patient Database

In the project, our databse is a local json which is managed as a state variable in the React component.  The database is initialized in index.js along with the patient object which defined all the information our patients have in the database.  The database stores the patients name, age, prescribed drugs, incident info and health reading (e.g. ECG, oxygen saturation, heart rate, blood pressure).  A unique id is used to organize the patients in the database.  By clicking the patient icon on the home screen, you can enter the patients page (See Figure 5).

![alt text](/img/patientPage.png)
<p align="center"><b>Figure 5:</b> Patient Page</p>

The Patients page shows the contents of the database including the patients' id and names. Pressing the "Select" Button beside a patient row, will update the home screen with the selected patient's information. Users can press the "Back" button at the Bottom of the Page to return to the Home Screen. Users can also View and/or Edit a given patient's information by selecting the "View Details/Edit" Button on a patient row. Alternatively, users can also press "Delete" to remove a patient from the local storage. Patients can added to the device by selecting the "Add New Patients" button at the end of the Patient Table. and entering the required information which adds the patient to the database. Additionally, Users can delete the entire patient Database by pressing the "Clear Database" button at the bottom of the Patient table. 

The functions are called by various buttons with onClick.
Example of button adding the Patient to the database

```
<button
    type="button"
    className="btn btn-primary"
    onClick={this.addPatient}
    >
    Add Patient
</button>
```

Selecting the "Add New Patients" button will take you to the "Add New Patient page" (See Figure 6). This page allows users to enter all patient information. Users will need to use the scroll feature to see/add all of the relevant patient information. 

![alt text](/img/addPatient.png)
<p align="center"><b>Figure 6:</b> Add New Patient Page</p>

At the bottom of this Add New Patient form is the "Add Patient" button (See Figure 7). If the add patient operation was successful, a success message will be returned. Otherwise, an error message will be displayed. For example, if a user tries to type an ID already assigned to another patient, then the add patient operation will fail. Users can select the "Back" Button to return the "Patient Page".

![alt text](/img/addPatientButton.png)
<p align="center"><b>Figure 7:</b> Add Patient Button</p>


If on the Patient Page a user selects "View Details/Edit", the user will be taken to an "Edit Patient Info Page" (See Figure 8). Here, a user may view all of the stored patient information and edit these details. Similar to the "Add New Patient Page", this form is scrollable. To save the changes to the patient, select the "Update Patient" button at the bottom of the form. The user will be returned to the "Patient Page" once the "Update Patient" button is selected. 

![alt text](/img/editPatient.png)
<p align="center"><b>Figure 8:</b> Edit Patient Page</p>

### Patient Monitoring 

Selecting a patient from the "Patient Page" displays the patient's vitals on the Home Screeen (See Figure 9). This is the main feature of the patient monitoring system device - it shows all of the infomation of the patient that is entered in its database.

![alt text](/img/patientInfo.png)
<p align="center"><b>Figure 9:</b> Patient Monitoring on the Home Screen</p>

## Authors

- Daniel Folkendt
- Gurnoor Hira
- Zach Margulies
- Aly Mulato

