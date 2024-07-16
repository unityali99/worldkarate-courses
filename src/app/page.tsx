import CourseCard from "@/components/CourseCard";
import NewsLetterForm from "@/components/Form/NewsLetterForm";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <main className="space-y-14 px-4 md:px-0 my-12 flex flex-col items-center">
      <Box className="bg-heading text-white text-center py-12 font-bold text-lg px-4 w-full">
        <Heading>سنسی امیر یاری</Heading>
        <Text className="mt-7 mb-10 font-light">پکیج های آموزشی کاتا</Text>
        <Text className="mt-7 mb-10 font-light" dir="rtl">
          {"برای اطلاع از آخرین بروزرسانی پکیج ها ایمیل خود را وارد کنید."}
        </Text>
        <Flex
          alignItems={"center"}
          justify={"center"}
          className="space-y-3 md:space-x-5 md:space-y-0 flex-col md:flex-row"
        >
          <NewsLetterForm />
        </Flex>
      </Box>
      <CourseCard
        description="آموزش کامل 10 کاتای پیشرفته و مسابقه ای از شیتوریو، گوجوریو و رووی ریو"
        imageAlt="Golden Package"
        imageSrc="/Kiyuna.webp"
        title={
          <>
            پکیج <Text className="text-yellow-500 inline">طلایی</Text> 10 کاتای
            پیشرفته
          </>
        }
      />
    </main>
  );
}
