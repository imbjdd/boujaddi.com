import { createFileRoute, notFound } from '@tanstack/react-router'

import { articles } from '#/articles'
import { InkTrail } from '#/components/InkTrail'
import { Nav } from '#/components/Nav'
import { links } from '#/content'

const findArticle = (slug: string) => articles.find((a) => a.slug === slug)

export const Route = createFileRoute('/article/$slug')({
  loader: ({ params }) => {
    if (!findArticle(params.slug)) throw notFound()
  },
  head: ({ params }) => {
    const article = findArticle(params.slug)
    if (!article) return {}
    const title = `${article.title} · salim boujaddi`
    return {
      meta: [
        { title },
        { name: 'description', content: article.summary },
        { property: 'og:title', content: title },
        { property: 'og:description', content: article.summary },
        { property: 'og:type', content: 'article' },
      ],
    }
  },
  component: ArticlePage,
})

function ArticlePage() {
  const { slug } = Route.useParams()
  const article = findArticle(slug)
  if (!article) return null

  return (
    <div className="page">
      <InkTrail />
      <div className="band">
        <main className="frame article">
          <Nav />
          <article className="article__column">
            <a
              className="hand article__back"
              href="/#wrote"
              data-sound="backward"
            >
              ← everything i wrote
            </a>
            <h1 className="display article__title">{article.title}</h1>
            <time className="caption" dateTime={article.published}>
              {article.meta}
            </time>
            <div className="article__body">{article.body}</div>
            <a className="button" href={links.x}>
              follow me on x <span aria-hidden="true">→</span>
            </a>
          </article>
        </main>
      </div>
    </div>
  )
}
