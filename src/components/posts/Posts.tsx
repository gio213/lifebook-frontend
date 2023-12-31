import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cinput } from "../log in/Login";
import { BlueBtn } from "../landing page/LandingPage";
import LinkPreviewComponent from "../linkPreview/LinkPreview";
import { useGetUSerData } from "../../hooks/useGetUserData";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Toaster } from "react-hot-toast";
import Toast from "../../components/toas messages/ToastMessages";
import { Likes } from "../likes/Likes";
import { calculateTime } from "../../hooks/useGetUserData";
import { Comment } from "../comment/Comment";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spiner from "../Spiner/Spiner";

export const Posts = () => {
  const api =
    "https://lifebookbackend.up.railway.app/api/get_feed_for_auth_user";
  const scraperApiKey = "pk_59bb0839cc0fa9434896843ae5fe88faee75c033";
  library.add(faCloudUpload);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [token, setToken] = useState("");
  const [writePost, setWritePost] = useState<string>("");
  const [post_id, setPost_id] = useState();
  const [profile_picture, setprofile_picture] = useState({} as File);
  const [visible, setVisible] = useState<boolean>(true);
  const [userData, setUserData] = useState({});
  const [loginData, setLoginData] = useState("");

  const { getUserData } = useGetUSerData();

  useEffect(() => {
    (async () => {
      const data = await getUserData();

      setUserData(data);
    })();
  }, []);

  const urlRegex = new RegExp(
    "^(https?:\\/\\/)?" +
      // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  const fetchPreviewData = async (posts) => {
    console.log({ posts });

    const previewDataPromises = posts.map(async (post) => {
      if (urlRegex.test(post.content)) {
        const previewData = await fetchUrlData(post.content);

        return { ...post, ...previewData };
      }
      return post;
    });

    return await Promise.all(previewDataPromises);
  };

  const getPosts = async (token = "") => {
    setLoader(true);
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("API request failed");
      }

      const { result } = response.data;
      const postsWithPreviewData = await fetchPreviewData(result);

      setPosts(postsWithPreviewData);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  // const apiUrl = `https://jsonlink.io/api/extract?url=${url}&api_key=${apiKey}`;

  const cookieToken = document.cookie.split("=")[1];

  const fetchUrlData = async (url: string) => {
    const api = `https://jsonlink.io/api/extract?url=${url}&api_key=${scraperApiKey}`;

    try {
      const response = await axios.get(api);

      if (response.status !== 200) {
        throw new Error("API request failed");
      }

      const { data } = response;

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cookieToken) {
      setToken(cookieToken);
      getPosts(cookieToken);
    } else {
      navigate("/login");
    }
  }, [cookieToken, navigate]);

  const handleWritePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWritePost(e.target.value);

    return writePost;
  };

  const handleprofile_pictureSubmit = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setprofile_picture(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };
  const formData = new FormData();
  formData.append("post_image", profile_picture);
  formData.append("content", writePost);
  formData.append("user_id", userData?.user_id);
  const handlePostSubmit = () => {
    if (!writePost) {
      alert("Please write something");
    } else {
      axios
        .post(
          "https://lifebookbackend.up.railway.app/api/create_post",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          const message = res.data.message;
          setLoginData(message);
          setWritePost("");
        })
        .finally(() => {
          getPosts(cookieToken);
          setVisible(true);
        });
    }
  };

  const handlePostClick = (post_id: number): number => {
    setPost_id(post_id);
    console.log(post_id);

    return post_id;
  };
  console.log(posts);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {visible && <Toast message={loginData} setVisible={setVisible} />}
      <FirstDiv>
        <InputDiv>
          <ProfileImg
            src={
              userData?.profile_picture ||
              "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
            }
            alt="profile picture"
          />
          <Cinput
            style={{
              width: "50%",
              backgroundColor: "#F2F2F2",
              fontFamily: "monospace",
            }}
            type="text"
            placeholder="Write a post here..."
            value={writePost}
            onChange={handleWritePost}
          />

          <CustomForm
            action="/create_post"
            method="post"
            encType="multipart/form-data"
          >
            <CustomFileUpload
              htmlFor="file-upload"
              className="custom-file-upload"
            >
              <FontAwesomeIcon icon={faCloudUpload} color="white" />
              <CustomFileInput
                id="file-upload"
                type="file"
                onChange={handleprofile_pictureSubmit}
                name="post_image"
              />
            </CustomFileUpload>
          </CustomForm>

          <BlueBtn
            style={{
              width: "80px",
              height: "40px",
              padding: "0px 8px",
              border: "0",
              boxSizing: "border-box",
              borderRadius: "6px",
              backgroundColor: "#196bcf",
              color: "#ffffff",
              fontSize: "16px",
              lineHeight: "20px",
              fontFamily: "monospace",
            }}
            onClick={handlePostSubmit}
          >
            Post
          </BlueBtn>
        </InputDiv>

        {writePost.length > 0 && urlRegex.test(writePost) ? (
          <LinkPreviewComponent writePost={writePost} />
        ) : (
          ""
        )}
      </FirstDiv>

      {loader ? (
        <Spiner />
      ) : (
        posts?.map(
          ({
            author,
            content,
            created_at,
            post_id,
            images,
            description,
            url,
            title,
            domain,
            index,
            profile_picture,
            currentUserLiked,
            commentedByUsers,
            likes,
            profilePicture,
            post_image,
            likedByUsers,
          }) => {
            return (
              <PostsDiv key={post_id}>
                <PostDiv key={post_id} onClick={() => handlePostClick(post_id)}>
                  <ProfileImg
                    src={
                      profilePicture ||
                      "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                    }
                    alt="profile picture"
                  />
                  <p>{calculateTime(created_at)}</p>
                  <h3>Author:{author}</h3>
                  {title?.length > 0 && <h4>Title:{title}</h4>}

                  {post_image && content ? (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <ContentDiv>
                        <p>{content}</p>
                      </ContentDiv>
                      <PreviewImg src={post_image} alt="post image" />
                    </div>
                  ) : urlRegex.test(content) ? (
                    <PreviewImg
                      src={images?.[0]}
                      alt="post img"
                      onClick={() => window.open(url, "_blank")}
                    />
                  ) : (
                    <ContentDiv>
                      <p>{content}</p>
                    </ContentDiv>
                  )}

                  {description?.length > 0 && (
                    <DescriptionDiv>
                      <p>{description}</p>
                    </DescriptionDiv>
                  )}

                  {domain?.length > 0 && <h4>Source:{domain}</h4>}
                  <h3>Comments:</h3>
                  {commentedByUsers[0].content?.length ? (
                    <CommentDiv>
                      {commentedByUsers.map((comment, index) => (
                        <CommentContetnDiv key={index}>
                          {comment.username !== null &&
                            comment.profilePicture !== null && (
                              <CustomDiv>
                                <ProfileAuthor>
                                  <CommentPicture
                                    src={comment.profilePicture}
                                    alt="profile picture"
                                  />
                                  <p>{comment.username}</p>
                                </ProfileAuthor>
                                <div style={{ width: "20%", opacity: "0.5" }}>
                                  {calculateTime(comment.timestamp)}
                                </div>
                              </CustomDiv>
                            )}
                          {comment.content !== null && <p>{comment.content}</p>}
                        </CommentContetnDiv>
                      ))}
                    </CommentDiv>
                  ) : (
                    <p>No comments yet</p>
                  )}

                  <Comment
                    writePost={writePost}
                    post_id={post_id}
                    getPosts={getPosts}
                    setLoader={setLoader}
                  />

                  <LikedDiv>
                    <Likes
                      post_id={post_id}
                      likes={likes}
                      liked={currentUserLiked}
                    />

                    <PeopleLikedDiv>
                      <p>Liked by:</p>
                      <CustomSelect>
                        {likedByUsers?.map((user, index) => {
                          return <option key={index}>{user}</option>;
                        })}
                      </CustomSelect>
                    </PeopleLikedDiv>
                  </LikedDiv>
                </PostDiv>
              </PostsDiv>
            );
          }
        )
      )}
      <Toaster />
    </div>
  );
};

const PostsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f3f3f3;
  word-wrap: break-word;
`;

const PostDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: fit-content;
  justify-content: flex-start;
  background-color: #ffffff;

  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  border: 1px solid #8b8a8a;
  transition: all 0.2s ease-in-out;
  font-family: monospace;
  &&:hover {
    transform: scale(1.01);
  }
`;

const InputDiv = styled.div`
  display: flex;
  width: 35%;
  height: 70px;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  gap: 10px;
  transition: all 0.2s ease-in-out;
  padding: 10px;
  &&:hover {
    transform: scale(1.01);
  }
`;

export const PreviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: fit-content;
  justify-content: flex-start;
  opacity: 0.8;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 35px;
  gap: 10px;
  border: 1px solid #8b8a8a;
  transition: all 0.2s ease-in-out;
  font-family: monospace;

  &&:hover {
    transform: scale(1.01);
  }
`;

export const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  &&:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;
const PreviewImg = styled.img`
  width: 45%;
  height: 50%;
  border-radius: 20px;
  object-fit: cover;
  &&:hover {
    transform: scale(1.01);
    cursor: pointer;
  }
`;

const DescriptionDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  background-color: #c9c3c3;
  border-radius: 20px;
  word-wrap: break-word;
  P {
    max-width: 100%;
  }
`;

const FirstDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const CustomFileInput = styled.input`
  display: none;
`;

const CustomFileUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border-radius: 6px;
  background-color: #196bcf;
  font-family: monospace;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 50%;
  &&:hover {
    transform: scale(1.01);
  }
`;

const CustomForm = styled.form`
  display: flex;
  align-items: center;
  width: 10%;
`;

const ContentDiv = styled.div`
  width: fit-content;
  background-color: #c3e3f0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 10px;
  gap: 10px;
`;

const LikedDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PeopleLikedDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 70%;

  p {
    font-family: monospace;
  }
`;

const CustomSelect = styled.select`
  border: 1px solid #e6e8ec;
  border-radius: 4px;
  box-sizing: border-box;
`;

const CommentPicture = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
  &&:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const CommentDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 200px;
  box-sizing: border-box;
  overflow-y: scroll;
  justify-content: flex-start;
  padding: 10px;
  gap: 10px;
  transition: all 0.2s ease-in-out;
  font-family: monospace;
  &&:hover {
    transform: scale(1.01);
  }
`;

export const CommentContetnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 10px;
  gap: 10px;
  background-color: #ebf2f7;
  border-radius: 10px;
  word-wrap: break-word;
  P {
    font-family: monospace;
    font-weight: bold;
  }
`;

const ProfileAuthor = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  height: fit-content;
  justify-content: flex-start;
  align-items: center;

  p {
    font-family: monospace;
    font-weight: bold;
    text-transform: capitalize;
  }
`;

const CustomDiv = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  align-items: center;
`;
