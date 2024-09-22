import { useState, useEffect } from 'react';
import Head from 'next/head';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/Home.module.css';

const emotions = [
  { emoji: '😊', name: 'Happy' },
  { emoji: '😢', name: 'Sad' },
  { emoji: '😠', name: 'Angry' },
  { emoji: '😴', name: 'Sleepy' },
  { emoji: '🤔', name: 'Thoughtful' },
  { emoji: '😍', name: 'In Love' },
];

export default function Home() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [feelingText, setFeelingText] = useState('');
  const [feelings, setFeelings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null); // 호버된 날짜 상태 추가
  const [hoveredEmotions, setHoveredEmotions] = useState([]); // 호버된 감정 상태 추가

  useEffect(() => {
    const storedFeelings = localStorage.getItem('feelings');
    if (storedFeelings) {
      setFeelings(JSON.parse(storedFeelings));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEmotion && feelingText.trim()) {
      const newFeeling = { 
        emotion: selectedEmotion, 
        text: feelingText, 
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      const updatedFeelings = [...feelings, newFeeling];
      setFeelings(updatedFeelings);
      localStorage.setItem('feelings', JSON.stringify(updatedFeelings));
      setSelectedEmotion(null);
      setFeelingText('');
    }
  };

  const getEmotionsForDate = (date) => {
    const dateString = date.toDateString();
    return feelings.filter(feeling => new Date(feeling.timestamp).toDateString() === dateString);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateEmotions = getEmotionsForDate(date);
      if (dateEmotions.length > 0) {
        return (
          <div 
            className={styles.calendarEmojis} 
            onMouseEnter={() => {
              setHoveredDate(date);
              setHoveredEmotions(dateEmotions); // 호버된 감정 설정
            }} 
            onMouseLeave={() => {
              setHoveredDate(null);
              setHoveredEmotions([]); // 호버 해제 시 감정 초기화
            }}
          >
            <span className={styles.calendarEmoji}>
              {dateEmotions[0].emotion.emoji} {/* 첫 번째 이모티콘만 표시 */}
            </span>
          </div>
        );
      }
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const selectedDateFeelings = getEmotionsForDate(selectedDate);

  // 캘린더의 타일에 호버 이벤트 추가
  const handleMouseEnter = (e) => {
    const hoverEmojis = e.currentTarget.querySelector(`.${styles.hoverEmojis}`);
    if (hoverEmojis) {
      hoverEmojis.style.display = 'block'; // 호버 시 이모티콘 표시
    }
  };

  const handleMouseLeave = (e) => {
    const hoverEmojis = e.currentTarget.querySelector(`.${styles.hoverEmojis}`);
    if (hoverEmojis) {
      hoverEmojis.style.display = 'none'; // 호버 해제 시 이모티콘 숨김
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>How do you feel today?</title>
      </Head>

      <header className={styles.header}>
        <img src="/logo.svg" alt="How We Feel Logo" className={styles.logo} />
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>How do you feel today?</h1>
        <p className={styles.guideText}>Choose your emotion:</p> {/* 안내 문구 추가 */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.emotionGrid}>
            {emotions.map((emotion) => (
              <button
                key={emotion.name}
                type="button"
                className={`${styles.emotionButton} ${selectedEmotion === emotion ? styles.selected : ''}`}
                onClick={() => setSelectedEmotion(emotion)}
              >
                <span className={styles.emoji}>{emotion.emoji}</span>
                <span className={styles.emotionName}>{emotion.name}</span>
              </button>
            ))}
          </div>
          <input
            type="text"
            value={feelingText}
            onChange={(e) => setFeelingText(e.target.value)}
            placeholder="Why do you feel this way?"
            className={styles.input}
          />
          <button type="submit" className={styles.submit} disabled={!selectedEmotion || !feelingText.trim()}>
            Share
          </button>
        </form>

        <div className={styles.calendarContainer}>
          <Calendar 
            onChange={handleDateChange} 
            value={selectedDate}
            tileContent={tileContent}
            // 일요일부터 시작하도록 설정
            locale="en-US" // 미국식 로케일 사용
          />
        </div>

        {selectedDateFeelings.length > 0 && (
          <div className={styles.feelingsList}>
            <h2>Feelings on {selectedDate.toDateString()}:</h2>
            <ul>
              {selectedDateFeelings.map((feeling) => (
                <li key={feeling.id}>
                  <span className={styles.emoji}>{feeling.emotion.emoji}</span>
                  <span className={styles.emotionName}>{feeling.emotion.name}:</span>
                  <span className={styles.feelingText}>{feeling.text}</span>
                  <span className={styles.timestamp}>
                    {new Date(feeling.timestamp).toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {hoveredDate && (
          <div className={styles.hoveredEmotionsContainer}>
            <h3>Feelings on {hoveredDate.toDateString()}:</h3>
            <div className={styles.hoverEmojis}>
              {hoveredEmotions.map((emotion, index) => (
                <span key={index} className={styles.calendarEmoji}>
                  {emotion.emotion.emoji}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
