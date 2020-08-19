import React, { useContext } from 'react';
import NavigationBar from '@/components/navigation-bar'
import { StoreContext } from '@/store'
import './index.scss'
import logo from '@/assets/img/logo.png'

export default function Home() {
  return (
    <section className="home">
      <NavigationBar />
      <main>
        <img alt="logo" src={logo} />
        <div className="home__title">Hello Kugou!</div>
        <a className="home__link" href="http://open.kugou.com/docs/mini-app/#/README" target="_blank" rel="noopener noreferrer">开发者文档</a>
      </main>
    </section>
  )
}
