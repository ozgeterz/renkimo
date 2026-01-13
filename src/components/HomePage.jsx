import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function HomePage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 overflow-hidden">
      <div className="text-center space-y-8 max-w-md">
        <div
          className={`space-y-4 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <div className="relative">
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse">
              🎨 Renkimo
            </h1>
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full rotate-12 shadow-lg animate-bounce">
              YENİ! 🌟
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            Çocuğunuzun İlk Sanat Eseri
          </p>
          <p className="text-lg text-gray-600 leading-relaxed italic">
            "Her çocuk bir sanatçıdır, sorun büyüdükçe sanatçı olarak nasıl
            kalacağıdır."
          </p>
        </div>

        <div
          className={`space-y-6 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-5 rounded-2xl shadow-2xl border-4 border-yellow-300 animate-pulse">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-3xl">🎨</span>
              <p className="text-lg font-bold text-center">
                HEDİYE: 6 RENK BOYA SETİ!
              </p>
              <span className="text-3xl">🎁</span>
            </div>
            <div className="flex justify-center gap-2 mb-3">
              <span
                className="w-8 h-8 bg-red-500 rounded-full border-3 border-white shadow-lg animate-bounce"
                style={{ animationDelay: "0s" }}
              ></span>
              <span
                className="w-8 h-8 bg-blue-500 rounded-full border-3 border-white shadow-lg animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></span>
              <span
                className="w-8 h-8 bg-yellow-300 rounded-full border-3 border-white shadow-lg animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></span>
              <span
                className="w-8 h-8 bg-green-500 rounded-full border-3 border-white shadow-lg animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></span>
              <span
                className="w-8 h-8 bg-purple-500 rounded-full border-3 border-white shadow-lg animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></span>
              <span
                className="w-8 h-8 bg-orange-500 rounded-full border-3 border-white shadow-lg animate-bounce"
                style={{ animationDelay: "0.5s" }}
              ></span>
            </div>
            <p className="text-sm font-semibold text-center">
              Her tuval siparişinizle birlikte!
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl shadow-lg border-2 border-purple-300">
            <p className="text-lg font-semibold text-gray-800 mb-3">
              🌈 Hayal gücünü özgürce ifade etsin!
            </p>
            <p className="text-sm text-gray-600">
              Özel olarak çocuklar için tasarlanmış, kaliteli tuvallerle sanatın
              keyfini çıkarsın
            </p>
          </div>

          <button
            onClick={() => navigate("/tuval")}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold py-5 px-8 rounded-2xl text-xl shadow-2xl transform transition hover:scale-105 active:scale-95 animate-pulse"
          >
            🎁 Hemen Sipariş Ver 🖌️
          </button>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-pink-200">
              <div className="text-4xl mb-2 animate-bounce">🎨</div>
              <p className="text-xs font-bold text-gray-800">Premium Kalite</p>
              <p className="text-xs text-gray-600 mt-1">Profesyonel tuval</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-purple-200">
              <div
                className="text-4xl mb-2 animate-bounce"
                style={{ animationDelay: "0.1s" }}
              >
                👶
              </div>
              <p className="text-xs font-bold text-gray-800">Çocuk Dostu</p>
              <p className="text-xs text-gray-600 mt-1">Güvenli malzeme</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-blue-200">
              <div
                className="text-4xl mb-2 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                🚚
              </div>
              <p className="text-xs font-bold text-gray-800">Hızlı Kargo</p>
              <p className="text-xs text-gray-600 mt-1">2-3 gün teslimat</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-green-200">
              <div
                className="text-4xl mb-2 animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                🎁
              </div>
              <p className="text-xs font-bold text-gray-800">6 Renk Boya</p>
              <p className="text-xs text-gray-600 mt-1">Hediye!</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-5 shadow-lg">
            <p className="text-sm font-bold text-yellow-800 mb-3 flex items-center justify-center gap-2">
              <span>⭐</span> Anne Babalar Ne Diyor? <span>⭐</span>
            </p>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-700 italic mb-2">
                  "Oğlum ilk tuvalini görünce çok heyecanlandı! Boyalarla
                  saatlerce oynuyor 🎨"
                </p>
                <p className="text-xs text-gray-500 font-semibold">
                  - Ayşe H., İstanbul
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-700 italic mb-2">
                  "Kızımın yaratıcılığı inanılmaz gelişti. Her gün yeni bir şey
                  çiziyor! 🌈"
                </p>
                <p className="text-xs text-gray-500 font-semibold">
                  - Mehmet K., Ankara
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
