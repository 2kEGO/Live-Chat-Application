// components/Blog/utils.js
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase-config';

export const handleLikeToggle = async (blogId, likes, uid) => {
  if (!uid) return;
  const blogRef = doc(db, "blogs", blogId);
  const hasLiked = likes.includes(uid);

  try {
    await updateDoc(blogRef, {
      likes: hasLiked ? arrayRemove(uid) : arrayUnion(uid)
    });
  } catch (error) {
    console.error("Failed to toggle like:", error);
  }
};
