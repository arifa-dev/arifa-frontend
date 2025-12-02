import "./index.scss";
import icon from "../../assets/images/icon.png";

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div>
          <img className="hero__icon__image" src={icon} alt="icon" />
        </div>
        <h1>v1.0.0</h1>
        <p>
          Plug-and-play notifications API for your apps. Send instant alerts to
          your users across web, mobile, and backend systems.
        </p>

        <div className="hero-buttons">
          <a
            href="https://notifications.arifa.dev/docs/"
            className="btn-primary"
          >
            Documentation
          </a>
        </div>
      </div>
    </section>
  );
};
