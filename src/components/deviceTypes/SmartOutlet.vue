<template>
 <div>
    <p><a>Is Turned On:</a> {{ deviceDetail.isTurnedOn }} <i :class="isTurnedOnClass(deviceDetail.isTurnedOn)"></i></p>
    <p><a>Power Consumption:</a> {{ deviceDetail.powerConsumption }} W</p>
 </div>   
</template>

<script>
export default {
    name: 'SmartOutlet',
    props: {
        deviceDetail: {
        type:Object,
        default: null
        },
        isTurnedOnClass: Function,
  },
}
</script>>