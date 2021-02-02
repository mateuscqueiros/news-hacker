import styles from './style.module.css'
import Head from 'next/head'
import { useState } from 'react'

export default function Index({page}) {

  const [menu, setMenu] = useState(false)

  return (
      <div className={styles.header_container}>
        <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <title>News Hacker</title>
            <link rel="icon" type="image/gif" href="https://news.ycombinator.com/y18.gif" />
        </Head>

        <header className={styles.header}>
        <div className={styles.wrap_header}>
            <div className={styles.logo}>
            <img src="https://news.ycombinator.com/y18.gif" alt="Logo"/>
              News Hacker
            </div>
            <div className={styles.menu} onClick={() => setMenu(true)}>
              <img src="/images/menu.svg" alt="Menu"/>
            </div>
            <nav className={menu ? styles.open : ''}>
              <div className={styles.close} onClick={() => setMenu(false)}>
                <img src="/images/close.svg" alt="Close"/>
              </div>
              <ul>
                  <li className={page === 'home' ? styles.item_selected : null}>
                    <a href="/">Home</a>
                  </li>
                  <li className={page === 'best' ? styles.item_selected : null}>
                    <a href="/best">Best</a>
                  </li>
                  <li className={page === 'new' ? styles.item_selected : null}>
                    <a href="/new">New</a>
                  </li>
                  <li className={page === 'ask' ? styles.item_selected : null}>
                    <a href="/ask">Ask</a>
                  </li>
                  <li className={page === 'show' ? styles.item_selected : null}>
                    <a href="/show">Show</a>
                  </li>
              </ul>
            </nav>
        </div>
        </header>
      </div>
    
  )
}