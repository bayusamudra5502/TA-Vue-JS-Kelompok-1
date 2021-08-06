# Blog API

## Mendapatkan Blog Secara Random

Gunakan :

```javascript
this.$blog.getRandomBlogs(count);
```

### Parameter

- `count` adalah Number dengan makna jumlah blog random yang ingin didapatkan.

### Return

Fungsi ini akan menghasilkan Array objek javascript dengan format berikut:

```javascript
{
  "id": Number,
  "title": String,
  "description": String,
  "photo": String,
  "created_at": Date,
  "updated_at": Date
}
```

Keterangan

- `photo` sudah merupakan URL absolut sehingga bisa langsung pakai

### Eksepsi

Bila terjadi kesalahan, akan muncul error `BlogError`

### Contoh

```javascript
this.$blog.getRandomBlogs(2);
```

## Pagination Artikel

Gunakan:

```javascript
this.$blog.getAllBlogs((page = 1));
```

### Parameter

- `page` adalah halaman pagination yang ingin diambil. Bersifat opsional, bila tidak diinputkan maka akan mengambil halaman pertama.

### Keluaran

Berikut ini adalah format objek keluaran fungsi ini:

```javascript
{
  current_page: Number,
  total: Number,
  data: Array
}
```

Objek dari elemen data memiliki format sebagai berikut:

```javascript
{
  "id": Number,
  "title": String,
  "description": String,
  "photo": String,
  "created_at": Date,
  "updated_at": Date
}
```

### Eksepsi

Bila terjadi kesalahan, akan muncul error `BlogError`

### Contoh

```javascript
this.$blog.getAllBlogs(2);
```

## Mendapatkan Artikel dengan ID tertentu

Gunakan :

```javascript
this.$blog.getBlog(id);
```

### Parameter

- `id` merupakan Number dari id sebuah artikel yang ingin diambil

### Keluaran

Keluaran fungsi ini adalah objek javascript dengan format berikut:

```javascript
{
  "id": Number,
  "title": String,
  "description": String,
  "photo": String,
  "created_at": Date,
  "updated_at": Date
}
```

Keterangan

- `photo` sudah merupakan URL absolut sehingga bisa langsung pakai

### Eksepsi

Bila terjadi kesalahan, akan muncul error `BlogError`

### Contoh

```javascript
this.$blog.getBlog(2);
```

## Menambah Artikel Baru

Gunakan:

```javascript
this.$blog.editPost(postObj, (userToken = null));
```

### Parameter

- `postObj` adalah objek javascript yang mempresentasikan isi objek yang akan ditambahkan dengan format berikut:

```javascript
{
  title: String,
  description: String
}
```

Note:

- Title adalah judul artikel
- Description adalah isi artikel

### Keluaran

Menghasilkan True bila berhasil menambahkan post.

### Eksepsi

Bila terjadi kesalahan, akan muncul error `BlogError`

### Contoh

```javascript
const objPost = {
  title: "Judul Post",
  description: "Ini Isi dari description",
};

// Menggunakan token user aktif saat ini
this.$blog.addPost(objPost);

// Menggunakan token user custom
this.$blog.addPost(objPost, "INI_TOKEN");
```

## Mengedit Artikel

Gunakan:

```javascript
this.$blog.editPost(postObj, (userToken = null));
```

### Parameter

- `postObj` adalah objek javascript yang mempresentasikan isi objek yang akan ditambahkan dengan format berikut:

```javascript
{
  id: Number,
  title: String,
  description: String
}
```

Note:

- id adalah nomor id dari artikel
- Title adalah judul artikel
- Description adalah isi artikel

### Keluaran

Menghasilkan True bila berhasil menambahkan post.

### Eksepsi

Bila terjadi kesalahan, akan muncul error `BlogError`

### Contoh

```javascript
const objPost = {
  id: 123,
  title: "Judul Post",
  description: "Ini Isi dari description",
};

// Menggunakan token dari user yang sedang aktif saat ini
this.$blog.editPost(objPost);

// Menggunakan token custom
this.$blog.editPost(objPost, "INI_TOKEN");
```

## Menghapus Blog

Gunakan:

```javascript
this.$blog.deleteBlog(id, (token = null));
```

### Parameter

- `id` merupakan id artikel yang akan dihapus.
- `token` adalah token user. Bersifat opsional. BIla tidak dilewatkan, maka akan menggunakan token user yang aktif saat ini.

### Keluaran

Boolean, menghasilkan True bila blog berhasil dihapus.

### Eksepsi

Bila terjadi kesalahan, akan muncul error `BlogError`

### Contoh

```javascript
// Menggunakan user yang sedang aktif saat ini
this.$blog.deleteBlog(123);

// Menggunakan token user custom
this.$blog.deleteBlog(123, "INI TOKEN USER");
```

## Upload Foto pada Artikel

Gunakan:

```javascript
this.$blog.uploadPhoto(object, (token = null));
```

### Parameter

- `object` adalah sebuah objek javascript dengan format berikut:

```javascript
{
  id: Number,
  photo: File
}
```

- `token` adalah token user. Bersifat opsional. BIla tidak dilewatkan, maka akan menggunakan token user yang aktif saat ini.

### Keluaran

Boolean, menghasilkan True bila gambar berhasil ditambahkan.

### Eksepsi

Bila terjadi kesalahan, akan muncul error `BlogError`

### Contoh

```javascript
const photoObj = {
  id: 123,
  photo: this.$refs.photo.files[0],
};

// Menggunakan user yang sedang aktif saat ini
this.$blog.uploadPhoto(photoObj);

// Menggunakan token user custom
this.$blog.uploadPhoto(photoObj, "INI TOKEN USER");
```
