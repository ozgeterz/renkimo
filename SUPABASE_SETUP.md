# Supabase Database Kurulum Rehberi

## 1. Supabase Hesabı Oluşturma

1. [https://supabase.com](https://supabase.com) adresine git
2. "Start your project" butonuna tıkla
3. GitHub hesabınla giriş yap (ücretsiz)

## 2. Yeni Proje Oluşturma

1. "New Project" butonuna tıkla
2. Proje adı: `renkimo` (veya istediğin bir isim)
3. Database şifresi belirle (güçlü bir şifre seç)
4. Region: `Europe West (Frankfurt)` seç (Türkiye'ye en yakın)
5. "Create new project" butonuna tıkla (1-2 dakika sürer)

## 3. Database Tablosu Oluşturma

1. Sol menüden **Table Editor** sekmesine git
2. "Create a new table" butonuna tıkla
3. Tablo adı: `orders`
4. "Enable Row Level Security (RLS)" seçeneğini **KAPAT** (şimdilik)

### Kolonları Ekle:

| Column Name       | Type        | Default Value | Primary | Nullable |
| ----------------- | ----------- | ------------- | ------- | -------- |
| id                | int8        | AUTO          | ✓       | ✗        |
| full_name         | text        | -             | ✗       | ✗        |
| phone             | text        | -             | ✗       | ✗        |
| city              | text        | -             | ✗       | ✗        |
| district          | text        | -             | ✗       | ✗        |
| address           | text        | -             | ✗       | ✗        |
| selected_products | text[]      | -             | ✗       | ✗        |
| payment_method    | text        | -             | ✗       | ✗        |
| total_price       | int4        | -             | ✗       | ✗        |
| created_at        | timestamptz | now()         | ✗       | ✗        |

5. "Save" butonuna tıkla

## 4. API Anahtarlarını Alma

1. Sol menüden **Settings** (⚙️) sekmesine git
2. **API** sekmesine tıkla
3. Aşağıdaki bilgileri kopyala:
   - **Project URL** (örn: `https://xxxxx.supabase.co`)
   - **anon/public key** (uzun bir string)

## 5. .env Dosyasını Güncelleme

`.env` dosyasındaki placeholder'ları gerçek değerlerle değiştir:

```env
VITE_GOOGLE_FORM_ID_AYI=1FAIpQLSe2jzgfFlaZCZ7YwKn1geG-LNu6OOAPH-jrrHT3NfXauo3oBA
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 6. Test Etme

1. Development server'ı başlat:

   ```bash
   npm run dev
   ```

2. Bir sipariş oluştur

3. Supabase dashboard'da **Table Editor** > **orders** tablosuna git ve siparişin kaydedildiğini kontrol et

## 7. Verileri Görüntüleme

Supabase dashboard'da:

- **Table Editor** > **orders** sekmesinden tüm siparişleri görebilirsin
- Filtreleme, sıralama ve arama yapabilirsin
- CSV olarak export edebilirsin

## Önemli Notlar

✅ **Google Form yapısı korundu** - Her sipariş hem Google Form'a hem de Supabase'e kaydediliyor

✅ **Ücretsiz** - Supabase free tier ayda 500MB database ve 2GB bandwidth sağlıyor (bu proje için fazlasıyla yeterli)

✅ **Güvenli** - Veriler şifrelenmiş olarak saklanıyor

## Sorun Giderme

**Hata: "Invalid API key"**

- `.env` dosyasındaki `VITE_SUPABASE_ANON_KEY` değerini kontrol et
- Dev server'ı yeniden başlat (`npm run dev`)

**Hata: "relation 'orders' does not exist"**

- Supabase dashboard'da `orders` tablosunun oluşturulduğundan emin ol

**Sipariş kaydedilmiyor**

- Browser console'u aç (F12) ve hata mesajlarını kontrol et
- Supabase dashboard'da **Logs** sekmesine bak
