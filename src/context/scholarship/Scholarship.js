import { toast } from "react-toastify";
import apiClient from "../../utils/apiClient/apiClient";
import axios from "axios";

export const createScholarship = async (data, link) => {
  try {
    console.log(link)
    const res = await apiClient.post("api/scholarship", {
      description: data.message,
      post_at: data.created_time,
      link,
    });

    if (res.status === 200) {
      const message = res.data.message;
      toast.success(message);
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getScholarship = async () => {
  try {
    const res = await apiClient.get("api/scholarship");
    if (res.status === 200) {
      const data = res.data.data;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const scrabData = async (accessToken, link) => {
  try {
    const pageAndPostId = extractFacebookIds(link);
    if (!pageAndPostId) {
      toast.error(
        "Invalid post URL. Please provide a valid Facebook post link."
      );
      return null;
    }

    const { pageId, postId } = pageAndPostId;
    const res = await axios.get(
      `https://graph.facebook.com/v12.0/${pageId}_${postId}?access_token=${accessToken}`
    );

    if (res.status === 200) {
      const data = res.data;
      console.log("trov in function");
      return data;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const fbError = error.response.data.error;
      if (fbError.code === 190 && fbError.error_subcode === 463) {
        toast.error("Access token has expired. Please provide a valid token.");
      } else {
        toast.error(`Error: ${fbError.message}`);
      }
    } else {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
    return null;
  }
};

const extractFacebookIds = (url) => {
  const pageIdMatch = url.match(/facebook\.com\/(\d+)/);
  const postIdMatch = url.match(/\/posts\/([^/?]+)/);
  if (pageIdMatch && postIdMatch) {
    return { pageId: pageIdMatch[1], postId: postIdMatch[1] };
  } else {
    return null;
  }
};
