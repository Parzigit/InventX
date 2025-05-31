import { Link } from "react-router-dom"
import "./Home.scss"
import heroImg from "../../assets/inv-img.png"
import logo from "../../assets/log.png"
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink"

const Home = () => {
  return (
    <div className="home">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src={logo || "/placeholder.svg"} alt="logo" height={50} />
            <span className="logo-text">Invente X</span>
          </div>

          <ul className="nav-links">
            <li>
              <a href="/dashboard">Features</a>
            </li>
            <li>
              <a href="#benefits">Benefits</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <ShowOnLogout>
              <li>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </ShowOnLogout>
            <ShowOnLogout>
              <li>
                <button className="btn btn-primary">
                  <Link to="/login">Login</Link>
                </button>
              </li>
            </ShowOnLogout>
            <ShowOnLogin>
              <li>
                <button className="btn btn-primary">
                  <Link to="/dashboard">Dashboard</Link>
                </button>
              </li>
            </ShowOnLogin>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            {/* <div className="hero-badge">
              <span className="badge-icon">🧑‍💼</span>
              <span>An Enterprise Warehouse Solution</span>
            </div> */}

            <h1 className="hero-title">
              Advanced Warehouse & Stock
              <span className="gradient-text"> Management Solution</span>
            </h1>

            <p className="hero-description">
              Streamline your warehouse operations with our comprehensive management system. Control and manage products
              in real-time with integrated analytics to accelerate your business growth and operational efficiency.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary btn-large">
                <Link to="/login">
                  Get Started Free
                  <span className="btn-icon">→</span>
                </Link>
              </button>
              <button className="btn btn-secondary btn-large">
                <Link to="/demo">Watch Demo</Link>
              </button>
            </div>

            <div className="trust-indicators">
              <NumberText num="23K+" text="Active Users" />
              <NumberText num="500+" text="Orgs" />
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-container">
              <img src={heroImg || "/placeholder.svg"} alt="Warehouse Management Dashboard" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container">
          <div className="benefits-content">
            <h2>Powerful Features for Modern Warehouses</h2>
            <p>Everything you need to manage your warehouse operations efficiently</p>
          </div>
          <br></br>
          <div className="features-grid">
            <FeatureCard
              // icon="📦"
              title="Inventory Management"
              description="Track stock levels, manage SKUs, and automate reorder points with precision."
            />
            <FeatureCard
              // icon="🔒"
              title="Security & Compliance"
              description="Enterprise-grade security with full audit trails and compliance features."
            />
            <FeatureCard
              // icon="⚡"
              title="Automation"
              description="Automate routine tasks and workflows to increase operational efficiency."
            />
          </div>
        </div>
      </section>
      {/* <div className="benefits-section">
  <div className="container">
    <div className="benefits-content">
      <div className="benefits-intro">
        <h2>Why Choose Our Warehouse Management System?</h2>
        <p>
          Maximize productivity, reduce errors, and elevate your operations with our feature-rich platform.
        </p>
      </div>

      <div className="benefits-grid">
        <BenefitCard  text="Reduce operational costs by up to 30%" />
        <BenefitCard  text="Improve inventory accuracy to 99.9%" />
        <BenefitCard  text="Increase picking efficiency by 45%" />
        <BenefitCard  text="Real-time visibility across all operations" />
      </div>
    </div>
  </div>
</div> */}


      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Warehouse Operations?</h2>
            <p>Join thousands of businesses already using our platform to optimize their warehouse management.</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-large">
                <Link to="/login">Start Free Trial</Link>
              </button>
              <button className="btn btn-outline btn-large">
                <Link to="/contact">Contact Sales</Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
const BenefitCard = ({ icon, text }) => {
  return (
    <div className="benefit-card">
      <div className="benefit-icon">{icon}</div>
      <p>{text}</p>
    </div>
  )
}
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <span className="icon-emoji">{icon}</span>
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  )
}

const BenefitItem = ({ text }) => {
  return (
    <div className="benefit-item">
      <span className="benefit-icon">✅</span>
      <span>{text}</span>
    </div>
  )
}

const NumberText = ({ num, text }) => {
  return (
    <div className="trust-item">
      <div className="trust-number">{num}</div>
      <div className="trust-label">{text}</div>
    </div>
  )
}

export default Home
