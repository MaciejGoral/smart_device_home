<template>
  <interact
    draggable
    :dragOption="dragOption"
    resizable
    :resizeOption="resizeOption"
    class="resize-drag"
    :style="style"
    @dragmove="dragmove"
    @resizemove="resizemove"
    v-if="deviceDetail!==null"
  >
    <h1>Device Details<i v-on:click="$emit('closeDetails')" class="fas fa-times"></i></h1>
    <p><a>Id:</a> {{ deviceDetail.id }}</p>
    <!--icon based on device type-->
    <p><a>Type:</a> {{ deviceDetail.type }} <i :class="chooseClassType(deviceDetail.type)"></i></p>
    <p><a>Name:</a> {{ deviceDetail.name }}</p>
    <!--icon based on connection state-->
    <p><a>Connection State:</a> {{ deviceDetail.connectionState }} <i :class="chooseClassConnectionState(deviceDetail.connectionState)"></i></p>
    <!--component based on device type-->
    <component :is="chooseComponentType()" :deviceDetail="deviceDetail" :isTurnedOnClass="isTurnedOnClass"></component>
  </interact>
</template>

<script>
import interact from "interactjs";
import SmartBulb from "./deviceTypes/SmartBulb.vue";
import SmartOutlet from "./deviceTypes/SmartOutlet.vue";
import SmartTemperatureSensor from "./deviceTypes/SmartTemperatureSensor.vue";
export default {
  name: 'SmartDeviceDetails',
  components: {
    SmartBulb,
    SmartOutlet,
    SmartTemperatureSensor
  },
  props: {
    deviceDetail: {
      type:Object,
      default: null
      },
      chooseClassType: Function,
      chooseClassConnectionState: Function,
  },
  //interactjs draggable and resizable options and methods
  data: () => ({
    resizeOption: {
        edges: { left: true, right: true, bottom: true, top: true },
        modifiers: [
          interact.modifiers.restrictSize({
        min: { width: 310, height: 320 },
        max: { width: 1000, height: 500 }
        })]
      },
      dragOption: {
        modifiers: [
          interact.modifiers.restrictRect({
            endOnly: true
          })
        ],
      },
      // values for interact.js transformation
      x: 0,
      y: 0,
      w: 310,
      h: 320,
    }),

    computed: {
      style() {
        return {
          height: `${this.h}px`,
          width: `${this.w}px`,
          transform: `translate(${this.x}px, ${this.y}px)`,
        };
      }
    },

    methods: {
      dragmove(event) {
        this.x += event.dx;
        this.y += event.dy;
      },
      resizemove(event) {
        this.init=false;
        this.w = event.rect.width;
        this.h = event.rect.height;

        this.x += event.deltaRect.left;
        this.y += event.deltaRect.top;
      },
      // return the component to use based on the device type, add more if needed
      chooseComponentType()
      {
        switch (this.deviceDetail.type) {
          case "bulb":
            return SmartBulb;
          case "outlet":
            return SmartOutlet;
          case "temperatureSensor":
            return SmartTemperatureSensor;
          default:
            return null;
        }
      },
      // return icon based on IsTurnedOn
      isTurnedOnClass()
      {
        if(this.deviceDetail.isTurnedOn)
        {
          return "fa-solid fa-check-circle";
        }
        else
        {
          return "fa-solid fa-times-circle";
        }
      }
    }
  };
</script>


<style scoped>
</style>
