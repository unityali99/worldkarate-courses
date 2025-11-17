"use client";
import PanelContainer from "@/layouts/PanelContainer";
import PanelTableContainer from "@/layouts/PanelTableContainer";
import useCart from "@/stores/cartStore";
import {
  Alert,
  Box,
  Button,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { useState } from "react";
import Placeholder from "./Placeholder";
import ApiClient from "@/services/ApiClient";
import { PaymentType } from "@/schemas/Payment";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";

function Checkout({ hydrated }: { hydrated: boolean }) {
  const { courses, clear } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const apiClient = new ApiClient<PaymentType>("/payment/checkout");

  const totalPrice = courses.reduce(
    (accumulator, currentVal) => accumulator + currentVal.price,
    0
  );

  const onClick = () => {
    setIsLoading(true);
    const courseIds = courses.map((c) => c.id.toString());
    apiClient
      .post({ courseIds })
      .then((res) => {
        toast.success(res.data.message);
        window.location.href = res.data.paymentUrl;
        // clear();
      })
      .catch((error: AxiosError) =>
        toast.error((error.response?.data as { message: string }).message)
      )
      .finally(() => setIsLoading(false));
  };

  if (hydrated && courses.length === 0)
    return (
      <Box className="w-10/12 md:w-6/12 mx-auto text-center">
        <Alert colorScheme="red" textColor={"red"} className="rounded-lg">
          <Text mx={"auto"}>{"شما هیچ موردی برای پرداخت ندارید"}</Text>
        </Alert>
      </Box>
    );

  return (
    <PanelContainer>
      <Text className="text-lg md:text-2xl" dir="rtl">
        {"سفارش خود را نهایی کنید"}
      </Text>

      <PanelTableContainer>
        <Table variant="striped" size={{ base: "md", md: "lg" }}>
          <TableCaption>
            <Button
              w={{ base: "70%", md: "40%" }}
              size={{ base: "sm", md: "md" }}
              mx="auto"
              colorScheme="green"
              onClick={onClick}
            >
              {isLoading ? <Spinner /> : "پرداخت"}
            </Button>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>{"عنوان"}</Th>
              <Th>{"قیمت (تومان)"}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {hydrated
              ? courses.map((c, i) => (
                  <Tr key={i}>
                    <Td p={{ base: "0", md: "25px" }}>{c.title}</Td>
                    <Td p={{ base: "0", md: "25px" }}>
                      {c.price.toLocaleString("en-US")}
                    </Td>
                  </Tr>
                ))
              : [0, 1, 2].map((v, i) => (
                  <Tr key={i}>
                    <Td>
                      <Placeholder />
                    </Td>
                    <Td>
                      <Placeholder />
                    </Td>
                  </Tr>
                ))}
            <Tr>
              <Td>{"مجموع"}</Td>
              <Td>
                {hydrated ? (
                  totalPrice.toLocaleString("en-US")
                ) : (
                  <Placeholder />
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </PanelTableContainer>
    </PanelContainer>
  );
}

export default Checkout;
