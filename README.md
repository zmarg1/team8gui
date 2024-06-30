# Team 8 Patient Monitoring Device

Prototype of a graphical user interface for a patient monitoring device based on the TempusPro unit. 

## Overview

### Patient Database

In the project, our databse is a local json which is managed as a state variable in the React component.  The database stores the patients name, age, prescribed_drugs, incident_info and current vital signs.  A unique id is used to organize the patients in the database.  By clicking the patient icon on the home screen, you can enter the patients page.

![alt text](/img/patientPage.png)

The Patients page shows the contents of the database including the patients and their information.  Patients can added through the patient page on the applicaiton by clikcing the add patient button and entering the required information which adds the patient to the database.  

![alt text](/img/addPatient.png)

The user can also Select a patient by clicking the Select Button on the patient page which will update the home screen with their information.  There are other buttons which are used to remove a patient from the database by clicking the Delete button and a Clear Database button which is used to clear the database.  


The functions are called by various buttons with onClick for example:

```
<button
    type="button"
    className="btn btn-primary"
    onClick={this.addPatient}
    >
    Add Patient
</button>
```  

## Installation

```bash

```

## Usage

## Authors

- Daniel Folkendt
- Gurnoor Hira
- Zach Margulies
- Aly Mulato

## References

