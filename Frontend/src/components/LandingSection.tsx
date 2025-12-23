import { useState, useEffect, useMemo } from "react";
import api from "../api/axios";

const LandingSection = ({ setDashboardOpen, user }: any) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [userImages, setUserImages] = useState<string[]>([]);

  // Memoize bubble styles to prevent re-calculation on every render
  const bubbles = useMemo(() => {
    return userImages.slice(0, 30).map((img, index) => {
      const isTop = index % 2 === 0;
      const randomLeft = Math.random() * 90 + 5; // 5% to 95%
      const randomDelay = Math.random() * 5;
      const randomDuration = 10 + Math.random() * 10;
      const sway = (Math.random() - 0.5) * 60 + "px";

      const style: any = {
        left: `${randomLeft}%`,
        animationName: isTop ? "bubbleFloatUp" : "bubbleFloatDown",
        animationDuration: `${randomDuration}s`,
        animationDelay: `${randomDelay}s`,
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
        "--sway": sway,
        [isTop ? "top" : "bottom"]: "0px",
      };

      return { img, style, key: index };
    });
  }, [userImages]);

  const cards = [
    {
      country: "Spain",
      img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2070&auto=format&fit=crop",
    },
    {
      country: "Switzerland",
      img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop",
    },
    {
      country: "Bali",
      img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop",
    },
  ];

  useEffect(() => {
    if (user) {
      api.get("/memories")
        .then((res) => {
          // Assuming res.data.memories is the array. 
          // Based on typical controller: res.status(200).json({ memories, count: ... })
          const images = res.data.memories?.flatMap((m: any) => m.images || []) || [];
          setUserImages(images);
        })
        .catch((err) => console.error("Failed to fetch memories for bubbles", err));
    }
  }, [user]);

  useEffect(() => {
    const word = "TrailTales";
    const animate = () => {
      setTypingText("");
      setTimeout(() => setTypingText(word), 100);
    };
    animate();
    const interval = setInterval(animate, word.length * 200 + 2000);
    return () => clearInterval(interval);
  }, []);

  const nextCard = () => setCurrentCard((prev: any) => (prev + 1) % cards.length);
  const prevCard = () =>
    setCurrentCard((prev: any) => (prev - 1 + cards.length) % cards.length);

  const renderTypingText = () => {
    if (!typingText) return null;
    return typingText.split("").map((letter: any, idx: any) => (
      <span
        key={idx}
        className="trail-letter"
        style={{ animationDelay: `${idx * 0.2}s` }}
      >
        {letter}
      </span>
    ));
  };

  return (
    <main className="hero-section">
      {/* Decorative Background Elements */}
      <div className="floating-elements">
        <div className="float-circle c-1"></div>
        <div className="float-circle c-2"></div>
        <div className="float-icon i-1">
          <i className="ph ph-map-pin-line"></i>
        </div>
        <div className="float-icon i-2">
          <i className="ph ph-compass"></i>
        </div>
      </div>

      <div className="content-box">
        <h4>
          <i className="ph ph-paper-plane-tilt"></i> Start your journey
        </h4>
        <div className="title-container">
          <h1>
            Welcome to <br />
            <span className="typing-text">{renderTypingText()}</span>
            <span className="cursor"></span>
          </h1>
        </div>
        <p>
          Pin your moments, share your adventures, and turn your travels into a
          timeless journal. Join a community of explorers today.
        </p>
        <button className="cta-btn" onClick={() => setDashboardOpen(true)}>
          Start Journaling <i className="ph ph-arrow-right"></i>
        </button>
      </div>

      <div className="carousel-container">
        {bubbles.map((bubble) => (
          <img 
            key={bubble.key} 
            src={bubble.img} 
            className="bubble-image" 
            style={bubble.style} 
            alt="" 
          />
        ))}
        <button id="prevBtn" className="nav-arrow" onClick={prevCard} aria-label="Previous image">
          <i className="ph ph-caret-left"></i>
        </button>
        <div className="card-stack">
          {cards.map((card: any, index: any) => (
            <div
              key={index}
              className={`card ${index === currentCard ? "active" : ""}`}
              role="group"
              aria-label={`Image of ${card.country}`}
            >
              <img 
                src={card.img} 
                alt={`Scenic view of ${card.country}`} 
                className="card-img"
                loading={index === 0 ? "eager" : "lazy"}
                width="2070"
                height="1380"
              />
              <div className="card-info">
                <span>{card.country}</span>
              </div>
            </div>
          ))}
        </div>
        <button id="nextBtn" className="nav-arrow" onClick={nextCard} aria-label="Next image">
          <i className="ph ph-caret-right"></i>
        </button>
      </div>
    </main>
  );
};

export default LandingSection;

