import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="space-y-14 px-4 md:px-0 my-12">
      <Flex className="flex-col md:flex-row justify-center items-center space-y-12 md:space-x-5">
        <Image
          alt="Golden Package"
          src={"/Kiyuna.webp"}
          width={500}
          height={500}
          quality={100}
          className="sm:w-9/12 md:w-5/12 lg:w-3/12 rounded-lg"
        />
        <VStack dir="rtl" alignItems={"start"} className="space-y-8 md:w-4/12">
          <Heading>
            پکیج <Text className="text-yellow-500 inline">طلایی</Text> 10 کاتای
            پیشرفته
          </Heading>
          <Text>
            آموزش کامل 10 کاتای پیشرفته و مسابقه ای از شیتوریو، گوجوریو و رووی
            ریو
          </Text>
          <Button colorScheme="red">مشاهده پکیج</Button>
        </VStack>
      </Flex>
    </main>
  );
}
