import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";
import { PostType } from "../../types/general";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { FaRegShareFromSquare } from "react-icons/fa6";

export default function PostCart({ post }: { post: PostType }) {
  const {
    user,
    body,
    createdAt,
    id,
    image,
    bookmarked,
    commentsCount,
    isShare,
    likesCount,
    privacy,
    sharesCount,
    topComment,
  } = post;

  console.log(post);

  return (
    <Card className="w-[40%] mx-auto my-4">
      <CardHeader className="flex gap-3 relative">
        <Image
          alt="heroui logo"
          height={40}
          radius="sm"
          src={user.photo}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{user.name}</p>
          <p className="text-small text-default-500">
            {/* make date recived from api readable */}
            {new Date(createdAt).toLocaleString("en-Uk", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
        {bookmarked && (
          <div className=" absolute bg-slate-100 top-0  p-2.5 cursor-pointer inset-e-3">
            {<FaBookmark className="size-5 text-[#a044ff]" />}
          </div>
        )}
        {!bookmarked && (
          <div className=" absolute bg-slate-100 top-0  p-2.5 cursor-pointer inset-e-3">
            {<FaRegBookmark className="size-5 " />}
          </div>
        )}
      </CardHeader>
      <Divider />

      <CardBody>
        {body && <p className="mb-2">{body}</p>}
        {image && <img src={image} className="w-full" alt={body} />}
      </CardBody>

      <Divider />
      <CardFooter>
        <div className="flex w-full justify-between">
          <div className="likes flex items-center gap-1">
            <span>{likesCount}</span>
            <span className="cursor-pointer text-[#a044ff]">
              <AiFillLike />
            </span>
          </div>
          <div className="comments flex items-center gap-1">
            <span>{commentsCount}</span>
            <span className="cursor-pointer text-[#a044ff]">
              <GoComment />
            </span>
          </div>
          <div className="shares flex items-center gap-1">
            <span>{sharesCount}</span>
            <span className="cursor-pointer text-[#a044ff]">
              <FaRegShareFromSquare />
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
