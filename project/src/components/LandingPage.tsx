import { useState, useEffect, useRef } from 'react'
import styles from './LandingPage.module.css'

const TOTAL_SEATS = 500
const REMAINING_SEATS = 89
const COURSE_PRICE = 299

function useCountdown(targetSeconds: number) {
  const [time, setTime] = useState(targetSeconds)
  useEffect(() => {
    const id = setInterval(() => setTime(t => (t > 0 ? t - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const s = time % 60
  return { h, m, s }
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function CountdownBlock() {
  const { h, m, s } = useCountdown(2 * 3600 + 33 * 60 + 15)
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <div className={styles.countdown}>
      <div className={styles.countdownUnit}>
        <span className={styles.countdownNum}>{pad(h)}</span>
        <span className={styles.countdownLabel}>Ghante</span>
      </div>
      <span className={styles.countdownSep}>:</span>
      <div className={styles.countdownUnit}>
        <span className={styles.countdownNum}>{pad(m)}</span>
        <span className={styles.countdownLabel}>Minute</span>
      </div>
      <span className={styles.countdownSep}>:</span>
      <div className={styles.countdownUnit}>
        <span className={styles.countdownNum}>{pad(s)}</span>
        <span className={styles.countdownLabel}>Second</span>
      </div>
    </div>
  )
}

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} className={`${styles.animSection} ${visible ? styles.animVisible : ''} ${className ?? ''}`}>
      {children}
    </div>
  )
}

const painPoints = [
  {
    icon: '😫',
    title: 'Health Talk Hai, Lekin Audience Nahi',
    desc: 'Aap fitness, diet ya health ke baare mein bahut jaante ho — par koi sunta nahi. Instagram pe followers kam hain, engagement zero hai. Kaise badhe?',
  },
  {
    icon: '😰',
    title: 'Camera Ke Saamane Aane Mein Darr',
    desc: 'Dil mein baat hai, knowledge hai — par jab camera on hota hai toh bolti band. Chehra dikhaana uncomfortable hai. Kya content bina dikhe ban sakta hai?',
  },
  {
    icon: '💸',
    title: 'Mehange Tools Ki Zaroorat Ka Bhram',
    desc: 'Log bolte hain shuru karne ke liye ₹50,000 ka camera, mic, lights chahiye. Bill katwa dengi yebaat? Ghar baitha cari savings lagaani padegi?',
  },
  {
    icon: '🤯',
    title: 'Content Banata Hun, Viral Nahi Hota',
    desc: 'Mehnat se reels banao, edits karo, post karo — par views 200 pe atak jaate hain. Algorithm samajh nahi aata, consistency tut jaati hai.',
  },
]

const modules = [
  { num: '01', title: 'Health Content Ka Scientific Formula', desc: 'Jo log viral hote hain woh secret structure use karte hain. Health tips ko aise present karo ki log share karein bina ruke — hook, value, call-to-action.' },
  { num: '02', title: 'Bina Dikhe Content Banane Ki Technique', desc: 'Face reveal karo ya nahi — dono tareeke expert-level sikhayo jayenge. AI voice, stock visuals, bina camera ke professional health videos.' },
  { num: '03', title: 'Instagram Growth Accelerator Blueprint', desc: '11.4k se 100k tak ka exact path. Hashtag strategy, Reels timing, collaboration hacks — sab step-by-step with proof.' },
  { num: '04', title: 'Monetization — Health Creator Ki Kamai', desc: 'Brand deals, affiliate marketing, digital products, consultation — health niche mein 5 alag income streams kaise activate karein.' },
  { num: '05', title: 'AI Tools Jo Kaam Karte Hain', desc: 'Video editing, thumbnail design, caption writing — sab AI se free mein. 30 minute ka kaam 5 minute mein, quality bhi professional.' },
  { num: '06', title: 'Community Building & Authority', desc: 'Followers ko fans mein badlo. Engage karo, connect karo, aur ek health brand banao jispe log bharosa karein.' },
]

const testimonials = [
  {
    name: 'Ritu Saxena',
    city: 'Indore',
    avatar: 'RS',
    text: 'Main nutritionist hun, lekin Instagram pe sirf 400 followers the. Is course ke baad 3 mahine mein 18k followers ho gaye. Ab clients khud message karte hain appointment ke liye.',
    earning: '₹85,000/month',
  },
  {
    name: 'Vikram Joshi',
    city: 'Nagpur',
    avatar: 'VJ',
    text: 'Gym trainer tha, online training karna chahta tha. Abhi 45k followers hain aur mujhe local gym se zyada online clients milte hain. Reels banata hun, paise aate hain.',
    earning: '₹1.2 lakh/month',
  },
  {
    name: 'Pooja Malhotra',
    city: 'Chandigarh',
    avatar: 'PM',
    text: 'Housewife hun, yoga sikhaya karti thi. Ghar baithe Instagram pe content shuru kiya. Ab brand deals aa rahe hain aur main independent earning karti hun.',
    earning: '₹62,000/month',
  },
  {
    name: 'Arjun Reddy',
    city: 'Hyderabad',
    avatar: 'AR',
    text: 'Health supplement brand ke liye content bana raha tha. Is course ne sikhaya kaise viral karein — ek Reels ne 2 million views diye. Brand ne contract extend kiya.',
    earning: '₹1.5 lakh/month',
  },
]

const faqs = [
  {
    q: 'Main health expert nahi hun, doctor nahi hun — kya main kar sakta hun?',
    a: 'Haan! Aap doctor hone ki zaroorat nahi. Health tips, yoga, fitness motivation, diet hacks — jo bhi aapka interest ho, uspe content bana sakte ho. Knowledge share karo, authority banao.',
  },
  {
    q: 'Kya face dikhana zaroori hai?',
    a: 'Bilkul nahi. Hum faceless content ka poora module sikhate hain. AI voice, stock footage, aur text-based videos bhi viral ho sakte hain. Aap comfortable raho, content chalao.',
  },
  {
    q: 'Kitne time mein growth dikhegi?',
    a: 'Consistent effort karo toh 60-90 din mein noticeable difference ayega. Followers, engagement, aur brand interest — teeno mein growth. Mere 11.4k followers bhi strategy se hi aaye.',
  },
  {
    q: 'Mere paas sirf basic phone hai — kaam karega?',
    a: 'Haan! Basic Android ya iPhone se shuru karo. Editing apps free hain, AI tools free hain. Investment sirf aapka time hai, aur course ₹299 only.',
  },
  {
    q: '₹299 mein kya milega?',
    a: 'Complete course access, 6 modules, AI tools list, Health Reels templates, viral hashtag database, aur private community — sab kuch. Lifetime access, koi hidden charge nahi.',
  },
]

const bonuses = [
  { icon: '✍️', title: 'Viral Script Writing Pack', value: '₹3,999', desc: '200+ proven viral Reels scripts jo guarantee karte hain engagement. Hook, value, CTA — har script tested aur working.' },
  { icon: '🎬', title: 'Complete Video Creation Method', value: '₹5,999', desc: 'Step-by-step video production guide — shooting, editing, optimization. Beginner se pro level tak shikhayi jayega.' },
  { icon: '🤖', title: 'AI Image Creation Masterclass', value: '₹4,499', desc: 'Midjourney, Adobe Firefly, DALL-E — sabka complete guide. Professional thumbnails, banners, and post visuals banao.' },
  { icon: '⚡', title: 'Unlimited Credit Tricks', value: '₹2,999', desc: 'Free AI credits kaise unlimited le sakte ho. Figma, Canva Pro, ChatGPT Plus — sab legally free tricks included.' },
  { icon: '💰', title: '₹2-3 Lakh Monthly Monetization Roadmap', value: '₹6,999', desc: 'Brand deals, affiliate links, digital products — exact formula. Month-by-month breakdown + real brand contact list.' },
  { icon: '🔐', title: 'Secret Resources & Insider Tips', value: '₹4,999', desc: 'Private community mein milne wale hidden resources, insider strategies, aur direct creator support access.' },
  { icon: '🚀', title: 'Future Updates — Lifetime Validity', value: '₹3,499', desc: 'Course updates, new modules, trending strategies — sab future mein free. Ek baar khareed, hamesha valid.' },
  { icon: '💬', title: 'Private Health Creators VIP Group', value: '₹5,999', desc: 'Exclusive community with daily tips, live doubt sessions, collaboration opportunities, direct support from creator.' },
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [seatsPct] = useState(Math.round(((TOTAL_SEATS - REMAINING_SEATS) / TOTAL_SEATS) * 100))

  return (
    <div className={styles.page}>
      {/* Sticky Top Bar */}
      <div className={styles.stickyBar}>
        <span className={styles.stickyBarDot} />
        <span>🔥 ₹299 Offer Ends Tonight — {REMAINING_SEATS} Seats Left!</span>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.container}>
          <div className={styles.heroBadge}>11.4K Instagram Family</div>
          <h1 className={styles.heroTitle}>
            Health Content Se<br />
            <span className={styles.heroHighlight}>Paisa Kamao, Darr Chodo.</span>
          </h1>
          <p className={styles.heroSub}>
            11.4k followers se seekha — aur aaj <strong>500+ creators</strong> ko sikhaya hai.<br />
            Camera nahi laga, face nahi dikhaya. Sirf <strong>health content ka formula</strong> use kiya.<br />
            <span className={styles.heroAccent}>Ab aapki baari hai yeh same opportunity pakadne ki — sirf ₹299 mein.</span>
          </p>

          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>11.4K</span>
              <span className={styles.statLabel}>Instagram Followers</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>500+</span>
              <span className={styles.statLabel}>Creators Trained</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>₹299</span>
              <span className={styles.statLabel}>Limited Price</span>
            </div>
          </div>

          <div className={styles.heroImageWrap}>
            <img
              src="/IMG_20260607_094353.png"
              alt="Object Health AI Course"
              className={styles.heroImage}
            />
            <div className={styles.heroImageBadge}>
              <span>⚡</span> 90% OFF Special Launch
            </div>
          </div>

          <a href="#enroll" className={styles.ctaPrimary}>
            Enroll Now — Sirf ₹299
            <span className={styles.ctaArrow}>→</span>
          </a>
          <p className={styles.heroNote}>Instant access • Lifetime valid • Koi hidden cost nahi</p>
        </div>
      </section>

      {/* Pain Points */}
      <section className={styles.section}>
        <div className={styles.container}>
          <AnimatedSection>
            <div className={styles.sectionLabel}>Health Creators Ki Asli Problem</div>
            <h2 className={styles.sectionTitle}>
              Yeh Situations<br />
              <span className={styles.highlight}>Aap Bhi Face Kar Rahe Ho Na?</span>
            </h2>
          </AnimatedSection>
          <div className={styles.painGrid}>
            {painPoints.map((p, i) => (
              <AnimatedSection key={i} className={styles.painCard}>
                <div className={styles.painIcon}>{p.icon}</div>
                <h3 className={styles.painTitle}>{p.title}</h3>
                <p className={styles.painDesc}>{p.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <AnimatedSection>
            <div className={styles.sectionLabel}>Course Modules</div>
            <h2 className={styles.sectionTitle}>
              Health Creator Banne Ka<br />
              <span className={styles.highlight}>Complete Blueprint</span>
            </h2>
            <p className={styles.sectionDesc}>
              Yeh koi theory nahi — <strong>practical steps</strong> hain jo work karte hain.<br />
              Har module ek specific skill teach karta hai jo aapko growth dilaaye.
            </p>
          </AnimatedSection>
          <div className={styles.modulesGrid}>
            {modules.map((m, i) => (
              <AnimatedSection key={i} className={styles.moduleCard}>
                <div className={styles.moduleNum}>{m.num}</div>
                <h3 className={styles.moduleTitle}>{m.title}</h3>
                <p className={styles.moduleDesc}>{m.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bonuses */}
      <section className={styles.section}>
        <div className={styles.container}>
          <AnimatedSection>
            <div className={styles.sectionLabel}>Special Launch Offer</div>
            <h2 className={styles.sectionTitle}>
              Sirf ₹299 Mein Sab Kuch<br />
              <span className={styles.highlight}>₹32,490 Worth Bonuses</span>
            </h2>
            <p className={styles.sectionDesc}>
              Yeh limited time offer hai. Price badhne wala hai jab offer ends.
            </p>
          </AnimatedSection>
          <div className={styles.bonusGridLarge}>
            {bonuses.map((b, i) => (
              <AnimatedSection key={i} className={styles.bonusCard}>
                <div className={styles.bonusIcon}>{b.icon}</div>
                <div className={styles.bonusContent}>
                  <div className={styles.bonusValue}>Value: <s>{b.value}</s> <span className={styles.bonusFree}>FREE</span></div>
                  <h3 className={styles.bonusTitle}>{b.title}</h3>
                  <p className={styles.bonusDesc}>{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <AnimatedSection>
            <div className={styles.sectionLabel}>Real Health Creators</div>
            <h2 className={styles.sectionTitle}>
              Yeh Log Bhi Pehle<br />
              <span className={styles.highlight}>Aap Jaisi Problems Mein The</span>
            </h2>
          </AnimatedSection>
          <div className={styles.modulesGrid}>
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} className={styles.testimonialCard}>
                <div className={styles.testimonialHeader}>
                  <div className={styles.testimonialAvatar}>{t.avatar}</div>
                  <div>
                    <div className={styles.testimonialName}>{t.name}</div>
                    <div className={styles.testimonialCity}>{t.city}</div>
                  </div>
                  <div className={styles.testimonialEarning}>{t.earning}</div>
                </div>
                <div className={styles.testimonialStars}>★★★★★</div>
                <p className={styles.testimonialText}>"{t.text}"</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section id="enroll" className={styles.section}>
        <div className={styles.container}>
          <AnimatedSection>
            <div className={styles.sectionLabel}>Decision Time</div>
            <h2 className={styles.sectionTitle}>
              Sirf ₹299 —<br />
              <span className={styles.highlight}>Lifetime Access</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.pricingCard}>
              <div className={styles.pricingBadge}>🔥 Special Launch Offer</div>
              <div className={styles.pricingTop}>
                <div className={styles.pricingOld}>₹4,999</div>
                <div className={styles.pricingNew}>₹{COURSE_PRICE}</div>
                <div className={styles.pricingTagline}>94% OFF — Sirf aaj ke liye</div>
              </div>

              <div className={styles.pricingFeatures}>
                {[
                  '6 Complete Course Modules',
                  'Health Content Formula — Step-by-Step',
                  'Faceless Content Method (Camera-Free)',
                  'Viral Script Writing Pack (₹3,999 Value) — FREE',
                  'Complete Video Creation Method (₹5,999 Value) — FREE',
                  'AI Image Creation Masterclass (₹4,499 Value) — FREE',
                  'Unlimited Credit Tricks Guide (₹2,999 Value) — FREE',
                  '₹2-3 Lakh Monthly Monetization Roadmap (₹6,999 Value) — FREE',
                  'Secret Resources & Insider Tips (₹4,999 Value) — FREE',
                  'Future Updates — Lifetime Valid (₹3,499 Value) — FREE',
                  'Private VIP Creators Community (₹5,999 Value) — FREE',
                  'Lifetime Access + All Future Content',
                ].map((f, i) => (
                  <div key={i} className={styles.pricingFeature}>
                    <span className={styles.pricingCheck}>✓</span>
                    {f}
                  </div>
                ))}
              </div>

              <div className={styles.seatsWrap}>
                <div className={styles.seatsText}>
                  <span className={styles.seatsRemaining}>{REMAINING_SEATS} seats</span> left at ₹299 — price badhne wala hai
                </div>
                <div className={styles.seatsBar}>
                  <div className={styles.seatsBarFill} style={{ width: `${seatsPct}%` }} />
                </div>
              </div>

              <div className={styles.countdownLabel2}>Offer ends in:</div>
              <CountdownBlock />

              <a href="#enroll" className={styles.ctaPrimary} style={{ width: '100%', justifyContent: 'center' }}>
                Enroll Now — Pay ₹299 Only
                <span className={styles.ctaArrow}>→</span>
              </a>
              <p className={styles.pricingNote}>Instant access • UPI/Card/NetBanking • 100% Secure</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <AnimatedSection>
            <div className={styles.sectionLabel}>Common Questions</div>
            <h2 className={styles.sectionTitle}>
              Jo Bhi <span className={styles.highlight}>Doubt</span> Hai — Clear Karo
            </h2>
          </AnimatedSection>
          <div className={styles.faqList}>
            {faqs.map((f, i) => (
              <AnimatedSection key={i}>
                <div
                  className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className={styles.faqQ}>
                    <span>{f.q}</span>
                    <span className={styles.faqIcon}>{openFaq === i ? '−' : '+'}</span>
                  </div>
                  {openFaq === i && <div className={styles.faqA}>{f.a}</div>}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`${styles.section} ${styles.sectionFinal}`}>
        <div className={styles.container}>
          <AnimatedSection>
            <div className={styles.finalWrap}>
              <h2 className={styles.finalTitle}>
                Health Creator Bano,<br />
                <span className={styles.heroHighlight}>Darr Ko Chodo.</span>
              </h2>
              <p className={styles.finalDesc}>
                6 mahine baad do types ke log honge:<br />
                Woh jo aaj step uthaya aur health content se paisa kama rahe,<br />
                aur woh jo sochte rahe "Kash maine bhi try kiya hota."<br />
                <strong>Kaunsa group mein rehna hai?</strong>
              </p>
              <a href="#enroll" className={styles.ctaPrimary}>
                Abhi Enroll Karo — Sirf ₹299
                <span className={styles.ctaArrow}>→</span>
              </a>
              <p className={styles.heroNote}>Only {REMAINING_SEATS} seats at ₹299 • Lifetime access</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerLogo}>Object Health AI</div>
          <p className={styles.footerDesc}>
            Health Creators Training • 11.4K Instagram Community
          </p>
          <p className={styles.footerDisclaimer}>
            © 2025 Object Health AI • Results may vary based on individual effort.
          </p>
        </div>
      </footer>
    </div>
  )
}
