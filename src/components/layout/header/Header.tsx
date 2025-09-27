import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import AmciLogo from "@/components/layout/brand/AmciLogo";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/router";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { getCartCount } = useCart();
  const router = useRouter();
  const cartCount = getCartCount();
  const [adminNotifications, setAdminNotifications] = useState(0);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleSubmenu = (submenu: string) => {
    if (submenu === openSubMenu) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(submenu);
    }
  };

  const isSubMenuOpen = (submenu: string) => {
    return submenu === openSubMenu ? "sub-menu-open" : "";
  };

  const isSubMenuButton = (submenu: string) => {
    return submenu === openSubMenu ? " sm-btn-active" : " ";
  };

  useEffect(() => {
    const handleResizeHeader = (): void => {
      setToggleMenu(false);
      setOpenSubMenu(null);
    };

    window.addEventListener("resize", handleResizeHeader);

    return () => {
      window.removeEventListener("resize", handleResizeHeader);
    };
  }, []);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Cargar notificaciones para admins
  useEffect(() => {
    const fetchAdminNotifications = async () => {
      if (profile?.role === 'ADMIN') {
        try {
          const response = await fetch('/api/admin/notifications');
          if (response.ok) {
            const data = await response.json();
            setAdminNotifications(data.total);
          }
        } catch (error) {
          console.error('Error fetching admin notifications:', error);
        }
      }
    };

    fetchAdminNotifications();

    // Actualizar notificaciones cada 30 segundos
    const interval = setInterval(fetchAdminNotifications, 30000);

    return () => clearInterval(interval);
  }, [profile]);

  return (
    <Fragment>
      <div className="fix">
        <div className={(toggleMenu ? " info-open" : " ") + " offcanvas__info"}>
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-40 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo">
                  <AmciLogo size="medium" />
                </div>
                <div className="offcanvas__close">
                  <button
                    aria-label="Close"
                    onClick={() => setToggleMenu(false)}
                  >
                    <i className="fal fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="offcanvas__search mb-25">
                <form action="/">
                  <input
                    type="text"
                    placeholder="What are you searching for?"
                    required
                  />
                  <button type="submit">
                    <i className="far fa-search"></i>
                  </button>
                </form>
              </div>
              <div className="mobile-menu fix mb-40 mean-container">
                <div className="mean-bar d-block d-lg-none">
                  <nav className="mean-nav">
                    <ul>
                      <li className="has-dropdown">
                        <button
                          aria-label="Select Dropdown"
                          className={`nul ${isSubMenuButton("home")}`}
                          onClick={() => handleSubmenu("home")}
                        >
                          Inicio
                          <span className="mean-expand">
                            <i className="fal fa-plus"></i>
                          </span>
                        </button>
                      </li>
                      <li>
                        <Link href="/about">Nosotros</Link>
                      </li>
                      <li>
                        <Link href="/catalogo">Catálogo</Link>
                      </li>
                      <li className="has-dropdown">
                        <button
                          className={`${isSubMenuButton("cuenta")}`}
                          onClick={() => handleSubmenu("cuenta")}
                        >
                          Mi Cuenta
                          <span className="mean-expand">
                            <i className="fal fa-plus"></i>
                          </span>
                        </button>
                        <ul className={`sub-menu ${isSubMenuOpen("cuenta")}`}>
                          <li>
                            <Link href="/ordenes">Mis Órdenes</Link>
                          </li>
                          <li>
                            <Link href="/panel/proveedor">Panel Proveedor</Link>
                          </li>
                          <li>
                            <Link href="/panel/admin">
                              Panel Admin
                              {adminNotifications > 0 && (
                                <span className="badge bg-danger ms-2">
                                  {adminNotifications}
                                </span>
                              )}
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="/carrito">Carrito</Link>
                      </li>
                      <li className="mean-last">
                        <Link href="/contact">Contacto</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="offcanvas__contact mt-30 mb-20">
                <h4>Contact Info</h4>
                <ul>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="fal fa-map-marker-alt"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <Link
                        target="_blank"
                        href="https://www.google.com/maps/place/Dhaka/@23.7806207,90.3492859,12z/data=!3m1!4b1!4m5!3m4!1s0x3755b8b087026b81:0x8fa563bbdd5904c2!8m2!3d23.8104753!4d90.4119873"
                      >
                        12/A, Mirnada City Tower, NYC
                      </Link>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="far fa-phone"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <Link href="tel:+088889797697" aria-label="Contact Us">
                        +088889797697
                      </Link>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="fal fa-envelope"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <Link href="tel:+012-345-6789" aria-label="Contact Us">
                        <span className="mailto:support@mail.com">
                          support@mail.com
                        </span>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="offcanvas__social">
                <ul>
                  <li>
                    <Link href="/">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="fab fa-youtube"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="fab fa-linkedin"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={(toggleMenu ? " overlay-open" : " ") + " offcanvas__overlay"}
        onClick={() => setToggleMenu(false)}
      ></div>
      <div className="offcanvas__overlay-white"></div>
      <header>
        <div
          id="header-sticky"
          className={
            (scrolled ? " sticky" : " ") + " header__area-3 header__transparent"
          }
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-2 col-6">
                <div className="header__logo">
                  <AmciLogo size="medium" />
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 d-none d-lg-block">
                <div className="menu__main-wrapper-3 d-flex justify-content-end">
                  <div className="main-menu main-menu-3 d-none d-lg-block">
                    <nav id="mobile-menu">
                      <ul>
                        <li>
                          <Link href="/">Inicio</Link>
                        </li>
                        <li>
                          <Link href="/about">Nosotros</Link>
                        </li>
                        <li>
                          <Link href="/catalogo">Catálogo</Link>
                        </li>
                        {user ? (
                          <li className="has-dropdown">
                            <button aria-label="Select Dropdown">
                              <i className="fas fa-user-circle me-2"></i>
                              {profile?.name || profile?.email?.split('@')[0] || 'Mi Cuenta'}
                            </button>
                            <ul className="submenu">
                              <li>
                                <Link href="/ordenes">Mis Órdenes</Link>
                              </li>
                              {profile?.role === 'PROVEEDOR' && (
                                <li>
                                  <Link href="/panel/proveedor">Panel Proveedor</Link>
                                </li>
                              )}
                              {profile?.role === 'ADMIN' && (
                                <>
                                  <li>
                                    <Link href="/panel/admin">
                                      Panel Admin
                                      {adminNotifications > 0 && (
                                        <span className="badge bg-danger ms-2">
                                          {adminNotifications}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="/reportes">Reportes</Link>
                                  </li>
                                </>
                              )}
                              <li>
                                <button onClick={handleLogout} className="btn-logout">
                                  <i className="fas fa-sign-out-alt me-2"></i>
                                  Cerrar Sesión
                                </button>
                              </li>
                            </ul>
                          </li>
                        ) : (
                          <li className="has-dropdown">
                            <button aria-label="Select Dropdown">
                              <i className="fas fa-user me-2"></i>
                              Cuenta
                            </button>
                            <ul className="submenu">
                              <li>
                                <Link href="/login">Iniciar Sesión</Link>
                              </li>
                              <li>
                                <Link href="/registro">Registrarse</Link>
                              </li>
                              <li>
                                <Link href="/registro-proveedor">Soy Proveedor</Link>
                              </li>
                            </ul>
                          </li>
                        )}
                        <li>
                          <Link href="/contact">Contacto</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-6">
                <div className="header__right d-flex align-items-center justify-content-end">
                  <div className="header__cart me-3">
                    <Link href="/carrito" className="cart-icon position-relative">
                      <i className="fal fa-shopping-cart fs-4"></i>
                      {cartCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </div>
                  <div className="header__btn d-none d-xl-block">
                    <Link className="border__btn s-3" href="/catalogo">
                      VER CATÁLOGO
                    </Link>
                  </div>
                  <div className="header__cart d-xl-none me-2">
                    <Link href="/carrito" className="cart-icon position-relative">
                      <i className="fal fa-shopping-cart fs-5"></i>
                      {cartCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </div>
                  <div className="header__toggle d-xl-none">
                    <button
                      className="sidebar__active"
                      aria-label="Toggle Sidebar"
                      onClick={handleToggleMenu}
                    >
                      <div className="bar-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <style jsx>{`
        .btn-logout {
          background: none;
          border: none;
          color: inherit;
          padding: 0;
          font: inherit;
          cursor: pointer;
          text-align: left;
          width: 100%;
        }
        .btn-logout:hover {
          color: #1e40af;
        }
        .cart-icon {
          color: inherit;
        }
      `}</style>
    </Fragment>
  );
};

export default Header;
