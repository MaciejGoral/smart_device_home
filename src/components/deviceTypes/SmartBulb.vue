<template>
 <div>
    <p><a>Is Turned On:</a> {{ deviceDetail.isTurnedOn }} <i :class="isTurnedOnClass(deviceDetail.isTurnedOn)"></i></p>
    <p><a>Brightness:</a> {{ deviceDetail.brightness }}</p>
    <p><a>Color:</a> {{ deviceDetail.color }}<b :style="{color: deviceDetail.color}"> ⬤</b></p>
 </div>   
</template>

<script>
export default {
    name: 'SmartBulb',
    props: {
        deviceDetail: {
        type:Object,
        default: null
        },
        isTurnedOnClass: Function
  },
}
</script>>
