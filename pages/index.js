import { useState, useEffect } from 'react';
import Head from 'next/head';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/Home.module.css';

const emotions = [
  { emoji: '😠', name: 'Angry', color: 'red' },
  { emoji: '😢', name: 'Sad', color: 'red' },
  { emoji: '😞', name: 'Disappointed', color: 'red' },
  { emoji: '😨', name: 'Fearful', color: 'red' },
  { emoji: '😒', name: 'Jealous', color: 'red' },
  { emoji: '😔', name: 'Lonely', color: 'red' },
  { emoji: '😟', name: 'Anxious', color: 'red' },
  { emoji: '😕', name: 'Confused', color: 'red' },
  { emoji: '😩', name: 'Frustrated', color: 'red' },
  { emoji: '😣', name: 'Pain', color: 'red' },
  { emoji: '😓', name: 'Loss', color: 'red' },
  { emoji: '😤', name: 'Dissatisfied', color: 'red' },
  { emoji: '😩', name: 'Depressed', color: 'red' },
  { emoji: '😖', name: 'Displeased', color: 'red' },
  { emoji: '😬', name: 'Tense', color: 'red' },
  { emoji: '😩', name: 'Powerless', color: 'red' },
  { emoji: '😞', name: 'Isolated', color: 'red' },
  { emoji: '😠', name: 'Distrustful', color: 'red' },
  { emoji: '😔', name: 'Unhappy', color: 'red' },
  { emoji: '😩', name: 'Depression', color: 'red' },
  { emoji: '😟', name: 'Unstable', color: 'red' },
  { emoji: '😢', name: 'Suffering', color: 'red' },
  { emoji: '😩', name: 'Unsatisfied', color: 'red' },

  { emoji: '😊', name: 'Happy', color: 'yellow' },
  { emoji: '😁', name: 'Joyful', color: 'yellow' },
  { emoji: '😍', name: 'Loving', color: 'yellow' },
  { emoji: '😄', name: 'Excited', color: 'yellow' },
  { emoji: '🙏', name: 'Grateful', color: 'yellow' },
  { emoji: '😌', name: 'Proud', color: 'yellow' },
  { emoji: '🌈', name: 'Hopeful', color: 'yellow' },
  { emoji: '😃', name: 'Content', color: 'yellow' },
  { emoji: '😎', name: 'Confident', color: 'yellow' },
  { emoji: '😇', name: 'Comfortable', color: 'yellow' },
  { emoji: '🤗', name: 'Friendly', color: 'yellow' },
  { emoji: '🎉', name: 'Delighted', color: 'yellow' },
  { emoji: '🌟', name: 'Positive', color: 'yellow' },
  { emoji: '💡', name: 'Creative', color: 'yellow' },
  { emoji: '🔥', name: 'Motivated', color: 'yellow' },
  { emoji: '💖', name: 'Passionate', color: 'yellow' },
  { emoji: '🛡️', name: 'Safe', color: 'yellow' },
  { emoji: '🤝', name: 'Trusting', color: 'yellow' },
  { emoji: '💞', name: 'Kind', color: 'yellow' },
  { emoji: '😌', name: 'Moved', color: 'yellow' },
  { emoji: '😃', name: 'Good Mood', color: 'yellow' },
  { emoji: '🌞', name: 'Refreshing', color: 'yellow' },
  { emoji: '😄', name: 'Feeling Good', color: 'yellow' },
  { emoji: '😌', name: 'Feeling Bad', color: 'yellow' },

  { emoji: '😐', name: 'Calm', color: 'green' },
  { emoji: '😌', name: 'Relaxed', color: 'green' },
  { emoji: '🟢', name: 'Stable', color: 'green' },
  { emoji: '😶', name: 'Indifferent', color: 'green' },
  { emoji: '😕', name: 'Confused', color: 'green' },
  { emoji: '😴', name: 'Tired', color: 'green' },
  { emoji: '😴', name: 'Bored', color: 'green' },
  { emoji: '😐', name: 'Neutral', color: 'green' },
  { emoji: '😩', name: 'Listless', color: 'green' },
  { emoji: '😔', name: 'Alienated', color: 'green' },
  { emoji: '😞', name: 'Isolated', color: 'green' },
  { emoji: '😐', name: 'Apathetic', color: 'green' },
  { emoji: '😕', name: 'Uncertain', color: 'green' },
  { emoji: '😟', name: 'Unsteady', color: 'green' },
  { emoji: '😩', name: 'Weak', color: 'green' },
  { emoji: '😴', name: 'Fatigued', color: 'green' },
  { emoji: '😐', name: 'Lethargic', color: 'green' },
  { emoji: '😴', name: 'Weary', color: 'green' },
  { emoji: '😩', name: 'Worn Out', color: 'green' },
  { emoji: '😐', name: 'Disinterested', color: 'green' },
  { emoji: '😕', name: 'Bewildered', color: 'green' },
  { emoji: '😴', name: 'Exhausted', color: 'green' },
  { emoji: '😐', name: 'Dispassionate', color: 'green' },

  { emoji: '😞', name: 'Depressed', color: 'blue' },
  { emoji: '😢', name: 'Sad', color: 'blue' },
  { emoji: '😔', name: 'Lonely', color: 'blue' },
  { emoji: '😩', name: 'Powerless', color: 'blue' },
  { emoji: '😟', name: 'Anxious', color: 'blue' },
  { emoji: '😣', name: 'Pain', color: 'blue' },
  { emoji: '😓', name: 'Loss', color: 'blue' },
  { emoji: '😩', name: 'Unhappy', color: 'blue' },
  { emoji: '😠', name: 'Dissatisfied', color: 'blue' },
  { emoji: '😩', name: 'Depression', color: 'blue' },
  { emoji: '😟', name: 'Unstable', color: 'blue' },
  { emoji: '😔', name: 'Isolated', color: 'blue' },
  { emoji: '😩', name: 'Listless', color: 'blue' },
  { emoji: '😞', name: 'Exhausted', color: 'blue' },
  { emoji: '😩', name: 'Fatigued', color: 'blue' },
  { emoji: '😐', name: 'Disinterested', color: 'blue' },
  { emoji: '😕', name: 'Bewildered', color: 'blue' },
  { emoji: '😴', name: 'Worn Out', color: 'blue' },
  { emoji: '😩', name: 'Displeased', color: 'blue' },
  { emoji: '😠', name: 'Frustrated', color: 'blue' },
  { emoji: '😟', name: 'Nervous', color: 'blue' },
  { emoji: '😩', name: 'Suffering', color: 'blue' },
  { emoji: '😩', name: 'Unsatisfied', color: 'blue' },
];

