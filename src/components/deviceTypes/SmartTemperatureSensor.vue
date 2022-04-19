<template>
 <div>
    <p><a>Temperature:</a> {{ deviceDetail.temperature }} °C</p>
 </div>   
</template>

<script>
export default {
    name: 'SmartTemperatureSensor',
    props: {
        deviceDetail: {
        type:Object,
        default: null
        }
  },
}
</script>>