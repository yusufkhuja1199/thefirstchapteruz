# The First Chapter

Chaqaloqlikning ilk xotiralarini saqlash uchun qo'lda yasalgan qutilar (baby keepsake box) sayti. Qutiga tug'ruqxona bilaguzugi, birinchi soch tolasi, soska, paypoqcha, bodi va boshqa esdalik buyumlar solinadi. Qutilarni Rossiyadagi usta yasaydi, sotuv va yetkazib berish esa O'zbekiston bo'ylab amalga oshiriladi.

**Sayt:** https://yusufkhuja1199.github.io/thefirstchapteruz/

## Sahifalar

| Fayl | Sahifa |
|---|---|
| `index.html` | Bosh sahifa |
| `catalog.html` | Katalog (filtr bilan) |
| `about.html` | Biz haqimizda |
| `delivery.html` | Yetkazish va to'lov, FAQ |
| `contact.html` | Aloqa va forma |
| `404.html` | Sahifa topilmadi |

## Tuzilishi

Sayt faqat HTML, CSS va JavaScript'dan iborat — build yoki kutubxona kerak emas.

```
css/style.css   umumiy stillar
js/i18n.js      uch tildagi matnlar (uz / ru / en) va til almashtirgich
js/main.js      menyu, katalog filtri, buyurtma oynasi, formalar
images/         rasmlar
sitemap.xml     Google uchun sahifalar ro'yxati
robots.txt      qidiruv tizimlari uchun ko'rsatma
```

## Tillar

Sahifadagi matnlar `data-i18n="kalit"` atributi bilan belgilangan, tarjimalar esa `js/i18n.js` faylida. Matnni o'zgartirish uchun shu fayldagi kerakli kalitni uchala tilda (`uz`, `ru`, `en`) tahrirlang. Tanlangan til brauzerda saqlanib qoladi.

## Formalar

Buyurtma va aloqa formalari arizalarni **Netlify Forms**'ga yuboradi (`buyurtma` va `aloqa` formalari). Arizalar Netlify panelidagi **Forms** bo'limida ko'rinadi. GitHub Pages'dagi saytdan yuborilgan arizalar ham shu yerga tushadi.

## Joylash

`main` branch'ga yuborilgan har bir o'zgarish avtomatik chiqadi:

- **GitHub Pages** (asosiy): https://yusufkhuja1199.github.io/thefirstchapteruz/
- **Netlify** (formalar uchun): https://thefirstchapteruz.netlify.app

Lokal ko'rish uchun `index.html` faylini brauzerda oching.
