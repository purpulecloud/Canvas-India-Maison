import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ChevronLeft, ChevronRight, Heart,
  Menu, Moon, Search, ShoppingBag, Sparkles, Star, Sun, X, Quote,
  ShieldCheck, WandSparkles, Camera
} from 'lucide-react';
import { CartDrawer } from './components/CartDrawer';
import { CustomizeModal } from './components/CustomizeModal';
import { QuoteModal } from './components/QuoteModal';
import { TRENDING_PRODUCTS, CATEGORIES, OCCASIONS, DEALS_PRODUCTS, FEATURED_COLLECTIONS, CUSTOMER_REVIEWS, REAL_SPACES } from './data/storeData';
import { Product, CartItem } from './types';

const img = (url: string, w = 1200) => url.replace(/w=\d+/, `w=${w}`);

function Image({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <img src={img(src)} alt={alt} loading="lazy" className={className} onError={(e) => { (e.currentTarget as HTMLImageElement).style.background = 'linear-gradient(135deg,#e7e2da,#cfc7bc)'; }} />;
}

export function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('canvas-maison-mode') === 'dark');
  const [menu, setMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-2']);
  const [cart, setCart] = useState<CartItem[]>([{ product: TRENDING_PRODUCTS[0], quantity: 1, size: '12x18 inch', finish: 'Matte Canvas' }]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [productOffset, setProductOffset] = useState(0);
  const [newsletter, setNewsletter] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('canvas-dark', dark);
    localStorage.setItem('canvas-maison-mode', dark ? 'dark' : 'light');
  }, [dark]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const addToCart = (product: Product) => {
    setCart(prev => prev.some(i => i.product.id === product.id)
      ? prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...prev, { product, quantity: 1, size: product.sizes[0], finish: product.finishes[0] }]);
    setCartOpen(true);
  };
  const openCustomize = (product?: Product) => { setSelectedProduct(product || TRENDING_PRODUCTS[0]); setCustomizeOpen(true); };
  const toggleWish = (id: string) => setWishlist(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const selectCategory = (slug: string) => {
    if (slug === 'corporate') scrollTo('corporate');
    else if (slug === 'custom-prints') scrollTo('studio');
    else if (slug === 'gifts' || slug === 'festivals') scrollTo('occasions');
    else scrollTo('collections');
    setMenu(false);
  };

  const filtered = useMemo(() => categoryFilter === 'all' ? TRENDING_PRODUCTS : TRENDING_PRODUCTS.filter(p => p.categorySlug === categoryFilter), [categoryFilter]);
  const visibleProducts = filtered.slice(productOffset, productOffset + 4);
  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);

  const handleCustomized = (item: any) => {
    setCart(prev => [...prev, { product: item.product, quantity: item.quantity, size: item.size, finish: item.finish, customText: item.customText, photoUrl: item.photoUrl }]);
    setCartOpen(true);
  };

  return (
    <div className="maison-site">
      <header className="maison-header">
        <div className="header-left">
        <button className="header-menu" onClick={() => setMenu(true)} aria-label="Open menu"><Menu size={18} /><span>Menu</span></button>
        <nav className="desktop-nav">
          <button onClick={() => scrollTo('collections')}>Collections</button>
          <button onClick={() => scrollTo('studio')}>The Studio</button>
          <button onClick={() => scrollTo('occasions')}>Gifting</button>
          <button onClick={() => scrollTo('corporate')}>Business</button>
        </nav>
        </div>
        <button className="wordmark" onClick={() => scrollTo('top')}>CANVAS<span>INDIA</span></button>
        <div className="header-actions">
          <button aria-label="Search" onClick={() => scrollTo('products')}><Search size={18} /></button>
          <button aria-label="Toggle theme" onClick={() => setDark(v => !v)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
          <button className="bag-action" onClick={() => setCartOpen(true)} aria-label="Open cart"><ShoppingBag size={18}/><b>{cartCount}</b></button>
        </div>
      </header>

      {menu && <div className="mobile-menu-overlay" onClick={() => setMenu(false)}><aside onClick={e => e.stopPropagation()}>
        <div className="mobile-menu-top"><span className="wordmark">CANVAS<span>INDIA</span></span><button onClick={() => setMenu(false)}><X/></button></div>
        <div className="mobile-links">
          {['collections','products','studio','occasions','corporate','spaces'].map((id, i) => <button key={id} onClick={() => { scrollTo(id); setMenu(false); }}><small>0{i+1}</small>{id.replace('-', ' ')}</button>)}
        </div>
        <div className="mobile-menu-foot"><span>Pan-India delivery</span><span>Custom made</span></div>
      </aside></div>}

      <main id="top">
        <section className="maison-hero">
          <div className="hero-image"><Image src={CATEGORIES[0].image} alt="Canvas wall art in a refined interior" className="cover" /></div>
          <div className="hero-overlay" />
          <div className="hero-copy">
            <p className="eyebrow light">CANVAS INDIA / COLLECTION 01</p>
            <h1>Walls made<br/><em>personal.</em></h1>
            <p className="hero-lead">Museum-inspired prints, family memories and custom pieces — made in India, made to remain.</p>
            <div className="hero-actions"><button className="line-button light" onClick={() => scrollTo('collections')}>Explore the collection <ArrowRight size={16}/></button><button className="circle-button" onClick={() => openCustomize()}><WandSparkles size={18}/></button></div>
          </div>
          <div className="hero-meta"><span>01 — 07</span><span>Prints / Frames / Objects</span></div>
        </section>

        <div className="marquee"><div><span>PERSONALIZED PRINTS</span><i>✦</i><span>MADE IN INDIA</span><i>✦</i><span>FREE DELIVERY ABOVE ₹999</span><i>✦</i><span>ARCHIVAL QUALITY</span><i>✦</i><span>PERSONALIZED PRINTS</span><i>✦</i></div></div>

        <section className="intro-section section-pad">
          <div className="intro-index">01 / THE COLLECTION</div>
          <div className="intro-copy"><p className="eyebrow">A quieter way to decorate</p><h2>Bring your <em>memories</em><br/>into the room.</h2><p>From a single photograph to a complete gallery wall, Canvas India turns the moments you care about into objects with presence. Choose the material, make it yours, and we take care of the rest.</p><button className="text-link" onClick={() => scrollTo('products')}>Discover customer favourites <ArrowRight size={15}/></button></div>
        </section>

        <section id="collections" className="lookbook-section section-pad">
          <div className="section-top"><div><p className="eyebrow">02 / Collections</p><h2>Find your <em>material.</em></h2></div><button className="text-link" onClick={() => scrollTo('products')}>View all products <ArrowRight size={15}/></button></div>
          <div className="collection-mosaic">
            {CATEGORIES.map((c, i) => <button key={c.id} className={`mosaic-card m-${i}`} onClick={() => selectCategory(c.slug)}><Image src={c.image} alt={c.name} className="cover"/><span className="mosaic-shade"/><div><small>0{i+1} / {c.name}</small><strong>{c.name}</strong><span>From ₹{c.startingPrice}</span></div><ArrowDownRight className="m-arrow" size={20}/></button>)}
          </div>
          <div className="collection-list">{FEATURED_COLLECTIONS.map((c, i) => <button key={c.id} onClick={() => scrollTo('products')}><span>0{i+1}</span><strong>{c.name}</strong><span>{c.itemCount} pieces</span><ArrowRight size={15}/></button>)}</div>
        </section>

        <section id="products" className="products-section section-pad">
          <div className="section-top"><div><p className="eyebrow">03 / Customer favourites</p><h2>Made for <em>your wall.</em></h2></div><div className="product-nav"><button disabled={productOffset === 0} onClick={() => setProductOffset(Math.max(0, productOffset - 4))}><ChevronLeft/></button><button disabled={productOffset + 4 >= filtered.length} onClick={() => setProductOffset(Math.min(Math.max(0, filtered.length - 4), productOffset + 4))}><ChevronRight/></button></div></div>
          <div className="filter-row">{['all','canvas','acrylic','cork','wall-art','photo-frames','corporate'].map(t => <button className={categoryFilter === t ? 'active' : ''} key={t} onClick={() => { setCategoryFilter(t); setProductOffset(0); }}>{t === 'all' ? 'All' : t.replace('-', ' ')}</button>)}</div>
          <div className="product-rail">{visibleProducts.map((p, i) => <article className={`editorial-product p-${i}`} key={p.id}><div className="product-photo"><Image src={p.image} alt={p.name} className="cover"/><span className="product-badge">{p.badge || 'Featured'}</span><button className="wish" onClick={() => toggleWish(p.id)}>{<Heart size={17} fill={wishlist.includes(p.id) ? 'currentColor' : 'none'}/>}</button><button className="add-overlay" onClick={() => addToCart(p)}>Add to bag <ArrowRight size={14}/></button></div><div className="product-info"><small>{p.category}</small><h3>{p.name}</h3><div><span>₹{p.price.toLocaleString('en-IN')}</span><del>₹{p.originalPrice.toLocaleString('en-IN')}</del></div><p><Star size={12} fill="currentColor"/> {p.rating} · {p.reviewsCount} reviews</p></div></article>)}</div>
          <div className="product-count">Showing {filtered.length ? productOffset + 1 : 0}–{Math.min(productOffset + 4, filtered.length)} of {filtered.length}</div>
        </section>

        <section id="studio" className="studio-section">
          <div className="studio-media"><Image src={CATEGORIES[6].image} alt="Custom print studio" className="cover"/><div className="studio-stamp"><Sparkles size={17}/><span>THE<br/>CUSTOM<br/>STUDIO</span></div></div>
          <div className="studio-copy"><p className="eyebrow light">04 / The Studio</p><h2>Your image.<br/><em>Your object.</em></h2><p>Upload a photo, choose your material, set the size and finish, then preview the piece before it reaches production. Canvas, acrylic, cork or frames — the choice is yours.</p><div className="studio-points"><span><b>01</b> Upload your photo</span><span><b>02</b> Choose material & size</span><span><b>03</b> Preview & order</span></div><button className="line-button light" onClick={() => openCustomize()}>Open the customizer <ArrowRight size={16}/></button></div>
        </section>

        <section id="occasions" className="occasions-section section-pad"><div className="section-top"><div><p className="eyebrow">05 / Gifting</p><h2>For every <em>occasion.</em></h2></div><span className="section-note">Thoughtful objects for the moments<br/>worth keeping.</span></div><div className="occasion-grid">{OCCASIONS.map((o, i) => <button key={o.id} onClick={() => selectCategory(o.slug)} className={`occasion o-${i}`}><Image src={o.image} alt={o.name} className="cover"/><span className="occasion-shade"/><div><small>{o.offerText}</small><strong>{o.name}</strong><span>{o.tagline}</span></div></button>)}</div></section>

        <section className="deals-section"><div className="deals-copy"><p className="eyebrow light">06 / The edit</p><h2>Small pieces.<br/><em>Better prices.</em></h2><p>Desk prints, frames, cork pieces and posters — a considered selection under ₹999.</p><button className="line-button light" onClick={() => scrollTo('deals')}>Shop the edit <ArrowRight size={16}/></button></div><div id="deals" className="deals-grid">{DEALS_PRODUCTS.map((p, i) => <article key={p.id}><Image src={p.image} alt={p.name} className="cover"/><div><small>{p.badge || 'Offer'}</small><strong>{p.name}</strong><span>₹{p.price.toLocaleString('en-IN')}</span><button onClick={() => addToCart(p)}>Add to bag <ArrowRight size={13}/></button></div></article>)}</div></section>

        <section className="process-section section-pad"><div className="process-heading"><p className="eyebrow">07 / How it works</p><h2>From <em>photo</em><br/>to finished piece.</h2><p>Simple enough for a first order. Precise enough for a statement wall.</p></div><div className="process-list">{[
          ['01','Choose your piece','Canvas, acrylic, cork, frames or posters — start with what suits your space.'],
          ['02','Make it personal','Upload a photo, artwork or logo and choose your dimensions and finish.'],
          ['03','We make it','Your order is printed, finished, packed securely and prepared for pan-India delivery.'],
          ['04','Hang the memory','Delivered in 4–6 business days, ready to turn a blank wall into yours.']
        ].map(s => <div key={s[0]} className="process-row"><span>{s[0]}</span><div><h3>{s[1]}</h3><p>{s[2]}</p></div><ArrowRight size={17}/></div>)}</div></section>

        <section id="corporate" className="corporate-section"><div className="corporate-media"><Image src={CATEGORIES[8].image} alt="Modern corporate workspace" className="cover"/></div><div className="corporate-copy"><p className="eyebrow">08 / Business</p><h2>Make the space<br/><em>remember you.</em></h2><p>Reception signs, founder walls, mission boards, employee gifts and branded displays — produced in volume with clear proofs and dedicated support.</p><div className="stats"><span><b>20–1,000+</b> units</span><span><b>GST</b> compliant</span><span><b>Pan-India</b> dispatch</span></div><button className="dark-button" onClick={() => setQuoteOpen(true)}>Request a bulk quote <ArrowRight size={15}/></button></div></section>

        <section className="trust-section section-pad"><div className="trust-head"><p className="eyebrow">09 / Why Canvas India</p><h2>Good materials.<br/><em>Good memories.</em></h2></div><div className="trust-grid">{[['01','Archival print quality','Rich colour reproduction with protective finishes built for everyday spaces.'],['02','Made with care','Sturdy frames, clean edges and secure packaging from studio to doorstep.'],['03','Delivery across India','Reliable 4–6 business day delivery with careful protective packaging.'],['04','Support when you need it','Real help for custom orders, corporate quantities and installation questions.']].map(x => <div key={x[0]}><span>{x[0]}</span><ShieldCheck size={18}/><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></section>

        <section id="spaces" className="spaces-section section-pad"><div className="section-top"><div><p className="eyebrow">10 / Real spaces</p><h2>Seen in <em>real life.</em></h2></div><span className="section-note">Homes · Offices · Cafés · Hotels · Studios · Retail</span></div><div className="spaces-mosaic">{REAL_SPACES.map((s, i) => <button key={s.id} className={`space s-${i}`}><Image src={s.image} alt={s.title} className="cover"/><span><small>{s.spaceType}</small><strong>{s.title}</strong></span></button>)}</div></section>

        <section className="reviews-section section-pad"><div className="review-intro"><Quote size={30}/><p className="eyebrow">11 / Customer notes</p><h2>Made personal.<br/><em>Kept forever.</em></h2></div><div className="review-stack">{CUSTOMER_REVIEWS.map((r, i) => <article key={r.id} className={i === 0 ? 'featured-review' : ''}><div className="review-stars">★★★★★</div><p>“{r.review}”</p><footer><strong>{r.name}</strong><span>{r.city} · {r.product}</span></footer></article>)}</div></section>

        <section className="newsletter-section"><div><p className="eyebrow light">The Canvas Letter</p><h2>Ideas for walls<br/><em>worth living with.</em></h2><p>New collections, practical styling ideas and occasional offers. No noise.</p></div><form onSubmit={e => { e.preventDefault(); if (newsletter) setNewsletterSent(true); }}><label>Your email address</label><div><input type="email" value={newsletter} onChange={e => setNewsletter(e.target.value)} required placeholder="you@example.com"/><button>{newsletterSent ? 'Subscribed' : 'Join the letter'} <ArrowRight size={15}/></button></div><small>{newsletterSent ? 'You are on the list. Welcome.' : 'Unsubscribe anytime.'}</small></form></section>

        <section className="final-statement"><div><span>CANVAS INDIA</span><h2>A blank wall is<br/><em>an invitation.</em></h2><button className="dark-button" onClick={() => openCustomize()}>Create something personal <ArrowRight size={16}/></button></div></section>
      </main>

      <footer className="maison-footer"><div className="footer-brand"><button className="wordmark" onClick={() => scrollTo('top')}>CANVAS<span>INDIA</span></button><p>Personalized prints, frames and objects made in India for the spaces you call yours.</p></div><div className="footer-cols"><div><b>Explore</b><button onClick={() => scrollTo('collections')}>Collections</button><button onClick={() => scrollTo('products')}>Products</button><button onClick={() => scrollTo('occasions')}>Gifting</button></div><div><b>Make</b><button onClick={() => openCustomize()}>Custom Studio</button><button onClick={() => setQuoteOpen(true)}>Corporate</button><button onClick={() => scrollTo('spaces')}>Real Spaces</button></div><div><b>Care</b><span>4–6 day delivery</span><span>Secure packaging</span><span>Support: +91 90765 43510</span></div></div><div className="footer-bottom"><span>© 2026 Canvas India</span><span>Made for Indian homes & businesses</span><span><Camera size={15}/> @canvasindia</span></div></footer>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cartItems={cart} onUpdateQuantity={(id, q) => setCart(c => c.map(i => i.product.id === id ? {...i, quantity:q} : i))} onRemoveItem={id => setCart(c => c.filter(i => i.product.id !== id))} onCheckout={() => { alert('Thank you for shopping with Canvas India! Checkout gateway initiated.'); setCartOpen(false); }} />
      <CustomizeModal isOpen={customizeOpen} onClose={() => setCustomizeOpen(false)} product={selectedProduct} onAddToCartCustomized={handleCustomized} />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}

export default App;
