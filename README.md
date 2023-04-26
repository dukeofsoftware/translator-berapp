
# Translator App

Bu projenin amacı insanların bütün çeviri araçlarına kolayca ulaşabileceği bir platform sunmak. Bilgilerimi geliştirmek.

## Ortam Değişkenleri

Bu projeyi çalıştırmak için aşağıdaki ortam değişkenlerini .env dosyanıza eklemeniz gerekecek. .env.example'dan kopyalayabilirsiniz.

`DEVELOPMENT =`

`NEXT_PUBLIC_APP_URL =`

`NEXTAUTH_URL =`

`GOOGLE_CLIENT_ID =`


`GOOGLE_CLIENT_SECRET =`

`NEXTAUTH_SECRET =`

`DATABASE_URL =`
## Bilgisayarınızda Çalıştırın

Projeyi klonlayın

```bash
  git clone git@github.com:dukeofsoftware/translator-berapp.git
```

Proje dizinine gidin

```bash
  cd bilisim-sitesi
```

Paketleri yükleyin
```bash
pnpm install

```
Çalıştırmak için farklı seçenekler:
```bash
pnpm dev # projeyi geliştirici modunda başlatır

pnpm serve # projenin çıktısını alır ve başlatır 

```

## Çıkarılan Dersler

React-hook-form, react-query, mantine, openai API'sini kullanmayı öğrendim. Typescript, tailwindCSS, next.js, prisma, next-auth bilgimi geliştirdim.

## Kullanılan Teknolojiler

### İstemci
- react-hook-form, yup, => Formlar için kullandım
- mantine, tailwindCSS => Görsel arayüzü oluşturmak için kullandım
- react-query, axios => Veri çekme, gönderme işlemleri için kullandım
- react-icons => Ikonlar için kullandım.
- react-toastify => toast için kullandım



### Sunucu
- bcrpyt => Şifreleri şifreleyip korumak için kullandım
- prisma => orm olarak kullandım
- next-auth => Doğrulama işlemleri için kullandım
- openai => Yapay zeka işlemleri için api'sini kullandım
  

## Ekran Görüntüleri

Grammar yanlışlarını farklı dillerde bulma ve düzeltme sunma
![image](https://user-images.githubusercontent.com/89215036/234472666-6af69048-241c-4de9-a199-81dc654a33c1.png)
  
Girilen kelimenin ingilizce sözlükteki anlamlarını gösterme ve örnek verme
![image](https://user-images.githubusercontent.com/89215036/234472823-3e6aac4c-5ecc-4889-9b5a-e809a1726ed8.png)

Çeşitli seviye quizler
![image](https://user-images.githubusercontent.com/89215036/234583652-ddde361a-9040-410b-b8ea-b18a211a4bde.png)
![image](https://user-images.githubusercontent.com/89215036/234583751-c66686c7-31fc-48cd-9e80-969270ac71c7.png)

Birçok dile çeviri
![image](https://user-images.githubusercontent.com/89215036/234584148-9f24985e-d185-4f1d-8a81-f1d9b8823b5c.png)

Yapay zeka kullanarak çeviri
![image](https://user-images.githubusercontent.com/89215036/234584352-06deac20-d5c9-4f91-9281-0ec0cccc1c4d.png)



## Yazarlar ve Teşekkür

- [@dukeofsoftware](https://github.com/dukeofsoftware) Yazılım geliştirme.
