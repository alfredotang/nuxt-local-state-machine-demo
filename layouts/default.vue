<template>
  <div>
    <header class="header">
      <nuxt-link to="/">home</nuxt-link>
      <nuxt-link to="/sfd">server fetch data demo</nuxt-link>
    </header>
    <main class="content">
      <Nuxt />
    </main>
  </div>
</template>

<style>
  :root {
    --space: 8px;
    --space-1: calc(1 * var(--space));
    --space-2: calc(2 * var(--space));
    --space-3: calc(3 * var(--space));
    --space-4: calc(4 * var(--space));
    --space-5: calc(5 * var(--space));
    --space-6: calc(6 * var(--space));
    --space-7: calc(7 * var(--space));
    --space-8: calc(8 * var(--space));
    --space-9: calc(9 * var(--space));
    --space-10: calc(10 * var(--space));

    --primary: hsl(145, 61%, 50%);
    --primary-dark: hsl(145, 61%, 40%);
    --primary-light: hsl(145, 61%, 60%);
  }

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
    margin: var(--space-1);
    padding: 1rem;
  }

  .content .list .list-item {
    text-decoration: none;
    margin: var(--space-2);
    list-style: none;
    border-bottom: 1px solid grey;
  }


  .header a, button {
    text-decoration: none;
    padding: var(--space-1) var(--space-2);
    color: white;
    background-color: var(--primary);
    border-radius: 4px;
    display: inline-block;
    font-size: 16px;
  }

  .header a:hover, button:hover {
    background-color: var(--primary-dark);
    filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  }
</style>
