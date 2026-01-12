import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-primary animate-bounce">
            🎨 Renkimo
          </h1>
          <p className="text-2xl font-semibold text-gray-700">
            Çocuklar İçin Tuval
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-lg text-gray-600 leading-relaxed">
            Çocuklarınızın hayal gücünü özgürce ifade edebileceği, özel olarak
            tasarlanmış küçük tuvallerle tanışın!
          </p>
          <p className="text-base text-gray-500">Her çocuk bir sanatçıdır ✨</p>
        </div>

        <button
          onClick={() => navigate("/tuval")}
          className="w-full bg-primary hover:bg-red-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform transition hover:scale-105 active:scale-95"
        >
          Ürünü İncele 🖌️
        </button>

        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-3xl mb-2">🎨</div>
            <p className="text-xs text-gray-600">Kaliteli Malzeme</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-3xl mb-2">👶</div>
            <p className="text-xs text-gray-600">Çocuk Dostu</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-3xl mb-2">🚚</div>
            <p className="text-xs text-gray-600">Hızlı Teslimat</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
