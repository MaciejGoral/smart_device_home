<template>
  <div>
    <!--table of smartDevice-->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Type</th>
          <th>Name</th>
          <th>Connection State</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="smartDev in smartDevice" :key='smartDev.id' v-on:click='chooseDevice(smartDev.id)'>
          <td>{{ smartDev.id }}</td>
          <!--icon matchting the device type-->
          <td><i :class="chooseClassType(smartDev.type)"></i> {{ smartDev.type }}</td>
          <td>{{ smartDev.name }}</td>
          <!--icon matchting the connectionState-->
          <td><i :class="chooseClassConnectionState(smartDev.connectionState)"></i> {{ smartDev.connectionState }}</td>
        </tr>
      </tbody>
    </table>
    <!--Draggable window component-->
      <SmartDeviceDetails 
        @closeDetails="closeDetails" 
        :deviceDetail=chosenDevice 
        class=details
        :chooseClassType="chooseClassType"
        :chooseClassConnectionState="chooseClassConnectionState">
      </SmartDeviceDetails>
  </div>
</template>

<script>
import SmartDeviceDetails from "./components/SmartDeviceDetails.vue";
export default {
  name: 'App',
  components: {
    SmartDeviceDetails
  },
  data: () => ({
    chosenDevice: null,  //device which details are shown
    smartDevice:null, //list of smart devices
    intervalFetchDevices:null,
    intervalFetchDetails:null,
    intervalSimulateChanges:null,
    }),
    methods: {
      chooseDevice(id) //setting the chosen device
      {
        clearInterval(this.intervalFetchDetails);
        this.fetchDetail(id);
        this.intervalFetchDetails = setInterval(() =>{
        this.fetchDetail(id)},3000)
      },
      closeDetails() //closing details windows
      {
        this.chosenDevice=null;
        clearInterval(this.intervalFetchDetails);
      },
      chooseClassType(type) //choosing icon based on devide type
      {
        switch (type) {
          case "bulb":
            return "fa fa-lightbulb";
          case "outlet":
            return "fa-solid fa-plug";
          case "temperatureSensor":
            return "fa-solid fa-thermometer-half";
          default:
            return null;
        }
      },
      chooseClassConnectionState(connectionState) // choosing icon based on connection state
      {
        switch (connectionState) {
          case "connected":
            return "fa-solid fa-check-circle";
          case "disconnected":
            return "fa-solid fa-times-circle";
          case "poorConnection":
            return "fa-solid fa-exclamation-circle";
          default:
            return null;
        }
      },
      async fetchDevices() //fetching devices from backend
      {
        const response = await fetch('api/v1/devices');
        const data = await response.json();
        this.smartDevice = data;
      },
      async fetchDetail(id) //fetching single device details from backend
      {
        const response = await fetch('api/v1/devices/' + id);
        const data = await response.json();
        this.chosenDevice = data;
      },
      async simulateChanges() //simulating changeing connection states through patch requests
      {
        const connectionStates = ["connected", "disconnected", "poorConnection"];  
        for(var i=1;i<this.smartDevice.length+1;i++)
        {
          var connectionState = Math.floor(Math.random() * 3);
          const response = await fetch('https://smart-device-home2.herokuapp.com/smartDevice/' + i, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              connectionState: connectionStates[connectionState]
            })
          });
          await response.json();
          const response2 = await fetch('https://smart-device-home2.herokuapp.com/SmartDeviceDetails/'+ i, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              connectionState: connectionStates[connectionState]
            })
          });
          await response2.json();
        }
      }
    },
    created()
    {
      this.fetchDevices();
      this.intervalFetchDevices = setInterval(() =>{
      this.fetchDevices()},3000)
      this.intervalSimulateChanges = setInterval(() =>{
      this.simulateChanges()},10000)
    }, 
    emits:['closeDetails']
  }
</script>

<style>
/*icons color*/
.fa-check-circle {
  color: green;
}
.fa-times-circle {
  color: red;
}
.fa-exclamation-circle {
  color: orange;
}
/*close window button*/
.fas
{
  position :absolute;
  font-size: 20px;
  right:10px;
  top:10px;
  color:red;
}
.fas:hover
{
  cursor: pointer;
  display: inline-block;
}
/* simple table style */
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
  font-family: Verdana, sans-serif;
}

th, td {
  text-align: left;
  padding: 16px;
}

tr:nth-child(even) {
  background-color: #f2f2f2
}

tr:hover{
    background: rgb(203, 223, 202);
    cursor: pointer;
}
/*draggable window*/
.resize-drag {
  display: run-in;
  box-sizing: border-box;
  border:3px solid #ccc;
  border-radius: 15px;
  background: #ffffff;
  /* To prevent interact.js warnings */
  user-select: none;
  -ms-touch-action: none;
  touch-action: none;
    width: 100%;
  height: 100%;
  position: absolute;
  top: 30%;
  left: 50%;
}

h1 
{ 
  color: #000000; 
  font-family: Verdana, sans-serif;
  font-size:30px; font-weight: normal; 
  line-height: 48px; 
  margin: 0 10px 10px; 
}

p 
{ 
  color: #000000; 
  font-family: 'Source Sans Pro', sans-serif; 
  font-size: 16px; 
  line-height: 32px; 
  margin: 0px 10px 3px; 
  border-top:1px solid #ccc;
}

a 
{
  font-weight: bold;
}
</style>
