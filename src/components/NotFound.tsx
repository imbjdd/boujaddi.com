import { Nav } from '#/components/Nav'

export function NotFound() {
  return (
    <div className="page">
      <div className="band">
        <main className="frame article">
          <Nav />
          <div className="article__column">
            <h1 className="display">
              nothing <em>here.</em>
            </h1>
            <a className="hand article__back" href="/" data-sound="backward">
              ← back home
            </a>
          </div>
        </main>
      </div>
    </div>
  )
}
