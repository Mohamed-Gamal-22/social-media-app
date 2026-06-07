import React, { useEffect, useState } from "react";
import axios from "axios";
import { PostType } from "../../types/general";
import PostCart from "../../components/PostCart/PostCart";
import Loading from "../../components/Loading/Loading";

export default function Home() {
  const [allPosts, setallPosts] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState(false);

  async function getAllPosts() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/posts?limit=50&sort=-createdAt`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      setallPosts(data.data.posts);
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
      setisError(err.response.data.message);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-[#6a3093] text-[60px] capitalize font-bold">
          {isError}
        </h1>
      </div>
    );
  }

  return (
    <>
      {allPosts?.map((post: PostType) => (
        <PostCart key={post.id} post={post} />
      ))}
    </>
  );
}
