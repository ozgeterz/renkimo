import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import st3 from "../assets/st3.webp";

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
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              Renkimo
            </h1>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            Uyku Arkadaşı Ayıcık
          </p>
          <p className="text-lg text-gray-600 leading-relaxed italic">
            "Huzurlu uykular, mutlu sabahlar - Sevimli arkadaşıyla güvenli
            geceler"
          </p>

          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-300">
            <img
              src={st3}
              alt="Uyku Arkadaşı Ayıcık"
              className="w-full h-auto"
            />
          </div>
        </div>
        <button
          onClick={() => navigate("/ayicik")}
          className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold py-6 px-8 rounded-2xl text-2xl shadow-2xl transform transition hover:scale-110 active:scale-95 animate-pulse border-4 border-white"
          style={{ animationDuration: "1.5s" }}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl">🛒</span>
            <span>HEMEN SİPARİŞ VER</span>
            <span className="text-3xl">🎁</span>
          </div>
        </button>
        <div
          className={`space-y-6 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-xl shadow-lg border-2 border-orange-300">
            <div className="flex items-center justify-center gap-2 text-orange-800 font-bold">
              <span className="text-2xl">⚡</span>
              <p className="text-sm">ÖZEL KAMPANYA - SINIRLI STOK!</p>
              <span className="text-2xl">⚡</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl shadow-lg border-2 border-purple-300">
            <p className="text-lg font-semibold text-gray-800 mb-3">
              🌙 Huzurlu uykular için mükemmel arkadaş!
            </p>
            <p className="text-sm text-gray-600">
              Yumuşacık peluş, rahatlatıcı sesler ve yumuşak ışıkla çocuğunuz
              güvenle uyuyacak
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-pink-200">
              <div className="text-4xl mb-2 animate-bounce">🎵</div>
              <p className="text-xs font-bold text-gray-800">Sesli Özellik</p>
              <p className="text-xs text-gray-600 mt-1">Ninni melodileri</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-purple-200">
              <div
                className="text-4xl mb-2 animate-bounce"
                style={{ animationDelay: "0.1s" }}
              >
                💡
              </div>
              <p className="text-xs font-bold text-gray-800">Işıklı Özellik</p>
              <p className="text-xs text-gray-600 mt-1">Yumuşak ışık</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-blue-200">
              <div
                className="text-4xl mb-2 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                🧸
              </div>
              <p className="text-xs font-bold text-gray-800">Yumuşacık Peluş</p>
              <p className="text-xs text-gray-600 mt-1">Premium kalite</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-green-200">
              <div
                className="text-4xl mb-2 animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                🚀
              </div>
              <p className="text-xs font-bold text-gray-800">Aynı Gün Kargo</p>
              <p className="text-xs text-gray-600 mt-1">Hızlı teslimat</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-5 shadow-lg">
            <p className="text-sm font-bold text-yellow-800 mb-3 flex items-center justify-center gap-2">
              <span>⭐</span> Anne Babalar Ne Diyor? <span>⭐</span>
            </p>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-700 italic mb-2">
                  "Kızım ayıcığıyla çok daha rahat uyuyor. Ninni sesleri harika!
                  🌙"
                </p>
                <p className="text-xs text-gray-500 font-semibold">
                  - Ayşe H., İstanbul
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-700 italic mb-2">
                  "Oğlum artık tek başına uyuyor. Ayıcık onu çok rahatlatmış!
                  🧸"
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
