import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Check,
  ChevronRight,
  BookOpen,
  Award,
  Clock,
  Layers,
  HelpCircle,
  Send,
  UserCheck,
  CheckCheck,
  AlertCircle
} from 'lucide-react';
import { QUESTIONS, Question } from './data/questions';

type Screen = 'name_selection' | 'quiz' | 'results';

export default function App() {
  const [screen, setScreen] = useState<Screen>('name_selection');
  const [selectedName, setSelectedName] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [filterResult, setFilterResult] = useState<'all' | 'correct' | 'wrong'>('all');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const hasSentReport = useRef<boolean>(false);

  // Timer for quiz duration
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (screen === 'quiz' && startTime) {
      timer = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [screen, startTime]);

  // Trigger webhook and confetti upon reaching results
  useEffect(() => {
    if (screen === 'results' && !hasSentReport.current) {
      hasSentReport.current = true;
      const correctCount = QUESTIONS.filter(q => answers[q.cau] === q.dapAn).length;

      // Confetti celebration
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ec4899']
        });
      } catch (e) {
        console.log("Confetti trigger skipped:", e);
      }

      // POST to Google Sheet & Telegram Webhook
      const payload = {
        ten: selectedName || "Như Quỳnh",
        lop: "9",
        diem: correctCount,
        tongCau: QUESTIONS.length,
        url: window.location.href,
      };

      const webhookUrl = 'https://script.google.com/macros/s/AKfycbw00EtPyhylfx8ZUg3o7CFvc5g44RK17byvTJqy8kMY6grcfIVpTAT7Enu9NenGnBFR/exec';

      // Send webhook without blocking UI
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        mode: 'no-cors', // ensures network request passes through Google Apps Script redirect without throwing CORS block
      })
        .then(() => {
          console.log('Kết quả đã được gửi thành công về Google Sheet & Telegram:', payload);
        })
        .catch((err) => {
          console.error('Lỗi khi gửi kết quả về Google Sheet:', err);
        });
    }
  }, [screen, answers, selectedName]);

  const handleStartQuiz = () => {
    if (!selectedName) return;
    setScreen('quiz');
    setCurrentIndex(0);
    setAnswers({});
    setStartTime(Date.now());
    setElapsedSeconds(0);
    hasSentReport.current = false;
  };

  const handleSelectOption = (cau: number, option: 'A' | 'B' | 'C' | 'D') => {
    setAnswers(prev => ({
      ...prev,
      [cau]: option,
    }));
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Check if some questions are unanswered
      const answeredCount = Object.keys(answers).length;
      if (answeredCount < QUESTIONS.length) {
        setShowConfirmModal(true);
      } else {
        submitQuiz();
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const submitQuiz = () => {
    setShowConfirmModal(false);
    setScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setScreen('name_selection');
    setSelectedName('');
    setAnswers({});
    setCurrentIndex(0);
    hasSentReport.current = false;
    setFilterResult('all');
    setElapsedSeconds(0);
    setStartTime(null);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}p ${remainderSecs < 10 ? '0' : ''}${remainderSecs}s`;
  };

  // Helper to render question text with bold English word highlighted
  const renderQuestionText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
      <span className="leading-relaxed">
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const word = part.slice(2, -2);
            return (
              <span
                key={i}
                className="inline-block mx-1 px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-800 font-extrabold text-base sm:text-lg border border-indigo-300 shadow-xs"
              >
                {word}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </span>
    );
  };

  const currentQ = QUESTIONS[currentIndex];
  const answeredTotal = Object.keys(answers).length;
  const currentAnswer = answers[currentQ?.cau];
  const correctTotal = QUESTIONS.filter(q => answers[q.cau] === q.dapAn).length;

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-indigo-100/80 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 text-white flex items-center justify-center shadow-md shadow-indigo-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                Tiếng Anh Lớp 9 Ôn Thi Vào 10
              </h1>
              <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 inline" /> 40 Câu Trắc Nghiệm Từ Vựng Trọng Tâm
              </p>
            </div>
          </div>

          {selectedName && (
            <div className="flex items-center gap-2 bg-indigo-50/90 border border-indigo-200/80 px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="hidden sm:inline">Học sinh:</span>
              <span className="text-indigo-900">{selectedName}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col justify-center">
        {/* ============================================================ */}
        {/* 1. MÀN HÌNH CHỌN TÊN */}
        {/* ============================================================ */}
        {screen === 'name_selection' && (
          <div className="my-auto py-6 sm:py-10 max-w-lg mx-auto w-full">
            <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-xl shadow-indigo-100/50 border border-indigo-100 text-center relative overflow-hidden">
              {/* Decorative background blobs */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-200/40 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-indigo-200/40 rounded-full blur-2xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 text-white shadow-lg shadow-indigo-200 mb-5 transform transition hover:scale-105 duration-300">
                  <BookOpen className="w-10 h-10" />
                </div>

                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-100 text-amber-800 mb-2">
                  Luyện Tập Từ Vựng 2026
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
                  Chào mừng em đến với bài tập!
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
                  Bộ 40 câu hỏi trắc nghiệm từ vựng tiếng Anh theo ngữ cảnh thực tế, giúp em tự tin bứt phá điểm số thi vào lớp 10!
                </p>

                {/* Form chọn tên */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 mb-6 text-left">
                  <label htmlFor="student-name" className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-indigo-600" />
                    Chọn tên của em <span className="text-rose-500">*</span>
                  </label>

                  <div className="relative">
                    <select
                      id="student-name"
                      value={selectedName}
                      onChange={(e) => setSelectedName(e.target.value)}
                      className="w-full appearance-none bg-white text-slate-800 text-base font-semibold py-3.5 px-4 pr-10 rounded-xl border-2 border-indigo-200 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all cursor-pointer shadow-xs"
                    >
                      <option value="">-- Chọn tên của em --</option>
                      <option value="Như Quỳnh">Như Quỳnh</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-indigo-600">
                      <ChevronRight className="w-5 h-5 transform rotate-90" />
                    </div>
                  </div>

                  {!selectedName && (
                    <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Vui lòng chọn tên để mở nút bắt đầu làm bài.
                    </p>
                  )}
                </div>

                {/* Nút bắt đầu */}
                <button
                  onClick={handleStartQuiz}
                  disabled={!selectedName}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
                    selectedName
                      ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-700 hover:to-sky-600 text-white shadow-indigo-300 hover:shadow-indigo-400 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  <span>Bắt đầu làm bài</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-slate-500 pt-5 border-t border-slate-100">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-slate-700 text-sm">40</span>
                    <span>Câu trắc nghiệm</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-slate-200">
                    <span className="font-bold text-slate-700 text-sm">A / B / C / D</span>
                    <span>Nghĩa từ vựng</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-slate-700 text-sm">Tự động</span>
                    <span>Chấm điểm ngay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. MÀN HÌNH LÀM BÀI */}
        {/* ============================================================ */}
        {screen === 'quiz' && currentQ && (
          <div className="py-2 sm:py-4">
            {/* Thanh tiến trình & Header bài thi */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-indigo-100 mb-4 sm:mb-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-extrabold flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    Câu {currentQ.cau} / {QUESTIONS.length}
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    (Đã làm: {answeredTotal}/{QUESTIONS.length})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{formatTime(elapsedSeconds)}</span>
                  </div>

                  <button
                    onClick={() => setDrawerOpen(!drawerOpen)}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 transition flex items-center gap-1"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Danh sách câu</span>
                    <span className="sm:hidden">{answeredTotal}/40</span>
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${(currentQ.cau / QUESTIONS.length) * 100}%` }}
                ></div>
              </div>

              {/* Collapsible question jump drawer */}
              {drawerOpen && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-slate-700">Chọn nhanh câu hỏi:</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span> Đã chọn
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-200 inline-block"></span> Chưa chọn
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-200">
                    {QUESTIONS.map((q, idx) => {
                      const isAnswered = !!answers[q.cau];
                      const isCurrent = idx === currentIndex;
                      return (
                        <button
                          key={q.cau}
                          onClick={() => {
                            setCurrentIndex(idx);
                            setDrawerOpen(false);
                          }}
                          className={`h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                            isCurrent
                              ? 'ring-2 ring-indigo-600 bg-indigo-600 text-white'
                              : isAnswered
                              ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {q.cau}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Khung Câu Hỏi */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-lg shadow-indigo-100/50 border border-indigo-100 mb-6">
              <div className="text-xs font-bold tracking-wider text-indigo-600 uppercase mb-2 flex items-center gap-1">
                <span>Câu chuyện & Ngữ cảnh</span>
              </div>

              <div className="text-base sm:text-xl font-medium text-slate-800 mb-6 sm:mb-8 leading-relaxed sm:leading-relaxed bg-amber-50/40 p-4 sm:p-5 rounded-2xl border border-amber-200/60">
                {renderQuestionText(currentQ.hoi)}
              </div>

              {/* 4 Lựa chọn A, B, C, D */}
              <div className="space-y-3">
                {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                  const isSelected = currentAnswer === opt;
                  const optText = currentQ[opt];

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(currentQ.cau, opt)}
                      className={`w-full p-4 sm:p-4.5 rounded-2xl text-left transition-all duration-200 flex items-center justify-between border-2 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/90 text-indigo-950 shadow-md ring-2 ring-indigo-300/60 -translate-y-0.5'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50/80'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 pr-2">
                        <span
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-extrabold text-sm sm:text-base shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {opt}
                        </span>
                        <span className="text-sm sm:text-base font-semibold leading-snug">
                          {optText}
                        </span>
                      </div>

                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-300 bg-transparent'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Thanh điều hướng: Câu trước / Câu tiếp theo / Nộp bài */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`py-3.5 px-5 sm:px-6 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 border transition ${
                  currentIndex === 0
                    ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:scale-95 cursor-pointer shadow-xs'
                }`}
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Câu trước</span>
              </button>

              <div className="text-xs text-slate-400 font-medium hidden sm:block">
                Nhấn chọn 1 đáp án để tiếp tục
              </div>

              {currentIndex < QUESTIONS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="py-3.5 px-6 sm:px-8 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 text-white shadow-md shadow-indigo-200 active:scale-95 transition cursor-pointer"
                >
                  <span>Câu tiếp theo</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="py-3.5 px-6 sm:px-8 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-lg shadow-emerald-200 active:scale-95 transition cursor-pointer"
                >
                  <span>Nộp bài</span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Modal Xác Nhận Nộp Bài Nếu Chưa Làm Hết */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in duration-200">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Em còn câu hỏi chưa chọn đáp án!
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Em đã trả lời <strong className="text-indigo-600">{answeredTotal}</strong> trên tổng số{' '}
                <strong className="text-slate-800">{QUESTIONS.length}</strong> câu (còn{' '}
                <strong className="text-rose-600">{QUESTIONS.length - answeredTotal}</strong> câu chưa chọn).
                Em có chắc chắn muốn nộp bài luôn không?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="py-3 px-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition"
                >
                  Làm tiếp
                </button>
                <button
                  onClick={submitQuiz}
                  className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-200 transition"
                >
                  Nộp bài luôn
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. MÀN HÌNH KẾT QUẢ */}
        {/* ============================================================ */}
        {screen === 'results' && (
          <div className="py-4 sm:py-6">
            {/* Thẻ vinh danh kết quả */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-100/50 border border-indigo-100 text-center relative overflow-hidden mb-6">
              <div className="absolute -top-14 -right-14 w-36 h-36 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-14 -left-14 w-36 h-36 bg-indigo-200/40 rounded-full blur-2xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-white shadow-lg shadow-amber-200 mb-4">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>

                <div className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-2">
                  Kết quả ôn tập môn Tiếng Anh Lớp 9
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-1">
                  Chúc mừng {selectedName || "em"} đã hoàn thành bài thi!
                </h2>

                <p className="text-slate-500 text-sm mb-6">
                  {correctTotal >= 35
                    ? 'Thành tích xuất sắc! Em nắm rất vững từ vựng lớp 9, giữ vững phong độ này nhé! 🌟'
                    : correctTotal >= 25
                    ? 'Kết quả rất tốt! Hãy xem lại các câu sai bên dưới để hoàn thiện hơn nữa nhé! 👏'
                    : 'Em hãy ôn lại các từ vựng này và thử làm lại một lần nữa để đạt điểm cao hơn nhé! 💪'}
                </p>

                {/* Điểm số chính */}
                <div className="max-w-md mx-auto bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50 rounded-2xl p-5 sm:p-6 border-2 border-indigo-200/80 shadow-inner mb-6">
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-500 block mb-1">
                    Tổng kết điểm số
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-indigo-900 mb-2">
                    Em đúng {correctTotal}/40 câu
                  </div>
                  <div className="text-sm font-semibold text-slate-600">
                    Tỷ lệ chính xác: <span className="text-emerald-600 font-extrabold">{((correctTotal / 40) * 100).toFixed(0)}%</span>
                  </div>
                </div>

                {/* Thống kê chi tiết */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto mb-6 text-center">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="text-emerald-700 font-bold text-lg sm:text-xl">{correctTotal}</div>
                    <div className="text-xs text-emerald-600 font-medium">Câu đúng</div>
                  </div>
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                    <div className="text-rose-700 font-bold text-lg sm:text-xl">{40 - correctTotal}</div>
                    <div className="text-xs text-rose-600 font-medium">Câu sai / Bỏ</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-slate-700 font-bold text-lg sm:text-xl">{formatTime(elapsedSeconds)}</div>
                    <div className="text-xs text-slate-500 font-medium">Thời gian</div>
                  </div>
                </div>

                {/* Nút hành động */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleRestart}
                    className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Làm lại từ đầu</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Chi tiết từng câu hỏi & đáp án */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <CheckCheck className="w-5 h-5 text-indigo-600" />
                    Xem lại chi tiết bài làm
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Đối chiếu câu trả lời của em với đáp án chính xác
                  </p>
                </div>

                {/* Bộ lọc xem kết quả */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
                  <button
                    onClick={() => setFilterResult('all')}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      filterResult === 'all'
                        ? 'bg-white text-slate-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tất cả (40)
                  </button>
                  <button
                    onClick={() => setFilterResult('correct')}
                    className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                      filterResult === 'correct'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    Đúng ({correctTotal})
                  </button>
                  <button
                    onClick={() => setFilterResult('wrong')}
                    className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                      filterResult === 'wrong'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-rose-700 hover:bg-rose-50'
                    }`}
                  >
                    Sai ({40 - correctTotal})
                  </button>
                </div>
              </div>

              {/* Danh sách các câu */}
              <div className="space-y-4">
                {QUESTIONS.filter((q) => {
                  const isCorrect = answers[q.cau] === q.dapAn;
                  if (filterResult === 'correct') return isCorrect;
                  if (filterResult === 'wrong') return !isCorrect;
                  return true;
                }).map((q) => {
                  const myAnswer = answers[q.cau];
                  const isCorrect = myAnswer === q.dapAn;

                  return (
                    <div
                      key={q.cau}
                      className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                        isCorrect
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-rose-50/30 border-rose-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center ${
                              isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-rose-600 text-white'
                            }`}
                          >
                            {q.cau}
                          </span>
                          <span className="text-xs font-bold text-slate-500">
                            Câu số {q.cau}
                          </span>
                        </div>

                        <div>
                          {isCorrect ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Đúng
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                              <XCircle className="w-4 h-4 text-rose-600" /> Chưa đúng
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-slate-800 text-sm sm:text-base font-medium mb-3">
                        {renderQuestionText(q.hoi)}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                        <div
                          className={`p-2.5 rounded-xl border flex items-center justify-between ${
                            myAnswer
                              ? isCorrect
                                ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900 font-semibold'
                                : 'bg-rose-100/70 border-rose-300 text-rose-900 font-semibold'
                              : 'bg-slate-100 border-slate-200 text-slate-500 italic'
                          }`}
                        >
                          <div>
                            <span className="text-[11px] block text-slate-500 font-normal">
                              Lựa chọn của em:
                            </span>
                            {myAnswer ? (
                              <span>
                                <strong>{myAnswer}.</strong> {q[myAnswer]}
                              </span>
                            ) : (
                              'Chưa trả lời'
                            )}
                          </div>
                          {myAnswer && (
                            isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )
                          )}
                        </div>

                        <div className="p-2.5 rounded-xl border bg-emerald-100/80 border-emerald-300 text-emerald-900 font-semibold flex items-center justify-between">
                          <div>
                            <span className="text-[11px] block text-emerald-700 font-normal">
                              Đáp án chính xác:
                            </span>
                            <span>
                              <strong>{q.dapAn}.</strong> {q[q.dapAn]}
                            </span>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-xs text-slate-500 border-t border-indigo-100/60 bg-white/60 backdrop-blur-xs">
        <p className="font-medium">
          Ứng dụng ôn thi vào lớp 10 môn Tiếng Anh • Từ vựng theo ngữ cảnh thực tế
        </p>
      </footer>
    </div>
  );
}
