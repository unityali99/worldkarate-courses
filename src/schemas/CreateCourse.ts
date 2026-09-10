import { z } from "zod";

const CreateCourse = z.object({
  title: z
    .string({ required_error: "عنوان دوره الزامی است" })
    .min(5, "عنوان دوره باید حداقل ۵ کاراکتر باشد")
    .max(50, "عنوان دوره نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),
  description: z
    .string({ required_error: "توضیحات دوره الزامی است" })
    .min(20, "توضیحات دوره باید حداقل ۲۰ کاراکتر باشد")
    .max(1000, "توضیحات دوره نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد"),
  price: z
    .number({ required_error: "قیمت دوره الزامی است" })
    .nonnegative("قیمت دوره نمی‌تواند منفی باشد"),
  img: z.string({ required_error: "تصویر دوره الزامی است" }),
  link: z.string({ required_error: "لینک ویدیو دوره الزامی است" }),
});

export type CreateCourseType = z.infer<typeof CreateCourse>;

export default CreateCourse;
