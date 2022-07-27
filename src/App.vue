<template>

<circles-block
  :arrItems = arr
/>

</template>

<script>
import circlesBlock from "@/components/CirclesBlock";
export default {
  name: "App",
  components: {
    circlesBlock
  },
  data() {
    return {
      arr: [34,65,100,5,80],
    };
  }
}
</script>

<style>
</style>