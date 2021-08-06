import axios from "axios";
import { getCurrentToken } from "./auth";
import { BlogError } from "../error/BlogError";

const BASE_URL = "http://demo-api-vue.sanbercloud.com/api/v2/blog";
const PHOTO_BASE_URL = "http://demo-api-vue.sanbercloud.com";

export async function getRandomBlogs(count) {
  /**
   * Mendapatkan konten post random
   *
   * @param {Number} count - Jumlah post
   * @returns {Array}
   * @throws {BlogError} - Bila terjadi kesalahan dalam pengambilan data
   *
   * @example
   * this.$blog.getRandomBlogs(2); // Array[Length: 2]
   *
   */

  try {
    const { data } = await axios.get(`${BASE_URL}/random/${count}`);
    const formattedData = data.blogs.map((el) => ({
      ...el,
      photo: `${PHOTO_BASE_URL}${el.photo}`,
      created_at: new Date(el.created_at),
      updated_at: new Date(el.updated_at),
    }));

    return formattedData;
  } catch (err) {
    throw new BlogError("Tidak bisa mengambil data", err);
  }
}

export async function getAllBlogs(page = 1) {
  /**
   * Mendapatkan konten post dengan pagination
   *
   * @param {Number} page - Nomor halaman
   * @returns {Array} - Panjang Array 4
   * @throws {BlogError} - Bila terjadi kesalahan dalam pengambilan data
   *
   * @example
   * this.$blog.getAllBlogs(2); // Array[Length: 4]
   *
   */

  try {
    const { data } = await axios({
      method: "GET",
      url: `${BASE_URL}`,
      params: {
        page,
      },
    });

    const formattedData = data.blogs.data.map((el) => ({
      ...el,
      photo: `${PHOTO_BASE_URL}${el.photo}`,
      created_at: new Date(el.created_at),
      updated_at: new Date(el.updated_at),
    }));

    const result = {
      current_page: data.blogs.current_page,
      data: formattedData,
      total: data.blogs.total,
    };

    return result;
  } catch (err) {
    throw new BlogError("Tidak bisa mengambil data", err);
  }
}

export async function getBlog(id) {
  /**
   * Mendapatkan konten post dengan pagination
   *
   * @param {Number} id - Nomor ID Post
   * @returns {Object} - Objek Blog
   * @throws {BlogError} - Bila terjadi kesalahan dalam pengambilan data
   *
   * @example
   * this.$blog.getBlog(2);
   *
   */

  try {
    const { data } = await axios({
      method: "GET",
      url: `${BASE_URL}/${id}`,
    });

    const formattedData = {
      ...data.blog,
      photo: `${PHOTO_BASE_URL}${data.blog.photo}`,
      created_at: new Date(data.blog.created_at),
      updated_at: new Date(data.blog.updated_at),
    };

    return formattedData;
  } catch (err) {
    throw new BlogError("Tidak bisa mengambil data", err);
  }
}

export async function addPost({ title, description }, token = null) {
  /**
   * Menambah post baru
   *
   * @param {Object} postObj - Objek Post
   * @param {String} token - Token user saat ini (Opsional)
   * @returns {Boolean} - True bila berhasil menambah post
   * @throws {BlogError} - Bila terjadi kesalahan dalam penambahan post
   *
   * @example
   * const objPost = { title: "Judul Post", description: "Ini Isi dari description"}
   * this.$blog.addPost(objPost, <TOKEN>);
   *
   */

  const userToken = token ?? (await getCurrentToken());

  try {
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);

    const { status } = await axios({
      method: "POST",
      url: BASE_URL,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      data,
    });

    return 200 <= status < 300;
  } catch (err) {
    throw new BlogError("Tidak bisa mengedit blog", err);
  }
}

export async function editPost({ id, title, description }, token = null) {
  /**
   * Editing post
   *
   * @param {Object} editObject - Data post yang ingin diedit
   * @param {String} token - Token user saat ini (Opsional)
   * @returns {Boolean} - True, bila berhasil diedit
   * @throws {BlogError} - Bila terjadi kesalahan dalam pengeditan post
   *
   * @example
   * const editObj = { id: 121,
   *             title: "Ini pesan edit",
   *             description: "Ini Deskripsi baru" };
   *
   * this.$blog.editPost(editObj);
   *
   */

  const userToken = token ?? (await getCurrentToken());

  try {
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);

    const { status } = await axios({
      method: "POST",
      url: `${BASE_URL}/${id}`,
      params: {
        _method: "PUT",
      },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      data,
    });

    return 200 <= status < 300;
  } catch (err) {
    throw new BlogError("Tidak bisa mengedit blog", err);
  }
}

export async function deleteBlog(id, token = null) {
  /**
   * Menghapus sebuah post
   *
   * @param {Number} id - id post yang akan dihapus
   * @param {String} token - Token user saat ini (Opsional)
   * @returns {Boolean} - True, bila berhasil dihapus
   * @throws {BlogError} - Bila terjadi kesalahan dalam pengeditan post
   *
   * @example
   * this.$blog.deleteBlog(123);
   *
   */

  const userToken = token ?? (await getCurrentToken());

  try {
    const { status } = await axios({
      method: "POST",
      url: `${BASE_URL}/${id}`,
      params: {
        _method: "DELETE",
      },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    return 200 <= status < 300;
  } catch (err) {
    throw new BlogError("Tidak bisa menghapus blog", err);
  }
}

export async function uploadPhoto({ id, photo }, token = null) {
  /**
   * Menambah/mengubah foto dari sebuah post
   *
   * @param {Object} editPhotoObject - Data post yang ingin ditambahkan fotonya
   * @param {String} token - Token user saat ini (Opsional)
   * @returns {Boolean} - True, bila berhasil diedit
   * @throws {BlogError} - Bila terjadi kesalahan dalam pengeditan post
   *
   * @example
   * const photoObj = { id: 123, photo: this.$refs.photo.files[0]}
   * this.$blog.uploadPhoto(photoObj);
   *
   */

  const userToken = token ?? (await getCurrentToken());

  try {
    const data = new FormData();
    data.append("photo", photo);

    const { status } = await axios({
      method: "POST",
      url: `${BASE_URL}/${id}/upload-photo`,
      data,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return 200 <= status < 300;
  } catch (err) {
    throw new BlogError("Tidak bisa mengupload foto untuk blog", err);
  }
}

export default {
  getRandomBlogs,
  getAllBlogs,
  getBlog,
  addPost,
  editPost,
  deleteBlog,
  uploadPhoto,
};
