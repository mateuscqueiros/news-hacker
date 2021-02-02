import styles from '../styles/Home.module.css'
import axios from 'axios'
import { format } from 'date-fns';

export async function getStaticProps() {
  const res = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
  const allData = res.data;

  const promises = allData.slice(0, 30).map(async function (story) {
    const itemRes = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`);
    return itemRes.data;
  });

  try {
    const data = await Promise.all(promises);

    return {
      props: { data }
    };
  } catch (error) {
    console.error(error);

    return {
      props: { data: null }
    };
  }
}
 

export default function Index ({data}) {

  console.log(data[0])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.wrap_header}>
          <div className={styles.logo}>
            <img src="https://news.ycombinator.com/y18.gif" alt="Logo"/>
            News Hacker
          </div>
          <nav className={styles.items}>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/best">Best</a>
              </li>
              <li>
                <a href="/new">New</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className={styles.wrapper}>
        <ul>

          {

            data.map((s, index) => {

              return (
                <li key={index + 1} className={styles.wrap_news}>
                  <div className={styles.submenu}>
                    <span>{index + 1}.</span>
                  </div>
                  <div className={styles.text}>
                    <h2>
                      <a href={s.url}>{s.title}</a>
                    </h2>
                    <div className={styles.subtext}>
                      <span className={styles.points_author}>{s.score} points by {s.by}</span>
                      |
                      <span className={styles.time}>{format(s.time, 'H')} hours</span>
                    </div>
                  </div>
                  
                </li>
              )

            })

          }
          
          
        </ul>
      </div>
      <ul>
        {

          // data.map(s => {
          //   return <li>{s.title}</li>
          // })

        }
      </ul>
    </div>
  )
}