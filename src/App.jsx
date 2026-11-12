import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CalendarDays, Clock3, Music2, Volume2, VolumeX, Crown, Heart, Sparkles, ArrowDown, Share2, CalendarPlus } from 'lucide-react';
import { Facebook, MessageCircle } from 'lucide-react';

const MAP_URL = 'https://maps.app.goo.gl/UzKBEiH7t8rR29jC7';
const EVENT_DATE = new Date('2026-11-13T14:00:00+02:00');

function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const diff = Math.max(0, EVENT_DATE.getTime() - now);
  const values = [
    ['يوم', Math.floor(diff / 86400000)],
    ['ساعة', Math.floor(diff / 3600000) % 24],
    ['دقيقة', Math.floor(diff / 60000) % 60],
    ['ثانية', Math.floor(diff / 1000) % 60],
  ];
  return <div className="countdown">{values.map(([label, value]) => <div className="count-box" key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}</div>;
}

function MusicControl({ playing, onToggle }) {
  return <button className="music-control" onClick={onToggle} aria-label={playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}>
    {playing ? <Volume2 size={18}/> : <VolumeX size={18}/>}<span>{playing ? 'إيقاف الأغنية' : 'تشغيل الأغنية'}</span>
  </button>;
}

function Opening({ onOpen }) {
  return <motion.div className="opening" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: .9 }}>
    <div className="opening-frame">
      <div className="opening-sparkle s1">✦</div><div className="opening-sparkle s2">✧</div>
      <div className="crown-mark"><Crown size={36} strokeWidth={1.1}/></div>
      <p className="eyebrow">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيم</p>
      <h1>حكاية أميرة<br/><em>اسمها تاليا</em></h1>
      <p className="opening-copy">بكل الحب.. ندعوكم لمشاركتنا فرحتنا</p>
      <p className="opening-event">عقيقة تاليا · يوم الجمعة القادم</p>
      <button className="open-button" onClick={onOpen}>افتحوا دعوتنا <Heart size={16}/></button>
      <span className="opening-foot">A LITTLE PRINCESS · A LIFETIME OF LOVE</span>
    </div>
  </motion.div>;
}

