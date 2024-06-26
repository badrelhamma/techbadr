import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Badr el Hamma!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Beautiful Downtown Foo City, Dan D. Repairs  provides a trained staff ready to meet your tech repair needs.</p>
                <address className="public__addr">
                Badr el Hamma<br />
                    88 Foo Badr<br />
                    Foo City, CA 12345<br />
                    <a href="tel:+21266 66 66 66">(555) 555-5555</a>
                </address>
                <br />
                <p>Owner: Badr el Hamma</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public