'use client';
import React, { useEffect } from 'react';

export default function Home() {
  // हॉस्पिटलचा व्हॉट्सॲप नंबर (इथे नंतर क्लायंटचा नंबर येईल)
  const HOSPITAL_WA = '919876543210';
  // तुमची Google Apps Script ची वेबाप URL इथे टाका
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxX6czErsHGbTLQEK2qPS5-cx_eQVw_DP18ZD5D1TZ05p2hKUbisJLdLZ-dhhsl5GM9mw/exec';

  function selectSlot(e) {
    document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
  }

  function scrollToForm() {
    document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
  }

  function openWhatsApp(doctor, dept) {
    const msg = `Namaste! Mala ${doctor} (${dept}) sathi appointment book karaychi ahe. Kripaya slot confirm kara.`;
    window.open(`https://wa.me/${HOSPITAL_WA}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function openWhatsAppDirect(e) {
    e.preventDefault();
    const msg = `Namaste! CityLife Hospital madhe appointment book karaychi ahe. Please help kara.`;
    window.open(`https://wa.me/${HOSPITAL_WA}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function handleQuickBook() {
    const msg = `Namaste! Website varu appointment book karaychi ahe. Please available slots sangaa.`;
    window.open(`https://wa.me/${HOSPITAL_WA}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function handleFormSubmit() {
    const name = document.getElementById('patientName').value.trim();
    const phone = document.getElementById('patientPhone').value.trim();
    const dept = document.getElementById('department').value;
    const date = document.getElementById('prefDate').value;
    const time = document.getElementById('prefTime').value;
    const symptoms = document.getElementById('symptoms').value.trim();
    const age = document.getElementById('patientAge').value;

    if (!name || !phone || !dept) {
      alert('Please fill in Name, Phone, and Department.');
      return;
    }

    // 🔥 BACKEND AUTOMATION: गुगल शीटमध्ये डेटा पाठवणे (No-CORS Mode)
    const payload = {
      name: name,
      phone: phone,
      age: age || 'Not provided',
      department: dept,
      date: date || 'Flexible',
      time: time,
      symptoms: symptoms || 'Not mentioned'
    };

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // 💬 WHATSAPP AUTOMATION: व्हॉट्सॲपवर मेसेज फॉरवर्ड करणे
    const msg = `🏥 *Appointment Request — CityLife Hospital*

👤 Name: ${name}
📞 Phone: ${phone}
🎂 Age: ${age || 'Not provided'}
🩺 Department: ${dept}
📅 Date: ${date || 'Flexible'}
🕐 Time: ${time}
📋 Symptoms: ${symptoms || 'Not mentioned'}

Please confirm my appointment slot. Thank you! 🙏`;

    window.open(`https://wa.me/${HOSPITAL_WA}?text=${encodeURIComponent(msg)}`, '_blank');
    document.getElementById('successModal').classList.add('show');
  }

  function closeModal() {
    document.getElementById('successModal').classList.remove('show');
  }

  useEffect(() => {
    // डेटपिकरला आजची किमान तारीख सेट करणे
    const dateInput = document.getElementById('prefDate');
    if (dateInput) {
      dateInput.min = new Date().toISOString().split('T')[0];
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --navy: #0a1628;
          --navy-mid: #102040;
          --teal: #0ea5b0;
          --teal-light: #22d3e0;
          --gold: #c9a84c;
          --gold-light: #f0c96a;
          --white: #ffffff;
          --off-white: #f4f7fb;
          --text-muted: #8899aa;
          --border: rgba(255,255,255,0.08);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: var(--navy); color: var(--white); overflow-x: hidden; }
        
        nav {
          position: fixed; top: 0; width: 100%; z-index: 999;
          background: rgba(10,22,40,0.92); backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border); padding: 0 5%;
          display: flex; align-items: center; justify-content: space-between; height: 72px;
        }
        .logo { display: flex; align-items: center; gap: 12px; }
        .logo-icon {
          width: 42px; height: 42px; background: linear-gradient(135deg, var(--teal), var(--teal-light));
          border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px;
        }
        .logo-text { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
        .logo-sub { font-size: 10px; color: var(--text-muted); letter-spacing: 2px; text-transform: uppercase; margin-top: -2px; }
        nav ul { display: flex; gap: 36px; list-style: none; }
        nav ul a { text-decoration: none; color: rgba(255,255,255,0.75); font-size: 14px; font-weight: 400; letter-spacing: 0.3px; transition: color 0.2s; }
        nav ul a:hover { color: var(--teal-light); }
        .nav-cta {
          background: linear-gradient(135deg, var(--teal), #0891b2); color: white; border: none; padding: 10px 24px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; letter-spacing: 0.3px; transition: opacity 0.2s;
        }
        .nav-cta:hover { opacity: 0.85; }

        .hero { min-height: 100vh; display: flex; align-items: center; padding: 100px 5% 60px; position: relative; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 70% 40%, rgba(14,165,176,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(201,168,76,0.06) 0%, transparent 50%); }
        .hero-grid { position: absolute; inset: 0; opacity: 0.04; background-size: 60px 60px; background-image: linear-gradient(rgba(14,165,176,1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,176,1) 1px, transparent 1px); }
        .hero-content { position: relative; z-index: 2; max-width: 620px; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(14,165,176,0.12); border: 1px solid rgba(14,165,176,0.3); padding: 6px 16px; border-radius: 100px; font-size: 12px; color: var(--teal-light); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 28px; }
        .hero-badge span { width: 6px; height: 6px; background: var(--teal-light); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
        
        .hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(48px, 6vw, 80px); font-weight: 600; line-height: 1.05; letter-spacing: -1px; margin-bottom: 24px; }
        .hero h1 span { color: var(--teal-light); }
        .hero p { font-size: 17px; line-height: 1.7; color: rgba(255,255,255,0.65); margin-bottom: 40px; max-width: 500px; }
        .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
        
        .btn-primary { background: linear-gradient(135deg, var(--teal), #0891b2); color: white; border: none; padding: 14px 32px; border-radius: 10px; font-size: 15px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: transform 0.2s, box-shadow 0.2s; text-decoration: none; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(14,165,176,0.35); }
        .btn-secondary { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.25); padding: 14px 32px; border-radius: 10px; font-size: 15px; font-weight: 400; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: border-color 0.2s, background 0.2s; text-decoration: none; }
        .btn-secondary:hover { border-color: var(--teal); background: rgba(14,165,176,0.08); }

        .hero-stats { display: flex; gap: 48px; margin-top: 56px; padding-top: 40px; border-top: 1px solid var(--border); }
        .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; color: var(--teal-light); }
        .stat-label { font-size: 12px; color: var(--text-muted); letter-spacing: 0.5px; margin-top: 2px; }
        .hero-visual { position: absolute; right: 5%; top: 50%; transform: translateY(-50%); width: 420px; z-index: 2; }

        .float-card { background: rgba(16,32,64,0.85); border: 1px solid rgba(14,165,176,0.2); border-radius: 20px; padding: 28px; backdrop-filter: blur(20px); }
        .float-card-title { font-size: 13px; color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 20px; }
        .appointment-time { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .time-slot { background: rgba(14,165,176,0.1); border: 1px solid rgba(14,165,176,0.2); border-radius: 8px; padding: 8px 14px; font-size: 13px; color: var(--teal-light); cursor: pointer; transition: background 0.2s; }
        .time-slot:hover, .time-slot.active { background: rgba(14,165,176,0.25); }
        
        .doctor-card { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border); }
        .doctor-avatar { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, var(--teal), var(--navy-mid)); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .doctor-name { font-size: 14px; font-weight: 500; }
        .doctor-spec { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .doctor-avail { margin-left: auto; background: rgba(16,185,129,0.15); color: #34d399; font-size: 11px; padding: 3px 10px; border-radius: 100px; }
        .confirm-btn { width: 100%; background: linear-gradient(135deg, var(--teal), #0891b2); color: white; border: none; padding: 14px; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; margin-top: 20px; }

        section { padding: 100px 5%; }
        .section-label { font-size: 12px; color: var(--teal); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; }
        .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(32px,4vw,52px); font-weight: 600; line-height: 1.1; margin-bottom: 16px; }
        .section-sub { color: rgba(255,255,255,0.55); font-size: 16px; max-width: 480px; line-height: 1.6; }

        .departments { background: var(--off-white); }
        .departments * { color: var(--navy) !important; }
        .dept-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 60px; }
        .dept-card { background: white; border-radius: 16px; padding: 28px 24px; border: 1px solid #e8eef5; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; text-align: center; }
        .dept-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(10,22,40,0.1); }
        .dept-icon { font-size: 36px; margin-bottom: 14px; }
        .dept-name { font-size: 15px; font-weight: 600; color: var(--navy) !important; margin-bottom: 6px; }
        .dept-count { font-size: 12px; color: var(--text-muted) !important; }

        .doctors-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-top: 60px; }
        .doc-card { background: rgba(16,32,64,0.6); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; transition: transform 0.2s, border-color 0.2s; }
        .doc-card:hover { transform: translateY(-4px); border-color: rgba(14,165,176,0.4); }
        .doc-img-area { height: 180px; background: linear-gradient(135deg, #0e2a4a 0%, #102040 100%); display: flex; align-items: center; justify-content: center; font-size: 60px; position: relative; }
        .doc-badge { position: absolute; bottom: 12px; right: 12px; background: rgba(16,185,129,0.2); color: #34d399; font-size: 11px; padding: 4px 12px; border-radius: 100px; border: 1px solid rgba(52,211,153,0.3); }
        .doc-info { padding: 20px 22px; }
        .doc-info h3 { font-size: 17px; font-weight: 500; margin-bottom: 4px; }
        .doc-info .spec { font-size: 13px; color: var(--teal-light); margin-bottom: 12px; }
        .doc-meta { display: flex; gap: 16px; }
        .doc-meta-item { font-size: 12px; color: var(--text-muted); }
        .doc-meta-item strong { display: block; font-size: 14px; color: white; font-weight: 500; }
        .book-btn { display: block; width: 100%; margin-top: 16px; background: rgba(14,165,176,0.12); border: 1px solid rgba(14,165,176,0.3); color: var(--teal-light); padding: 10px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; text-align: center; transition: background 0.2s; text-decoration: none; }
        .book-btn:hover { background: rgba(14,165,176,0.25); }

        .automation { background: linear-gradient(180deg, var(--navy) 0%, #061020 100%); }
        .auto-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-top: 60px; }
        .auto-flow { display: flex; flex-direction: column; gap: 0; }
        .auto-step { display: flex; gap: 20px; align-items: flex-start; position: relative; padding-bottom: 32px; }
        .auto-step:last-child { padding-bottom: 0; }
        .auto-step::after { content: ''; position: absolute; left: 19px; top: 44px; width: 2px; height: calc(100% - 44px); background: linear-gradient(to bottom, rgba(14,165,176,0.4), transparent); }
        .auto-step:last-child::after { display: none; }
        .step-num { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; background: rgba(14,165,176,0.15); border: 1px solid rgba(14,165,176,0.35); display: flex; align-items: center; justify-content: center; font-size: 16px; color: var(--teal-light); font-weight: 600; font-family: 'Cormorant Garamond', serif; }
        .step-content h4 { font-size: 16px; font-weight: 500; margin-bottom: 6px; }
        .step-content p { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.5; }

        .wa-demo { background: #0d1f0f; border-radius: 20px; overflow: hidden; border: 1px solid rgba(37,211,102,0.2); }
        .wa-header { background: #1a3320; padding: 14px 20px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(37,211,102,0.15); }
        .wa-avatar { width: 36px; height: 36px; border-radius: 50%; background: #25d366; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .wa-name { font-size: 14px; font-weight: 500; }
        .wa-status { font-size: 11px; color: #25d366; }
        .wa-body { padding: 20px; display: flex; flex-direction: column; gap: 12px; }
        .wa-msg { padding: 10px 14px; border-radius: 12px; font-size: 13px; line-height: 1.5; max-width: 85%; }
        .wa-msg.in { background: #1f3320; border-bottom-left-radius: 4px; align-self: flex-start; }
        .wa-msg.out { background: #005c4b; border-bottom-right-radius: 4px; align-self: flex-end; }
        .wa-time { font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 4px; text-align: right; }
        .wa-auto-label { font-size: 11px; color: #25d366; text-align: center; opacity: 0.7; margin: 4px 0; }

        .testimonials { background: #060f1e; }
        .test-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 60px; }
        .test-card { background: rgba(16,32,64,0.7); border: 1px solid var(--border); border-radius: 20px; padding: 28px; }
        .stars { color: var(--gold-light); font-size: 16px; letter-spacing: 2px; margin-bottom: 16px; }
        .test-card p { font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.7); margin-bottom: 20px; }
        .test-author { display: flex; align-items: center; gap: 12px; }
        .test-av { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--teal), var(--navy-mid)); display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .test-name { font-size: 14px; font-weight: 500; }
        .test-role { font-size: 12px; color: var(--text-muted); }

        .appointment { background: var(--navy-mid); }
        .form-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; margin-top: 60px; }
        .form-card { background: rgba(10,22,40,0.8); border: 1px solid var(--border); border-radius: 24px; padding: 40px; }
        .form-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 600; margin-bottom: 8px; }
        .form-card p { font-size: 14px; color: var(--text-muted); margin-bottom: 32px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 12px; color: var(--text-muted); letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 8px; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 16px; color: white; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--teal); }
        .form-group select option { background: var(--navy-mid); }
        .submit-btn { width: 100%; background: linear-gradient(135deg, var(--teal), #0891b2); color: white; border: none; padding: 16px; border-radius: 12px; font-size: 16px; font-weight: 500; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(14,165,176,0.4); }

        .form-info { padding: 20px 0; }
        .info-item { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 28px; }
        .info-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(14,165,176,0.1); border: 1px solid rgba(14,165,176,0.2); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
        .info-label { font-size: 12px; color: var(--text-muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
        .info-val { font-size: 15px; font-weight: 500; }

        .wa-book-btn { display: flex; align-items: center; gap: 14px; background: rgba(37,211,102,0.1); border: 1px solid rgba(37,211,102,0.3); border-radius: 14px; padding: 16px 20px; cursor: pointer; transition: background 0.2s; text-decoration: none; margin-top: 28px; }
        .wa-book-btn:hover { background: rgba(37,211,102,0.2); }
        .wa-book-btn .wa-ico { font-size: 28px; }
        .wa-book-btn .wa-txt { font-size: 14px; font-weight: 500; color: white; }
        .wa-book-btn .wa-sub { font-size: 12px; color: rgba(255,255,255,0.5); }

        .modal-overlay { display: none; position: fixed; inset: 0; z-index: 9999; background: rgba(5,12,25,0.85); backdrop-filter: blur(8px); align-items: center; justify-content: center; }
        .modal-overlay.show { display: flex; }
        .modal { background: var(--navy-mid); border: 1px solid rgba(14,165,176,0.3); border-radius: 24px; padding: 48px 40px; text-align: center; max-width: 460px; width: 90%; }
        .modal-icon { font-size: 56px; margin-bottom: 20px; }
        .modal h3 { font-family: 'Cormorant Garamond', serif; font-size: 28px; margin-bottom: 10px; }
        .modal p { color: rgba(255,255,255,0.6); margin-bottom: 28px; font-size: 15px; line-height: 1.6; }
        .modal-close { background: linear-gradient(135deg, var(--teal), #0891b2); color: white; border: none; padding: 12px 36px; border-radius: 10px; font-size: 15px; cursor: pointer; }

        footer { background: #040c18; border-top: 1px solid var(--border); padding: 60px 5% 30px; }
        .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
        .footer-brand p { font-size: 14px; color: var(--text-muted); line-height: 1.7; margin-top: 16px; max-width: 280px; }
        .footer-col h4 { font-size: 13px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 20px; }
        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 10px; }
        .footer-col a { text-decoration: none; color: rgba(255,255,255,0.6); font-size: 14px; transition: color 0.2s; }
        .footer-col a:hover { color: var(--teal-light); }
        .footer-bottom { border-top: 1px solid var(--border); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; }
        .footer-bottom p { font-size: 13px; color: var(--text-muted); }
        .powered { font-size: 13px; color: var(--teal); }

        .wa-float { position: fixed; bottom: 28px; right: 28px; z-index: 888; width: 56px; height: 56px; border-radius: 50%; background: #25d366; display: flex; align-items: center; justify-content: center; font-size: 26px; cursor: pointer; box-shadow: 0 4px 20px rgba(37,211,102,0.4); transition: transform 0.2s; text-decoration: none; }
        .wa-float:hover { transform: scale(1.1); }

        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        .hero-content > * { animation: fadeUp 0.6s ease both; }
        .hero-content > *:nth-child(1) { animation-delay: 0.1s; }
        .hero-content > *:nth-child(2) { animation-delay: 0.25s; }
        .hero-content > *:nth-child(3) { animation-delay: 0.4s; }
        .hero-content > *:nth-child(4) { animation-delay: 0.55s; }
        .hero-content > *:nth-child(5) { animation-delay: 0.7s; }

        @media (max-width: 900px) {
          .hero-visual { display: none; }
          .auto-grid, .form-wrap, .footer-top { grid-template-columns: 1fr; }
          nav ul { display: none; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="logo">
          <div className="logo-icon">🏥</div>
          <div>
            <div className="logo-text">CityLife Hospital</div>
            <div className="logo-sub">Advanced Medical Care</div>
          </div>
        </div>
        <ul>
          <li><a href="#departments">Departments</a></li>
          <li><a href="#doctors">Our Doctors</a></li>
          <li><a href="#automation">Smart Care</a></li>
          <li><a href="#appointment">Appointments</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="nav-cta" onClick={scrollToForm}>Book Appointment</button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div className="hero-badge"><span></span> Latur's Most Trusted Hospital</div>
          <h1>Your Health.<br />Our <span>Priority.</span><br />Always.</h1>
          <p>World-class healthcare with compassionate doctors, advanced diagnostics, and AI-powered appointment management — available 24/7.</p>
          <div className="hero-btns">
            <a className="btn-primary" onClick={(e) => { e.preventDefault(); scrollToForm(); }} href="#">📅 Book Appointment</a>
            <a className="btn-secondary" href="#doctors">👨‍⚕️ Meet Our Doctors</a>
          </div>
          <div className="hero-stats">
            <div><div className="stat-num">25+</div><div className="stat-label">Specialist Doctors</div></div>
            <div><div className="stat-num">12K+</div><div className="stat-label">Patients Treated</div></div>
            <div><div className="stat-num">24/7</div><div className="stat-label">Emergency Care</div></div>
            <div><div className="stat-num">98%</div><div className="stat-label">Patient Satisfaction</div></div>
          </div>
        </div>

        {/* Floating Appointment Card */}
        <div className="hero-visual">
          <div className="float-card">
            <div className="float-card-title">⚡ Quick Appointment</div>
            <div className="appointment-time">
              <div className="time-slot active" onClick={selectSlot}>9:00 AM</div>
              <div className="time-slot" onClick={selectSlot}>11:30 AM</div>
              <div className="time-slot" onClick={selectSlot}>2:00 PM</div>
              <div className="time-slot" onClick={selectSlot}>4:30 PM</div>
            </div>
            <div className="doctor-card">
              <div className="doctor-avatar">👨‍⚕️</div>
              <div>
                <div className="doctor-name">Dr. Rajesh Sharma</div>
                <div className="doctor-spec">Cardiologist · 15 yrs</div>
              </div>
              <div className="doctor-avail">Available</div>
            </div>
            <div className="doctor-card">
              <div className="doctor-avatar">👩‍⚕️</div>
              <div>
                <div className="doctor-name">Dr. Priya Kulkarni</div>
                <div className="doctor-spec">Neurologist · 12 yrs</div>
              </div>
              <div className="doctor-avail">Available</div>
            </div>
            <button className="confirm-btn" onClick={handleQuickBook}>✅ Confirm via WhatsApp</button>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="departments" id="departments">
        <div className="section-label">What We Treat</div>
        <div className="section-title">World-Class Departments</div>
        <div className="section-sub">Comprehensive care across all major medical specialties, staffed by expert consultants.</div>
        <div className="dept-grid">
          <div className="dept-card"><div className="dept-icon">❤️</div><div className="dept-name">Cardiology</div><div className="dept-count">4 Doctors · Mon–Sat</div></div>
          <div className="dept-card"><div className="dept-icon">🧠</div><div className="dept-name">Neurology</div><div className="dept-count">3 Doctors · Mon–Fri</div></div>
          <div className="dept-card"><div className="dept-icon">🦴</div><div className="dept-name">Orthopedics</div><div className="dept-count">3 Doctors · Daily</div></div>
          <div className="dept-card"><div className="dept-icon">👶</div><div className="dept-name">Pediatrics</div><div className="dept-count">4 Doctors · Daily</div></div>
          <div className="dept-card"><div className="dept-icon">🦷</div><div className="dept-name">Dental</div><div className="dept-count">3 Doctors · Mon–Sat</div></div>
          <div className="dept-card"><div className="dept-icon">👁️</div><div className="dept-name">Ophthalmology</div><div className="dept-count">2 Doctors · Mon–Fri</div></div>
          <div className="dept-card"><div className="dept-icon">🩺</div><div className="dept-name">General Medicine</div><div className="dept-count">5 Doctors · Daily</div></div>
          <div className="dept-card"><div className="dept-icon">🩻</div><div className="dept-name">Radiology</div><div className="dept-count">24/7 · Emergency</div></div>
        </div>
      </section>

      {/* DOCTORS */}
      <section id="doctors">
        <div className="section-label">Our Team</div>
        <div className="section-title">Meet Our <span style={{ color: 'var(--teal-light)' }}>Specialists</span></div>
        <div className="section-sub">Experienced, compassionate doctors committed to your wellbeing.</div>
        <div className="doctors-grid">
          <div className="doc-card">
            <div className="doc-img-area">👨‍⚕️<div className="doc-badge">● Available Today</div></div>
            <div className="doc-info">
              <h3>Dr. Rajesh Sharma</h3>
              <div className="spec">Senior Cardiologist</div>
              <div className="doc-meta">
                <div className="doc-meta-item"><strong>15 yrs</strong>Experience</div>
                <div className="doc-meta-item"><strong>2,400+</strong>Patients</div>
                <div className="doc-meta-item"><strong>4.9 ⭐</strong>Rating</div>
              </div>
              <a className="book-btn" onClick={() => openWhatsApp('Dr. Rajesh Sharma', 'Cardiology')} style={{ cursor: 'pointer' }}>📲 Book on WhatsApp</a>
            </div>
          </div>
          <div className="doc-card">
            <div className="doc-img-area">👩‍⚕️<div className="doc-badge">● Available Today</div></div>
            <div className="doc-info">
              <h3>Dr. Priya Kulkarni</h3>
              <div className="spec">Neurologist</div>
              <div className="doc-meta">
                <div className="doc-meta-item"><strong>12 yrs</strong>Experience</div>
                <div className="doc-meta-item"><strong>1,800+</strong>Patients</div>
                <div className="doc-meta-item"><strong>4.8 ⭐</strong>Rating</div>
              </div>
              <a className="book-btn" onClick={() => openWhatsApp('Dr. Priya Kulkarni', 'Neurology')} style={{ cursor: 'pointer' }}>📲 Book on WhatsApp</a>
            </div>
          </div>
          <div className="doc-card">
            <div className="doc-img-area">👨‍⚕️<div className="doc-badge">● Available Today</div></div>
            <div className="doc-info">
              <h3>Dr. Anil Patil</h3>
              <div className="spec">Orthopedic Surgeon</div>
              <div className="doc-meta">
                <div className="doc-meta-item"><strong>18 yrs</strong>Experience</div>
                <div className="doc-meta-item"><strong>3,100+</strong>Patients</div>
                <div className="doc-meta-item"><strong>4.9 ⭐</strong>Rating</div>
              </div>
              <a className="book-btn" onClick={() => openWhatsApp('Dr. Anil Patil', 'Orthopedics')} style={{ cursor: 'pointer' }}>📲 Book on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* AUTOMATION */}
      <section className="automation" id="automation">
        <div className="section-label">Smart Hospital System</div>
        <div className="section-title">Automation That <span style={{ color: 'var(--teal-light)' }}>Works For You</span></div>
        <div className="section-sub">From booking to follow-up — everything happens automatically, so doctors focus on patients, not paperwork.</div>

        <div className="auto-grid">
          <div className="auto-flow">
            <div className="auto-step">
              <div className="step-num">1</div>
              <div className="step-content">
                <h4>Patient Books on WhatsApp</h4>
                <p>Patient clicks "Book Appointment" → WhatsApp opens with a pre-filled message. No app download needed.</p>
              </div>
            </div>
            <div className="auto-step">
              <div className="step-num">2</div>
              <div className="step-content">
                <h4>Auto-Confirmation Sent</h4>
                <p>Patient immediately receives appointment confirmation with date, time, doctor name, and directions.</p>
              </div>
            </div>
            <div className="auto-step">
              <div className="step-num">3</div>
              <div className="step-content">
                <h4>Doctor Gets Daily Summary</h4>
                <p>Every morning at 8 AM, doctor receives today's patient list on WhatsApp — name, age, complaint, time slot.</p>
              </div>
            </div>
            <div className="auto-step">
              <div className="step-num">4</div>
              <div className="step-content">
                <h4>Google Sheet Updated Instantly</h4>
                <p>Every appointment auto-logs to a private Google Sheet — date, patient details, department, status.</p>
              </div>
            </div>
            <div className="auto-step">
              <div className="step-num">5</div>
              <div className="step-content">
                <h4>24-Hour Reminder Sent</h4>
                <p>Patient automatically receives a reminder 24 hours before their appointment. Reduces no-shows by 70%.</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Demo */}
          <div className="wa-demo">
            <div className="wa-header">
              <div className="wa-avatar">🏥</div>
              <div>
                <div className="wa-name">CityLife Hospital</div>
                <div className="wa-status">● Online · Official Business</div>
              </div>
            </div>
            <div className="wa-body">
              <div className="wa-msg in">
                Namaste! Mala Dr. Sharma sathi appointment book karaychi ahe. Mazha naam Rahul Desai ahe.
                <div className="wa-time">9:02 AM</div>
              </div>
              <div className="wa-auto-label">🤖 Auto-Reply (Instant)</div>
              <div className="wa-msg out">
                🏥 *CityLife Hospital*<br /><br />
                Namaste Rahul ji! 🙏<br /><br />
                ✅ Tumchi appointment nondvali geli:<br />
                👨‍⚕️ Dr. Rajesh Sharma<br />
                📅 Udya — 11:30 AM<br />
                🏥 OPD Room 4<br /><br />
                Krupaya 15 min aadhi ya.
                <div className="wa-time">9:02 AM ✓✓</div>
              </div>
              <div className="wa-auto-label">📊 Simultaneously logged to Google Sheet</div>
              <div className="wa-msg out">
                ⏰ *Reminder — Udya*<br /><br />
                Rahul ji, tumchi appointment aaj ahe:<br />
                🕐 11:30 AM · Dr. Sharma<br /><br />
                📍 CityLife Hospital, Latur<br />
                📞 Need help? Reply here.
                <div className="wa-time">8:00 AM (Auto-sent) ✓✓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="testimonials">
        <div className="section-label">Patient Stories</div>
        <div className="section-title">What Our Patients <span style={{ color: 'var(--teal-light)' }}>Say</span></div>
        <div className="test-grid">
          <div className="test-card">
            <div className="stars">★★★★★</div>
            <p>"Booking an appointment was so easy — just one WhatsApp message and I got an instant confirmation. The doctor was excellent and the staff was very caring."</p>
            <div className="test-author">
              <div className="test-av">👩</div>
              <div><div className="test-name">Sunita Patil</div><div className="test-role">Cardiology Patient</div></div>
            </div>
          </div>
          <div className="test-card">
            <div className="stars">★★★★★</div>
            <p>"I received a reminder on WhatsApp the day before my appointment. Never missed it. The whole experience felt modern and professional."</p>
            <div className="test-author">
              <div className="test-av">👨</div>
              <div><div className="test-name">Ravi Kulkarni</div><div className="test-role">Orthopedics Patient</div></div>
            </div>
          </div>
          <div className="test-card">
            <div className="stars">★★★★★</div>
            <p>"Best hospital in Latur. Dr. Priya is amazing. I love that I don't need to call and wait — WhatsApp booking is a game changer for busy families."</p>
            <div className="test-author">
              <div className="test-av">👩</div>
              <div><div className="test-name">Meena Deshmukh</div><div className="test-role">Pediatrics Patient</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* APPOINTMENT FORM */}
      <section className="appointment" id="appointment">
        <div className="section-label">Get in Touch</div>
        <div className="section-title">Book Your <span style={{ color: 'var(--teal-light)' }}>Appointment</span></div>
        <div className="form-wrap">
          <div className="form-card">
            <h3>Schedule a Visit</h3>
            <p>Fill in your details and we'll confirm your slot on WhatsApp instantly.</p>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" id="patientName" placeholder="Rahul Desai" />
              </div>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input type="tel" id="patientPhone" placeholder="+91 98765 43210" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input type="number" id="patientAge" placeholder="35" />
              </div>
              <div className="form-group">
                <label>Department *</label>
                <select id="department">
                  <option value="">Select Department</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Orthopedics</option>
                  <option>Pediatrics</option>
                  <option>Dental</option>
                  <option>Ophthalmology</option>
                  <option>General Medicine</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Preferred Date</label>
                <input type="date" id="prefDate" />
              </div>
              <div className="form-group">
                <label>Preferred Time</label>
                <select id="prefTime">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:30 AM</option>
                  <option>2:00 PM</option>
                  <option>3:30 PM</option>
                  <option>5:00 PM</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Symptoms / Reason for Visit</label>
              <textarea id="symptoms" rows="3" placeholder="Briefly describe your symptoms..."></textarea>
            </div>
            <button className="submit-btn" onClick={handleFormSubmit}>📲 Confirm via WhatsApp →</button>
          </div>

          <div className="form-info" id="contact">
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <div className="info-label">Address</div>
                <div className="info-val">Near Udgir Road, Main Bazaar, Latur, Maharashtra 413512</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📞</div>
              <div>
                <div className="info-label">Phone</div>
                <div className="info-val">+91 02382-123456</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">🕐</div>
              <div>
                <div className="info-label">OPD Hours</div>
                <div className="info-val">Mon–Sat · 9 AM to 7 PM<br /><span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Emergency: Open 24/7</span></div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div>
                <div className="info-label">Email</div>
                <div className="info-val">care@citylifehospital.in</div>
              </div>
            </div>
            <a className="wa-book-btn" onClick={openWhatsAppDirect} href="#">
              <div className="wa-ico">💬</div>
              <div>
                <div className="wa-txt">Chat on WhatsApp</div>
                <div className="wa-sub">Instant reply · Available 24/7</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">🏥</div>
              <div>
                <div className="logo-text">CityLife Hospital</div>
                <div className="logo-sub">Advanced Medical Care</div>
              </div>
            </div>
            <p>Providing compassionate, world-class healthcare to the people of Latur since 2008. Your health is our highest commitment.</p>
          </div>
          <div className="footer-col">
            <h4>Departments</h4>
            <ul>
              <li><a href="#">Cardiology</a></li>
              <li><a href="#">Neurology</a></li>
              <li><a href="#">Orthopedics</a></li>
              <li><a href="#">Pediatrics</a></li>
              <li><a href="#">Dental</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Hospital</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Doctors</a></li>
              <li><a href="#">Facilities</a></li>
              <li><a href="#">Gallery</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Quick Help</h4>
            <ul>
              <li><a href="#">Book Appointment</a></li>
              <li><a href="#">Emergency: 102</a></li>
              <li><a href="#">Lab Reports</a></li>
              <li><a href="#">Insurance</a></li>
              <li><a href="#">Health Packages</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 CityLife Hospital, Latur. All rights reserved.</p>
          <div className="powered">⚡ Powered by AyushNexa Digital Solutions</div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a className="wa-float" onClick={openWhatsAppDirect} href="#" title="Chat on WhatsApp">💬</a>

      {/* Success Modal */}
      <div className="modal-overlay" id="successModal">
        <div className="modal">
          <div className="modal-icon">✅</div>
          <h3>Appointment Requested!</h3>
          <p>Your appointment details have been sent to WhatsApp. Our team will confirm your slot within 5 minutes.<br /><br /><strong>You'll also receive an auto-reminder 24 hours before your visit.</strong></p>
          <button className="modal-close" onClick={closeModal}>Done</button>
        </div>
      </div>
    </>
  );
}