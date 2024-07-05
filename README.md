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


### Patient Monitoring

In the project, our databse is a local json which is managed as a state variable in the React component.  The database is initialized in index.js along with the patient object which defined all the information our patients have in the database.  The database stores the patients name, age, prescribed_drugs, incident_info and current vital signs.  A unique id is used to organize the patients in the database.  By clicking the patient icon on the home screen, you can enter the patients page.

![alt text](/img/patientPage.png)

The Patients page shows the contents of the database including the patients and their information.  Patients can added through the patient page on the applicaiton by clikcing the add patient button and entering the required information which adds the patient to the database.  

![alt text](/img/addPatient.png)

The user can also Select a patient by clicking the Select Button on the patient page which will update the home screen with their information.  There are other buttons which are used to remove a patient from the database by clicking the Delete button and a Clear Database button which is used to clear the database.  


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

![alt text](/img/patientInfo.png)

This is the display of the patient vitals when selecting a patient, this is the main feature of the patient monitoring system it shows the infomation of each and every patient that is entered in its database.

## Installation

```
bash
```

## Usage

## Authors

- Daniel Folkendt
- Gurnoor Hira
- Zach Margulies
- Aly Mulato

## References

