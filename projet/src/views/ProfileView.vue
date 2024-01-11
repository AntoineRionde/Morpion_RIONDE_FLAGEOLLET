<template>
  <form>
    <label for="name">Name</label>
    <input type="text" id="name" name="name" />
    <label for="email">Email</label>
    <input type="email" id="email" name="email" />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: "ProfileView",
  data() {
    return {
      name: "",
      email: "",
    };
  },
}
</script>

<style scoped>

</style>