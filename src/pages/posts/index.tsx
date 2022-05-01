import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss'
import Prismic from '@prismicio/client'

export default function Posts(){
    return(
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>12 de Março de 2022</time>
                        <strong>Titulo do post</strong>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut totam, magnam, aliquid numquam, exercitationem delectus molestias ratione perspiciatis necessitatibus praesentium culpa sint beatae fugiat placeat unde obcaecati laborum atque commodi.</p>
                    </a>

                    <a href="#">
                        <time>12 de Março de 2022</time>
                        <strong>Titulo do post</strong>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut totam, magnam, aliquid numquam, exercitationem delectus molestias ratione perspiciatis necessitatibus praesentium culpa sint beatae fugiat placeat unde obcaecati laborum atque commodi.</p>
                    </a>

                    <a href="#">
                        <time>12 de Março de 2022</time>
                        <strong>Titulo do post</strong>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut totam, magnam, aliquid numquam, exercitationem delectus molestias ratione perspiciatis necessitatibus praesentium culpa sint beatae fugiat placeat unde obcaecati laborum atque commodi.</p>
                    </a>
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query(
        Prismic.Predicates.at('document.type', 'publication'),
        {
            fetch: ['publication.title', 'publication.content'],
            pageSize: 100
        }
    )

    console.log(response)

    return{
        props:{}
    }
}