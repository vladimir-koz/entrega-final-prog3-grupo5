import "./herobanner.css";
import heroImage from "../../assets/images/hero.png";

function HeroBanner() {
  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,.65),
            rgba(0,0,0,.65)
          ),
          url(${heroImage})
        `,
      }}
    >
      <span className="tag">
        PowerUp
      </span>

      <h1>
        Entrená | Mejorá | Superate.
      </h1>

      <p>
        Registrá tus entrenamientos y seguí tu evolución.
      </p>
    </section>
  );
}

export default HeroBanner;