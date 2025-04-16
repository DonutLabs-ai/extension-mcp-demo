import { defineConfig } from 'umi'

export default defineConfig({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Home Page',
      path: '/home',
      component: './Home',
    },
  ],
}).routes