function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const eventCalendar = useMemo(() => {
  const start = '20261113T120000Z';
  const end = '20261113T140000Z';
  const title = encodeURIComponent('عقيقة الأميرة تاليا');
  const details = encodeURIComponent(
    "يسعدنا مشاركتكم فرحتنا بعقيقة تاليا — كافيه IT'S OKAY، مجمع سافانا."
  );
  const location = encodeURIComponent("كافيه IT'S OKAY – مجمع سافانا");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}, []);
  const toggleMusic = async () => {
    const audio = document.getElementById('talia-audio');
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { try { await audio.play(); setPlaying(true); setShowPlayer(true); } catch { setPlaying(false); } }
  };
  const openInvite = async () => {
    setOpened(true);
    const audio = document.getElementById('talia-audio');
    if (audio) { try { await audio.play(); setPlaying(true); setShowPlayer(true); } catch { setPlaying(false); } }
  };
  const share = async () => {
  const data = {
    title: 'عقيقة الأميرة تاليا',
    text: "يسعدنا دعوتكم لمشاركتنا فرحتنا بعقيقة تاليا — الجمعة 13 نوفمبر 2026، الساعة 2 ظهرًا بعد صلاة الجمعة، كافيه IT'S OKAY – مجمع سافانا.",
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch {}
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(window.location.href);
    alert('تم نسخ رابط الدعوة');
  }
};

  return <main>
    {!opened && <Opening onOpen={openInvite}/>}
    <audio id="talia-audio" src="/music/talia-song.mp3" loop preload="none"/>
    <header className="topbar"><a href="#top" className="brand"><Crown size={20}/> تاليا</a><span>دعوة عقيقة</span><button className="share-top" onClick={share}><Share2 size={17}/></button></header>
    <section className="hero" id="top">
      <div className="hero-glow"/>
      <div className="hero-ornament ornament-left">❀</div><div className="hero-ornament ornament-right">❀</div>
      <motion.div className="hero-content" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <div className="tiny-crown"><Crown size={30}/></div>
        <p className="eyebrow">بِفَضْلِ اللهِ وَكَرَمِهِ</p>
        <h1>الأميرة <span>تاليا</span></h1>
        <div className="gold-line"><i/>✦<i/></div>
        <p className="hero-subtitle">أشرقت حياتنا بقدومها.. واكتملت فرحتنا بوجودكم</p>
        <p className="hero-invite">نتشرف بدعوتكم لمشاركتنا فرحة عقيقة صغيرتنا</p>
        <a className="scroll-cue" href="#invitation"><ArrowDown size={18}/><span>اكتشفوا الدعوة</span></a>
      </motion.div>
      <div className="floating-star star-a">✧</div><div className="floating-star star-b">✦</div><div className="floating-star star-c">✧</div>
    </section>

    <section className="invitation section" id="invitation">
      <div className="section-kicker"><span/> دعوة بمحبة <span/></div>
      <div className="invitation-card">
        <div className="card-corner c1">❧</div><div className="card-corner c2">❧</div>
        <div className="card-crown"><Crown size={27}/></div>
        <p className="bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيم</p>
        <h2>فرحتنا <em>بتحلى بيكم</em></h2>
        <p className="invitation-text">الحمد لله الذي بنعمته تتم الصالحات، رزقنا الله بمولودتنا الغالية <strong>تاليا</strong>، ونسعد أن نشارككم فرحتنا وندعوكم لمشاركتنا مناسبتها السعيدة.</p>
        <div className="invitation-event-title">عقيقة تاليا</div>
        <div className="signature">في انتظاركم بكل حب</div>
      </div>
    </section>

    <section className="count-section section">
      <div className="section-kicker"><span/> موعد لقائنا <span/></div>
      <h2 className="section-title">باقي على فرحتنا</h2>
      <Countdown/>
      <div className="event-date">
        <div className="event-date-line"><CalendarDays size={23}/><strong>الجمعة، 13 نوفمبر 2026</strong></div>
        <div className="event-date-line"><Clock3 size={23}/><strong>2:00 ظهرًا</strong></div>
        <div className="event-after-prayer">بعد صلاة الجمعة</div>
      </div>
    </section>

    <section className="dream-section section">
      <div className="dream-art" aria-hidden="true">
        <div className="moon">☾</div><div className="castle">♜</div><div className="cloud cloud-one"/><div className="cloud cloud-two"/>
        <div className="art-caption">Once upon a time...</div>
      </div>
      <div className="dream-copy"><div className="section-kicker"><span/> حكاية صغيرة <span/></div>
        <h2 className="section-title">أميرة صغيرة..<br/><em>وفرحة كبيرة</em></h2>
        <p>وجودكم هو أجمل هدية، وابتسامتكم هتكمّل فرحتنا في يوم مميز من حكاية تاليا.</p>
        <div className="heart-divider">♡　✦　♡</div>
      </div>
    </section>

    <section className="details-section section">
      <div className="section-kicker"><span/> تفاصيل المناسبة <span/></div>
      <h2 className="section-title">نستناكم فين وإمتى؟</h2>
      <div className="details-grid">
        <article className="detail-card"><div className="detail-icon"><CalendarDays/></div><span>اليوم والتاريخ</span><strong>الجمعة</strong><p>13 نوفمبر 2026</p></article>
        <article className="detail-card"><div className="detail-icon"><Clock3/></div><span>موعدنا</span><strong>2:00 ظهرًا</strong><p>بعد صلاة الجمعة</p></article>
        <article className="detail-card location-card"><div className="detail-icon"><MapPin/></div><span>مكان الاحتفال</span><strong>كافيه IT'S OKAY</strong><p>مجمع سافانا</p><a href={MAP_URL} target="_blank" rel="noreferrer">افتح الموقع على الخريطة <MapPin size={15}/></a></article>
      </div>
      <a className="calendar-button" href={eventCalendar} target="_blank" rel="noreferrer"><CalendarPlus size={18}/> أضف الموعد إلى التقويم</a>
    </section>

    <section className="closing section">
      <div className="closing-crown"><Crown size={34}/></div>
      <p className="eyebrow">بكل الحب والامتنان</p>
      <h2>وجودكم <em>يسعدنا</em></h2>
      <p>نسأل الله أن يجعلها من مواليد السعادة، وأن يملأ أيامكم أفراحًا ومسرات.</p>
      <div className="closing-name">تاليا <span>♡</span></div>
      <button className="share-button" onClick={share}><Share2 size={17}/> مشاركة الدعوة</button>
    </section>
    <footer className="melovite-footer">
  <div className="footer-decoration">✦</div>

  <p className="footer-credit">
    صُممت بكل حب بواسطة
    <span> MELOVITE </span>
  </p>

  <div className="footer-line">
    <i />
    <span>✦</span>
    <i />
  </div>

  <div className="footer-actions">
    <a
      href="https://www.facebook.com/melovite"
      target="_blank"
      rel="noreferrer"
      className="footer-btn facebook-btn"
    >
      <Facebook size={18} />
      تابعنا على فيسبوك
    </a>

    <a
      href="https://wa.me/201152033177?text=%D8%A7%D8%B1%D9%8A%D8%AF%20%D8%B5%D9%86%D8%B9%20%D8%AF%D8%B9%D9%88%D8%A9%20%D9%84%D9%8A"
      target="_blank"
      rel="noreferrer"
      className="footer-btn create-btn"
    >
      <MessageCircle size={18} />
      اصنع دعوتك
    </a>
  </div>

  <small className="footer-copy">
    © 2026 MELOVITE · Every moment is made with love
  </small>
</footer>
    {showPlayer && <div className="player-dock"><div className="player-disc"><Music2 size={17}/></div><div className="player-label"><strong>أغنية تاليا</strong><span>لحنتها فرحتنا</span></div><MusicControl playing={playing} onToggle={toggleMusic}/></div>}
    {!showPlayer && opened && <button className="music-fab" onClick={toggleMusic}><Music2 size={18}/> تشغيل الأغنية</button>}
  </main>;
}

export default App;
