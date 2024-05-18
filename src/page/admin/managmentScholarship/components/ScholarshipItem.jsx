import React from "react";
import { Link } from "react-router-dom";

export default function ScholarshipItem({ data }) {
  const { description, post_at, link } = data;
  return (
    <li className="flex flex-col gap-2 p-5 border-2">
      <p>{description}</p>
      <p className="text-blue-500">Post at : {post_at}</p>
      <a href={`${link}`} className="text-blue-500">
        Link : {link}
      </a>
    </li>
  );
}
