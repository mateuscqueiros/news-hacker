import styles from '../styles/Home.module.css'
import axios from 'axios'
import { differenceInDays, differenceInMinutes, differenceInSeconds, format, parseISO } from 'date-fns';
import Header from '../components/Header'
import { differenceInHours, formatDistanceToNow } from 'date-fns';

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

function timeDistance(date) {

  let stamp = date * 1000;
  let now = new Date();
  let value = null;

  if (differenceInMinutes(now, stamp) > 59) {

    if (differenceInHours(now, stamp) === 1) {

      value = `${differenceInHours(now, stamp)} hour ago`

    } else {

      if (differenceInHours(now, stamp) > 23) {

        if (differenceInDays(now, stamp) == 1) {

          value = `${differenceInDays(now, stamp)} day ago`

        } else {
          value = `${differenceInDays(now, stamp)} days ago`
        }


      } else {

        value = `${differenceInHours(now, stamp)} hours ago`
        
      }
    }

  } else if(differenceInMinutes(now, stamp) === -1) {

    value = '1 minute ago'

  } else {

    value = `${differenceInMinutes(now, stamp)} minutes ago`

  }

  return value

}

function generateHNLinks(id, type, number) {

  switch (type) {
    case 'user':
      let link = `https://news.ycombinator.com/user?id=${id}`
      return (
        <>
          <a className={styles.hover} href={link}>{id}</a>
        </>
      )
        
    case 'comment':
      let link2 = `https://news.ycombinator.com/item?id=${id}`
      return (
        <>
          <span>{'\u00A0'} {'\u00A0'}|{'\u00A0'}{'\u00A0'}</span>
          <a className={styles.hover} href={link2}>{number} comments</a>
        </>
      )
    default: 
      console.log('Pls specify something valuable')

  }
}

export default function Index ({data}) {

  return (
    <div className={styles.container}>
      <Header page="new"/>
      <div className={styles.wrapper}>
        <ul>

          {data.map((s, index) => {

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
                      <span className={styles.points_author}>{s.score} points by {generateHNLinks(s.by, 'user')}{'\u00A0'}{'\u00A0'}|{'\u00A0'}{'\u00A0'} </span>
                      <span className={styles.time}>{`${timeDistance(s.time)}`}</span>
                      <span className={styles.comments}>{

                        s.kids ? generateHNLinks(s.id, 'comment', `${s.kids.length}`) : null

                      }</span>
                    </div>
                  </div>
                  
                </li>
              )

            })

          }
          
          
        </ul>
      </div>
    </div>
  )
}