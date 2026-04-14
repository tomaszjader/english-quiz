const Layout = ({ children }) => (
  <div className="page-shell">
    <div className="page-background" aria-hidden="true">
      <div className="glow glow-left" />
      <div className="glow glow-right" />
      <div className="grid-noise" />
    </div>
    <div className="page-content">{children}</div>
  </div>
);

export default Layout;
