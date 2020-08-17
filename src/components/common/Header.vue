<template>
  <header v-if="header">
    <router-link to="/"><h1>Chat Space</h1></router-link>
  </header>
</template>

<script>
  export default{
    props:['header']
  }
</script>

<style scoped>
header{
  margin:0 0 50px 0;
  padding:20px;
  background:#2aa5b8;
  color:#fff;
  letter-spacing:2px;
  text-transform:uppercase;
  box-shadow:0 2px 3px 0px #000;
}
h1{
  margin-top:6px;
  color:#fff;
}
a:hover{
  text-decoration:none;
}

</style>