const categories = {
  negative: emotions.filter(emotion => emotion.color === 'red'),
  positive: emotions.filter(emotion => emotion.color === 'yellow'),
  neutral: emotions.filter(emotion => emotion.color === 'green'),
  lowEnergy: emotions.filter(emotion => emotion.color === 'blue'),
};

export default function Home() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [feelingText, setFeelingText] = useState('');
  const [feelings, setFeelings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null); // 호버된 날짜 상태 추가
  const [hoveredEmotions, setHoveredEmotions] = useState([]); // 호버된 감정 상태 추가
  const [selectedCategory, setSelectedCategory] = useState('positive');

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
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <title>How do you feel today?</title>
      </Head>

      <header className={styles.header}>
        <img src="/logo.svg" alt="How We Feel Logo" className={styles.logo} />
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>How do you feel today?</h1>
        <p className={styles.guideText}>Choose your emotion:</p> {/* 안내 문구 추가 */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <select className={styles.moodAreaSelect} onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
            <option value="neutral">Neutral</option>
            <option value="lowEnergy">Low Energy</option>
          </select>
          <div className={styles.emotionGrid}>
            {categories[selectedCategory].map((emotion) => (
              <button
                key={emotion.name}
                type="button"
                className={`${styles.emotionButton} ${selectedEmotion === emotion ? styles.selected : ''}`}
                onClick={() => setSelectedEmotion(emotion)}
                style={{ backgroundColor: emotion.color }} // 감정의 색상으로 배경색 설정
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
