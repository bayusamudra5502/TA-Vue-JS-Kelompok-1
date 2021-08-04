import axios from "axios";
import { getCurrentToken } from "./auth";
import { BlogError } from "../error/BlogError";

const BASE_URL = "http://demo-api-vue.sanbercloud.com/api/v2/blog";

export async function getRandomBlogs(count) {
  try {
    const { data } = await axios.get(`${BASE_URL}/random/${count}`);

    return data.blogs;
  } catch (err) {
    throw new BlogError("Tidak bisa mengambil data", err);
  }
}

export async function getAllBlogs(page) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${BASE_URL}`,
      params: {
        page,
      },
    });
    return data.blogs.data;
  } catch (err) {
    throw new BlogError("Tidak bisa mengambil data", err);
  }
}

export async function getBlog(id) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${BASE_URL}/${id}`,
    });

    return data.blog;
  } catch (err) {
    throw new BlogError("Tidak bisa mengambil data", err);
  }
}

export async function addPost({ title, description }, token = null) {
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
