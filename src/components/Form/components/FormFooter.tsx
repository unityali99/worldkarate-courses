import { Link, Text } from "@chakra-ui/react";

function FormFooter({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) {
  return (
    <Text className="text-start text-sm font-light" dir="rtl">
      {text}{" "}
      <Link href={href} className="inline-block hover:underline font-medium">
        {linkText}
      </Link>
    </Text>
  );
}

export default FormFooter;
