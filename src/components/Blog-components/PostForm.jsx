import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import "../../style/Blog/PostForm.css";
import {
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import RemoveImg from "../reusable/RemoveImg";

const PostForm = () => {
  const { currentUser } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(db, "blogs"), {
              userId: currentUser.uid,
              userName: currentUser.displayName,
              content: content.trim(),
              createdAt: Timestamp.now(),
              likes: [],
              comments: [],
              img: downloadURL,
            });
            setImg(null);
            setContent("")
          });
        }
      );
      
    } else {
      try {
        await addDoc(collection(db, "blogs"), {
          userId: currentUser.uid,
          userName: currentUser.displayName,
          content: content.trim(),
          createdAt: Timestamp.now(),
          likes: [],
          comments: [],
          img:[],
        });

        setContent("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="post-form-wrapper">
        <div className="user-name">
          <span className="display-userName">
            {currentUser.displayName?.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="post-form-content">
          <div className="post-form-input">
            <div className="post-form-input-container">
              <textarea
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening"
                className="input-area"
              />
            </div>

            <div className="post-form-input-container">
              {img && (
                <>
                  <RemoveImg onClick={() => setImg(null)} />
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="img-area"
                  />
                </>
              )}
            </div>
          </div>

          <div className="post-form-control">
            <div className="form-icon">
              <input
                type="file"
                id="img-upload"
                style={{ display: "none" }}
                onChange={(e) => setImg(e.target.files[0])}
              />

              <label htmlFor="img-upload" className="icon-btn">
                <FontAwesomeIcon icon={faImage} />
              </label>

              <button className="icon-btn">
                <FontAwesomeIcon icon={faIcons} />
              </button>
            </div>

            <div className="form-button">
              <button className="post-btn" disabled={!content.trim()}>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
