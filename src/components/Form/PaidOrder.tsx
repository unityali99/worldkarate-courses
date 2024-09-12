import { ResponseData } from "@/layouts/CheckoutLogic";
import PanelContainer from "@/layouts/PanelContainer";
import PanelTableContainer from "@/layouts/PanelTableContainer";
import {
  Badge,
  Button,
  Link,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import Placeholder from "../Placeholder";

function PaidOrder({
  order,
  hydrated,
}: {
  order: ResponseData;
  hydrated: boolean;
}) {
  return (
    <PanelContainer>
      <Text className="text-lg md:text-2xl" dir="rtl">
        {`شماره سفارش: ${order.transaction.transactionId}#`}
      </Text>
      <PanelTableContainer>
        <Table variant="striped" size={{ base: "md", md: "lg" }}>
          <TableCaption>
            <Link href="/">
              <Button
                w={{ base: "70%", md: "40%" }}
                size={{ base: "sm", md: "md" }}
                mx="auto"
                colorScheme="green"
              >
                {"بازگشت به صفحه اصلی"}
              </Button>
            </Link>
          </TableCaption>
          <Tbody>
            <Tr>
              <Td p={{ base: "0", md: "25px" }}>{"وضعیت پرداخت"}</Td>
              <Td p={{ base: "0", md: "25px" }}>
                {order.transaction.isPaid ? (
                  <Badge colorScheme="green" rounded={"full"}>
                    <Text className="md:text-lg p-3">{"موفق"}</Text>
                  </Badge>
                ) : (
                  <Badge colorScheme="red">
                    <Text className="md:text-lg p-3">{"ناموفق"}</Text>
                  </Badge>
                )}
              </Td>
            </Tr>
            {hydrated
              ? order.courses.map((c, i) => (
                  <Tr key={i}>
                    <Td p={{ base: "0", md: "25px" }}>{c.title}</Td>
                    <Td p={{ base: "0", md: "25px" }}>
                      <Link target="_blank" href={c.link}>
                        <Text className="text-blue-700">{"دانلود"}</Text>
                      </Link>
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
              <Td>{order.transaction.totalPrice.toLocaleString()}</Td>
            </Tr>
          </Tbody>
        </Table>
      </PanelTableContainer>
    </PanelContainer>
  );
}

export default PaidOrder;
