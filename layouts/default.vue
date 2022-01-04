<template>
  <div>
    <header class="header">
      <NuxtLink to="/">use-vuex</NuxtLink>
      <NuxtLink to="/use-composition-api">use-composition-api</NuxtLink>
      <NuxtLink to="/use-local-state-machine">use-local-state-machine</NuxtLink>
    </header>
    <main class="content">
      <Nuxt />
    </main>
  </div>
</template>

<style>
  /* reset */
  button {
    border: none;
  }
</style>

<style>
  .content {
    padding: 2rem;
  }

  .content .list {
    margin: 10px;
    padding: 1rem;
  }

  .content .list .list-item {
    text-decoration: none;
    margin: 10px;
    list-style: none;
    border-bottom: 1px solid grey;
  }

  .header {
    padding: 1rem;
  }

  .header a, button {
    text-decoration: none;
    padding: 8px 12px;
    color: white;
    background-color: hsl(145, 61%, 50%);
    border-radius: 8px;
    display: inline-block;
  }

  .header a:hover, button:hover {
    background-color: hsl(145, 61%, 40%);
  }
</style>
