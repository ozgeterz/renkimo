import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { citiesAndDistricts } from "../data/citiesAndDistricts";
import st1 from "../assets/st1.webp";
import st2 from "../assets/st2.webp";
import st3 from "../assets/st3.webp";
import gm2 from "../assets/gm2.webp";
import gm3 from "../assets/gm3.webp";
import gm4 from "../assets/gm4.webp";
const cities = Object.keys(citiesAndDistricts);

const productVariants = [
  { id: "blue-stitch", name: "Mavi Stitch", image: gm3 },
  { id: "pink-bear", name: "Pembe Ayıcık", image: gm2 },
  { id: "pink-stitch", name: "Pembe Stitch", image: gm4 },
];

const getTotalPrice = (productCount) => {
  if (productCount === 1) return 1499;
  if (productCount === 2) return 2499;
  if (productCount === 3) return 3299;
  return productCount * 1499; // Fallback for more than 3
};

const getOriginalTotalPrice = (productCount) => {
  return productCount * 1999; // Original price per product
};

function ProductPage() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    district: "",
    address: "",
    paymentMethod: "cash",
    selectedProducts: [],
  });
  const [districts, setDistricts] = useState([]);
  const productImages = [st1, st2, st3];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const formatPhoneNumber = (value) => {
    let cleaned = value.replace(/\D/g, "");

    if (cleaned.startsWith("90")) {
      cleaned = cleaned.slice(2);
    }

    if (cleaned.startsWith("0")) {
      cleaned = cleaned.slice(1);
    }

    if (cleaned.length === 0) {
      return "+90 ";
    } else if (cleaned.length <= 3) {
      return `+90 ${cleaned}`;
    } else if (cleaned.length <= 6) {
      return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length <= 8) {
      return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
        6
      )}`;
    } else {
      return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
        6,
        8
      )} ${cleaned.slice(8, 10)}`;
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "city") {
      setFormData((prev) => ({ ...prev, [name]: value, district: "" }));
      setDistricts(citiesAndDistricts[value] || []);
    } else if (name === "phone") {
      const formatted = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else if (name === "productVariant") {
      setFormData((prev) => {
        let newSelected = [...prev.selectedProducts];
        if (checked) {
          if (!newSelected.includes(value)) {
            newSelected.push(value);
          }
        } else {
          newSelected = newSelected.filter((id) => id !== value);
        }
        return { ...prev, selectedProducts: newSelected };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formId = import.meta.env.VITE_GOOGLE_FORM_ID_AYI;
    if (!formId) return;
    console.log(formId);
    const baseUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

    const selectedProductNames = formData.selectedProducts
      .map((id) => productVariants.find((v) => v.id === id)?.name)
      .filter(Boolean)
      .join(" + ");

    const paymentMethodText =
      formData.paymentMethod === "cash" ? "Kapıda Nakit" : "Kapıda Kart";

    const body = new URLSearchParams({
      "entry.2043686489": formData.fullName,
      "entry.2028768623": formData.phone,
      "entry.771023585": formData.city,
      "entry.1526543336": formData.district,
      "entry.1955750203": formData.address,
      "entry.1839909422": `${selectedProductNames}`,
      "entry.457560409": paymentMethodText,
    });

    fetch(baseUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body,
    }).catch((err) => {
      console.error("Google Forms gönderim hatası:", err);
    });
    navigate("/tesekkurler");
  };

  const totalPrice = getTotalPrice(formData.selectedProducts.length);
  const totalOriginalPrice = getOriginalTotalPrice(
    formData.selectedProducts.length
  );
  const handlePageClick = () => {
    if (formRef.current) {
      const elementPosition = formRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - window.innerHeight / 2 + 290;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 w-full max-w-[390px] mx-auto">
      <div className="max-w-md ">
        <div className="bg-white shadow-xl">
          <div className="p-6 pb-0">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-2 px-4 rounded-full mb-4 animate-pulse">
              <p className="text-sm font-bold">
                ⚡ ÖZEL KAMPANYA - SINIRLI STOK! ⚡
              </p>
            </div>
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
              🧸 Uyku Arkadaşı Ayıcık
            </h1>
            <p className="text-center text-gray-700 font-semibold mb-2">
              Sesli ve Işıklı - Huzurlu Uykular İçin
            </p>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="text-sm text-gray-600 font-semibold">
                (500+ Mutlu Aile)
              </span>
            </div>
            <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-center py-2 px-4 rounded-lg mb-4 shadow-md animate-pulse">
              <p className="text-sm font-bold">
                � AYNI GÜN KARGOYA VERİLİR! ⚡
              </p>
            </div>
          </div>

          <div className="w-full leading-[0]" onClick={handlePageClick}>
            {productImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Ayıcık Görsel ${index + 1}`}
                className="w-full block h-auto"
              />
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 mt-0 border-t-4 border-purple-400">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl p-4 mb-4 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl">🎵</span>
                <h3 className="font-bold text-lg">SESLİ VE IŞIKLI ÖZELLIK!</h3>
                <span className="text-3xl">💡</span>
              </div>
              <div className="flex justify-center gap-3 mb-2">
                <span className="text-2xl">🎶</span>
                <span className="text-2xl">💤</span>
                <span className="text-2xl">✨</span>
                <span className="text-2xl">🌙</span>
              </div>
              <p className="text-center text-sm font-semibold">
                Rahatlatıcı sesler ve yumuşak ışıkla huzurlu uykular!
              </p>
            </div>

            <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
              <span className="text-2xl">✨</span> Neden Uyku Arkadaşı Ayıcık?
            </h3>
            <ul className="text-sm text-gray-700 space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span>
                  <strong>Sesli ve ışıklı özellik</strong> - Rahatlatıcı ninni
                  melodileri ve yumuşak ışık
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span>
                  <strong>Yumuşacık peluş</strong> - Premium kalite,
                  hipoalerjenik kumaş
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span>
                  <strong>Güvenli ve dayanıklı</strong> - CE sertifikalı,
                  yıkanabilir
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span>
                  <strong>Huzurlu uyku</strong> - Çocuğunuzun en iyi arkadaşı
                </span>
              </li>
            </ul>
            <div className="mt-4 bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300 rounded-lg p-4 shadow-md">
              <p className="text-sm text-gray-800 font-bold text-center mb-2">
                🎁 Çocuğunuza en güzel hediye!
              </p>
              <p className="text-xs text-gray-700 text-center">
                Rahat uyku, mutlu sabahlar! Sevimli arkadaşıyla huzurlu geceler
                🌙
              </p>
            </div>
          </div>
        </div>

        <div
          ref={formRef}
          className="bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 rounded-b-2xl shadow-xl p-6 border-t-4 border-purple-500"
        >
          <div className="bg-white rounded-xl p-4 mb-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              🎉 Hemen Sipariş Ver!
            </h2>
            <p className="text-sm text-gray-600 text-center">
              Çocuğunuzun yüzündeki mutluluğu görmek sadece birkaç adım uzakta
            </p>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                🔒 Güvenli
              </span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                📦 Hızlı Kargo
              </span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
                💯 Garantili
              </span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Adınız ve Soyadınız"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Telefon
              </label>
              <div className="flex items-center w-full border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-purple-400">
                <span className="bg-gray-100 px-4 py-3 text-gray-600 font-medium select-none">
                  +90
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone.replace("+90 ", "")}
                  onChange={handleChange}
                  required
                  className="flex-1 px-2 py-3 text-gray-800 focus:outline-none"
                  placeholder="5XX XXX XX XX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İl
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none bg-white appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                <option value="">İl Seçiniz</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İlçe
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                disabled={!formData.city}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none bg-white appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                <option value="">İlçe Seçiniz</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adres
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                placeholder="Açık adresiniz"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ürün Seçimi <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {productVariants.map((variant) => (
                  <label
                    key={variant.id}
                    className={`cursor-pointer border-3 rounded-xl overflow-hidden transition-all ${
                      formData.selectedProducts.includes(variant.id)
                        ? "border-purple-500 ring-4 ring-purple-200 shadow-xl scale-105"
                        : "border-gray-300 hover:border-purple-300 hover:shadow-lg"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="productVariant"
                      value={variant.id}
                      checked={formData.selectedProducts.includes(variant.id)}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className="relative">
                      <img
                        src={variant.image}
                        alt={variant.name}
                        className="w-full h-24 object-cover"
                      />
                      {formData.selectedProducts.includes(variant.id) && (
                        <div className="absolute top-1 right-1 bg-purple-500 text-white rounded-full p-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div
                      className={`p-2 text-center ${
                        formData.selectedProducts.includes(variant.id)
                          ? "bg-purple-50 font-bold text-purple-700"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      <p className="text-xs">{variant.name}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {formData.selectedProducts.length > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  🛒 Sepetiniz
                </h3>

                <div className="space-y-3 mb-4">
                  {formData.selectedProducts.map((productId) => {
                    const variant = productVariants.find(
                      (v) => v.id === productId
                    );
                    return (
                      <div
                        key={productId}
                        className="bg-white rounded-xl p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={variant?.image}
                            alt={variant?.name}
                            className="w-16 h-16 rounded-lg object-cover border-2 border-purple-200"
                          />
                          <div>
                            <p className="font-bold text-gray-800">
                              {variant?.name}
                            </p>
                            <p className="text-xs text-gray-500">1 Adet</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-green-600 text-sm font-semibold">
                            ✓ Seçildi
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-white rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Ara Toplam ({formData.selectedProducts.length} ürün)
                    </span>
                    <span className="font-semibold">{totalPrice} TL</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kargo</span>
                    <span className="font-bold text-green-600">
                      ÜCRETSİZ 🎁
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-red-500">
                    <span>İndirim</span>
                    <span className="font-semibold">
                      -{totalOriginalPrice - totalPrice} TL
                    </span>
                  </div>
                  <div className="border-t-2 border-purple-200 pt-3 flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-800">
                      Toplam
                    </span>
                    <div className="text-right">
                      <p className="text-sm text-gray-400 line-through">
                        {totalOriginalPrice} TL
                      </p>
                      <p className="font-bold text-2xl text-purple-600">
                        {totalPrice} TL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-6 rounded-xl text-xl shadow-2xl transform transition hover:scale-105 active:scale-95 animate-pulse"
            >
              🎉 SİPARİŞİ TAMAMLA 🎨
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
