# 🖼 Guía de Imágenes AMCI - Manual de Identidad Visual

Este documento describe la estructura de carpetas y los nombres esperados para las imágenes del manual de identidad AMCI.

---

## 📁 Estructura de Carpetas

```
public/img/
├── brand/amci/          # Logos oficiales AMCI
├── providers/           # Logos de proveedores certificados
└── hero/                # Imágenes de fondo para hero section
```

---

## 🎨 Imágenes Requeridas

### 1. LOGOS OFICIALES AMCI

**Ubicación:** `public/img/brand/amci/`

| Archivo | Descripción | Uso | Dimensiones Recomendadas |
|---------|-------------|-----|--------------------------|
| `logo.png` | Logo AMCI principal (color) | Header, hero, páginas internas | 600x200px (aprox) |
| `logo-white.png` | Logo AMCI blanco | Footer oscuro | 600x200px (aprox) |

**Formatos aceptados:** PNG (con fondo transparente preferido), SVG

**Notas:**
- Los logos deben tener fondo transparente
- Mantener proporciones originales del logo
- Alta resolución para pantallas Retina (2x)

---

### 2. IMAGEN DE FONDO HERO

**Ubicación:** `public/img/hero/`

| Archivo | Descripción | Uso | Dimensiones Recomendadas |
|---------|-------------|-----|--------------------------|
| `hero-background.jpg` | Imagen institucional (maquinaria/industria) | Fondo del hero section de la página principal | 1920x1080px mínimo |

**Formatos aceptados:** JPG, WebP

**Notas:**
- La imagen debe tener buena calidad pero optimizada para web
- Preferible imágenes horizontales con espacio en el centro-izquierda para el texto
- El sistema aplica un overlay oscuro automáticamente para contraste

**Alternativa temporal:** Si no se provee, se usa un gradiente azul institucional (actual)

---

### 3. LOGOS DE PROVEEDORES

**Ubicación:** `public/img/providers/`

| Archivo | Proveedor | Descripción | Dimensiones Recomendadas |
|---------|-----------|-------------|--------------------------|
| `ap-safety.png` | AP Safety | Logo del proveedor de EPP | 300x150px |
| `mtm.png` | MTM | Logo del proveedor de hidráulica | 300x150px |
| `pumping-team.png` | Pumping Team | Logo del proveedor de bombas | 300x150px |
| `plasticos-torres.png` | Plásticos Torres | Logo del proveedor de iluminación | 300x150px |

**Formatos aceptados:** PNG (con fondo transparente preferido), SVG

**Notas:**
- Los logos deben estar centrados en un canvas cuadrado o rectangular
- Fondo transparente preferido
- Los placeholders actuales son texto en gris que se reemplazará

---

## 🔄 Cómo Activar las Imágenes

### Para los Logos AMCI:

Una vez que subas `logo.png` y `logo-white.png` en `public/img/brand/amci/`, actualiza los componentes:

**Header** (`src/components/layout/header/Header.tsx`):
```tsx
<AmciLogo size="medium" useImage={true} />
```

**Footer** (`src/components/layout/footer/Footer.tsx`):
```tsx
<AmciLogo size="medium" variant="white" useImage={true} />
```

### Para la Imagen de Fondo del Hero:

Una vez que subas `hero-background.jpg` en `public/img/hero/`, actualiza el SCSS:

**Archivo:** `src/styles/brand/amci-theme.scss`

Reemplaza la línea 348:
```scss
// ANTES:
background: linear-gradient(135deg, var(--amci-primary) 0%, var(--amci-primary-dark) 100%);

// DESPUÉS:
background-image: url('/img/hero/hero-background.jpg');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
```

### Para los Logos de Proveedores:

Una vez que subas los logos en `public/img/providers/`, actualiza la página principal:

**Archivo:** `src/pages/index.tsx`

Reemplaza cada placeholder de proveedor:

```tsx
// ANTES:
<div className="provider__logo-placeholder">
  <span className="provider__logo-text">AP SAFETY</span>
</div>

// DESPUÉS:
<div className="provider__logo-placeholder">
  <Image
    src="/img/providers/ap-safety.png"
    alt="AP Safety"
    width={250}
    height={125}
    style={{ objectFit: 'contain' }}
  />
</div>
```

**Nota:** Repite para los otros 3 proveedores (mtm.png, pumping-team.png, plasticos-torres.png)

---

## ✅ Checklist de Implementación

- [ ] **Logo AMCI principal** (`logo.png`) → Subir y activar en Header
- [ ] **Logo AMCI blanco** (`logo-white.png`) → Subir y activar en Footer
- [ ] **Imagen Hero** (`hero-background.jpg`) → Subir y actualizar SCSS
- [ ] **Logo AP Safety** (`ap-safety.png`) → Subir y reemplazar placeholder
- [ ] **Logo MTM** (`mtm.png`) → Subir y reemplazar placeholder
- [ ] **Logo Pumping Team** (`pumping-team.png`) → Subir y reemplazar placeholder
- [ ] **Logo Plásticos Torres** (`plasticos-torres.png`) → Subir y reemplazar placeholder

---

## 📞 Validación Final

Después de subir todas las imágenes:

1. Verifica que los logos se vean correctamente en Header y Footer
2. Revisa el contraste del Hero con la imagen de fondo
3. Confirma que los logos de proveedores tengan proporciones adecuadas
4. Prueba en diferentes tamaños de pantalla (móvil, tablet, desktop)

---

## 🎨 Colores de Referencia AMCI

Para asegurar coherencia visual:

- **Azul Principal:** `#1e40af`
- **Azul Oscuro:** `#1e3a8a`
- **Azul Claro:** `#3b82f6`
- **Verde Secundario:** `#059669`
- **Gris Oscuro (Footer):** `#111827`

---

**Última actualización:** Fase 1 - Estructura y placeholders implementados
**Estado:** Listo para recibir imágenes oficiales del manual AMCI
