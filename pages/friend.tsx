import { NextPage } from "next";

const friends = ["Mark", "Tom"];

const Friend: NextPage = () => {
  return (
    <ul>
      {friends.map((name, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  );
};

export default Friend;
