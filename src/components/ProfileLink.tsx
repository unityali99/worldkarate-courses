import Link from "next/link";
import React from "react";

function ProfileLink({ fullName }: { fullName: string }) {
  return (
    <Link className="hover:underline" href={"/profile"}>
      {fullName}
    </Link>
  );
}

export default ProfileLink;
