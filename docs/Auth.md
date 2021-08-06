# API Plugin

## Register User Baru

Gunakan :

```javascript
this.$auth.login(userObj);
```

### Parameter

- `userObj` adalah objek javascript dengan format sebagai berikut:

```javascript
userObj = {
  email: String,
  password: String,
  name: String,
  photo_profile: File,
};
```

### Keluaran

Menghasilkan True bila berhasil menambah user baru

### Kesalahan

Jika terjadi kesalahan, akan muncul error `RegisterError`

### Contoh

```javascript
const photo = this.$refs.photo.files[0];
const userObj = {
  email: "person@example.com",
  password: "password",
  name: "Person",
  photo_profile: photo,
};

this.$auth.login(userObj);
```

## Login

Gunakan :

```javascript
this.$auth.login(loginObj);
```

### Parameter

- `loginObj` adalah objek javascript dengan format berikut:

```javascript
loginObj = {
  email: String,
  password: String,
};
```

### Keluaran

Menghasilkan token user bila berhasil login

### Kesalahan

Bila terjadi kesalahan dalam proses login, akan muncul error `LoginError`

### Contoh

```javascript
const userObj = {
  email: "person@example.com",
  password: "password",
};

this.$auth.login(userObj);
```

## Cek Sudah Login

Gunakan:

```javascript
this.$auth.isLogged();
```

### Keluaran

Menghasilkan nilai `true` bila user masih memiliki sesi saat ini

### Contoh

```javascript
this.$auth.isLogged();
```

## Mendapatkan Detail User

Gunakan:

```javascript
this.$auth.getUserDetails((token = null));
```

### Parameter

- `token` bersifat opsional. Bila token tidak dimasukkan, maka akan diambil user yang sedang aktif saat ini.

### Keluaran

Objek javascript dengan skema berikut:

```javascript
{
  id: Number,
  name: String,
  email_verified_at: Object,
  created_at: String,
  updated_at: String,
  photo_profile: String
}
```

### Contoh

```javascript
// Mendapatkan detail user yang sedang aktif saat ini
this.$auth.getUserDetails();

// Mendapatkan detail user dengan token
this.$auth.getUserDetails("INI_TOKEN_USER");
```

## Logout

Gunakan :

```javascript
this.$auth.logout();
```

### Keluaran

Menghasilkan True bila berhasil logout

### Kesalahan

Bila terjadi kesalahan akan mengembalikan error `SessionError`

### Contoh

```javascript
this.$auth.logout();
```

## Mendapatkan Token User Saat ini

Gunakan:

```javascript
this.$auth.getCurrentToken();
```

### Keluaran

String token user yang sedang aktif saat ini. Bila belum login, menghasilkan nilai `null`.

### Contoh

```javascript
this.$auth.getCurrentToken();
```
